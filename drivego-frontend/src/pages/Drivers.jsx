// src/pages/Drivers.jsx
import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import TranslateIcon from '@mui/icons-material/Translate';

// Material-UI
import { Button } from '@mui/material';
import { 
  Container,
  Grid,
  Typography,
  TextField,
  Card,
  CardContent,
  Rating,
  Avatar,
  Chip,
  Box,
  Stack,
  Tabs,
  Tab,
  Skeleton,
  Switch,
  FormControlLabel
} from '@mui/material';
import { 
  Star, 
  AccessTime, 
  DirectionsCar, 
  Language, 
  Person,
  Woman,
  Diamond
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Styled Components
const SearchField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '30px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[2]
  }
}));

const DriverCard = styled(Card)(({ theme }) => ({
  borderRadius: '20px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8]
  }
}));

const RatingBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  left: 16,
  background: theme.palette.primary.main,
  color: 'white',
  padding: theme.spacing(0.5, 2),
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: 4
}));

// Sample data
const drivers = [
  {
    id: 1,
    name: 'Aarav Sharma',
    experience: '3 years',
    rating: 4.9,
    price: '₹499/hr',
    image: '/assets/images/driver1.jpg',
    languages: ['English', 'Hindi', 'Gujarati'],
    badges: ['Premium'],
    weeklyAvailable: true,
    weeklyRate: '₹15,000/week',
  },
  {
    id: 2,
    name: 'Priya Patel',
    rating: 4.7,
    experience: '4 years',
    price: '₹399/hr',
    image: '/assets/images/driver2.jpg',
    languages: ['English', 'Hindi', 'Gujarati', 'Marathi'],
    badges: ['Female Driver','Premium'],
  },
  {
    id: 3,
    name: 'Rahul Singh',
    rating: 4.8,
    experience: '6 years',
    price: '₹599/hr',
    image: '/assets/images/driver3.jpg',
    languages: ['English', 'Hindi', 'Punjabi'],
    weeklyAvailable: true,
  },
  {
    id: 4,
    name: 'Anika Gupta',
    rating: 4.9,
    experience: '8 years',
    price: '₹899/hr',
    image: '/assets/images/driver4.jpg',
    languages: ['English', 'Hindi', 'Bengali'],
    badges: ['Female Driver','Premium']
  },
  {
    id: 5,
    name: 'Vikram Joshi',
    rating: 4.6,
    experience: '5 years',
    car: 'Tata Harrier',
    price: '₹449/hr',
    image: '/assets/images/driver5.jpg',
    languages: ['English', 'Hindi', 'Marathi'],
    weeklyAvailable: true,
  },
  {
    id: 6,
    name: 'Soham Reddy',
    rating: 4.9,
    experience: '7 years',
    price: '₹549/hr',
    image: '/assets/images/driver6.jpg',
    languages: ['English', 'Hindi', 'Telugu'],
    badges: ['Premium']
  },
  {
    id: 7,
    name: 'Arjun Malhotra',
    rating: 4.8,
    reviews: 132,
    experience: '6 years',
    car: 'Honda City Hybrid',
    price: '₹699/hr',
    image: '/assets/images/driver7.jpg',
    languages: ['English', 'Hindi', 'Tamil'],
  },

  {
    id: 8,
    name: 'Nandini Iyer',
    rating: 4.85,
    experience: '5 years',
    price: '₹649/hr',
    image: '/assets/images/driver8.jpg',
    languages: ['English', 'Hindi', 'Kannada', 'Tamil'],
    badges: ['Female Driver', 'MPV Specialist'],
    weeklyAvailable: true,
  },
  {
    id:9,
    name: 'Kavita Choudhury',
    rating: 4.75,
    experience: '4 years',
    price: '₹549/hr',
    image: '/assets/images/driver9.jpg',
    languages: ['English', 'Hindi', 'Bengali', 'Malayalam'],
    badges: ['Female Driver','Premium']
  }
  
];

// Update the Drivers component
export default function Drivers() {
    const [searchTerm, setSearchTerm] = useState('');
    const [tabValue, setTabValue] = useState(0);
    const [selectedDateTime, setSelectedDateTime] = useState(dayjs().add(1, 'hour'));
    const [pickupLocation, setPickupLocation] = useState('');
    const [dropLocation, setDropLocation] = useState('');
    const [filters, setFilters] = useState({
      minRating: 0,
      availableNow: false,
      vehicleType: 'all',
      bookingType: 'all',
      femaleOnly: false,
      language: 'all',
    });

    
    

 // Extract unique languages from drivers
 const allLanguages = drivers.reduce((acc, driver) => {
    driver.languages.forEach(lang => acc.add(lang));
    return acc;
  }, new Set());
  const uniqueLanguages = ['all', ...Array.from(allLanguages)].sort();

  
 // Availability check
 const checkDriverAvailability = (driver, dateTime) => {
    const hour = dayjs(dateTime).hour();
    if (driver.badges?.includes('Premium')) {
      return hour >= 6 && hour <= 22;
    }
    return true;
  };

  

   // Filtered drivers list
   const filteredDrivers = drivers.filter(driver => {
    // Safe search term handling
    const searchTermLower = searchTerm?.toLowerCase() || '';
  
    // Safe property access with fallbacks
    const driverName = driver?.name?.toLowerCase() || '';
    const driverCar = driver?.car?.toLowerCase() || '';
  
    const matchesSearch = driverName.includes(searchTermLower) || 
                         driverCar.includes(searchTermLower);
    
    const matchesVehicleType = 
      filters.vehicleType === 'all' ||
      (filters.vehicleType === 'luxury' && driver.badges?.includes('Premium')) ||
      (filters.vehicleType === 'ordinary' && !driver.badges?.includes('Premium'));

      const matchesBookingType = 
      filters.bookingType === 'all' || // Show all drivers
      (filters.bookingType === 'hourly' && driver.hourlyAvailable) || 
      (filters.bookingType === 'weekly' && driver.weeklyAvailable);
    

    const isAvailableAtTime = checkDriverAvailability(driver, selectedDateTime);

    const matchesLanguage = filters.language === 'all' || 
                            driver.languages.includes(filters.language);
      
      return matchesSearch && matchesVehicleType && matchesBookingType && 
             isAvailableAtTime && matchesLanguage;

  });


  
    // Update filter handling
    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({ ...prev, [filterName]: value }));
      };

   // Update the UI
   return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="xl" sx={{ py: 6 }}>
        {/* Header Section */}
        <Box textAlign="center" mb={8}>
          <Typography variant="h3" sx={{ 
            fontWeight: 700,
            mb: 2,
            background: 'linear-gradient(45deg, #2A2D72 0%, #FF6B6B 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Book Your Professional Driver
          </Typography>
        </Box>

          {/* Search and Filters */}
          <Box sx={{ mb: 6 }}>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} md={3}>
                <DateTimePicker
                  label="Pickup Date & Time"
                  value={selectedDateTime}
                  onChange={setSelectedDateTime}
                  minDateTime={dayjs().add(1, 'hour')}
                  disablePast
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Booking Type</InputLabel>
                  <Select
                    value={filters.bookingType}
                    label="Booking Type"
                    onChange={(e) => handleFilterChange('bookingType', e.target.value)}
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="hourly">Hourly</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Vehicle Type</InputLabel>
                  <Select
                    value={filters.vehicleType}
                    label="Vehicle Type"
                    onChange={(e) => handleFilterChange('vehicleType', e.target.value)}
                  >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="luxury">Luxury</MenuItem>
                    <MenuItem value="ordinary">Ordinary</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

            <Grid item xs={12} md={2}>
            <FormControl fullWidth>
                <InputLabel><TranslateIcon sx={{ fontSize: 16, mr: 1 }} />Language</InputLabel>
                <Select
                value={filters.language}
                label="Language"
                onChange={(e) => handleFilterChange('language', e.target.value)}
                >
                {uniqueLanguages.map(lang => (
                <MenuItem key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
                 </MenuItem>
                ))}
                </Select>
                </FormControl>
            </Grid>
              
              <Grid item xs={12} md={3}>
                <SearchField
                  variant="outlined"
                  placeholder="Search drivers..."
                  fullWidth
                  InputProps={{
                    startAdornment: <Person sx={{ mr: 1, color: 'action.active' }} />
                  }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Grid>
            </Grid>

            {/* Additional Filters */}
            <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', gap: 2 }}>
        
              <FormControlLabel
                control={
                  <Switch
                    checked={filters.minRating >= 4.5}
                    onChange={(e) => handleFilterChange('minRating', e.target.checked ? 4.5 : 0)}
                  />
                }
                label="4.5+ Rating"
              />
            </Stack>
          </Box>
    

      {/* Drivers Grid */}
      <Grid container spacing={4}>
      {filteredDrivers.map((driver) => (
          <Grid item xs={12} sm={6} md={4} key={driver.id}>
            <DriverCard>
              <Box sx={{ position: 'relative' }}>
                <Box
                  component="img"
                  src={driver.image}
                  alt={driver.name}
                  sx={{
                    width: '100%',
                    height: 280,
                    objectFit: 'cover',
                    borderTopLeftRadius: '20px',
                    borderTopRightRadius: '20px'
                  }}
                />
                <RatingBadge>
                  <Star sx={{ fontSize: 18 }} />
                  <Typography variant="body2">
                    {driver.rating}
                  </Typography>
                </RatingBadge>
                {driver.available && (
                  <Chip
                    label="Available Now"
                    color="success"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16
                    }}
                  />
                )}
              </Box>

              {/* No results message */}
      {filteredDrivers.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" color="text.secondary">
            No drivers found matching your criteria
          </Typography>
           </Box>
          )}

              <CardContent>
              <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ 
              fontWeight: 700,
              color: 'text.primary',
              letterSpacing: 0.5,
                mb: 2
             }}
             >
            {driver.name}
        </Typography>
        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                  <Chip
                    icon={<AccessTime />}
                    label={driver.experience}
                    size="small"
                    variant="outlined"
                  />
         </Stack>
               {selectedDateTime && (
                    <Chip
                      label={`${checkDriverAvailability(driver, selectedDateTime) ? 'Available' : 'Not Available'} at ${selectedDateTime.format('h:mm A')}`}
                      color={checkDriverAvailability(driver, selectedDateTime) ? 'success' : 'error'}
                      size="small"
                      sx={{ mb: 2 }}
                    />
                  )}
                  {/* Add locations served */}
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    {driver.locations?.map((location) => (
                      <Chip
                        key={location }
                        label={location}
                        
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    ))}
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    {driver.languages.map((lang) => (
                        <Chip
                        key={lang}
                        label={lang}
                        size="small"
                        icon={<Language />}
                        sx={{ 
                        backgroundColor: theme => 
                        lang === filters.language ? 
                        theme.palette.primary.light : 'inherit'
                        }}
                         />
                        ))}
                    </Stack>

                <Box sx={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <Typography variant="h5" color="primary">
                    {driver.price}
                  </Typography>
                  
                  <Button 
                    variant="contained" 
                    color="primary"
                    sx={{ borderRadius: '15px' }}
                  >
                    Book Now
                  </Button>
                </Box>
              </CardContent>
            </DriverCard>
          </Grid>
        ))}
      </Grid>

      {/* Loading Skeletons */}
      {!drivers.length && (
        <Grid container spacing={4}>
          {[1, 2, 3].map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item}>
              <Skeleton variant="rectangular" height={280} />
              <Skeleton variant="text" height={60} />
              <Skeleton variant="text" height={40} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
    </LocalizationProvider>
  );
}