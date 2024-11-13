"use client";

import { useEffect, useMemo } from "react";
import styles from "./style.module.css";

export default function Slider({
  id,
  name = "Slider",
  min = 0,
  max = 1,
  value,
  setValue,
  cb,
  fallback = 0,
}: {
  id: string;
  name?: string;
  min?: number;
  max?: number;
  value: number | null;
  setValue: React.Dispatch<number>;
  cb: (v: number) => void;
  fallback: number;
}) {
  useEffect(() => {
    if (value === null) {
      setValue(fallback);
      return;
    }
    cb(value);
  }, [value, setValue, fallback, cb]);

  const disabled = useMemo(() => value === null, [value]);

  return (
    <div className={styles.slider}>
      <input
        type="range"
        min={min}
        max={max}
        step={0.01}
        value={value !== null ? value : fallback}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const v = parseFloat(e.target.value);
          setValue(v);
        }}
        disabled={disabled}
      />
      <label htmlFor={id}>{name}</label>
    </div>
  );
}
