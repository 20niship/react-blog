import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import InfoIcon from '@mui/icons-material/Info';
import UpdateIcon from '@mui/icons-material/Update';
import { Page } from '../lib/global'

interface FeaturedPostProps {
  page: Page;
}

export default function FeaturedPost(props: FeaturedPostProps) {
  const { page } = props;
  return (
    <CardActionArea component="a" href={"/view/" + page.id} variant="outlined">
      <Card sx={{ display: 'flex' }} >
        <CardContent sx={{ flex: 1 }}>
          <Typography component="h2" variant="h5">{page.title}</Typography>
          <Chip icon={<InfoIcon />} label={page.update} />
          <Chip icon={<UpdateIcon />} label={page.create} />
          <Typography variant="subtitle1" paragraph>
            {page.context.slice(0, 100)} .......
          </Typography>
          <Typography variant="subtitle1" color="primary">
            Continue reading...
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
          image={page.icon}
          alt={page.title}
        />
      </Card>
    </CardActionArea>
  );
}
