import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";

import { usePlaylistsStore } from "@/hooks/usePlaylistsStore";
import { Playlist } from "@/types";
import { COLOR } from "@/utils/constants";
import { MaterialIcons } from "@expo/vector-icons";
import { utilsStyles } from "@/utils/styles";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

type ButtonAddSongsToPlaylistProps = {
  playlist: Playlist;
};

export default function ButtonAddSongsToPlaylist({
  playlist,
}: ButtonAddSongsToPlaylistProps) {
  const { openModalAddSongs } = usePlaylistsStore();
  return (
    <TouchableOpacity
      onPress={() => openModalAddSongs(playlist)}
      style={styles.button}
    >
      <MaterialIcons name="add" size={20} color={COLOR.TEXT} />
      <Text style={[utilsStyles.text, { fontSize: 18 }]}>THÊM BÀI HÁT</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLOR.BACKGROUND2,
    padding: 10,
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH / 2,
    borderRadius: 4,
  },
});
