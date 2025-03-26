// src/pages/Register.jsx
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
import { Visibility, VisibilityOff, HowToReg, GitHub, Google } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { AuthContainer, AuthCard, AuthHeader } from '../components/AuthLayout';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: { name: '', email: '', phone: '', password: '', terms: false },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
      email: Yup.string().email('Invalid email'),
      phone: Yup.string().matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
      password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
      terms: Yup.boolean().oneOf([true], 'Must accept terms')
    }).test('email-or-phone', 'Either email or phone must be provided', function(value) {
      return !!value.email || !!value.phone;
    }),
    onSubmit: values => console.log('Register:', values)
  });

  return (
    <AuthContainer maxWidth={false}>
      <AuthCard>
        <AuthHeader
          title="Welcome To DriveGo"
          icon={<HowToReg sx={{ fontSize: 60, color: 'primary.main' }} />}
        />

        <form onSubmit={formik.handleSubmit}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              variant="filled"
              margin="normal"
              sx={{ mb: 3 }}
              InputProps={{
                sx: { borderRadius: '12px', overflow: 'hidden' },
                disableUnderline: true
              }}
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && !!formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="filled"
              margin="normal"
              sx={{ mb: 3 }}
              InputProps={{
                sx: { borderRadius: '12px', overflow: 'hidden' },
                disableUnderline: true
              }}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
            />

            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              variant="filled"
              margin="normal"
              sx={{ mb: 3 }}
              InputProps={{
                sx: { borderRadius: '12px', overflow: 'hidden' },
                disableUnderline: true
              }}
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && !!formik.errors.phone}
              helperText={formik.touched.phone && formik.errors.phone}
            />

            {formik.submitCount > 0 && formik.errors['email-or-phone'] && (
              <Typography color="error" variant="body2" sx={{ mb: 2 }}>
                {formik.errors['email-or-phone']}
              </Typography>
            )}

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              variant="filled"
              margin="normal"
              sx={{ mb: 3 }}
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
            control={<Checkbox name="terms" color="primary" />}
            label={
              <Typography variant="body2">
                I agree to the{' '}
                <Link href="#" style={{ textDecoration: 'none', fontWeight: 600 }}>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="#" style={{ textDecoration: 'none', fontWeight: 600 }}>
                  Privacy Policy
                </Link>
              </Typography>
            }
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
              Create Account
            </Button>
          </motion.div>


          <Typography variant="body2" textAlign="center" sx={{ mt: 4 }}>
            Already registered?{' '}
            <Link 
              to="/login" 
              style={{
                textDecoration: 'none',
                fontWeight: 700,
                background: 'linear-gradient(45deg, #2A2D72 0%, #FF6B6B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Sign in here
            </Link>
          </Typography>
        </form>
      </AuthCard>
    </AuthContainer>
  );
};

export default Register;