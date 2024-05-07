import { AppSelectInputProps } from '@/types';
import AppSelectInput from '../AppSelectInput';
import { useFormikContext } from 'formik';

interface FormTextSelectInputProps<T> extends AppSelectInputProps {
  name: keyof T;
}

const FormSelectInput = <T extends {}>({
  name,
  ...rest
}: FormTextSelectInputProps<T>) => {
  const { setFieldValue, errors, touched } = useFormikContext<T>();

  return (
    <AppSelectInput
      onChange={(e) => setFieldValue(name as string, e.target.value)}
      {...rest}
      helperText={touched[name] && (errors[name] as string)}
      error={Boolean(touched[name] && errors[name])}
    />
  );
};

export default FormSelectInput;
