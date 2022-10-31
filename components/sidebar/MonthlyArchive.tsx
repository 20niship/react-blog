import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/router'


export default function Sidebar() {
  const router = useRouter();
  const [archives, setArchives] = useState([]);
  const setup_archives = async () => {
    const r = await fetch("/api/month_stat", {
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
    setup_archives();
  }, []);

  return (
    <>
      <Typography variant="h6" gutterBottom>Archives</Typography>
      <List>
        {
          archives.map(archive => {
            return <ListItemText><Link href={"/search?d=" + archive.month} key={archive.month} >{archive.month + " : " + archive.count + " posts"}</Link></ListItemText>
          })
        }
      </List>
    </>
  );
}
