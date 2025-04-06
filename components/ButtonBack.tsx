import { COLOR } from "@/utils/constants";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { PlayerControlProps } from "./PlayerControls";

type ButtonBackProps = Omit<PlayerControlProps, "activeColor"> & {
  onPress?: () => void;
};

export default function ButtonBack({
  color = COLOR.TEXT,
  iconSize = 24,
  style,
  onPress: handlePress,
}: ButtonBackProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => {
        if (handlePress) {
          handlePress();
        } else {
          router.canGoBack() && router.back();
        }
      }}
      style={[{ padding: 5 }, style]}
    >
      <AntDesign name="arrowleft" size={iconSize} color={color} />
    </TouchableOpacity>
  );
}
