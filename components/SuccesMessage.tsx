import { CheckIcon } from "lucide-react";

export default function SuccessMessage({ text }: { text: string }): React.ReactNode {
  return (
    <div className="flex flex-row gap-2">
      <CheckIcon color="green" />
      {text}
    </div>
  );
}
