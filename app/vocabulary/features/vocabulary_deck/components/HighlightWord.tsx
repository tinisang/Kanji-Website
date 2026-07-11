interface HighlightWordProps {
  text: string;
  target: string;
  className?: string;
  highlightClassName?: string;
}

export default function HighlightWord({
  text,
  target,
  className,
  highlightClassName = "opacity-30",
}: HighlightWordProps) {
  if (!target || !text.includes(target)) {
    return <span className={className}>{text}</span>;
  }

  const parts = text.split(target);

  return (
    <span className={className}>
      {parts.map((part, index) => (
        <span key={index}>
          {index > 0 && (
            <span className={highlightClassName}>
              {target}
            </span>
          )}
          {part}
        </span>
      ))}
    </span>
  );
}