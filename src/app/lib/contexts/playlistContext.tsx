"use client";

import { createContext, useReducer, useContext } from "react";
import { Seed } from "@/types/types";

type State = {
  seed: Seed | null | undefined;
};

type PlaylistContextType = {
  playlist: State;
  setSeed: (seed: Seed) => void;
};

type ActionType = {
  type: string;
  seed?: Seed;
};

const init: State = {
  seed: null,
};

const PlaylistContext = createContext<PlaylistContextType>({
  playlist: init,
  setSeed: () => {},
});

const reducer = (state: State, action: ActionType) => {
  if ((action.type = "setSeed")) {
    return { ...state, seed: action.seed };
  }
  return state;
};

export const PlaylistProvider: React.FC<{ children: React.ReactNode }> = (
  props: React.PropsWithChildren
) => {
  const [playlist, playlistDispatcher] = useReducer(reducer, init);

  return (
    <PlaylistContext.Provider
      value={{
        playlist: playlist,
        setSeed: (seed: Seed) => playlistDispatcher({ type: "setSeed", seed }),
      }}
    >
      {props.children}
    </PlaylistContext.Provider>
  );
};

export const usePlaylistValue = () => useContext(PlaylistContext).playlist;
export const useSetSeed = () => useContext(PlaylistContext).setSeed;
