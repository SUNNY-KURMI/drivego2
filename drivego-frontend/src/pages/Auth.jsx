// src/pages/Auth.jsx
import { useState } from 'react';
import { 
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Link,
  Divider,
  IconButton,
  InputAdornment,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Tabs,
  Tab,
  Box
} from '@mui/material';
import { 
  Lock,
  Person,
  Visibility,
  VisibilityOff,
  Google,
  Facebook,
  HowToReg,
  Login
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Styled Components
const AuthContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
}));

const AuthCard = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '30px',
  boxShadow: theme.shadows[10],
  overflow: 'hidden',
  display: 'flex',
  maxWidth: 1000,
  margin: '0 auto',
}));

const BrandSection = styled('div')(({ theme }) => ({
  flex: 1,
  background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
  color: 'white',
  padding: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
}));

const MotionButton = motion(Button);

// Validation Schemas
const loginSchema = Yup.object({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required')
});

const registerSchema = Yup.object({
  name: Yup.string().required('Required').min(3),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required').min(8),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
  terms: Yup.boolean().oneOf([true], 'Must accept terms')
});

export default function Auth() {
  const [authType, setAuthType] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      terms: false
    },
    validationSchema: authType === 'login' ? loginSchema : registerSchema,
    onSubmit: async (values) => {
      try {
        // Handle auth based on type
        if (authType === 'login') {
          console.log('Login with:', values.email, values.password);
        } else {
          console.log('Register with:', values);
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error('Authentication failed:', error);
      }
    }
  });

  return (
    <AuthContainer maxWidth={false}>
      <AuthCard>
        <BrandSection>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {authType === 'login' ? (
              <Lock sx={{ fontSize: 80, mb: 2 }} />
            ) : (
              <HowToReg sx={{ fontSize: 80, mb: 2 }} />
            )}
          </motion.div>
          <Typography variant="h3" gutterBottom sx={{ fontWeight: 700 }}>
            {authType === 'login' ? 'Welcome Back' : 'Join DriveGo'}
          </Typography>
          <Typography variant="body1">
            {authType === 'login' 
              ? 'Your journey continues here' 
              : 'Start your premium driving experience'}
          </Typography>
        </BrandSection>

        <Grid item xs={12} md={6} sx={{ p: 8 }}>
          <Tabs 
            value={authType}
            onChange={(e, newValue) => {
              setAuthType(newValue);
              formik.resetForm();
            }}
            sx={{ mb: 4 }}
          >
            <Tab 
              label="Sign In" 
              value="login" 
              icon={<Login />}
              sx={{ 
                fontWeight: 700,
                borderBottom: authType === 'login' ? '3px solid' : 'none',
                borderColor: 'primary.main'
              }}
            />
            <Tab 
              label="Create Account" 
              value="register" 
              icon={<HowToReg />}
              sx={{ 
                fontWeight: 700,
                borderBottom: authType === 'register' ? '3px solid' : 'none',
                borderColor: 'primary.main'
              }}
            />
          </Tabs>

          <form onSubmit={formik.handleSubmit}>
            {authType === 'register' && (
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                variant="outlined"
                margin="normal"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                sx={{ mb: 3 }}
              />
            )}

            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
              margin="normal"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              variant="outlined"
              margin="normal"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              sx={{ mb: 3 }}
            />

            {authType === 'register' && (
              <>
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  variant="outlined"
                  margin="normal"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  sx={{ mb: 3 }}
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      name="terms"
                      checked={formik.values.terms}
                      onChange={formik.handleChange}
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2">
                      I agree to the{' '}
                      <Link href="#" color="primary">
                        Terms
                      </Link>{' '}
                      and{' '}
                      <Link href="#" color="primary">
                        Privacy Policy
                      </Link>
                    </Typography>
                  }
                  sx={{ mb: 3 }}
                />
                {formik.touched.terms && formik.errors.terms && (
                  <Typography color="error" variant="body2" sx={{ mt: -2, mb: 2 }}>
                    {formik.errors.terms}
                  </Typography>
                )}
              </>
            )}

            <MotionButton
              fullWidth
              variant="contained"
              size="large"
              type="submit"
              disabled={formik.isSubmitting}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{ 
                height: 50,
                borderRadius: '15px',
                fontSize: '1.1rem'
              }}
            >
              {formik.isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : authType === 'login' ? (
                'Sign In'
              ) : (
                'Create Account'
              )}
            </MotionButton>

            <Divider sx={{ my: 4 }}>
              <Typography variant="body2" color="text.secondary">
                OR CONTINUE WITH
              </Typography>
            </Divider>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Google />}
                  sx={{ 
                    borderRadius: '15px',
                    py: 1.5
                  }}
                >
                  Google
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Facebook />}
                  sx={{ 
                    borderRadius: '15px',
                    py: 1.5
                  }}
                >
                  Facebook
                </Button>
              </Grid>
            </Grid>

            <Typography variant="body2" align="center" sx={{ mt: 4 }}>
              {authType === 'login' ? (
                <>
                  New to DriveGo?{' '}
                  <Link 
                    href="#" 
                    fontWeight="600"
                    onClick={() => setAuthType('register')}
                  >
                    Create account
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <Link 
                    href="#" 
                    fontWeight="600"
                    onClick={() => setAuthType('login')}
                  >
                    Sign in
                  </Link>
                </>
              )}
            </Typography>
          </form>
        </Grid>
      </AuthCard>
    </AuthContainer>
  );
}