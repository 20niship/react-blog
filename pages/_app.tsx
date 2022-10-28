import '../styles/globals.css'
import type { AppProps } from 'next/app'
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FixedNavButtons from '../components/FixedNavButtons';
import styles from '../styles/Home.module.css'

const theme = createTheme({
  palette: {
    // primary: blue,
    mode: "dark"
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <Header />
        <Component {...pageProps} />
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

export default MyApp
