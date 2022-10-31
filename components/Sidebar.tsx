import * as React from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import TagIcon from '@mui/icons-material/Tag';
import { useEffect, useState } from 'react';

import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import Slideshow from '../components/Slideshow'

export default function Sidebar() {
  const social = [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ];

  const [tags, setTags] = useState([]);
  const [archives, setArchives] = useState([]);

  const setup_tags = async () => {
    const r = await fetch("/api/all_tags", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    if (!r.ok) return;
    const js = await r.json();
    setTags(js.tags)
  }

  const setup_archives = async () => {
    const r = await fetch("/api/archives", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    if (!r.ok) return;
    const js = await r.json();
    setArchives(js.stats);
  }

  useEffect(() => {
    setup_tags();
    setup_archives();
  }, []);

  const images = [
    "https://i.imgur.com/CzXTtJV.jpg",
    "https://i.imgur.com/OB0y6MR.jpg",
    "https://farm2.staticflickr.com/1533/26541536141_41abe98db3_z_d.jpg",
  ]

  return (
    <>
      <div className="App">
        <Slideshow sec={5000} images={images} />
      </div>

      <Paper elevation={5} sx={{ borderRadius: 1, mt: 2, p: 1 }}>
        <Typography variant="h6" gutterBottom>Archives</Typography>
        <List>
          {
            archives.map(archive => {
              return <ListItemText><Link href={"/search?d=" + archive.month} key={archive.month} >{archive.month + " : " + archive.count + " posts"}</Link></ListItemText>
            })
          }
        </List>
      </Paper>

      <Paper elevation={5} sx={{ borderRadius: 1, mt: 2, p: 1 }}>
        <Typography variant="h6" gutterBottom>Category</Typography>
        {
          tags.map(tag => {
            return <Chip icon={<TagIcon />} label={tag} key={tag} size="small" />
          })
        }
      </Paper>

      <Paper elevation={3} >
        <Typography variant="h6" gutterBottom>Social</Typography>
        {social.map((network) => (
          <Link
            display="block"
            variant="body1"
            href="#"
            key={network.name}
            sx={{ mb: 0.5 }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <network.icon />
              <span>{network.name}</span>
            </Stack>
          </Link>
        ))}
      </Paper>
    </>
  );
}
