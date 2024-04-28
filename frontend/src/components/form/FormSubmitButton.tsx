import { Button } from '@mui/material';
import { useFormikContext } from 'formik';
import { ReactNode } from 'react';

interface FormSubmitButtonProps {
  children: ReactNode;
}

const FormSubmitButton = ({ children }: FormSubmitButtonProps) => {
  const { handleSubmit } = useFormikContext();

  return (
    <Button
      size="large"
      variant="contained"
      type="submit"
      onClick={() => handleSubmit()}
    >
      Login
    </Button>
  );
};

export default FormSubmitButton;
