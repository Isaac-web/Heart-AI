import { useFormikContext } from 'formik';
import { ReactNode } from 'react';
import CircularProgress from '../CircularProgress';

interface FormSubmitButtonProps {
  children: ReactNode;
  className?: string;
  loading?: boolean;
}

const FormSubmitButton = ({
  children,
  loading,
  className,
}: FormSubmitButtonProps) => {
  const { handleSubmit } = useFormikContext();

  return (
    <button
      className={`btn w-full dark:text-white btn-primary ${className}`}
      type="submit"
      onClick={() => handleSubmit()}
    >
      {!loading ? children : <CircularProgress />}
    </button>
  );
};

export default FormSubmitButton;
