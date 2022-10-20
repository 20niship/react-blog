import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';

import styles from '../styles/Header.module.css'

interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
    child: ReadonlyArray<{
      title: string;
      url: string;
    }>
  }>;
  title: string;
}

export default function Header(props: HeaderProps) {
  const { sections, title } = props;

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
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
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

