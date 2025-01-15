import React from "react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: Array<{
    label: string;
    value: string | number;
  }>;
}

export const Select: React.FC<SelectProps> = ({
  className = "",
  options = [],
  ...props
}) => {
  return (
    <select
      className={`w-full px-3 py-2 border rounded-md ${className}`}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
