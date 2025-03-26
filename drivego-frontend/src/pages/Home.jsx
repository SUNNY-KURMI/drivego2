// Home.jsx
import { useEffect } from 'react';
import { 
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  styled,
  useTheme
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { 
  DirectionsCar,
  EmojiPeople,
  AccessTime,
  Star,
  LocalTaxi
} from '@mui/icons-material';
import { keyframes } from '@emotion/react';

// Custom animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const StyledHero = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: 'white',
  borderRadius: '40px',
  padding: theme.spacing(8),
  margin: theme.spacing(4, 0),
  boxShadow: theme.shadows[10],
  position: 'relative',
  overflow: 'hidden'
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: theme.shadows[8]
  }
}));

export default function Home() {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    { icon: <DirectionsCar sx={{ fontSize: 50 }} />, 
      title: "Multiple Vehicle Options", 
      text: "Choose from luxury sedans, SUVs, and premium cars" },
    { icon: <EmojiPeople sx={{ fontSize: 50 }} />, 
      title: "Verified Drivers", 
      text: "All drivers undergo strict background checks" },
    { icon: <AccessTime sx={{ fontSize: 50 }} />, 
      title: "24/7 Availability", 
      text: "Book anytime, anywhere with our instant service" },
    { icon: <Star sx={{ fontSize: 50 }} />, 
      title: "Premium Service", 
      text: "Rated 4.9/5 by thousands of customers" }
  ];

  return (
    <Container maxWidth="xl">
      {/* Hero Section */}
      <StyledHero>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h2" 
              gutterBottom
              sx={{ fontWeight: 700, lineHeight: 1.2 }}
            >
              Premium Driver Services
              <br />
              <Box component="span" sx={{ color: theme.palette.secondary.light }}>
                On Demand
              </Box>
            </Typography>
            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
              Book professional drivers by hour or week. Safe, reliable, and luxury travel.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              endIcon={<LocalTaxi />}
              sx={{ 
                borderRadius: '50px',
                px: 6,
                py: 1.5,
                fontSize: '1.1rem',
                mr: 2
              }}
              onClick={() => navigate('/drivers')}
            >
              Book Now
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              sx={{ 
                borderRadius: '50px',
                px: 6,
                py: 1.5,
                fontSize: '1.1rem'
              }}
              onClick={() => navigate('/login')}
            >
              Become a Driver
            </Button>
          </Grid>
          <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
            <img 
              src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJpdmVyfGVufDB8fDB8fHww" 
              alt="Luxury Car" 
              style={{ 
                width: '100%', 
                maxWidth: 600,
                borderRadius: '15px', // Rounded corners
                border: '1.75px solid rgb(246, 246, 246)', // Blue border
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)', // Soft shadow
                animation: `${float} 6s ease-in-out infinite`,
            
              }}
            />
          </Grid>
        </Grid>
      </StyledHero>

      {/* Features Section */}
      <Box sx={{ my: 10 }}>
        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          Why Choose DriveGo?
        </Typography>
        <Grid container spacing={4} sx={{ mt: 4 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <FeatureCard>
                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                  <Box sx={{ 
                    color: theme.palette.primary.main,
                    mb: 2
                  }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.text}
                  </Typography>
                </CardContent>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Pricing Section */}
      <Box sx={{ 
        background: theme.palette.background.paper,
        py: 8,
        borderRadius: '40px',
        boxShadow: theme.shadows[3]
      }}>
        <Container maxWidth="md">
          <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 700 }}>
            Flexible Pricing Plans
          </Typography>
          <Grid container spacing={6} sx={{ mt: 4 }}>
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                p: 4,
                border: `3px solid ${theme.palette.primary.main}`,
                borderRadius: '30px'
              }}>
                <Typography variant="h4" gutterBottom>
                  Hourly Service
                </Typography>
                <Typography variant="h2" color="primary" gutterBottom>
                  ₹299<span style={{ fontSize: '1rem' }}>/hour</span>
                </Typography>
                <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                  <li style={{ marginBottom: 8 }}>✓ Minimum 3 hours</li>
                  <li style={{ marginBottom: 8 }}>✓ Free cancellation</li>
                  <li style={{ marginBottom: 8 }}>✓ Fuel included</li>
                </ul>
                <Button 
                  variant="contained" 
                  fullWidth 
                  sx={{ mt: 2, borderRadius: '20px' }}
                >
                  Book Hourly
                </Button>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card sx={{ 
                p: 4,
                border: `3px solid ${theme.palette.secondary.main}`,
                borderRadius: '30px'
              }}>
                <Typography variant="h4" gutterBottom>
                  Weekly Service
                </Typography>
                <Typography variant="h2" color="secondary" gutterBottom>
                  ₹15,999<span style={{ fontSize: '1rem' }}>/week</span>
                </Typography>
                <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                  <li style={{ marginBottom: 8 }}>✓ 7 days package</li>
                  <li style={{ marginBottom: 8 }}>✓ 12 hours daily</li>
                  <li style={{ marginBottom: 8 }}>✓ Dedicated driver</li>
                </ul>
                <Button 
                  variant="contained" 
                  color="secondary"
                  fullWidth 
                  sx={{ mt: 2, borderRadius: '20px' }}
                >
                  Book Weekly
                </Button>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box sx={{ 
        my: 10,
        background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
        color: 'white',
        borderRadius: '40px',
        py: 8
      }}>
        <Container maxWidth="md">
          <Grid container spacing={6} textAlign="center">
            <Grid item xs={6} md={3}>
              <Typography variant="h2" sx={{ fontWeight: 700 }}>5K+</Typography>
              <Typography>Happy Customers</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h2" sx={{ fontWeight: 700 }}>200+</Typography>
              <Typography>Verified Drivers</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h2" sx={{ fontWeight: 700 }}>50K+</Typography>
              <Typography>Hours Booked</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h2" sx={{ fontWeight: 700 }}>4.9★</Typography>
              <Typography>Average Rating</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ textAlign: 'center', my: 10 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
          Ready for Your Premium Ride?
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Download our app for exclusive offers and instant bookings
        </Typography>
        <Button 
          variant="contained" 
          color="secondary" 
          size="large"
          sx={{ 
            px: 6,
            py: 1.5,
            fontSize: '1.1rem',
            borderRadius: '30px'
          }}
        >
          Get Mobile App
        </Button>
      </Box>
    </Container>
  );
}