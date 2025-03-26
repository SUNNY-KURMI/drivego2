import { AppBar, Toolbar, Button, Typography, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';

export default function Header() {
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" sx={{ 
      background: 'linear-gradient(45deg, #2A2D72 0%, #1A1D4A 100%)',
      boxShadow: 3
    }}>
      <Toolbar>
        {/* Logo (Non-clickable) */}
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            fontFamily: 'Inter',
            fontWeight: 700,
            fontSize: '1.5rem'
          }}
        >
          DriveGo
        </Typography>

        {/* Navigation Buttons */}
        <Button 
          color="inherit" 
          startIcon={<HomeIcon />}
          onClick={() => navigate('/')}
          sx={{
            mx: 1,
            '&:hover': {
              background: 'rgba(255,255,255,0.1)'
            }
          }}
        >
          Home
        </Button>
        
        <Button 
          color="inherit"
          onClick={() => navigate('/drivers')}
          sx={{ mx: 1 }}
        >
          Drivers
        </Button>
        <Button 
          color="inherit"
          onClick={() => navigate('/bookings')}
          sx={{ mx: 1 }}
        >
          Bookings
        </Button>
        <Button 
          variant="outlined" 
          color="inherit"
          onClick={() => navigate('/login')}
          sx={{ 
            mx: 1,
            borderRadius: '20px',
            borderWidth: 2,
            '&:hover': { borderWidth: 2 }
          }}
        >
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
}