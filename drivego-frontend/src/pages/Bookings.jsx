import { useState } from 'react';
import { 
  Box,
  Typography,
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';

export default function BookingForm({ driver }) {
  const [bookingType, setBookingType] = useState('hourly');
  const [hours, setHours] = useState(4);

  const calculateTotal = () => {
    if (!driver) return 0;
    return bookingType === 'hourly' 
      ? (driver.hourlyRate || 0) * hours
      : (driver.weeklyRate || 0);
  };

  if (!driver) {
    return (
      <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Driver information not available
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, border: '1px solid #ddd', borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>
        Book {driver?.name || 'Unknown Driver'}
      </Typography>
      
      <RadioGroup 
        value={bookingType} 
        onChange={(e) => setBookingType(e.target.value)}
        sx={{ mb: 2 }}
      >
        <FormControlLabel 
          value="hourly" 
          control={<Radio />} 
          label={`Hourly Booking (₹${driver.hourlyRate}/hr)`} 
        />
        <FormControlLabel 
          value="weekly" 
          control={<Radio />} 
          label={`Weekly Booking (₹${driver.weeklyRate}/week)`} 
        />
      </RadioGroup>

      {bookingType === 'hourly' && (
        <TextField
          label="Hours"
          type="number"
          value={hours}
          onChange={(e) => setHours(Math.max(3, Number(e.target.value)))}
          fullWidth
          sx={{ mb: 2 }}
          inputProps={{ min: 3 }}
        />
      )}

      <Typography variant="h6" gutterBottom>
        Total: ₹{calculateTotal()}
      </Typography>

      <Button 
        variant="contained" 
        size="large" 
        fullWidth
        sx={{ mt: 2 }}
      >
        Confirm Booking
      </Button>
    </Box>
  );
}