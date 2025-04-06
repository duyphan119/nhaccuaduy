import ButtonCreatePlaylist from "@/components/ButtonCreatePlaylist";
import FooterOkCancel from "@/components/FooterOkCancel";
import Modal from "@/components/modals/Modal";
import PlaylistItem from "@/components/PlaylistItem";
import { useAddSongToPlaylists } from "@/hooks/useAddSongToPlaylists";
import { usePlaylistsStore } from "@/hooks/usePlaylistsStore";
import { useSongsStore } from "@/hooks/useSongsStore";
import { COLOR } from "@/utils/constants";
import { utilsStyles } from "@/utils/styles";
import { useMemo } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ModalPlaylists() {
  const { currentSongAction } = useSongsStore();

  const {
    modalPlaylistsVisible,
    selectingPlaylistNames,
    playlists: [_, ...playlists],
    closeModalPlaylists,
    selectPlaylist,
    addSongToPlaylists,
  } = usePlaylistsStore();

  const { mutate } = useAddSongToPlaylists();

  const validPlaylists = useMemo(() => {
    return (
      (currentSongAction &&
        playlists.filter(
          (playlist) =>
            playlist.songs.findIndex(
              (song) => song.id === currentSongAction.id
            ) === -1
        )) ||
      playlists
    );
  }, [currentSongAction, playlists]);

  return (
    <Modal visible={modalPlaylistsVisible} onClose={closeModalPlaylists}>
      <View
        style={{
          backgroundColor: COLOR.BACKGROUND2,
          maxHeight: SCREEN_HEIGHT / 2,
          padding: 10,
          gap: 10,
        }}
      >
        <Text
          style={[
            utilsStyles.text,
            {
              fontSize: 18,
              fontWeight: "bold",
            },
          ]}
        >
          CHỌN DANH SÁCH PHÁT
        </Text>
        {validPlaylists.length > 0 ? (
          <>
            <ScrollView>
              {validPlaylists.map((playlist) => (
                <PlaylistItem
                  key={playlist.name}
                  playlist={playlist}
                  onPress={() => {
                    selectPlaylist(playlist.name);
                  }}
                />
              ))}
            </ScrollView>
            <FooterOkCancel
              onCancel={closeModalPlaylists}
              onOk={() => {
                if (currentSongAction) {
                  mutate(
                    {
                      playlistNames: selectingPlaylistNames,
                      songId: currentSongAction.id,
                    },
                    {
                      onSuccess: () => {
                        addSongToPlaylists(
                          currentSongAction,
                          selectingPlaylistNames
                        );
                        closeModalPlaylists();
                      },
                    }
                  );
                }
              }}
            />
          </>
        ) : (
          <ButtonCreatePlaylist style={{ marginInline: "auto" }} />
        )}
      </View>
    </Modal>
  );
}
