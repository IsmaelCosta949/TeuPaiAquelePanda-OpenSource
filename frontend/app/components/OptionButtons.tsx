import { Button } from "./ui/button";

type OptionButtonsProps<T extends string> = {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
};

export function OptionButtons<T extends string>({
  label,
  options,
  value,
  onChange,
}: OptionButtonsProps<T>) {
  return (
    <div role="group" aria-label={label} className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Button
          key={option.value}
          size="sm"
          variant={option.value === value ? "default" : "outline"}
          aria-pressed={option.value === value}
          onPress={() => onChange(option.value)}
          className="rounded-full"
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}
