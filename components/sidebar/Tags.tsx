import * as React from 'react';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import TagIcon from '@mui/icons-material/Tag';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'

export default function Sidebar() {
  const router = useRouter();
  const [tags, setTags] = useState([]);
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

  useEffect(() => {
    setup_tags();
  }, []);

  return (
    <>
      <Typography variant="h6" gutterBottom>Category</Typography>
      {
        tags.map(tag => {
          return <Chip icon={<TagIcon />} label={tag} key={tag} onClick={() => { router.push("/search?t=" + tag); }} size="small" />
        })
      }
    </>
  );
}
