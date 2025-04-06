import { Playlist, Song } from "@/types";
import { getNextSong, getPreviousSong } from "@/utils";
import { PLAYBACK_MODE } from "@/utils/constants";
import { create } from "zustand";

type State = {
  playingSong: Song | null;
  nextSong: Song | null;
  previousSongs: Song[];
  playbackMode: PLAYBACK_MODE;
  musicPlayerVisible: boolean;
  currentSongAction: Song | null;

  playSong: (
    song: Song,
    playlist: Playlist,
    playbackMode: PLAYBACK_MODE
  ) => void;
  playNext: (playlist: Playlist, playbackMode: PLAYBACK_MODE) => void;
  playPrevious: (playlist: Playlist, playbackMode: PLAYBACK_MODE) => void;
  selectPlaybackMode: (playbackMode: PLAYBACK_MODE) => void;
  openMusicPlayer: () => void;
  closeMusicPlayer: () => void;
  setPlayingSong: (song: Song | null) => void;
  setCurrentSongAction: (song: Song | null) => void;
};

export const useSongsStore = create<State>((set) => ({
  playingSong: null,
  nextSong: null,
  previousSongs: [],
  playbackMode: PLAYBACK_MODE.REPEAT_ALL,
  musicPlayerVisible: false,
  currentSongAction: null,

  playSong: (song: Song, playlist: Playlist, playbackMode: PLAYBACK_MODE) =>
    set((state) => {
      return {
        ...state,
        playingSong: song,
        nextSong: getNextSong({
          playingSong: song,
          songs: playlist.songs,
          playbackMode,
        }),
      };
    }),
  playNext: (playlist: Playlist, playbackMode: PLAYBACK_MODE) =>
    set((state) => {
      if (!state.nextSong || !state.playingSong) return state;
      return {
        ...state,
        playingSong: state.nextSong,
        nextSong: getNextSong({
          playingSong: state.nextSong,
          songs: playlist.songs,
          playbackMode,
        }),
        previousSongs: [...state.previousSongs, state.playingSong],
      };
    }),
  playPrevious: (playlist: Playlist, playbackMode: PLAYBACK_MODE) =>
    set((state) => {
      if (!state.playingSong) return state;

      let curSong: Song | null = null;
      const newPreviousSongs = [...state.previousSongs];

      if (state.previousSongs.length === 0) {
        curSong = getPreviousSong({
          songs: playlist.songs,
          playbackMode,
          playingSong: state.playingSong,
        });
      } else {
        curSong = newPreviousSongs.shift() as Song;
      }

      if (!curSong) return state;

      return {
        ...state,
        playingSong: curSong,
        nextSong: state.playingSong,
        previousSongs: newPreviousSongs,
      };
    }),
  selectPlaybackMode: (playbackMode: PLAYBACK_MODE) =>
    set((state) => {
      const newPlaybackMode =
        playbackMode === state.playbackMode
          ? PLAYBACK_MODE.REPEAT_ALL
          : playbackMode;
      return {
        ...state,
        playbackMode: newPlaybackMode,
      };
    }),
  openMusicPlayer: () =>
    set((state) => ({ ...state, musicPlayerVisible: true })),
  closeMusicPlayer: () =>
    set((state) => ({ ...state, musicPlayerVisible: false })),
  setPlayingSong: (song: Song | null) => set({ playingSong: song }),
  setCurrentSongAction: (song: Song | null) => set({ currentSongAction: song }),
}));
