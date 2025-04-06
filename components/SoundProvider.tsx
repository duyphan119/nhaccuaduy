import { usePlaylistsStore } from "@/hooks/usePlaylistsStore";
import { useSongsStore } from "@/hooks/useSongsStore";
import { SoundStatus } from "@/types";
import { Audio } from "expo-av";
import { createContext, useEffect, useState } from "react";

type SoundContextProps = {
  sound: Audio.Sound | undefined;
  status: SoundStatus | undefined;
  unload: () => Promise<void>;
  createSound: (uri: string) => Promise<void>;
  pause: () => Promise<void>;
  resume: () => Promise<void>;
  setStatus: (status: SoundStatus) => void;
};

export const SoundContext = createContext<SoundContextProps>({
  sound: undefined,
  status: undefined,
  unload: async () => {},
  createSound: async (uri: string) => {},
  pause: async () => {},
  resume: async () => {},
  setStatus: (status: SoundStatus) => {},
});

type SoundProviderProps = {
  children: React.ReactNode;
};

export default function SoundProvider({ children }: SoundProviderProps) {
  const [sound, setSound] = useState<Audio.Sound>();
  const [status, setStatus] = useState<SoundStatus>();

  const {
    playingSong,
    playNext: playNextSong,
    playbackMode,
    setPlayingSong,
  } = useSongsStore();
  const { playingPlaylist } = usePlaylistsStore();

  useEffect(() => {
    if (playingSong) {
      createSound(playingSong.uri);
    } else {
      unload();
    }
  }, [playingSong]);

  useEffect(() => {
    if (status && status.didJustFinish) {
      playNext();
    }
  }, [status]);

  useEffect(() => {
    return sound
      ? () => {
          unload();
        }
      : undefined;
  }, []);

  const createSound = async (uri: string) => {
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync({
      uri,
    });
    await newSound.playAsync();
    newSound.setOnPlaybackStatusUpdate((statusValue) => {
      setStatus(statusValue as SoundStatus);
    });
    const newStatus = (await newSound.getStatusAsync()) as SoundStatus;
    setSound(newSound);
    setStatus(newStatus);
  };

  const pause = async () => {
    if (sound) {
      await sound.pauseAsync();
      setStatus(
        (prevStatus) => ({ ...prevStatus, isPlaying: false } as SoundStatus)
      );
    }
  };

  const resume = async () => {
    if (sound) {
      await sound.playAsync();
      setStatus(
        (prevStatus) => ({ ...prevStatus, isPlaying: true } as SoundStatus)
      );
    }
  };

  const playNext = async () => {
    if (sound) {
      await sound.unloadAsync();
    }
    playNextSong(playingPlaylist, playbackMode);
  };

  const unload = async () => {
    if (sound) {
      await sound.unloadAsync();
      setSound(undefined);
      setStatus(undefined);
      setPlayingSong(null);
    }
  };

  return (
    <SoundContext.Provider
      value={{
        sound,
        status,
        unload,
        createSound,
        pause,
        resume,
        setStatus,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}
