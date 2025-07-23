export type Option<T extends string | number> = {
  label: string;
  value: T;
};

interface CustomSelectProps<T extends string | number> {
  label: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

function CustomSelect<T extends string | number>({
  label,
  options,
  value,
  onChange,
  className = "",
}: CustomSelectProps<T>): JSX.Element | null {
  return (
    <label>
      {label}{" "}
      <select
        value={value}
        className={className}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          onChange(e.target.value as T)
        }
      >
        {options.map((opt: Option<T>) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default CustomSelect;
