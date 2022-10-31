import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import styles from '../styles/Header.module.css'
import { sections, blog_title } from '../lib/params';
import Link from 'next/link';

export default function Header() {
  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Button size="small">Subscribe</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1, ml: "300px" }}
        >
          <Link href="/">{blog_title}</Link>
        </Typography>

        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search Google Maps"
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search"><SearchIcon /></IconButton>
        </Paper>

        <Button variant="outlined" size="small">
          Sign up
        </Button>
      </Toolbar>
      <nav className={styles.headermenu}>
        <ul>
          {sections.map((section) => (
            <li key={section.title}>
              <a color="inherit" href={section.url}> {section.title}</a>
              <ul>
                {section.child.map((c) => (
                  <li><a color="inherit" href={c.url}> {c.title}</a></li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </React.Fragment>
  );
}

