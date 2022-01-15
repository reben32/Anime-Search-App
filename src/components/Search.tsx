import React, { useCallback, useEffect, useState } from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchCard from './SearchCard';
import { Grid } from '@material-ui/core';
import debounce from "lodash.debounce";
import { PaginationButtons } from './PaginationButtons';

//MUI styles
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        },
        media: {
            height: 140,
        },
        cards: {
            maxWidth: 345,
            marginTop: 25,

        },
        input: {
            marginLeft: theme.spacing(1),
            flex: 1,
        },
        iconButton: {
            padding: 10,
        },
        divider: {
            height: 28,
            margin: 4,
        },
    }),
);
export default function Search() {
    const classes = useStyles();
    const [query, setQuery] = useState<any>({ debouncedLog: "" })
    const [queried, setQueried] = useState(false)
    const [status, setStatus] = useState('idle')
    const [data, setData] = useState<any>(null)
    const [currentPage, setCurrentPage] = useState<any>(1);
    const [numberOfPages, setNumberOfPages] = useState(0);
    //set loading while retrive data
    const isLoading = status === 'loading'
    const isSuccess = status === 'success'

    useEffect(() => {
        if (!queried) {
            return
        }
        debouncedLog(setQuery, query)
        setStatus('loading')

    }, [queried, currentPage]);

    //fetch anime data and number of the pages for paginatioan(last page)
    const fetchAnimeData = async (query: any, currentPage: any) => {
        try {
            axios.get(
                `https://api.jikan.moe/v3/search/anime?q=${(query)}&page=${(currentPage)}`
            )
                .then(response => {
                    setData(response.data.results)
                    setNumberOfPages(response.data.last_page)
                    setStatus('success')

                })
        } catch (err) {
            console.log(err);
        }
    };
    // debounce the requiest for 250 ms
    const debouncedLog = useCallback(
        debounce((setQuery, nextValue) => {
            setQuery((prevState: any) => ({
                ...prevState,
                debouncedLog: nextValue
            }));
            fetchAnimeData(nextValue, currentPage)
        }, 250),
        []//will be created only once initially
    );
     // handel user input
    const onChange = (event: any) => {
        event.preventDefault()
        setQueried(true)
        const { value: nextValue } = event.target;
        setQuery(nextValue)
        debouncedLog(setQuery, nextValue)
    };
    return (<>
        <Container>
            <Paper component="form" className={classes.root} onSubmit={(e) => { e.preventDefault() }}>
                <InputBase
                    className={classes.input}
                    placeholder="Search Anime..."
                    inputProps={{ 'aria-label': 'Search Anime...' }}
                    onChange={onChange}
                />
                <IconButton type="submit" className={classes.iconButton} aria-label="search">
                    {isLoading ? <CircularProgress color='secondary' /> : <SearchIcon />}
                </IconButton>
            </Paper>
            {isSuccess ? (
                data?.length ? (
                    <Grid container spacing={2} >
                        {data.map((datalist: any) => (

                            <Grid item key={datalist.mal_id} xs={12} md={6} lg={3}>
                                <SearchCard key={datalist.mal_id} datalist={datalist} />
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <p>No Anime found. Try another search.</p>
                )
            ) : null}
            <PaginationButtons
                setCurrentPage={setCurrentPage}
                setQueried={setQueried}
                page={numberOfPages}
            />
        </Container>

    </>
    )
}


