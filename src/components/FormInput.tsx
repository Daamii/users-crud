interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
}

export function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  required = false,
  placeholder
}: FormInputProps) {
  return (
    <div className="form-group">
      <label htmlFor={name} className="form-group__label">
        {label} {required && <span className="form-group__required">*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`form-group__input ${error ? 'form-group__input--error' : ''}`}
        placeholder={placeholder}
      />
      {error && <span className="form-group__error">{error}</span>}
    </div>
  );
}