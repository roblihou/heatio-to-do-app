interface Props {
  value: string;
  setValue: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  autoFocus?: boolean;
  onEnter?: () => void;
  strikeThrough?: boolean;
}

export default function Text({
  value,
  setValue,
  onFocus,
  onBlur,
  autoFocus,
  onEnter,
  strikeThrough,
}: Props) {
  return (
    <input
      type="text"
      className={`w-full bg-transparent border-none outline-none ${
        strikeThrough ? "line-through text-gray-500" : "text-white"
      }`}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onFocus={onFocus}
      onBlur={onBlur}
      autoFocus={autoFocus}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !!onEnter) {
          e.preventDefault();
          onEnter();
        }
      }}
    />
  );
}
