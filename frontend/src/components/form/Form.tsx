import { Formik } from 'formik';
import { ReactNode } from 'react';

interface FormProps<T extends {}> {
  children: ReactNode;
  initialValues: T;
  enableReinitialize?: boolean;
  onSubmit(data: T): void;
  validationSchema: unknown;
}

const Form = <T extends {}>({
  children,
  initialValues,
  validationSchema,
  enableReinitialize = false,
  onSubmit,
}: FormProps<T>) => {
  return (
    <Formik
      enableReinitialize={enableReinitialize}
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {() => children}
    </Formik>
  );
};

export default Form;
