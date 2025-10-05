export default function SectionHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-10">
      <h2 className="font-serif text-4xl font-semibold gradient-text mb-2">{title}</h2>
      <p className="text-[var(--text-secondary)] max-w-xl mx-auto">{subtitle}</p>
    </div>
  );
}
