interface PhoneInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  error?: string;
  required?: boolean;
}

const PHONE_PREFIXES = [
  { value: "+34", label: "+34 (ES)" },
  { value: "+44", label: "+44 (UK)" },
  { value: "+33", label: "+33 (FR)" },
  { value: "+49", label: "+49 (DE)" },
  { value: "+39", label: "+39 (IT)" },
  { value: "+1", label: "+1 (US)" },
  { value: "+52", label: "+52 (MX)" },
  { value: "+54", label: "+54 (AR)" },
  { value: "+55", label: "+55 (BR)" },
];

export function PhoneInput({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
}: PhoneInputProps) {
  const getPrefixFromValue = () => {
    const found = PHONE_PREFIXES.find(p => value.startsWith(p.value));
    return found ? found.value : "+34";
  };

  const getNumberWithoutPrefix = () => {
    const prefix = getPrefixFromValue();
    return value.replace(prefix, "").trim();
  };

  const handlePrefixChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPrefix = e.target.value;
    const number = getNumberWithoutPrefix();
    const newValue = newPrefix + (number ? ` ${number}` : "");
    
    const syntheticEvent = {
      target: {
        name,
        value: newValue,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    onChange(syntheticEvent);
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const prefix = getPrefixFromValue();
    const newValue = prefix + " " + e.target.value;
    
    const syntheticEvent = {
      target: {
        name,
        value: newValue,
      },
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    onChange(syntheticEvent);
  };

  return (
    <div className="form-group">
      <label htmlFor={name} className="form-group__label">
        {label} {required && <span className="form-group__required">*</span>}
      </label>
      <div className="phone-input">
        <select
          value={getPrefixFromValue()}
          onChange={handlePrefixChange}
          className="phone-input__prefix"
        >
          {PHONE_PREFIXES.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>
        <input
          type="tel"
          id={name}
          name={name}
          value={getNumberWithoutPrefix()}
          onChange={handleNumberChange}
          className={`phone-input__number ${error ? 'form-group__input--error' : ''}`}
          placeholder="612 345 678"
        />
      </div>
      {error && <span className="form-group__error">{error}</span>}
    </div>
  );
}
