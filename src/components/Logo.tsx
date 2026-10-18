type LogoProps = {
  className?: string;
  dark?: boolean;
};

export function Logo({ className = '', dark = false }: LogoProps) {
  const textColor = dark ? 'text-white' : 'text-stone-900';
  const subColor = dark ? 'text-bronze-soft' : 'text-bronze';

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 40 40"
        className="h-9 w-9 shrink-0"
        fill="none"
        aria-hidden="true"
      >
        <path d="M20 4 L7 14 L12 14 L12 30 L28 30 L28 14 L33 14 Z" fill={dark ? 'rgb(var(--color-bronze-soft))' : 'rgb(var(--color-olive))'} />
        <circle cx="20" cy="21" r="2.5" fill={dark ? 'rgb(var(--color-olive))' : 'rgb(var(--color-ivory))'} />
        <path d="M14 30 L20 26 L26 30" stroke={dark ? 'rgb(var(--color-bronze-soft))' : 'rgb(var(--color-bronze))'} strokeWidth="1.5" fill="none" />
      </svg>
      <div className="flex flex-col leading-none">
        <span className={`font-serif text-xl font-semibold tracking-wide ${textColor}`}>AuraResort</span>
        <span className={`font-sans text-[8px] uppercase tracking-ultra-wider ${subColor} mt-1`}>
          Private Island Retreat
        </span>
      </div>
    </div>
  );
}
