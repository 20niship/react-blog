import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import { Post } from '../../lib/global'
import { Fragment } from 'react';

interface Props {
  posts: Post[];
}

export default function FeaturedPost(props: Props) {
  const { posts } = props;
  const p = posts.map(post => {
    return (
      <Fragment key={post._id}>
        <CardActionArea component="a" href={"/view/" + post._id} variant="outlined" >
          <Card sx={{ display: 'flex', m: 1, height: "70px" }} >
            <CardMedia
              component="img"
              sx={{ width: 50, height: 50 }}
              image={post.icon}
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="body2">{post.title}</Typography>
            </CardContent>
          </Card>
        </CardActionArea>
        <Divider />
      </Fragment>
    )
  })

  return (
    <>
      {p}
    </>
  );
}
