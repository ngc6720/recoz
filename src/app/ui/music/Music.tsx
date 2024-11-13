"use client";
import { usePlaylistValue } from "@/app/lib/contexts/playlistContext";
import { useTracklist } from "@/app/lib/contexts/queryContext";
import { useCallback, useEffect, useRef } from "react";
import { useNotify } from "@/app/ui//notification/NotificationContext";
import { Howl } from "howler";

import { Recommendations, TrackWithSound, Track } from "@/types/types";

import styles from "./style.module.css";

function isOverflownX(element: HTMLElement, container: HTMLElement) {
  return element.clientWidth > container.clientWidth;
}

const Item = ({
  track,
  play,
  n,
}: {
  track: TrackWithSound;
  play: (id: string | null) => void;
  n: number;
}) => {
  const textRef = useRef<HTMLLIElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const notify = useNotify();

  const checkOverflow = () => {
    if (!textRef.current || !btnRef.current) return;
    if (isOverflownX(textRef.current, btnRef.current))
      btnRef.current.classList.add(styles.overflown);
    else btnRef.current.classList.remove(styles.overflown);
  };

  useEffect(() => {
    window.addEventListener("resize", checkOverflow);
    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, []);

  useEffect(() => {
    checkOverflow();
    track.sound.on("play", () => {
      btnRef.current?.classList.add(styles.playing);
    });
    track.sound.on("end", () => {
      btnRef.current?.classList.remove(styles.playing);
    });
    track.sound.on("stop", () => {
      btnRef.current?.classList.remove(styles.playing);
    });
    return () => {
      track.sound.off();
      track.sound.stop();
    };
  }, [play, track]);

  return (
    <li className={styles.track}>
      <button
        ref={btnRef}
        onClick={() => {
          if (track.sound.playing()) play(null);
          else play(track.id);
        }}
      >
        <span>
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
            className={styles["icon-playstate"]}
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M7 4v16l13 -8z" />
          </svg>

          <span className={styles.artist}>{track.artist}</span>
          <span className={styles.title}>
            <span ref={textRef}>{track.name}</span>
            <span>{track.name}</span>
          </span>
        </span>
      </button>

      <div className={styles.info}>
        <span>{n + 1}</span>
      </div>
      <div className={styles.buttons}>
        <button
          title="Copy to clipboard"
          onClick={async () =>
            navigator.clipboard
              .writeText(`${track.name} ${track.artist}`)
              .then(() =>
                notify({ type: "success", message: "Copied to clipboard !" })
              )
          }
        >
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
            <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" />
            <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" />
          </svg>
        </button>
        <a
          href={`http://open.spotify.com/track/${track.id}`}
          target="blank"
          title="Listen in Spotify"
        >
          <svg
            data-encore-id="icon"
            role="img"
            aria-hidden="true"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              stroke="none"
              d="M12.438 1.009C6.368.769 1.251 5.494 1.008 11.565c-.24 6.07 4.485 11.186 10.556 11.426 6.07.242 11.185-4.484 11.427-10.554.242-6.07-4.484-11.186-10.553-11.428Zm4.644 16.114a.657.657 0 0 1-.897.246 13.22 13.22 0 0 0-4.71-1.602 13.197 13.197 0 0 0-4.968.242.658.658 0 0 1-.31-1.278 14.497 14.497 0 0 1 5.46-.265c1.837.257 3.579.851 5.177 1.76.315.178.425.58.246.896l.002.002Zm1.445-2.887a.853.853 0 0 1-1.158.344 16.214 16.214 0 0 0-5.475-1.797 16.188 16.188 0 0 0-5.758.219.855.855 0 0 1-1.018-.65.852.852 0 0 1 .65-1.018 17.92 17.92 0 0 1 6.362-.241 17.87 17.87 0 0 1 6.049 1.985c.415.224.57.743.344 1.158h.004Zm1.602-3.255a1.052 1.052 0 0 1-1.418.448 19.673 19.673 0 0 0-6.341-2.025 19.642 19.642 0 0 0-6.655.199 1.05 1.05 0 1 1-.417-2.06 21.725 21.725 0 0 1 7.364-.22 21.72 21.72 0 0 1 7.019 2.24c.515.268.715.903.448 1.418Z"
            ></path>
          </svg>
        </a>
      </div>
    </li>
  );
};

export default function Music(props: React.ComponentPropsWithoutRef<"div">) {
  const init = useRef(false);
  const sounds = useRef<TrackWithSound[] | null>(null);

  const { seed } = usePlaylistValue();

  const { data: tracks, isFetching: isPending } = useTracklist();
  const notify = useNotify();

  const playingId = useRef<string | null>(null);

  const play = useCallback((id: string | null) => {
    if (!sounds.current) {
      return;
    }

    const currentPlaying = sounds.current?.find(
      (s) => s.id === playingId.current
    );

    currentPlaying?.sound.stop();

    if (id === null) {
      playingId.current = null;
      return;
    }

    const newPlaying = sounds.current.find((s) => s.id === id);
    newPlaying?.sound.play();
    playingId.current = id;
  }, []);

  useEffect(() => {
    if (sounds.current) sounds.current.forEach((s) => s.sound.stop());
    if (!tracks || !seed) return;

    const seedTrack: Track | null =
      seed.preview_url && seed.artist
        ? {
            id: seed.id,
            name: seed.name,
            artist: seed.artist,
            preview_url: seed.preview_url,
          }
        : null;

    const ts: Recommendations = seedTrack ? [seedTrack, ...tracks] : tracks;

    sounds.current = ts.map((t) => ({
      ...t,
      sound: new Howl({
        html5: true,
        src: [t.preview_url ?? ""],
      }),
    }));

    if (tracks) notify({ message: "New Playlist", type: "info" });
  }, [tracks, seed, notify]);

  useEffect(() => {
    init.current = true;
    return () => {
      init.current = false;
      playingId.current = null;
    };
  }, []);

  useEffect(() => {
    notify({ message: "Connected to Spotify", type: "success" });
  }, [notify]);

  return (
    <div {...props}>
      {isPending && seed && <div>generating...</div>}
      {!isPending && Array.isArray(sounds.current) && (
        <ul className={styles.list}>
          {sounds.current.map((t, n) => (
            <Item key={t.id} track={t} play={play} n={n} />
          ))}
        </ul>
      )}
    </div>
  );
}
