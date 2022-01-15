import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    width: 250,
    marginTop: '1rem'
  },
  media: {
    height: 200,
    paddingTop: '56.25%', // 16:9,
    marginTop: '30'
  }
});

function SearchCard({ datalist }: any) {
  const classes = useStyles();

  return (
    <>
{/* link to details page */}
      <Link
        to={`/details/${datalist.mal_id}`}
        key={datalist.mal_id}
      >
        {/* card details */}
        <Card className={classes.root} elevation={1}>
          <CardActionArea>
            <CardMedia
              className={classes.media}

              image={datalist.image_url}
              title={datalist.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="h3">
                {datalist.title}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
    </>
  )
}

export default SearchCard
