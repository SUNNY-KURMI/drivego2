// src/components/DriverCard.jsx
import { 
    Card, 
    CardContent, 
    CardMedia, 
    Typography, 
    Button, 
    Rating, 
    Avatar,
    Box,
    Chip
  } from '@mui/material';
  import { Star } from '@mui/icons-material';
  
  export default function DriverCard({ driver }) {
    return (
      <Card sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)'
        }
      }}>
        <CardMedia
          component="img"
          height="200"
          image={driver.image}
          alt={driver.name}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5">
            {driver.name}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Rating 
              value={driver.rating} 
              precision={0.1} 
              readOnly 
              emptyIcon={<Star style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            <Typography variant="body2" sx={{ ml: 1 }}>
              ({driver.reviews.length} reviews)
            </Typography>
          </Box>
  
          <Box sx={{ mb: 2 }}>
            {driver.languages.map(lang => (
              <Chip 
                key={lang}
                label={lang} 
                size="small" 
                sx={{ mr: 1, mb: 1 }} 
              />
            ))}
          </Box>
  
          <Typography variant="body2" color="text.secondary">
            Experience: {driver.experience}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Car: {driver.carModel}
          </Typography>
          <Typography variant="h6" sx={{ mt: 1 }}>
            ₹{driver.hourlyRate}/hour
          </Typography>
  
          {/* Reviews Section */}
          <Box sx={{ mt: 2, borderTop: 1, borderColor: 'divider', pt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Recent Reviews:
            </Typography>
            {driver.reviews.map((review, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                  <Avatar sx={{ width: 24, height: 24, mr: 1 }}>
                    {review.user[0]}
                  </Avatar>
                  <Typography variant="body2">{review.user}</Typography>
                </Box>
                <Rating 
                  value={review.rating} 
                  size="small" 
                  readOnly 
                  precision={0.5}
                />
                <Typography variant="body2" color="text.secondary">
                  {review.comment}
                </Typography>
                <Typography variant="h5" color="primary">
                {filters.bookingType === 'hourly' ? driver.price : driver.weeklyRate}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
        <Button 
          variant="contained" 
          fullWidth 
          sx={{ mt: 'auto', borderRadius: 0 }}
        >
          Book Now
        </Button>
      </Card>
    );
  }