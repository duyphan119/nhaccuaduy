import * as MediaLibrary from "expo-media-library";
import { useEffect } from "react";

export default function useRequestPermissions() {
  useEffect(() => {
    const requestPermissions = async () => {
      const { granted } = await MediaLibrary.getPermissionsAsync();
      if (granted) return;
      await MediaLibrary.requestPermissionsAsync();
    };

    requestPermissions();
  }, []);
}
