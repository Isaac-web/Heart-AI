import { AppTextInputProps } from '@/types';

const AppTextInput = ({
  label = '',
  value = '',
  helperText = '',
  placeholder = '',
  type = 'text',
  startAdornment,
  endAdornment = null,
  error = false,
  onChange,
}: AppTextInputProps) => {
  return (
    <label className="form-control w-full">
      {label && (
        <div className="label">
          <span className={`label-text ${error ? 'text-error' : ''}`}>
            {label}
          </span>
        </div>
      )}

      <div
        className={`input input-bordered flex items-center gap-2 ${
          error ? 'input-error text-error' : ''
        }`}
      >
        {startAdornment && <span>{startAdornment}</span>}
        <input
          type={type}
          className="grow"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {endAdornment && <span>{endAdornment}</span>}
      </div>

      {label && (
        <div className="label">
          <span className={`label-text-alt ${error ? 'text-error' : ''}`}>
            {helperText}
          </span>
        </div>
      )}
    </label>
  );
};

export default AppTextInput;
