import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Chip, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import InfoIcon from '@mui/icons-material/Info';
import UpdateIcon from '@mui/icons-material/Update';
import { Post } from '../lib/global'
import md2html from '../lib/utils/md';
import { useRouter } from 'next/router';
import Tags from './Tags'

interface PageViewProps {
  post: Post;
}

export default function PageView(props: PageViewProps) {
  const { post } = props;
  const router = useRouter();
  const edit = () => {
    router.push(`/edit/${post._id}`);
  }
  return (
    <>
      <link rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/default.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/styles/a11y-dark.min.css" />
      <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js"></script>
      <script>hljs.initHighlightingOnLoad();</script>

      <Typography component="h2" variant="h4" sx={{ m: 1, p: 1 }}>
        {post.title}
        <Button onClick={edit} variant="outlined">Edit</Button>
      </Typography>
      <Chip icon={<InfoIcon />} label={post.update as string} />
      <Chip icon={<UpdateIcon />} label={post.create as string} />
      <Tags tags={post.tags} />
      <Paper elevation={2} sx={{ borderRadius: 1, mt: 2, p: 1 }}>
        <div dangerouslySetInnerHTML={{ __html: md2html(post.context) }} />
      </Paper>
    </>
  );
}
