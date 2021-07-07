import React from 'React';
import { Button as MdButton, PropTypes } from '@material-ui/core';

type Props = {
  variant?: 'text' | 'outlined' | 'contained';
  color?: PropTypes.Color;
  type?: 'button' | 'submit' | 'reset';
  [x: string]: any;
};

export const Button: React.FC<Props> = ({
  children,
  variant,
  color,
  type,
  ...rest
}) => {
  return (
    <MdButton
      variant={variant || 'contained'}
      color={color || 'primary'}
      type={type || 'button'}
      className=""
      {...rest}
    >
      {children}
    </MdButton>
  );
};

export default Button;
