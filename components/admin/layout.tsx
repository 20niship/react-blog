import { useState } from 'react';
import { Box } from '@mui/material';
// import { DashboardNavbar } from './navbar';
import { DashboardSidebar } from './sidebar';

//  <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />

export default function({ children }) {
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
        <DashboardSidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
      </Box>
    </>
  );
};
