import type { AppProps } from 'next/app'
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import Footer from './Footer';
import FixedNavButtons from './FixedNavButtons';
import styles from '../styles/Home.module.css'
import Grid from '@mui/material/Grid';
import Sidebar from './Sidebar';

const theme = createTheme({
  palette: {
    // primary: blue,
    mode: "dark"
  },

  //https://www.ultra-noob.com/blog/2021/58/
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        ::-webkit-scrollbar{
            width: 15px;
        },
        ::-webkit-scrollbar-thumb {
            background-color: #276976;
            border-radius: 10px;
        }
        `
    },
  },
});

export function NoSidebarLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <Header />
        {children}
      </Container>
      <div className={styles.smartphone_only} >
        <FixedNavButtons />
      </div>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}

export function BlankLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export function DefaultLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <Header />
        <Grid container spacing={2} sx={{ maxWidth: 'xl' }}>
          <Grid item xs={9}>
            {children}
          </Grid>
          <Grid item xs={3} className={styles.pc_only}>
            <Sidebar />
          </Grid>
        </Grid>
      </Container>
      <div className={styles.smartphone_only} >
        <FixedNavButtons />
      </div>
      <Footer
        title="Footer"
        description="Something here to give the footer a purpose!"
      />
    </ThemeProvider>
  );
}



