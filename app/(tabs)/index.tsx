import { usePlaylistsStore } from "@/hooks/usePlaylistsStore";
import { useSongsStore } from "@/hooks/useSongsStore";
import { utilsStyles } from "@/utils/styles";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLOR, PLAYBACK_MODE } from "@/utils/constants";
import { getNextSong } from "@/utils";
import Songs from "@/components/Songs";

export default function TabIndex() {
  const { playlists, setPlayingPlaylist } = usePlaylistsStore();

  const { playbackMode, playingSong, playSong, selectPlaybackMode } =
    useSongsStore();

  const playlist = playlists[0];

  const handlePressShuffle = () => {
    setPlayingPlaylist(playlist);
    const newPlaybackMode = PLAYBACK_MODE.SHUFFLE;
    selectPlaybackMode(newPlaybackMode);
    const song = getNextSong({
      songs: playlist.songs,
      playbackMode: newPlaybackMode,
      playingSong: playingSong || undefined,
    });
    playSong(song, playlist, newPlaybackMode);
  };

  const handlePressRepeatAll = () => {
    setPlayingPlaylist(playlist);
    const song = playlist.songs[0];
    if (!song) return;
    playSong(song, playlist, playbackMode);
  };

  if (!playlist) return null;
  return (
    <View style={[utilsStyles.container, { gap: 10 }]}>
      <View style={[utilsStyles.horizontalCenter, { gap: 10, padding: 10 }]}>
        <TouchableOpacity
          onPress={handlePressShuffle}
          style={[utilsStyles.horizontalCenter, styles.button]}
        >
          <MaterialIcons
            name="shuffle"
            size={20}
            color={styles.buttonText.color}
          />
          <Text style={styles.buttonText}>Ngẫu nhiên</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePressRepeatAll}
          style={[utilsStyles.horizontalCenter, styles.button]}
        >
          <MaterialIcons
            name="repeat"
            size={20}
            color={styles.buttonText.color}
          />
          <Text style={styles.buttonText}>Toàn bộ</Text>
        </TouchableOpacity>
      </View>
      <View style={{ paddingInline: 10 }}>
        <Songs playlist={playlist} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    gap: 5,
    paddingInline: 10,
    paddingBlock: 16,
    borderRadius: 4,
    backgroundColor: "#333",
    flex: 1,
  },
  buttonText: {
    color: COLOR.PRIMARY,
    fontSize: 16,
  },
});
