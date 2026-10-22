import { CopyableValue } from "./CopyableValue";

type LabeledValueProps = { label: string; value: string };

export function LabeledValue({ label, value }: LabeledValueProps) {
  return (
    <div className="min-w-0 space-y-1">
      <p className="text-xs text-panda-gray dark:text-white/50">{label}</p>
      <CopyableValue value={value} />
    </div>
  );
}
