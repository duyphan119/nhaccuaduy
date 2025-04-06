import { useSound } from "@/hooks/useSound";
import { COLOR } from "@/utils/constants";
import Slider from "@react-native-community/slider";
import { Dimensions, ViewStyle } from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export type SoundTimeSliderProps = {
  style?: ViewStyle;
  minimumTrackTintColor?: string;
  maximumTrackTintColor?: string;
  thumbTintColor?: string;
};

export default function SoundTimeSlider({
  style = { width: SCREEN_WIDTH - 32, height: 40, margin: "auto" },
  minimumTrackTintColor = "#FFFFFF",
  maximumTrackTintColor = "#000000",
  thumbTintColor = COLOR.WHITE,
}: SoundTimeSliderProps) {
  const { sound, status, setStatus } = useSound();
  if (!status || !sound) return null;
  return (
    <Slider
      minimumValue={0}
      maximumValue={status.durationMillis}
      value={status.positionMillis}
      onSlidingStart={async () => {
        await sound.pauseAsync();
      }}
      onSlidingComplete={async (value) => {
        setStatus({ ...status, positionMillis: value, isPlaying: true });
        await sound.playFromPositionAsync(value);
      }}
      minimumTrackTintColor={minimumTrackTintColor}
      maximumTrackTintColor={maximumTrackTintColor}
      thumbTintColor={thumbTintColor}
      style={style}
    />
  );
}
