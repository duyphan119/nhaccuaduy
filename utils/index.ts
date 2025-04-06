import * as MediaLibrary from "expo-media-library";
import { PLAYBACK_MODE } from "./constants";

export const extractSongFilename = (filename: string) => {
  let name = filename;
  let author = "Unknown";
  const splitFilename = filename.split(" - ");
  if (splitFilename.length > 1) {
    name = splitFilename[0];
    author = splitFilename[1].split(".").shift() || "Unknown";
  }

  return { name, author };
};

export const formatTime = (milliseconds: number) => {
  const totalSeconds = Math.floor(milliseconds / 1000); // Chuyển từ ms sang s
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const getPreviousSong = ({
  playingSong,
  playbackMode,
  songs,
}: {
  playingSong: MediaLibrary.Asset;
  songs: MediaLibrary.Asset[];
  playbackMode: PLAYBACK_MODE;
}): MediaLibrary.Asset => {
  if (playbackMode === PLAYBACK_MODE.SHUFFLE) {
    let prevIndex = Math.floor(Math.random() * songs.length);
    while (
      prevIndex === songs.findIndex((song) => song.uri === playingSong.uri)
    ) {
      prevIndex = Math.floor(Math.random() * songs.length);
    }
    return songs[prevIndex];
  }

  if (playbackMode === PLAYBACK_MODE.REPEAT_ONE) {
    return playingSong;
  }

  const index = songs.findIndex((song) => song.uri === playingSong.uri);
  if (index !== -1) {
    const previousIndex = (index - 1 + songs.length) % songs.length;
    return songs[previousIndex];
  }

  return playingSong;
};

export const getNextSong = ({
  playingSong,
  playbackMode,
  songs,
}: {
  playingSong?: MediaLibrary.Asset;
  songs: MediaLibrary.Asset[];
  playbackMode: PLAYBACK_MODE;
}): MediaLibrary.Asset => {
  if (!playingSong || playbackMode === PLAYBACK_MODE.SHUFFLE) {
    return songs[Math.floor(Math.random() * songs.length)];
  }

  if (playbackMode === PLAYBACK_MODE.REPEAT_ONE) {
    return playingSong;
  }

  const index = songs.findIndex((song) => song.uri === playingSong.uri);
  if (index !== -1) {
    const nextIndex = (index + 1) % songs.length;
    return songs[nextIndex];
  }

  return playingSong;
};
