import Form from '@/components/form/Form';
import FormSelectInput from '@/components/form/FormSelectInput';
import FormSubmitButton from '@/components/form/FormSubmitButton';
import FormTextfield from '@/components/form/FormTextfield';
import Lottie from 'react-lottie';
import * as Yup from 'yup';
import heartPulzeAnimation from '../assets/animations/heart-pulze-animation.json';
import { MedicalReportFormData } from '@/types';
import { useAppStore } from '@/store';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoadingIndicator from '@/components/LoadingIndicator';
import Alert from '@/components/Alert';

const validationSchema = Yup.object().shape({
  age: Yup.number().min(16).max(120).required().label('Age'),
  sex: Yup.number()
    .min(0, "Sex must be either 'Male' or 'Female'")
    .max(1, "Sex must be either 'Male' or 'Female'")
    .required()
    .label('Sex'),
  trestbps: Yup.number().min(94).max(200).required().label('trestbps'),
  chol: Yup.number().min(120).max(570).required().label('Cholestrol Level'),
  fbs: Yup.number().min(0).max(1).required().label('Fasting Blood Suger Level'),
  thalach: Yup.number().min(60).max(220).required().label('thalach'),
  exang: Yup.number().min(0).max(1).required().label('exang'),
  oldpeak: Yup.number().min(0).max(7).required().label('oldpeak'),
  slope: Yup.number().min(0).max(2).required().label('slope'),
  ca: Yup.number().min(0).max(4).required().label('ca'),
  cp: Yup.number().min(0).max(3).required().label('cp'),
  restecg: Yup.number().min(0).max(2).required().label('restecg'),
  thal: Yup.number().min(0).max(3).required().label('thal'),
});

const NewMedicalReportPage = () => {
  const [searchParams] = useSearchParams();
  const store = useAppStore();
  const appointment = store.details.appointment;
  const medicalReports = store.entities.medicalReports;
  const appointmentId = searchParams.get('appointmentId') as string;
  const navigate = useNavigate();

  const [formData, setFormData] = useState<MedicalReportFormData>({
    doctor: '',
    patient: '',
    age: 0,
    sex: 0,
    cp: 0,
    trestbps: 0,
    chol: 0,
    fbs: 0,
    restecg: 0,
    thalach: 0,
    exang: 0,
    oldpeak: 0,
    slope: 0,
    ca: 0,
    thal: 0,
  });

  const ensureMedicalReports = async () => {
    const { data } = appointment;
    if (!data.doctor._id || !data.patient._id)
      if (appointmentId) {
        const appointment = await store.details.appointment.getAppointmentById(
          appointmentId
        );

        if (appointment) {
          setFormData({
            ...formData,
            sex: appointment.patient.sex,
            age: appointment.patient.age,
          });
        }
      }
  };

  const getError = () => {
    return store.getError(
      store.entities.medicalReports.createMedicalReport.name
    );
  };

  const removeError = () => {
    store.removeError(store.entities.medicalReports.createMedicalReport.name);
  };

  useEffect(() => {
    ensureMedicalReports();
  }, []);

  const handleIssueMedicalReport = async (data: MedicalReportFormData) => {
    data.doctor = appointment.data.doctor._id;
    data.patient = appointment.data.patient._id;

    const medicalReport =
      await store.entities.medicalReports.createMedicalReport(data);

    const error = getError();

    if (!error) {
      if (medicalReport)
        navigate(`/portal/doctor/medical-reports/${medicalReport._id}`);
    }
  };

  return (
    <section className="container max-w-xl mx-auto relative">
      <div>
        <h1 className="text-2xl font-semibold dark:text-white/90 mb-4">
          New Medical Report
        </h1>
        <p className="text-sm mb-8">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est possimus
          debitis aspernatur, eos dolorem voluptatem corporis non quidem vitae.
        </p>
      </div>

      {appointment.loading ? (
        <LoadingIndicator />
      ) : (
        <div className="mb-10">
          <Form
            enableReinitialize
            initialValues={formData}
            validationSchema={validationSchema}
            onSubmit={handleIssueMedicalReport}
          >
            <div className="grid grid-cols-2 gap-x-5 gap-y-1 mb-5">
              <div className="col-span-1">
                <FormTextfield name="age" label="Age" type="number" />
              </div>
              <div className="col-span-1">
                <FormSelectInput
                  name="sex"
                  label="Sex"
                  placeholder="Select One"
                  options={[
                    { label: 'Male', value: '1' },
                    { label: 'Female', value: '2' },
                  ]}
                />
              </div>
              <div className="col-span-1">
                <FormTextfield
                  name="trestbps"
                  label="Resting Blood Presure"
                  type="number"
                />
              </div>
              <div className="col-span-1">
                <FormTextfield
                  name="chol"
                  label="Serum Cholestrol Level"
                  type="number"
                />
              </div>
              <div className="col-span-1">
                <FormSelectInput
                  name="fbs"
                  label="Fasting Blood Suger Level"
                  placeholder="Select One"
                  options={[
                    { label: 'True', value: '1' },
                    { label: 'False', value: '0' },
                  ]}
                />
              </div>
              <div className="col-span-1">
                <FormTextfield
                  name="thalach"
                  label="Maximum Heart Rate"
                  type="number"
                />
              </div>
              <div className="col-span-1">
                <FormSelectInput
                  name="exang"
                  label="Exercise Induced Angina"
                  placeholder="Select One"
                  options={[
                    { label: 'False', value: '0' },
                    { label: 'True', value: '1' },
                  ]}
                />
              </div>
              <div className="col-span-1">
                <FormTextfield
                  name="oldpeak"
                  label="ST Depression"
                  type="number"
                />
              </div>
              <div className="col-span-1">
                <FormSelectInput
                  name="slope"
                  label="Slope"
                  placeholder="Select One"
                  options={[
                    { label: 'Up Sloping', value: '0' },
                    { label: 'Flat Sloping', value: '1' },
                    { label: 'Down Sloping', value: '2' },
                  ]}
                />
              </div>
              <div className="col-span-1">
                <FormSelectInput
                  name="ca"
                  label="#Major Blood Vessels"
                  placeholder="Select One"
                  options={[
                    { label: '0', value: '0' },
                    { label: '1', value: '1' },
                    { label: '2', value: '2' },
                    { label: '3', value: '3' },
                    { label: '4', value: '4' },
                  ]}
                />
              </div>
              <div className="col-span-1">
                <FormSelectInput
                  name="cp"
                  label="Chest Pain Type"
                  placeholder="Select One"
                  options={[
                    { label: 'Typical Angina Pain', value: '0' },
                    { label: 'Atypical Angina Pain', value: '1' },
                    { label: 'Non-Anginal Pain', value: '2' },
                    { label: 'Asymptomatic', value: '3' },
                  ]}
                />
              </div>
              <div className="col-span-1">
                <FormSelectInput
                  name="restecg"
                  label="Resting Ecg"
                  placeholder="Select One"
                  options={[
                    { label: 'Normal', value: '0' },
                    { label: 'Having ST-T wave abnormality', value: '1' },
                    {
                      label:
                        ' Showing probable or definite left ventricular hypertrophy',
                      value: '2',
                    },
                  ]}
                />
              </div>
              <div className="col-span-1">
                <FormSelectInput
                  name="thal"
                  label="Thallium Stress Result"
                  placeholder="Select One"
                  options={[
                    { label: 'Normal', value: '0' },
                    { label: 'Fixed Defect', value: '1' },
                    { label: 'Reversible defect', value: '2' },
                    { label: 'Not Described', value: '3' },
                  ]}
                />
              </div>
            </div>

            <div>
              <FormSubmitButton>Predict Cardio Status</FormSubmitButton>
            </div>
          </Form>

          {getError() && (
            <div className="mt-10">
              <Alert
                title="Error"
                message={getError()?.message || ''}
                onClose={() => removeError()}
              />
            </div>
          )}
        </div>
      )}

      <div>
        <p className="text-warning text-xs mb-1">Disclaimer</p>
        <p className="text-xs">
          Our predictions are based on input data. They're not a substitute for
          professional medical advice. Consult a healthcare provider for
          concerns about your heart health."
        </p>

        <p className="text-xs">
          Read our <span className="text-primary cursor-pointer">terms</span>{' '}
          and <span className="text-primary cursor-pointer">conditions</span> to
          learn more.
        </p>
      </div>

      {medicalReports.isPending && (
        <div
          className="fixed h-screen bg-black/60 flex flex-col gap-5 justify-center items-center"
          style={{ top: 0, left: '240px', width: 'calc(100% - 240px)' }}
        >
          <div>
            <Lottie
              options={{
                loop: true,
                autoplay: true,
                animationData: heartPulzeAnimation,
                rendererSettings: {
                  preserveAspectRatio: 'xMidYMid slice',
                },
              }}
              height={150}
              width={150}
            />
          </div>
          <div className="max-w-md -mt-6">
            <p className="text-sm text-center text-white/90">
              Please wait... We're analyzing your cardiovascular data to provide
              an accurate prediction.
            </p>
          </div>
          <div>
            <button className="btn w-32">Cancel</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default NewMedicalReportPage;
