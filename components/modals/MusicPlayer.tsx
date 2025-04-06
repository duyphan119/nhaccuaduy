import { usePlaylistsStore } from "@/hooks/usePlaylistsStore";
import { useSongsStore } from "@/hooks/useSongsStore";
import { extractSongFilename } from "@/utils";
import { COLOR } from "@/utils/constants";
import { utilsStyles } from "@/utils/styles";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useRef } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ButtonBack from "../ButtonBack";
import { IconSong } from "../Icons";
import {
  NextControl,
  PlayPauseControl,
  PreviousControl,
  RepeatControl,
  ShuffleControl,
} from "../PlayerControls";
import SongTime from "../SongTime";
import SongItem from "../SongItem";
import { useAddSongsToPlaylist } from "@/hooks/useAddSongToPlaylist";
import { useRemoveSongsFromPlaylist } from "@/hooks/useRemoveSongsFromPlaylist";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function MusicPlayer() {
  const {
    musicPlayerVisible,
    playbackMode,
    playingSong,
    closeMusicPlayer,
    playSong,
  } = useSongsStore();

  const { playlists, playingPlaylist, addSongs, removeSongs } =
    usePlaylistsStore();

  const { mutate: addSongsToPlaylist } = useAddSongsToPlaylist();
  const { mutate: removeSongsFromPlaylist } = useRemoveSongsFromPlaylist();

  const isFavorite = useMemo(() => {
    return !!playlists
      ?.find((item) => item.name === "Yêu thích")
      ?.songs.find((item) => item.id === playingSong?.id);
  }, [playlists, playingSong]);

  const handlePressFavorite = () => {
    if (playingSong) {
      if (isFavorite) {
        removeSongsFromPlaylist(
          {
            playlistName: "Yêu thích",
            songIds: [playingSong.id],
          },
          {
            onSuccess: () => {
              removeSongs("Yêu thích", [playingSong]);
            },
          }
        );
      } else {
        addSongsToPlaylist(
          {
            playlistName: "Yêu thích",
            songIds: [playingSong.id],
          },
          {
            onSuccess: () => {
              addSongs("Yêu thích", [playingSong]);
            },
          }
        );
      }
    }
  };

  if (!musicPlayerVisible || !playingSong) return null;

  const { author, name } = extractSongFilename(playingSong.filename);

  return (
    <Modal
      visible={musicPlayerVisible}
      onRequestClose={closeMusicPlayer}
      animationType="fade"
    >
      <View style={styles.container}>
        <View style={[utilsStyles.horizontalBetween, { position: "relative" }]}>
          <ButtonBack onPress={closeMusicPlayer} />
        </View>
        <IconSong
          style={styles.iconSong}
          size={SCREEN_WIDTH / 3}
          iconSize={SCREEN_WIDTH / 6}
        />
        <View
          style={[
            utilsStyles.horizontal,
            {
              marginInline: 20,
              gap: 10,
            },
          ]}
        >
          <View style={{ gap: 5, flex: 1 }}>
            <Text style={styles.songName}>{name}</Text>
            <Text style={styles.songAuthor}>Thể hiện: {author}</Text>
          </View>
          <TouchableOpacity>
            <MaterialIcons name="playlist-add" size={24} color={COLOR.TEXT} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePressFavorite}>
            <MaterialIcons
              name={isFavorite ? "favorite" : "favorite-outline"}
              size={24}
              color={COLOR.TEXT}
            />
          </TouchableOpacity>
        </View>

        <SongTime
          maximumTrackTintColor={COLOR.TEXT}
          minimumTrackTintColor={COLOR.PRIMARY}
          style={{
            marginInline: 4, // 20 - 16 = 4
          }}
        />
        <View
          style={{
            ...utilsStyles.songActions,
            justifyContent: "space-between",
            marginInline: 20,
            marginBottom: 20,
          }}
        >
          <ShuffleControl />
          <PreviousControl />
          <PlayPauseControl />
          <NextControl />
          <RepeatControl />
        </View>
        <FlatList
          data={playingPlaylist.songs}
          keyExtractor={(item) => item.uri}
          renderItem={({ item }) => (
            <SongItem
              song={item}
              onPress={() => playSong(item, playingPlaylist, playbackMode)}
            />
          )}
          getItemLayout={(data, index) => ({
            length: playingPlaylist.songs.length,
            offset: 72 * index,
            index,
          })}
          style={{ width: SCREEN_WIDTH - 20, padding: 10 }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: COLOR.BLACK,
    padding: 10,
    gap: 20,
  },
  iconSong: {
    borderRadius: 20,
    marginInline: "auto",
    marginBlock: 50,
  },
  songName: {
    fontSize: 24,
    fontWeight: "600",
    color: COLOR.TEXT,
  },
  songAuthor: {
    fontSize: 16,
    color: COLOR.DRIMGRAY,
  },
});
