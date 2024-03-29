import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import styles from '../styles/Header.module.css'
import { sections, blog_title } from '../lib/params';
import { useState, Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Header() {
  const [search_query, setSearchQuery] = useState("");
  const router = useRouter();

  const search = () => {
    router.push(`/search?q=${search_query}`);
  }
  const onKeyDown = (e: any) => {
    if (e.keyCode == 13) search();
    return true;
  }

  return (
    <Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Button variant="outlined" size="small" href="/user/login">Login</Button>
        <Typography
          component="h1"
          variant="h5"
          color="inherit"
          align="center"
          sx={{ flex: 1, ml: "200px" }}
        >
          <Link href="/">{blog_title}</Link>
        </Typography>

        <Paper
          component="form"
          sx={{ display: 'flex', alignItems: 'center', width: 300 }}
        >
          <InputBase sx={{ ml: 1, flex: 1 }} value={search_query} onKeyDown={onKeyDown} onChange={e => { setSearchQuery(e.target.value) }} placeholder="Search" />
          <IconButton type="button" sx={{ p: '8px' }} aria-label="search" onClick={search}><SearchIcon /></IconButton>
        </Paper>
      </Toolbar>
      <nav className={styles.headermenu}>
        <ul>
          {sections.map((section) => (
            <li key={section.title}>
              <a color="inherit" href={section.url}> {section.title}</a>
              <ul>
                {section.child.map((c) => (
                  <li key={c.url}><a color="inherit" href={c.url}> {c.title}</a></li>
                ))}
              </ul>
            </li>
          ))}

          <li>
            <a color="inherit">Settings</a>
            <ul>
              <li><a color="inherit" href="/user/logout"> Logout</a></li>
              <li><a color="inherit" href="/admin/posts">posts</a></li>
              <li><a color="inherit" href="/admin/users"> User</a></li>
              <li><a color="inherit" href="/admin/dashboard"> Dashboard</a></li>
            </ul>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
}

