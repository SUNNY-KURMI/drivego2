// src/pages/Login.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Typography,
  Divider,
  Grid
} from '@mui/material';
import { Visibility, VisibilityOff, Lock, GitHub, Google } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { AuthContainer, AuthCard, AuthHeader } from '../components/AuthLayout';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: { loginId: '', password: '', remember: false },
    validationSchema: Yup.object({
      loginId: Yup.string()
        .required('Required')
        .test(
          'is-email-or-phone',
          'Invalid email or phone number',
          value => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const phoneRegex = /^\+?[1-9]\d{1,14}$/;
            return emailRegex.test(value) || phoneRegex.test(value);
          }
        ),
      password: Yup.string().required('Required')
    }),
    onSubmit: values => console.log('Login:', values)
  });

  return (
    <AuthContainer maxWidth={false}>
      <AuthCard>
        <AuthHeader
          title="Welcome Back"
          icon={<Lock sx={{ fontSize: 60, color: 'primary.main' }} />}
        />

        <form onSubmit={formik.handleSubmit}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <TextField
              fullWidth
              label="Email or Phone Number"
              name="loginId"
              variant="filled"
              margin="normal"
              sx={{ mb: 3 }}
              InputProps={{
                sx: { borderRadius: '12px', overflow: 'hidden' },
                disableUnderline: true
              }}
              value={formik.values.loginId}
              onChange={formik.handleChange}
              error={formik.touched.loginId && !!formik.errors.loginId}
              helperText={formik.touched.loginId && formik.errors.loginId}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              variant="filled"
              margin="normal"
              sx={{ mb: 2 }}
              InputProps={{
                sx: { borderRadius: '12px', overflow: 'hidden' },
                disableUnderline: true,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
          </motion.div>

          <FormControlLabel
            control={<Checkbox name="remember" color="primary" />}
            label="Remember me"
            sx={{ mb: 3 }}
          />

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              sx={{
                py: 2,
                borderRadius: '15px',
                fontSize: '1.1rem',
                background: 'linear-gradient(45deg, #2A2D72 0%, #FF6B6B 100%)',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}
            >
              Sign In
            </Button>
          </motion.div>

          <Typography variant="body2" textAlign="center" sx={{ mt: 4 }}>
            New user?{' '}
            <Link 
              to="/register" 
              style={{
                textDecoration: 'none',
                fontWeight: 700,
                background: 'linear-gradient(45deg, #2A2D72 0%, #FF6B6B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Create account
            </Link>
          </Typography>
        </form>
      </AuthCard>
    </AuthContainer>
  );
};

export default Login;