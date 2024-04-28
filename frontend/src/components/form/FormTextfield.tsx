import { TextField, TextFieldProps } from '@mui/material';
import { useFormikContext } from 'formik';

interface FormTextFieldProps<T> {
  name: keyof T;
  label?: string;
  textFieldProps?: TextFieldProps;
}

const FormTextfield = <T extends {}>({
  name,
  label,
  textFieldProps,
}: FormTextFieldProps<T>) => {
  const { touched, errors, handleChange } = useFormikContext<T>();

  return (
    <TextField
      {...textFieldProps}
      label={label}
      onChange={handleChange(name)}
      helperText={touched[name] && (errors[name] as string)}
      error={Boolean(touched[name] && errors[name])}
    />
  );
};

export default FormTextfield;
