"use client";

import * as Ariakit from "@ariakit/react";
import styles from "./style.module.css";

import { useEffect, useState, useRef } from "react";

import { useSearch } from "@/app/lib/contexts/queryContext";
import { useSetSeed } from "@/app/lib/contexts/playlistContext";

export default function Search() {
  const setSeed = useSetSeed();

  const [value, setValue] = useState("");
  const timerRef = useRef<null | ReturnType<typeof setTimeout>>(null);

  const { data } = useSearch(value);

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("");
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = null;
    timerRef.current = setTimeout(() => {
      setValue(e.target.value);
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      <Ariakit.ComboboxProvider>
        <Ariakit.ComboboxLabel className={styles.label}>
          Search for a track or an artist
        </Ariakit.ComboboxLabel>
        <span className={styles["combobox-wrapper"]}>
          <Ariakit.Combobox
            placeholder="Track, Artist..."
            className={styles.combobox}
            onInput={onInput}
            maxLength={30}
            autoSelect={true}
            autoComplete={"none"}
            title="Search some music"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>
          <Ariakit.ComboboxCancel
            className={`${styles.button} ${styles.secondary} ${styles["combobox-cancel"]}`}
            onClick={() => setValue("")}
          />
        </span>
        {data && data.length > 0 && (
          <Ariakit.ComboboxPopover
            gutter={16}
            sameWidth
            className={styles.popover}
          >
            {data.map((item) => (
              <Ariakit.ComboboxItem
                key={item.id}
                className={styles["combobox-item"]}
                value={item.name}
                onClick={() => {
                  setSeed(item);
                }}
              >
                {item.name} {item.artist && "[" + item.artist + "]"}
              </Ariakit.ComboboxItem>
            ))}
          </Ariakit.ComboboxPopover>
        )}
      </Ariakit.ComboboxProvider>
    </>
  );
}
