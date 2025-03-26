// src/components/AuthLayout.jsx (Common Layout)
import { motion } from 'framer-motion';
import { Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const AuthContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
}));

export const AuthCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '30px',
  boxShadow: theme.shadows[10],
  padding: theme.spacing(6),
  width: '100%',
  maxWidth: 500,
  margin: '0 auto',
  position: 'relative',
  overflow: 'hidden',
}));

export const AuthHeader = ({ title, icon }) => (
  <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
    <Box textAlign="center" mb={4}>
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        {icon}
      </motion.div>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 700,
          background: 'linear-gradient(45deg, #2A2D72 0%, #FF6B6B 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mt: 2,
        }}
      >
        {title}
      </Typography>
    </Box>
  </motion.div>
);