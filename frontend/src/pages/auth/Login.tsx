import * as Yup from 'yup';
import { Grid, Paper, Typography, useTheme } from '@mui/material';
import Form from '@/components/form/Form';
import FormSubmitButton from '@/components/form/FormSubmitButton';
import FormTextfield from '@/components/form/FormTextfield';
import { LoginFormData } from '@/types';
import { login } from '@/api/auth';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required().label('Email'),
  password: Yup.string().min(7).max(256).required().label('Password'),
});

const Login = () => {
  const theme = useTheme();

  return (
    <Form<LoginFormData>
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(data) => login(data)}
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
                  <Typography variant="h5">Login</Typography>
                </Grid>
              </Grid>
              <Grid item>
                <FormTextfield name="email" label="Email" />
              </Grid>
              <Grid item>
                <Grid item>
                  <FormTextfield name="password" label="Password" />
                </Grid>
              </Grid>

              <Grid item>
                <FormSubmitButton>Login</FormSubmitButton>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Form>
  );
};

export default Login;
