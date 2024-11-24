import { ChangeEventHandler, ComponentPropsWithoutRef } from "react";

interface InputProps extends ComponentPropsWithoutRef<"input"> {
  id: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur: ChangeEventHandler<HTMLInputElement>;
  cn?: string;
}

const Input = ({ id, value, onChange, onBlur, cn, ...rest }: InputProps) => (
  <input
    type="number"
    min="0"
    id={id}
    value={+value < 0 ? "00" : value}
    onKeyDown={(e) => {
      if (e.key === "-") {
        e.preventDefault();
      }
    }}
    onChange={(e) => {
      if (e.target.value.length <= 2) {
        onChange(e);
      } else {
        e.preventDefault();
      }
    }}
    onBlur={onBlur}
    className={`max-w-[2ch] text-card-foreground bg-card text-center ${cn}`}
    {...rest}
  />
);
export default Input;