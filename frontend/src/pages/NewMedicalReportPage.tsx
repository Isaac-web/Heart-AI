import Form from '@/components/form/Form';
import FormSelectInput from '@/components/form/FormSelectInput';
import FormSubmitButton from '@/components/form/FormSubmitButton';
import FormTextfield from '@/components/form/FormTextfield';
import Lottie from 'react-lottie';
import * as Yup from 'yup';
import heartPulzeAnimation from '../assets/animations/heart-pulze-animation.json';
import { useState } from 'react';

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label('First Name'),
  lastName: Yup.string().required().label('Last Name'),
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
  cp_1: Yup.number().required().label('cp_1'),
  cp_2: Yup.number().required().label('cp_2'),
  cp_3: Yup.number().required().label('cp_3'),
  restecg_1: Yup.number().required().label('restecg_1'),
  restecg_2: Yup.number().required().label('restecg_2'),
  thal_1: Yup.number().required().label('thal_1'),
  thal_2: Yup.number().required().label('thal_2'),
  thal_3: Yup.number().required().label('thal_3'),
});

const NewMedicalReportPage = () => {
  const [loading, setLoading] = useState(false);

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

      <div className="mb-10">
        <Form
          initialValues={{
            firstName: '',
            lastName: '',
            age: NaN,
            sex: NaN,
            trestbps: NaN,
            chol: NaN,
            fbs: NaN,
            thalach: NaN,
            exang: NaN,
            oldpeak: NaN,
            slope: NaN,
            ca: NaN,
            cp_1: NaN,
            cp_2: NaN,
            cp_3: NaN,
            restecg_1: NaN,
            restecg_2: NaN,
            thal_1: NaN,
            thal_2: NaN,
            thal_3: NaN,
          }}
          validationSchema={validationSchema}
          onSubmit={(data) => console.log(data)}
        >
          <div className="grid grid-cols-2 gap-x-5 gap-y-1 mb-5">
            <div className="col-span-1">
              <FormTextfield name="firstName" label="First Name" />
            </div>
            <div className="col-span-1">
              <FormTextfield name="lastName" label="last Name" />
            </div>
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
              <FormTextfield name="cp_1" label="cp_1" type="number" />
            </div>
            <div className="col-span-1">
              <FormTextfield name="cp_2" label="cp_2" type="number" />
            </div>
            <div className="col-span-1">
              <FormTextfield name="cp_3" label="cp_3" type="number" />
            </div>
            <div className="col-span-1">
              <FormTextfield name="restecg_1" label="restecg_1" type="number" />
            </div>
            <div className="col-span-1">
              <FormTextfield name="restecg_2" label="restecg_2" type="number" />
            </div>
            <div className="col-span-1">
              <FormTextfield name="thal_1" label="thal_1" type="number" />
            </div>
            <div className="col-span-1">
              <FormTextfield name="thal_2" label="thal_2" type="number" />
            </div>
            <div className="col-span-1">
              <FormTextfield name="thal_3" label="thal_3" type="number" />
            </div>
          </div>

          <div>
            <FormSubmitButton>Predict Cardio Status</FormSubmitButton>
          </div>
        </Form>
      </div>

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

      {loading && (
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
