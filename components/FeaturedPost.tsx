import * as React from 'react';
import Typography from '@mui/material/Typography';
import TagIcon from '@mui/icons-material/Tag';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import InfoIcon from '@mui/icons-material/Info';
import UpdateIcon from '@mui/icons-material/Update';
import { useRouter } from 'next/router'

import { Post} from '../lib/global'

interface FeaturedPostProps {
  post: Post;
}

export default function FeaturedPost(props: FeaturedPostProps) {
  const { post } = props;
  const router = useRouter();
  return (
    <CardActionArea component="a" href={"/view/" + post._id} variant="outlined">
      <Card sx={{ display: 'flex', m: 2, height: 170 }} elevation={3}>
        <CardMedia
          component="img"
          sx={{ width: 140 }}
          image={post.icon}
          alt={post.title}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h6">{post.title}</Typography>
          <Chip icon={<InfoIcon />} label={post.update as string} />
          <Chip icon={<UpdateIcon />} label={post.create as string} />
          {
            post.tags.map(tag => {
              return <Chip icon={<TagIcon />} label={tag} key={tag} onClick={() => { router.push("/search?t=" + tag); }} size="small" />
            })
          }
          <Typography variant="body1" paragraph color="gray">
            {post.context.slice(0, 300)} .......
          </Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
}

