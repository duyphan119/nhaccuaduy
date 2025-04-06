import ModalAddSongs from "@/components/modals/ModalAddSongs";
import ModalPlaylistForm from "@/components/modals/ModalPlaylistForm";
import ModalSongs from "@/components/modals/ModalSongs";
import PlaylistDetail from "@/components/PlaylistDetail";
import PlaylistItem from "@/components/PlaylistItem";
import useCustomBackHandler from "@/hooks/useCustomBackHandler";
import { usePlaylistsStore } from "@/hooks/usePlaylistsStore";
import { utilsStyles } from "@/utils/styles";
import { FlatList, View } from "react-native";

export default function TabPlaylist() {
  const {
    playlists: [_, ...playlists],
    playlistDetailVisible,
    showPlaylistDetail,
    hidePlaylistDetail,
  } = usePlaylistsStore();

  useCustomBackHandler(playlistDetailVisible, () => {
    hidePlaylistDetail();
  });

  return (
    <>
      <View style={utilsStyles.container}>
        <PlaylistDetail />
        {!playlistDetailVisible && (
          <View style={{ paddingInline: 10 }}>
            <FlatList
              data={playlists}
              keyExtractor={(item) => item.name}
              renderItem={({ item }) => (
                <PlaylistItem
                  playlist={item}
                  onPress={() => {
                    showPlaylistDetail(item);
                  }}
                />
              )}
            />
          </View>
        )}
      </View>
      <ModalPlaylistForm />
      <ModalAddSongs />
      {/* <ModalSongs /> */}
    </>
  );
}
