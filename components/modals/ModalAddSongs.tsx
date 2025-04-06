import FooterOkCancel from "@/components/FooterOkCancel";
import Modal from "@/components/modals/Modal";
import SongItem from "@/components/SongItem";
import { useAddSongsToPlaylist } from "@/hooks/useAddSongToPlaylist";
import { usePlaylistsStore } from "@/hooks/usePlaylistsStore";
import { COLOR } from "@/utils/constants";
import { utilsStyles } from "@/utils/styles";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ModalAddSongs() {
  const {
    playlists,
    modalAddSongsVisible,
    selectingSongs,
    currentPlaylistAction,
    closeModalAddSongs,
    selectSong,
    addSongs,
  } = usePlaylistsStore();

  const songs = playlists?.[0]?.songs || [];

  const { mutate } = useAddSongsToPlaylist();

  return (
    <Modal visible={modalAddSongsVisible} onClose={closeModalAddSongs}>
      <View style={styles.container}>
        <Text style={[utilsStyles.text, { fontSize: 24, fontWeight: "bold" }]}>
          THÊM BÀI HÁT VÀO PLAYLIST
        </Text>
        <ScrollView>
          {songs.map((song) => (
            <SongItem
              key={song.id}
              onPress={() => selectSong(song)}
              song={song}
            />
          ))}
        </ScrollView>
        <FooterOkCancel
          onCancel={closeModalAddSongs}
          onOk={() => {
            if (currentPlaylistAction) {
              mutate(
                {
                  playlistName: currentPlaylistAction.name,
                  songIds: selectingSongs.map(({ id }) => id),
                },
                {
                  onSuccess: () => {
                    addSongs(currentPlaylistAction.name, selectingSongs);
                    closeModalAddSongs();
                  },
                }
              );
            }
          }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: Math.min(SCREEN_HEIGHT / 1.5, 520),
    backgroundColor: COLOR.BACKGROUND2,
    gap: 10,
    padding: 10,
  },
});
