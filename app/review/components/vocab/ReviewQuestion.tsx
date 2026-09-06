interface Props {
  word: string;
}

export default function ReviewQuestion({
  word,
}: Props) {
  return (
    <div
      className="
        relative
        flex
        min-h-[150px]
        items-center
        justify-center
        bg-emerald-50/80
        px-4
        sm:min-h-[175px]
      "
    >
      <div
        className="
          absolute
          inset-x-0
          top-0
          h-1
          bg-emerald-400
        "
      />

      <div
        className="
          break-words
          text-6xl
          font-bold
          tracking-tight
          sm:text-7xl
          md:text-8xl
        "
      >
        {word}
      </div>
    </div>
  );
}