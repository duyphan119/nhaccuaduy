import { IconFavorite, IconPlaylist } from "@/components/Icons";
import { usePlaylistsStore } from "@/hooks/usePlaylistsStore";
import { Playlist } from "@/types";
import { COLOR, GAP, PADDING } from "@/utils/constants";
import {
  Fontisto,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ButtonMore from "./ButtonMore";
import { useDeletePlaylists } from "@/hooks/useDeletePlaylists";
import ButtonPlaylistMore from "./ButtonPlaylistMore";

const IMAGE_WIDTH = 72;

type PlaylistItemProps = {
  playlist: Playlist;
  onPress: () => void;
};

export default function PlaylistItem({
  playlist,
  onPress: handlePress,
}: PlaylistItemProps) {
  const {
    selectingPlaylistNames,
    modalPlaylistsVisible,
    deletePlaylists,
    openModalPlaylistForm,
    setCurrentPlaylistAction,
  } = usePlaylistsStore();

  const { mutate: deletePlaylistsMutate } = useDeletePlaylists();

  const isChecked = useMemo(() => {
    return selectingPlaylistNames.includes(playlist.name);
  }, [selectingPlaylistNames]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.song}>
        {modalPlaylistsVisible && <Checkbox value={isChecked} />}
        {playlist.name === "Yêu thích" ? (
          <IconFavorite size={IMAGE_WIDTH} iconSize={IMAGE_WIDTH / 2} />
        ) : (
          <IconPlaylist size={IMAGE_WIDTH} iconSize={IMAGE_WIDTH / 2} />
        )}
        <View style={{ flex: 1 }}>
          <Text style={styles.playlistName}>{playlist.name}</Text>
          {playlist.songs.length > 0 && (
            <Text style={styles.songCount}>
              {playlist.songs.length} bài hát
            </Text>
          )}
        </View>
      </TouchableOpacity>
      {!modalPlaylistsVisible && <ButtonPlaylistMore playlist={playlist} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: GAP,
    // paddingInline: PADDING,
    paddingBlock: PADDING / 2,
    alignItems: "center",
  },
  song: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: GAP,
  },
  checkbox: {},

  playlistName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLOR.WHITE,
  },
  songCount: {
    fontSize: 12,
    color: COLOR.TEXT,
  },
});
