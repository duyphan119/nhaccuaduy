import { Audio } from "expo-av";
import { useEffect } from "react";

export default function useSetupAudio() {
  useEffect(() => {
    Audio.setAudioModeAsync({
      staysActiveInBackground: true,
    });
  }, []);
}
