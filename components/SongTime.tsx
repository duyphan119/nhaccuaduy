import { useSound } from "@/hooks/useSound";
import { formatTime } from "@/utils";
import { Dimensions, StyleSheet, Text, View, ViewStyle } from "react-native";
import SoundTimeSlider, { SoundTimeSliderProps } from "./SoundTimeSlider";
import { COLOR } from "@/utils/constants";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type SongTimeProps = SoundTimeSliderProps & {
  containerStyle?: ViewStyle;
};

export default function SongTime({ containerStyle, ...props }: SongTimeProps) {
  const { status } = useSound();
  if (!status) return null;
  return (
    <View style={[{ gap: 5 }, containerStyle]}>
      <View style={styles.timeContainer}>
        <Text style={styles.currentTime}>
          {formatTime(status.positionMillis || 0)}
        </Text>
        <Text style={styles.duration}>
          {formatTime(status.durationMillis || 0)}
        </Text>
      </View>
      <SoundTimeSlider {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  timeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginInline: 20,
  },
  currentTime: { color: COLOR.TEXT },
  duration: { color: COLOR.TEXT },
});
