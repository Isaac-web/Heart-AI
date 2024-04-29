import AppPaper from '@/components/AppPaper';
import Form from '@/components/form/Form';
import FormSubmitButton from '@/components/form/FormSubmitButton';
import FormTextfield from '@/components/form/FormTextfield';
import { useAppStore } from '@/hooks/store';
import { RegistrationFormData } from '@/types';
import { Alert, Box, Button, Grid, Typography, useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().required().label('Password'),
});

const Register = () => {
  const theme = useTheme();
  const store = useAppStore();
  const navigate = useNavigate();

  const errorOccured = () => store.getError(store.register.name);

  return (
    <Form<RegistrationFormData>
      initialValues={{
        name: '',
        email: '',
        password: '',
        userType: 'doctor',
      }}
      validationSchema={validationSchema}
      onSubmit={async (data) => {
        await store.register(data);
        if (!errorOccured()) {
          enqueueSnackbar('Account registered successfully.', {
            variant: 'success',
          });
          navigate('/login');
        }
      }}
    >
      <Grid
        container
        justifyContent={'center'}
        sx={{
          height: '100vh',
          width: '100%',
          pl: theme.spacing(2),
          pr: theme.spacing(2),
        }}
      >
        <Grid item xs={12} md={8} xl={4} style={{ maxWidth: '28em' }}>
          <AppPaper>
            <Box
              sx={{
                pt: theme.spacing(6),
                pb: theme.spacing(8),
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
                    <Typography variant="h5">Register</Typography>
                  </Grid>
                </Grid>
                {errorOccured() && (
                  <Grid item sx={{ mb: theme.spacing(2) }}>
                    <Alert severity="error">{errorOccured()?.message}</Alert>
                  </Grid>
                )}
                <Grid item>
                  <FormTextfield label="Name" name="name" />
                </Grid>
                <Grid item>
                  <FormTextfield label="Email" name="email" />
                </Grid>
                <Grid item>
                  <Grid item>
                    <FormTextfield
                      label="Password"
                      type="password"
                      name="password"
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <FormSubmitButton>Register</FormSubmitButton>
                </Grid>
                <Grid item sx={{ mt: theme.spacing(2) }}>
                  <Typography variant="subtitle2" align="center">
                    Already have an account?
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/login')}
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </AppPaper>
        </Grid>
      </Grid>
    </Form>
  );
};

export default Register;
