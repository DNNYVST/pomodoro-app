import { ChangeEventHandler, ComponentPropsWithoutRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  id: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: ChangeEventHandler<HTMLInputElement>;
}

const Input = ({ id, value, onChange, onBlur, ...rest }: InputProps) => (
  <input
    type="text"
    pattern="[0-9]"
    maxLength={2}
    id={id}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    className="max-w-[2ch] text-card-foreground bg-card"
    {...rest}
  />
);
export default Input;
