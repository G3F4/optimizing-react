import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import React, { ChangeEvent } from 'react';

export interface CheckboxControlControlProps {
  checked: boolean;
  label: string;
  disableRipple: boolean;

  onChange(event: ChangeEvent<HTMLInputElement>): void;
}

const CheckboxControl: React.FC<CheckboxControlControlProps> = ({
  checked,
  label,
  disableRipple,
  onChange,
}) => (
  <div>
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
          disableRipple={disableRipple}
        />
      }
      label={label}
    />
  </div>
);

export default CheckboxControl;
