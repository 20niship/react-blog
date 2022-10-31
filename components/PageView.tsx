import * as React from 'react';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import InfoIcon from '@mui/icons-material/Info';
import UpdateIcon from '@mui/icons-material/Update';
import { Page } from '../lib/global'
import md2html from '../lib/utils/md';

interface PageViewProps {
  page: Page;
}

export default function PageView(props: PageViewProps) {
  const { page } = props;
  return (
    <>
      <link rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/styles/default.min.css" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.2/styles/a11y-dark.min.css" />
      <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.6.0/highlight.min.js"></script>
      <script>hljs.initHighlightingOnLoad();</script>

      <Typography component="h2" variant="h5">
        {page.title}
      </Typography>
      <Chip icon={<InfoIcon />} label={page.update} />
      <Chip icon={<UpdateIcon />} label={page.create} />
      <div dangerouslySetInnerHTML={{ __html: md2html(page.context) }} />
    </>
  );
}
