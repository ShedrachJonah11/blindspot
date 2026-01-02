import clsx from "clsx";
import { UserItemStatus } from "@/types";

interface Props {
  value: UserItemStatus["status"];
  onChange: (status: UserItemStatus["status"]) => void;
}

export default function StatusToggle({ value, onChange }: Props) {
  return (
    <div className="inline-flex overflow-hidden rounded-full border border-white/10 bg-white/5 text-xs font-semibold">
      {[
        { key: "not_yet", label: "Not yet" },
        { key: "got_it", label: "Got it" }
      ].map((option) => (
        <button
          key={option.key}
          type="button"
          onClick={() => onChange(option.key as UserItemStatus["status"])}
          className={clsx(
            "px-3 py-2 transition",
            value === option.key
              ? option.key === "got_it"
                ? "bg-emerald-400 text-[#0f1729]"
                : "bg-white/20 text-white"
              : "text-ink-200 hover:bg-white/10"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
