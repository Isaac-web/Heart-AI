import AppContainer from '@/components/Container';
import Form from '@/components/form/Form';
import FormSubmitButton from '@/components/form/FormSubmitButton';
import FormTextfield from '@/components/form/FormTextfield';
import { getUserId } from '@/utils/auth';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { useParams } from 'react-router-dom';

const MedicalReportForm = () => {
  const theme = useTheme();
  const { id: patientId } = useParams();

  const initialValues = {
    doctorId: getUserId(),
    patientId,
    age: 0,
    sex: 0,
    trestbps: 0,
    chol: 0,
    fbs: 0,
    thalach: 0,
    exang: 0,
    oldpeak: 0,
    slope: 0,
    ca: 0,
    cp_1: 0,
    cp_2: 0,
    cp_3: 0,
    restecg_1: 0,
    restecg_2: 0,
    thal_1: 0,
    thal_2: 0,
    thal_3: 0,
  };

  return (
    <AppContainer maxWidth="md">
      <Box sx={{ mb: theme.spacing(5) }}>
        <Typography variant="h4">New Medical Report</Typography>
      </Box>

      <Form
        validationSchema={null}
        initialValues={initialValues}
        onSubmit={(data) => console.log(data)}
      >
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <FormTextfield name="age" label="Age" type="number" />
          </Grid>
          <Grid item xs={6}>
            <FormTextfield label="Sex" name="sex" type="number" />
          </Grid>
          <Grid item xs={6}>
            <FormTextfield label="Trestbps" name="trestbps" type="number" />
          </Grid>
          <Grid item xs={6}>
            <FormTextfield label="Chol" name="chol" type="number" />
          </Grid>
          <Grid item xs={6}>
            <FormTextfield label="Fbs" name="fbs" type="number" />
          </Grid>
          <Grid item xs={6}>
            <FormTextfield label="Thalach" name="thalach" type="number" />
          </Grid>
          <Grid item xs={6}>
            <FormTextfield label="Exang" name="exang" type="number" />
          </Grid>
          <Grid item xs={6}>
            <FormTextfield label="Oldpeak" name="oldpeak" type="number" />
          </Grid>
          <Grid item xs={6}>
            <FormTextfield label="ca" name="ca" type="number" />
          </Grid>
          <Grid item xs={6}>
            <FormTextfield label="cp_1" name="cp_1" type="number" />
          </Grid>
          <Grid item xs={6}>
            <FormTextfield label="cp_2" name="cp_2" type="number" />
          </Grid>
          <Grid item xs={6}>
            <FormTextfield label="cp_3" name="cp_3" type="number" />
          </Grid>
          <Grid item xs={6}>
            <FormTextfield label="restecg_1" name="restecg_1" type="number" />
          </Grid>
          <Grid item xs={6}>
            <FormTextfield label="restecg_2" name="restecg_2" type="number" />
          </Grid>
          <Grid item xs={6}>
            <FormTextfield label="restecg_1" name="restecg_1" type="number" />
          </Grid>
          <Grid item xs={6}>
            <FormTextfield label="restecg_2" name="restecg_2" type="number" />
          </Grid>
          <Grid item xs={6}>
            <FormTextfield label="restecg_3" name="restecg_3" type="number" />
          </Grid>
          <Grid item xs={12}>
            <FormSubmitButton>Submit</FormSubmitButton>
          </Grid>
        </Grid>
      </Form>
    </AppContainer>
  );
};

export default MedicalReportForm;
