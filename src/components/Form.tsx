interface InputProps {
  inputType: 'text' | 'email' | 'password';
  inputName: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

interface LabelAndInputProps extends InputProps {
  label: string;
}

export const LabelAndInput: React.FC<LabelAndInputProps> = ({
  label,
  inputType,
  inputName,
  handleChange,
  value,
}) => {
  return (
    <div className='flex flex-col mb-2'>
      <label htmlFor='name'>{label}</label>
      <Input
        inputType={inputType}
        inputName={inputName}
        handleChange={handleChange}
        value={value}
      />
    </div>
  );
};

export const Input: React.FC<InputProps> = ({
  inputType,
  inputName,
  handleChange,
  value,
}) => {
  return (
    <input
      className='px-3 py-2 border-gray-200 border-2 rounded'
      type={inputType}
      name={inputName}
      id={inputName}
      onChange={handleChange}
      value={value}
    />
  );
};
