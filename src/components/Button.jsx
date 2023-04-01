import { Button } from "react-daisyui";

export function Btn({ id, label, className, disabled, icon, onClick }) {
  return (
    <Button
      id={id}
      className={`bg-[#9ca3af] text-black hover:bg-[#ef4444] border-none rounded-full w-full disabled:bg-[#312e81] disabled:text-gray-50 ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label} {icon}
    </Button>
  );
}

export function Btns({ id, label, className, disabled, icon, onClick }) {
  return (
    <Button
      id={id}
      className={`bg-[#9ca3af] text-black hover:bg-[#ef4444] border-none rounded-full w-full ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label} {icon}
    </Button>
  );
}
