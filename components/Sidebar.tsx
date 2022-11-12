import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography';
import { Post } from "../lib/global"
import Slideshow from '../components/Slideshow'
import About from './sidebar/about';
import MonthlyArchive from './sidebar/MonthlyArchive';
import SmallList from './sidebar/SmallList';
import Tags from './sidebar/Tags';

const method = "POST";
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

export default function Sidebar() {
  const [latest, setLatest] = useState<Post[]>([]);
  const [favorites, setFavorites] = useState<Post[]>([]);

  const setup = async () => {
    {
      const r = await fetch("/api/search", { method, headers, body: JSON.stringify({ is_short: true, sort: "latest" }) });
      if (!r.ok) return;
      const js = await r.json();
      setLatest(js.posts)
    }
    {
      const r = await fetch("/api/search", { method, headers, body: JSON.stringify({ is_short: true, sort: "lgbt" }) });
      if (!r.ok) return;
      const js = await r.json();
      setLatest(js.posts)
    }
  }
  useEffect(() => { setup(); }, []);

  const images = [
    "https://i.imgur.com/CzXTtJV.jpg",
    "https://i.imgur.com/OB0y6MR.jpg",
    "https://farm2.staticflickr.com/1533/26541536141_41abe98db3_z_d.jpg",
  ]

  return (
    <>
      <Paper elevation={5} sx={{ borderRadius: 1, mt: 2, p: 1, mb: 2 }}>
        <About />
      </Paper>
      <Slideshow sec={5000} images={images} />

      <Paper elevation={5} sx={{ borderRadius: 1, mt: 2, p: 1 }}>
        <MonthlyArchive />
      </Paper>

      <Paper elevation={5} sx={{ borderRadius: 1, mt: 2, p: 1 }}>
        <Tags />
      </Paper>

      <Paper elevation={5} sx={{ borderRadius: 1, mt: 2, p: 1 }}>
        <Typography variant="h6" gutterBottom>Latests</Typography>
        <SmallList posts={latest} />
      </Paper>

      <Paper elevation={3} >
      </Paper>
    </>
  );
}
