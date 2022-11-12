import * as React from 'react';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Tags from '../Tags';

export default function Sidebar() {
  const [tags, setTags] = useState([]);
  const setup_tags = async () => {
    const r = await fetch("/api/util/all_tags", {
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
      <Tags tags={tags} size="small" />
    </>
  );
}
