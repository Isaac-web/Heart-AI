import { Button, CircularProgress, useTheme } from '@mui/material';
import { useFormikContext } from 'formik';
import { ReactNode } from 'react';

interface FormSubmitButtonProps {
  loading?: boolean;
  children: ReactNode;
}

const FormSubmitButton = ({ children, loading }: FormSubmitButtonProps) => {
  const { handleSubmit } = useFormikContext();
  const theme = useTheme();

  return (
    <Button
      size="large"
      variant="contained"
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
    </Button>
  );
};

export default FormSubmitButton;
