import React from 'react'
import { makeStyles } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => {
    return {
        page: {
            background: '#fefefe',
            width: '100%',
            padding: theme.spacing(2),
        },
        root: {
            display: 'flex',

        },
        appbar: {
            width: '100%',
            background: '#582c83',
            marginBottom: '30px'
        },
        toolbar: theme.mixins.toolbar

    }
})
export default function Layout({ children }: { children: any }) {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            {/* Nav bar */}
            <AppBar
                className={classes.appbar}
                elevation={0}
            >
                <Toolbar>
                    <Typography
                        variant='h5'
                        color='primary'
                    >
                        Anime Search App
                    </Typography>
                </Toolbar>

            </AppBar>
            {/* children components */}
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>

    )

}