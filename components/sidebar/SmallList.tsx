import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import { Page } from '../../lib/global'

interface Props {
  pages: Page[];
}

export default function FeaturedPost(props: Props) {
  const { pages } = props;
  const p = pages.map(page => {
    return (
      <>
        <CardActionArea component="a" href={"/view/" + page.id} variant="outlined" >
          <Card sx={{ display: 'flex', m: 1, height: "70px" }} >
            <CardMedia
              component="img"
              sx={{ width: 50, height:50}}
              image={page.icon}
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="body2">{page.title}</Typography>
            </CardContent>
          </Card>
        </CardActionArea>
        <Divider />
      </>
    )
  })

  return (
    <>
      {p}
    </>
  );
}
