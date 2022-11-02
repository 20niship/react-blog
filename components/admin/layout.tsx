import { Grid, Box } from '@mui/material';
import Header from '../Header';
import Footer from '../Footer';

// import { DashboardNavbar } from './navbar';
import { DashboardSidebar } from './sidebar';
import { BlankLayout } from '../Layouts'

//  <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />

export default function({ children }) {
  return (
    <BlankLayout >
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <DashboardSidebar />
        </Grid>
        <Grid item xs>
          {children}
        </Grid>
      </Grid>
      <Footer />
    </BlankLayout>
  );
};
