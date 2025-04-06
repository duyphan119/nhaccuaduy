import { useSongsStore } from "@/hooks/useSongsStore";
import { extractSongFilename } from "@/utils";
import { COLOR } from "@/utils/constants";
import { utilsStyles } from "@/utils/styles";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IconSong } from "./Icons";
import {
  CloseControl,
  NextControl,
  PlayPauseControl,
  PreviousControl,
} from "./PlayerControls";
import SoundTimeSlider from "./SoundTimeSlider";
// import { useSound } from "../hooks/useSound";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function FloatingPlayer() {
  const { playingSong, musicPlayerVisible, openMusicPlayer } = useSongsStore();

  // const { sound, unload } = useSound();

  // useEffect(() => {
  //   return sound
  //     ? () => {
  //         unload();
  //       }
  //     : undefined;
  // }, [sound]);

  // console.log("playingSong", playingSong?.filename);
  if (!playingSong || musicPlayerVisible) return null;
  const { name } = extractSongFilename(playingSong.filename);
  return (
    <View style={styles.container}>
      <View style={[utilsStyles.horizontal]}>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            flex: 1,
          }}
          onPress={openMusicPlayer}
        >
          <IconSong iconSize={30} size={60} />
          <Text style={styles.songName}>{name}</Text>
        </TouchableOpacity>
        <View style={utilsStyles.songActions}>
          <PreviousControl />
          <PlayPauseControl />
          <NextControl />
          <CloseControl style={{ paddingRight: 1 }} />
        </View>
      </View>
      <SoundTimeSlider
        thumbTintColor="transparent"
        minimumTrackTintColor={COLOR.PRIMARY}
        style={styles.songTimeSlider}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLOR.BACKGROUND2,
    gap: 1,
    position: "absolute",
    bottom: 49,
    left: 0,
    right: 0,
    overflow: "hidden",
    paddingTop: 1,
  },
  songName: {
    ...utilsStyles.text,
    fontSize: 16,
    fontWeight: "600",
  },
  songAuthor: {
    color: COLOR.DRIMGRAY,
    fontSize: 12,
  },
  songTimeSlider: {
    width: SCREEN_WIDTH + 32,
    marginLeft: -16,
    height: 2,
  },
});
