import ButtonSongMore from "@/components/ButtonSongMore";
import { IconSong } from "@/components/Icons";
import { usePlaylistsStore } from "@/hooks/usePlaylistsStore";
import { useSongsStore } from "@/hooks/useSongsStore";
import { Song } from "@/types";
import { extractSongFilename } from "@/utils";
import { COLOR, GAP, PADDING } from "@/utils/constants";
import { utilsStyles } from "@/utils/styles";
import Checkbox from "expo-checkbox";
import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const SIZE = 72;

type SongItemProps = {
  song: Song;
  onPress: () => void;
  isFavorited?: boolean;
};

export default function SongItem({
  song,
  onPress: handlePress,
  isFavorited,
}: SongItemProps) {
  const { playingSong } = useSongsStore();

  const { modalAddSongsVisible, selectingSongs } = usePlaylistsStore();

  const { name, author } = extractSongFilename(song.filename);
  const isPlaying =
    !modalAddSongsVisible && playingSong && playingSong.id === song.id;

  const isChecked = useMemo(() => {
    return selectingSongs.findIndex((s) => s.id === song.id) !== -1;
  }, [selectingSongs]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.song} onPress={handlePress}>
        {modalAddSongsVisible && <Checkbox value={isChecked} />}

        <IconSong size={SIZE} iconSize={SIZE / 2} />
        <View style={{ flex: 1 }}>
          <View style={styles.songNameContainer}>
            <Text
              style={[
                styles.songName,
                isPlaying ? utilsStyles.textPrimary : {},
              ]}
            >
              {name}
            </Text>
          </View>
          <View style={styles.songAuthorContainer}>
            <Text style={styles.songAuthor}>{author}</Text>
          </View>
        </View>
      </TouchableOpacity>
      {!modalAddSongsVisible && (
        <ButtonSongMore song={song} isFavorited={isFavorited} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
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
  songNameContainer: {
    flexDirection: "row",
  },
  songName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLOR.WHITE,
  },
  songAuthorContainer: {
    flexDirection: "row",
  },
  songAuthor: {
    color: "gray",
    fontSize: 12,
    flexShrink: 1,
  },
});
