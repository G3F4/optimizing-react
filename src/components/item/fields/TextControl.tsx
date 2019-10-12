import TextField from '@material-ui/core/TextField';
import React, { ChangeEvent } from 'react';

export interface TextControlProps {
  label: string;
  placeholder: string;
  value: string | number;
  type?: string;

  onChange(event: ChangeEvent<HTMLInputElement>): void;
}

const TextControl: React.FC<TextControlProps> = ({
  label,
  value,
  placeholder,
  type,
  onChange,
}) => (
  <div>
    <TextField
      label={label}
      placeholder={placeholder}
      value={value}
      type={type}
      onChange={onChange}
    />
  </div>
);

export default TextControl;
