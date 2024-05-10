import Form from '@/components/form/Form';
import FormSelectInput from '@/components/form/FormSelectInput';
import FormSubmitButton from '@/components/form/FormSubmitButton';
import FormTextfield from '@/components/form/FormTextfield';
import Lottie from 'react-lottie';
import * as Yup from 'yup';
import heartPulzeAnimation from '../assets/animations/heart-pulze-animation.json';
import { MedicalReportFormData } from '@/types';
import { useAppStore } from '@/store';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import LoadingIndicator from '@/components/LoadingIndicator';
import Alert from '@/components/Alert';

const validationSchema = Yup.object().shape({
  age: Yup.number().required().min(16).label('Age'),
  sex: Yup.number()
    .min(0, "Sex must be either 'Male' or 'Female'")
    .max(1, "Sex must be either 'Male' or 'Female'")
    .required()
    .label('Sex'),
  trestbps: Yup.number().required().label('trestbps'),
  chol: Yup.number().required().label('Cholestrol Level'),
  fbs: Yup.number().required().label('fbs'),
  thalach: Yup.number().required().label('thalach'),
  exang: Yup.number().required().label('exang'),
  oldpeak: Yup.number().required().label('oldpeak'),
  slope: Yup.number().required().label('slope'),
  ca: Yup.number().required().label('ca'),
  cp: Yup.number().required().label('cp'),
  restecg: Yup.number().required().label('restecg'),
  thal: Yup.number().required().label('thal'),
});

// details: {
//   age: 52,
//   sex: 1,
//   'chest pain type': 0,
//   'resting blood pressure': 125,
//   'serum colesterol': 212,
//   'fasting blood sugar level': 0,
//   'resting electrocardiographoc results': 1,
//   'maximum heart rate': 168,
//   'exercise induced agina': 0,
//   'st depression': 1,
//   slope: 2,
//   'number of major vessels': 2,
//   'thallium stress test_results': 3
// }
// }

const NewMedicalReportPage = () => {
  const [searchParams] = useSearchParams();
  const store = useAppStore();
  const appointment = store.details.appointment;
  const medicalReports = store.entities.medicalReports;
  const appointmentId = searchParams.get('appointmentId') as string;

  const ensureMedicalReports = () => {
    const { data } = appointment;
    if (!data.doctor._id || !data.patient._id)
      if (appointmentId)
        store.details.appointment.getAppointmentById(appointmentId);
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

  const handleIssueMedicalReport = (data: MedicalReportFormData) => {
    data.doctor = appointment.data.doctor._id;
    data.patient = appointment.data.patient._id;

    store.entities.medicalReports.createMedicalReport(data);
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
            initialValues={{
              doctor: '',
              patient: '',
              age: NaN,
              sex: NaN,
              cp: NaN,
              trestbps: NaN,
              chol: NaN,
              fbs: NaN,
              restecg: NaN,
              thalach: NaN,
              exang: NaN,
              oldpeak: NaN,
              slope: NaN,
              ca: NaN,
              thal: NaN,
            }}
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
                <FormTextfield name="trestbps" label="trestbps" type="number" />
              </div>
              <div className="col-span-1">
                <FormTextfield
                  name="chol"
                  label="Cholestrol Level"
                  type="number"
                />
              </div>
              <div className="col-span-1">
                <FormTextfield name="fbs" label="fbs" type="number" />
              </div>
              <div className="col-span-1">
                <FormTextfield name="thalach" label="thalach" type="number" />
              </div>
              <div className="col-span-1">
                <FormTextfield name="exang" label="exang" type="number" />
              </div>
              <div className="col-span-1">
                <FormTextfield name="oldpeak" label="oldpeak" type="number" />
              </div>
              <div className="col-span-1">
                <FormTextfield name="slope" label="slope" type="number" />
              </div>
              <div className="col-span-1">
                <FormTextfield name="ca" label="ca" type="number" />
              </div>
              <div className="col-span-1">
                <FormTextfield name="cp" label="CP" type="number" />
              </div>
              <div className="col-span-1">
                <FormTextfield name="restecg" label="restecg" type="number" />
              </div>
              <div className="col-span-1">
                <FormTextfield name="thal" label="thal" type="number" />
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
