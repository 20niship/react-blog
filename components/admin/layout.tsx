
import { useState } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
// import { DashboardNavbar } from './navbar';
import { DashboardSidebar } from './sidebar';

export const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          flexDirection: 'column',
          width: '100%'
        }}
      >
        {children}
      </Box>
  //    <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      <DashboardSidebar
        onClose={() => setSidebarOpen(false)}
        open={isSidebarOpen}
      />
    </>
  );
};
