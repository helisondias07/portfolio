export default function StackTags({ stack }: { stack: string[] }) {
  return (
    <p className="lo-tags">
      {stack.slice(0, 5).map((item) => (
        <span key={item}>{item}</span>
      ))}
    </p>
  );
}
