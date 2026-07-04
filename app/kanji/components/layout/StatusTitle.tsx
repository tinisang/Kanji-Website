export default function StatusTitle({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-xl font-bold bg-[#E1FF39] flex m-auto">
      {children}
    </h1>
  );
}
