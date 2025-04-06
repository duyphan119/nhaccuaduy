import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { usePlaylistsStore } from "@/hooks/usePlaylistsStore";
import { IconPlaylist } from "./Icons";
import { extractSongFilename } from "@/utils";
import { COLOR } from "@/utils/constants";
import Songs from "./Songs";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import ButtonAddSongsToPlaylist from "./ButtonAddSongsToPlaylist";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function PlaylistDetail() {
  const { playlistDetail, playlistDetailVisible } = usePlaylistsStore();
  if (!playlistDetailVisible || !playlistDetail) return null;

  return (
    <View style={{ gap: 10, alignItems: "center" }}>
      <IconPlaylist size={SCREEN_WIDTH / 1.2} iconSize={SCREEN_WIDTH / 2.4} />
      <Text style={{ color: COLOR.TEXT, fontSize: 20 }}>
        {playlistDetail.name}
      </Text>
      <View
        style={{
          width: SCREEN_WIDTH / 1.2,
          borderTopWidth: 1,
          borderColor: COLOR.BACKGROUND2,
          paddingTop: 10,
          alignItems: "center",
        }}
      >
        {playlistDetail.songs.length > 0 ? (
          <Songs playlist={playlistDetail} />
        ) : (
          <ButtonAddSongsToPlaylist playlist={playlistDetail} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
