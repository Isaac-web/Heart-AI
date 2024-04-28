import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().min(7).max(256).required().label('Password'),
});

const Login = () => {
  const theme = useTheme();
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(data) => console.log(data)}
    >
      {({ handleChange, handleSubmit, errors, touched }) => (
        <Grid
          container
          justifyContent={'center'}
          alignContent={'center'}
          sx={{
            height: '100vh',
            width: '100%',
            pl: theme.spacing(2),
            pr: theme.spacing(2),
          }}
        >
          <Grid item xs={12} md={8} xl={4}>
            <Paper
              sx={{
                pt: theme.spacing(4),
                pb: theme.spacing(4),
                pl: theme.spacing(5),
                pr: theme.spacing(5),
              }}
            >
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Grid
                    container
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <Typography variant="h5">Login</Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField
                    label="Email"
                    onChange={handleChange('email')}
                    helperText={touched['email'] && errors['email']}
                    error={Boolean(touched['email'] && errors['email'])}
                  />
                </Grid>
                <Grid item>
                  <Grid item>
                    <TextField
                      label="Password"
                      onChange={handleChange('password')}
                      helperText={touched['password'] && errors['password']}
                      error={Boolean(touched['password'] && errors['password'])}
                    />
                  </Grid>
                </Grid>

                <Grid item>
                  <Button
                    size="large"
                    variant="contained"
                    onClick={() => handleSubmit()}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Formik>
  );
};

export default Login;
