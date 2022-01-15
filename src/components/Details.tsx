import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import { Button, CardContent, Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            marginTop: '2rem',
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        media: {
            height: 300,
            paddingTop: '56.25%', // 16:9,
            marginTop: '30'
        },
        button: {
            background: '#582c83',
            color: '#fefefe',
            marginTop: '3rem'
        },
        cardImage: {
            width: 300,
            marginTop: '1rem'
        },
        text: {
            marginTop: '3rem',
            marginBottom: '3rem'
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        cards: {
            marginTop: '1rem',
            width: 150,
            height: 150,

        }
    }),
);


function Details() {
    const [data, setData] = useState<any>('')
    const { animeId } = useParams();
    const classes = useStyles();
    const navigate = useNavigate();
    //Fetch anime data and passing ID
    const fetchAnimeData = async (animeId: any) => {
        try {
            axios.get(
                `https://api.jikan.moe/v3/anime/${animeId}`
            )
                .then(response => {
                    setData(response.data)

                })
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {

        fetchAnimeData(animeId)
    }, [animeId]);
    //add comm to members
let addComma ;
if (data.members != null)
 addComma = data.members.toLocaleString();


    return (
        <>
            <Container className={classes.root}>
                <Grid container >

                    <Grid item  align-content='space-between' xs={12} md={3}>

                        <Card className={classes.cardImage} elevation={1}>
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    image={data.image_url}
                                    title={data.title}
                                />
                                {/* <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {data.title}
                            </Typography>
                        </CardContent> */}
                            </CardActionArea>
                        </Card>
                        <Button
                            startIcon={<ArrowBackIosIcon />}
                            className={classes.button}
                            onClick={() => navigate(-1)}
                            variant="contained">Back</Button>
                    </Grid>
                    <Grid item xs={12} sm={9} >

                        <Typography variant="h3" className={classes.text}>
                            Synopsis
                        </Typography>

                        <Typography variant="body2" align='justify'>
                            {data.synopsis}
                        </Typography>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignContent: 'center',
                            flexDirection: 'row',

                        }}>

                            <Card className={classes.cards} variant='outlined' style={{ backgroundColor: "#9adcfb" }}>
                                <CardContent>
                                    <Typography variant="h5" component="h2" align="center" style={{ color: "#115293" }}>
                                        {data.score}
                                    </Typography>
                                    <br />
                                    <Typography className={classes.pos}  align="center" style={{ color: "#1976d2" }}>
                                        {data.scored_by} Users
                                    </Typography>
                                </CardContent>
                            </Card>
                            <Card className={classes.cards} variant='outlined'style={{ backgroundColor: "#d7a8df" }}>
                                <CardContent>
                                    <Typography variant="h5" component="h2" align="center" style={{ color: "#561571" }}>
                                        #{data.rank}
                                    </Typography>
                                    <br />
                                    <Typography className={classes.pos}  align="center" style={{ color: "#FF647F" }}>
                                        Ranked
                                    </Typography>
                                </CardContent>
                            </Card> <Card className={classes.cards} variant='outlined' style={{ backgroundColor: "#f381a7" }}>
                                <CardContent>
                                    <Typography variant="h5" component="h2" align="center" style={{ color: "#a84466" }}>
                                        #{data.popularity}
                                    </Typography>
                                    <br />
                                    <Typography className={classes.pos}  align="center"style={{ color: "#ec407a" }}>
                                        Popularity
                                    </Typography>
                                </CardContent>
                            </Card> <Card className={classes.cards} variant='outlined' style={{ backgroundColor: "#c8e6c9" }}>
                                <CardContent>
                                    <Typography variant="h5" component="h2" align="center"style={{ color: "#47824a" }}>
                                        {addComma}
                                    </Typography>
                                    <br />
                                    <Typography className={classes.pos}  align="center"style={{ color: "#49a879" }}>
                                        Members
                                    </Typography>
                                </CardContent>
                            </Card>
                        </div>
                    </Grid>

                </Grid>

            </Container>
        </>
    )
}

export default Details
