import * as MediaLibrary from "expo-media-library";

export type Song = MediaLibrary.Asset;

export type SoundStatus = {
  androidImplementation: string;
  audioPan: number;
  didJustFinish: boolean;
  durationMillis: number;
  isBuffering: boolean;
  isLoaded: boolean;
  isLooping: boolean;
  isMuted: boolean;
  isPlaying: boolean;
  playableDurationMillis: number;
  positionMillis: number;
  progressUpdateIntervalMillis: number;
  rate: number;
  shouldCorrectPitch: boolean;
  shouldPlay: boolean;
  uri: string;
  volume: number;
};

export type PlaylistItem = {
  item_id: string;
  playlist: string;
  created_at: string;
};

export type Playlist = {
  name: string;
  songs: Song[];
};

export type Action<ActionType> = {
  type: ActionType;
  payload?: any;
};
