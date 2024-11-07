import { ChangeEvent } from "react";

export type DropdownOption = {
  label: string;
};

type DropdownProps = {
  name: string;
  options: DropdownOption[];
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => any;
};

const Dropdown = ({ name, options, handleChange }: DropdownProps) => {
  return (
    <select
      className="border border-black py-1 px-4"
      name={name}
      onChange={handleChange}
    >
      {options.map((option) => (
        <option className="py-1 px-2" key={option.label}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
