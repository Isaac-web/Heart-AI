import { AppSelectInputProps } from '@/types';

const AppSelectInput = ({
  options = [],
  placeholder,
  helperText = '',
  label,
  error = false,
  ...rest
}: AppSelectInputProps) => {
  return (
    <label className="form-control w-full">
      {label && (
        <div className={`label`}>
          <span className={`label-text ${error ? 'text-error' : ''}`}>
            {label}
          </span>
        </div>
      )}
      <select
        {...rest}
        className={`select select-bordered ${error ? 'select-error' : ''}`}
      >
        <option disabled selected>
          {placeholder}
        </option>

        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {helperText && (
        <div className="label">
          <span className={`label-text-alt ${error ? 'text-error' : ''}`}>
            {helperText}
          </span>
        </div>
      )}
    </label>
  );
};

export default AppSelectInput;
