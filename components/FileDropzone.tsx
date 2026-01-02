import React, { useCallback } from "react";

interface Props {
  label: string;
  accept: string;
  onFiles: (files: FileList) => void;
  hint?: string;
}

export default function FileDropzone({ label, accept, onFiles, hint }: Props) {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        onFiles(e.dataTransfer.files);
      }
    },
    [onFiles]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) onFiles(e.target.files);
  };

  return (
    <label
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-white/20 bg-white/5 px-6 py-10 text-center transition hover:border-white/40 hover:bg-white/10"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white">
        Upload
      </div>
      <div>
        <p className="font-semibold text-white">{label}</p>
        {hint && <p className="text-sm text-ink-300">{hint}</p>}
      </div>
      <input type="file" accept={accept} className="hidden" onChange={handleChange} />
    </label>
  );
}
