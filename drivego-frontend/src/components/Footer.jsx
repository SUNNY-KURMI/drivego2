import { Box, Typography, Container,Grid } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'primary.main', 
        color: 'white',
        mt: 'auto',
        py: 4,
        width:'100%'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              DriveGo
            </Typography>
            <Typography variant="body2">
              Premium driver services at your fingertips
            </Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography variant="h6" gutterBottom>
              Links
            </Typography>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              <Typography variant="body2">Home</Typography>
            </Link>
            <Link to="/drivers" style={{ color: 'white', textDecoration: 'none' }}>
              <Typography variant="body2">Drivers</Typography>
            </Link>
            <Link to="/bookings" style={{ color: 'white', textDecoration: 'none' }}>
              <Typography variant="body2">Bookings</Typography>
            </Link>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <Typography variant="body2">Terms of Service</Typography>
            <Typography variant="body2">Privacy Policy</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2">support@drivego.com</Typography>
            <Typography variant="body2">+91 98765 43210</Typography>
          </Grid>
        </Grid>
        <Box textAlign="center" mt={4}>
          <Typography variant="body2">
            © 2024 DriveGo. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}