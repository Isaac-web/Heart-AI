import { Formik } from 'formik';
import { ReactNode } from 'react';

interface FormProps<T extends {}> {
  children: ReactNode;
  initialValues: T;
  validationSchema: unknown;
}

const Form = <T extends {}>({
  children,
  initialValues,
  validationSchema,
}: FormProps<T>) => {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={(data) => console.log(data)}
    >
      {() => children}
    </Formik>
  );
};

export default Form;
