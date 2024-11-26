import { Button } from "@/components/ui/button";

type Session = {
  id: number;
  text: string;
  defaultMinutes: string;
};

interface SessionTypeButtonGroupProps {
  activeID: number;
  onClick: (id: number, minutes: string) => void;
  disabled: boolean;
}

const sessions: Session[] = [
  { id: 1, text: "Pomodoro", defaultMinutes: "30" },
  { id: 2, text: "Short Break", defaultMinutes: "05" },
  { id: 3, text: "Long Break", defaultMinutes: "15" },
];

const SessionTypeButtonGroup = ({
  activeID,
  onClick,
  disabled,
}: SessionTypeButtonGroupProps) => {
  return (
    <div className="flex-1 gap-x-1 flex justify-center">
      {sessions.map(({ id, text, defaultMinutes }: Session) => (
        <Button
          key={id}
          id={`${text}-button`}
          aria-label={text}
          variant="outline"
          onClick={() => onClick(id, defaultMinutes)}
          className={`transition-colors duration-250 ${
            activeID !== id && "border-transparent"
          } ${activeID === id && "!opacity-100 hover:bg-background"} ${
            disabled && "text-transparent border-transparent bg-transparent"
          }`}
          aria-disabled={activeID === id || disabled}
          disabled={disabled}
        >
          {text}
        </Button>
      ))}
    </div>
  );
};

export default SessionTypeButtonGroup;
