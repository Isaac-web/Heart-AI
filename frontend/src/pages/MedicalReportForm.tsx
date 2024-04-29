import AppContainer from '@/components/Container';
import Form from '@/components/form/Form';
import FormSubmitButton from '@/components/form/FormSubmitButton';
import FormTextfield from '@/components/form/FormTextfield';
import { useAppStore } from '@/hooks/store';
import { MedicalReportFormData } from '@/types';
import { getUserId } from '@/utils/auth';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  doctorId: Yup.string(),
  patientId: Yup.string(),
  age: Yup.number().min(0).required(),
  sex: Yup.number().min(0).required(),
  trestbps: Yup.number().min(0).required(),
  chol: Yup.number().min(0).required(),
  fbs: Yup.number().min(0).required(),
  thalach: Yup.number().min(0).required(),
  exang: Yup.number().min(0).required(),
  oldpeak: Yup.number().min(0).required(),
  slope: Yup.number().min(0).required(),
  ca: Yup.number().min(0).required(),
  cp_1: Yup.number().min(0).required(),
  cp_2: Yup.number().min(0).required(),
  cp_3: Yup.number().min(0).required(),
  restecg_1: Yup.number().min(0).required(),
  restecg_2: Yup.number().min(0).required(),
  thal_1: Yup.number().min(0).required(),
  thal_2: Yup.number().min(0).required(),
  thal_3: Yup.number().min(0).required(),
});

const MedicalReportForm = () => {
  const theme = useTheme();
  const { id: patientId } = useParams();
  const store = useAppStore();
  const navigate = useNavigate();

  const initialValues = {
    doctorId: getUserId() as string,
    patientId: patientId as string,
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

  const errorOccured = () => store.getError(store.createMedicalReport.name);

  const handleCreateMedicalReport = async (data: MedicalReportFormData) => {
    await store.createMedicalReport(data);
    if (errorOccured()) {
      enqueueSnackbar(errorOccured()?.message || '', { variant: 'error' });
      return;
    }
    enqueueSnackbar('Medical record was created successfully.', {
      variant: 'success',
    });

    navigate('/doctor');
  };

  return (
    <AppContainer maxWidth="sm">
      <Box sx={{ mb: theme.spacing(5) }}>
        <Typography variant="h4">New Medical Report</Typography>
      </Box>

      <Form
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(data) => handleCreateMedicalReport(data)}
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
            <FormTextfield label="thal_1" name="thal_1" type="number" />
          </Grid>
          <Grid item xs={6}>
            <FormTextfield label="thal_2" name="thal_2" type="number" />
          </Grid>
          <Grid item xs={6}>
            <FormTextfield label="thal_3" name="thal_3" type="number" />
          </Grid>
          <Grid item xs={12}>
            <FormSubmitButton loading={store.creatingMedicalReport}>
              Submit
            </FormSubmitButton>
          </Grid>
        </Grid>
      </Form>
    </AppContainer>
  );
};

export default MedicalReportForm;
