import { useEffect } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Box, ListItem, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import Paper from '@mui/material/Paper';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ChartBarIcon from '@mui/icons-material/BarChart'
import CogIcon from '@mui/icons-material/Settings'
import LockIcon from '@mui/icons-material/Lock'
import SelectorIcon from '@mui/icons-material/SelectAll'
import UsersIcon from '@mui/icons-material/VerifiedUserRounded'
import UserAdd from '@mui/icons-material/VerifiedUser'
import CrossIcon from '@mui/icons-material/CropSquareSharp'

const items = [
  {
    href: '/',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Dashboard'
  },
  {
    href: '/account',
    icon: (<UsersIcon fontSize="small" />),
    title: 'Account'
  },
  {
    href: '/settings',
    icon: (<CogIcon fontSize="small" />),
    title: 'Settings'
  },
  {
    href: '/login',
    icon: (<LockIcon fontSize="small" />),
    title: 'Login'
  },
  {
    href: '/404',
    icon: (<CrossIcon fontSize="small" />),
    title: 'Error'
  }
];

type Props = {
  onClose: Function,
  open: Function
};

export const DashboardSidebar = (props: Props) => {
  const { open, onClose } = props;
  const router = useRouter();
  return (
    <Paper elevation={4} sx={{ p: 3 }}>
      <div>
        <Typography color="inherit" variant="h6">Acme Inc</Typography>
        <Typography color="neutral" variant="body2">Your tier{' '}: Premium</Typography>
      </div>
      <Divider />
      <Box sx={{ flexGrow: 1 }}>
        {items.map((item) => (
          <ListItem
            disableGutters
            key={item.title}
            sx={{
              display: 'flex',
              mb: 0.5,
              py: 0,
              px: 2
            }}
          >
            <NextLink href={item.href} passHref>
              <Button component="a" startIcon={item.icon} disableRipple>
                <Box sx={{ flexGrow: 1 }}>{item.title}</Box>
              </Button>
            </NextLink>
          </ListItem>
        ))}
      </Box>
      <Divider sx={{ borderColor: '#2D3748' }} />
      <NextLink href="https://material-kit-pro-react.devias.io/" passHref>
        <Button variant="outlined" component="a" endIcon={(<OpenInNewIcon />)} fullWidth variant="contained">
          Pro Live Preview
        </Button>
      </NextLink>
    </Paper >
  );
};

