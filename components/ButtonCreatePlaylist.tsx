import { usePlaylistsStore } from "@/hooks/usePlaylistsStore";
import { COLOR } from "@/utils/constants";
import { utilsStyles } from "@/utils/styles";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export function IconCreatePlaylist() {
  const { openModalPlaylistForm } = usePlaylistsStore();

  return (
    <TouchableOpacity onPress={openModalPlaylistForm} style={{ padding: 5 }}>
      <MaterialIcons name="add" size={24} color={COLOR.WHITE} />
    </TouchableOpacity>
  );
}

type ButtonCreatePlaylistProps = {
  style?: ViewStyle;
};
export default function ButtonCreatePlaylist({
  style,
}: ButtonCreatePlaylistProps) {
  const { openModalPlaylistForm } = usePlaylistsStore();

  return (
    <TouchableOpacity
      onPress={openModalPlaylistForm}
      style={[styles.button, style]}
    >
      <MaterialIcons name="add" size={20} color={COLOR.TEXT} />
      <Text style={[utilsStyles.text, { fontSize: 18 }]}>
        THÊM DANH SÁCH PHÁT
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLOR.BACKGROUND,
    padding: 10,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH / 1.5,
    borderRadius: 4,
  },
});
