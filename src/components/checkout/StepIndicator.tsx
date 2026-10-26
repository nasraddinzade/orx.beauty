import { CheckIcon } from "@/components/Icons";

type Props = { current: 1 | 2; labels: [string, string] };

export function StepIndicator({ current, labels }: Props) {
  return (
    <ol className="flex items-center gap-2">
      {labels.map((label, i) => {
        const n = (i + 1) as 1 | 2;
        const done = n < current;
        const active = n === current;
        return (
          <li
            key={label}
            className={`flex min-w-0 items-center gap-2 ${
              i < labels.length - 1 ? "flex-1" : "sm:flex-1"
            }`}
          >
            <span
              aria-current={active ? "step" : undefined}
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                done
                  ? "bg-teal text-ivory"
                  : active
                    ? "bg-navy text-ivory"
                    : "border border-gold/50 bg-ivory text-muted"
              }`}
            >
              {done ? <CheckIcon className="h-4 w-4" /> : n}
            </span>
            <span
              className={`text-sm ${
                active ? "font-semibold text-navy" : "hidden text-muted sm:inline"
              }`}
            >
              {label}
            </span>
            {i < labels.length - 1 && (
              <span
                aria-hidden="true"
                className={`h-px min-w-4 flex-1 ${done ? "bg-teal" : "bg-gold/40"}`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
