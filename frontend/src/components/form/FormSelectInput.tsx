import { AppSelectInputProps } from '@/types';
import AppSelectInput from '../AppSelectInput';
import { FormikProps, useFormikContext } from 'formik';

interface FormTextSelectInputProps extends AppSelectInputProps {
  name: string;
}

const FormSelectInput = <T extends Record<string, unknown>>({
  name,
  ...rest
}: FormTextSelectInputProps) => {
  const { setFieldValue, errors, touched }: FormikProps<T> =
    useFormikContext<T>();

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
