import { Formik } from 'formik';
import { ReactNode } from 'react';

interface FormProps<T extends {}> {
  children: ReactNode;
  initialValues: T;
  onSubmit(data: T): void;
  validationSchema: unknown;
}

const Form = <T extends {}>({
  children,
  initialValues,
  validationSchema,
  onSubmit,
}: FormProps<T>) => {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {() => children}
    </Formik>
  );
};

export default Form;
