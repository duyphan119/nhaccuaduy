import { usePlaylistsStore } from "@/hooks/usePlaylistsStore";
import { useSongsStore } from "@/hooks/useSongsStore";
import { Song } from "@/types";
import { utilsStyles } from "@/utils/styles";
import { FlatList, Modal, View } from "react-native";
import SongItem from "../SongItem";

export default function ModalSongs() {
  const {
    playlistDetail,
    playlistDetailVisible,
    hidePlaylistDetail,
    setPlayingPlaylist,
  } = usePlaylistsStore();

  const { playbackMode, playSong } = useSongsStore();

  const handlePress = async (song: Song) => {
    if (!playlistDetail) return;
    setPlayingPlaylist(playlistDetail);
    playSong(song, playlistDetail, playbackMode);
  };

  if (!playlistDetailVisible || !playlistDetail) return null;
  return (
    <Modal
      visible={playlistDetailVisible}
      onRequestClose={hidePlaylistDetail}
      animationType="fade"
      presentationStyle="formSheet"
    >
      <View style={utilsStyles.container}>
        <FlatList
          data={playlistDetail.songs}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <SongItem
              song={item}
              onPress={() => {
                handlePress(item);
              }}
            />
          )}
        />
      </View>
    </Modal>
  );
}
