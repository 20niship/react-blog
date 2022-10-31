import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Avatar from '@mui/material/Avatar';

import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useRouter } from 'next/router'
export default function Sidebar() {
  const router = useRouter();
  const social = [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ];

  return (
    <>
      <Typography variant="h5" gutterBottom>Blog Title</Typography>
      <Typography variant="caption" display="block" gutterBottom>
        とあるエンジニアのブログです。 #C++ #ROS #MATLAB #Python #Vim #Robotics #AutonomousDriving #ModelPredictiveControl #julialan
      </Typography>

      <Avatar alt="Remy Sharp" src="https://i.imgur.com/CzXTtJV.jpg" />

      <Button variant="outlined" size="small" startIcon={<EmailIcon />}>Contact</Button>
      <Button variant="outlined" size="small" startIcon={<EmailIcon />}>About</Button>
      {social.map((network) => (
        <Link
          display="block"
          variant="body1"
          href="#"
          key={network.name}
          sx={{ mb: 0.5 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <network.icon />
            <span>{network.name}</span>
          </Stack>
        </Link>
      ))}
    </>
  );
}
