import { TextField, TextFieldProps } from '@mui/material';
import { useFormikContext } from 'formik';

interface FormTextFieldProps<T> {
  name: keyof T;
  type?: string;
  label?: string;
  textFieldProps?: TextFieldProps;
}

const FormTextfield = <T extends {}>({
  name,
  type,
  label,
  textFieldProps,
}: FormTextFieldProps<T>) => {
  const { touched, errors, handleChange } = useFormikContext<T>();

  return (
    <TextField
      type={type}
      {...textFieldProps}
      label={label}
      onChange={handleChange(name)}
      helperText={touched[name] && (errors[name] as string)}
      error={Boolean(touched[name] && errors[name])}
    />
  );
};

export default FormTextfield;
