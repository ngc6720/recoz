"use client";

import Slider from "./slider/Slider";
import { Howler } from "howler";
import useLocalStorage from "@/app/lib/hooks/useLocalStorage";
import { useCallback } from "react";

export default function AudioSliders() {
  const [volume, setVolume] = useLocalStorage<number>("volume");

  const map = useCallback((vol: number): void => {
    Howler.volume(vol);
  }, []);

  return (
    <Slider
      name="Volume"
      id="slider-volume"
      value={volume}
      setValue={setVolume}
      cb={map}
      fallback={0.75}
    />
  );
}
