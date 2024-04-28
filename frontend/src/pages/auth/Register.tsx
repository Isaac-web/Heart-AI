import Form from '@/components/form/Form';
import FormSubmitButton from '@/components/form/FormSubmitButton';
import FormTextfield from '@/components/form/FormTextfield';
import { useAppStore } from '@/hooks/store';
import { RegistrationFormData } from '@/types';
import { Alert, Grid, Paper, Typography, useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label('Name'),
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().required().label('Password'),
});

const Register = () => {
  const theme = useTheme();
  const store = useAppStore();

  const errorOccured = () => store.getError(store.register.name);

  return (
    <Form<RegistrationFormData>
      initialValues={{
        name: '',
        email: '',
        password: '',
        userType: 'patient',
      }}
      validationSchema={validationSchema}
      onSubmit={async (data) => {
        await store.register(data);
        if (!errorOccured()) enqueueSnackbar('User was registered.');
      }}
    >
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
                <Grid container justifyContent={'center'} alignItems={'center'}>
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
                  <FormTextfield label="Password" name="password" />
                </Grid>
              </Grid>
              <Grid item>
                <FormSubmitButton>Register</FormSubmitButton>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Form>
  );
};

export default Register;
