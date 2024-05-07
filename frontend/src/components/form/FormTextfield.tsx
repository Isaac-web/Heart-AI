import { useFormikContext } from 'formik';
import AppTextInput from '../AppTextInput';
import { AppTextInputProps } from '@/types';

interface FormTextFieldProps<T> extends AppTextInputProps {
  name: keyof T;
}

const FormTextfield = <T extends {}>({
  name,
  ...rest
}: FormTextFieldProps<T>) => {
  const { touched, errors, values, handleChange } = useFormikContext<T>();

  return (
    <AppTextInput
      {...rest}
      helperText={touched[name] && (errors[name] as string)}
      error={Boolean(touched[name] && errors[name])}
      onChange={handleChange(name)}
      value={`${values[name] || ''}`}
    />
  );
};

export default FormTextfield;
