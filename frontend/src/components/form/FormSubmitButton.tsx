import { CircularProgress, useTheme } from '@mui/material';
import { useFormikContext } from 'formik';
import { ReactNode } from 'react';

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
  const theme = useTheme();

  return (
    <button
      className={`btn w-full bg-primary dark:text-white ${className}`}
      type="submit"
      onClick={() => handleSubmit()}
    >
      {!loading ? (
        children
      ) : (
        <CircularProgress
          sx={{ color: theme.palette.common.white }}
          size="1.8em"
        />
      )}
    </button>
  );
};

export default FormSubmitButton;
