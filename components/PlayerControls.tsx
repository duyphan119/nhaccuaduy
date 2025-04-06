import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import React, { useMemo } from "react";
import { COLOR, PLAYBACK_MODE } from "@/utils/constants";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useSound } from "@/hooks/useSound";
import { useSongsStore } from "@/hooks/useSongsStore";
import { usePlaylistsStore } from "@/hooks/usePlaylistsStore";

export type PlayerControlProps = {
  iconSize?: number;
  color?: string;
  style?: ViewStyle;
  activeColor?: string;
};

export function ShuffleControl({
  color = COLOR.TEXT,
  iconSize = 24,
  style,
  activeColor = COLOR.PRIMARY,
}: PlayerControlProps) {
  const { playbackMode, selectPlaybackMode } = useSongsStore();
  const isActive = playbackMode === PLAYBACK_MODE.SHUFFLE;
  return (
    <TouchableOpacity
      onPress={() => {
        selectPlaybackMode(PLAYBACK_MODE.SHUFFLE);
      }}
      style={style}
    >
      <MaterialIcons
        name="shuffle"
        size={iconSize}
        color={isActive ? activeColor : color}
      />
    </TouchableOpacity>
  );
}

export function PlayPauseControl({
  color = COLOR.TEXT,
  iconSize = 24,
  style,
}: Omit<PlayerControlProps, "activeColor">) {
  const { status, pause, resume } = useSound();
  if (!status) return null;
  return (
    <TouchableOpacity onPress={status.isPlaying ? pause : resume} style={style}>
      <FontAwesome5
        name={status.isPlaying ? "pause" : "play"}
        size={iconSize}
        color={color}
      />
    </TouchableOpacity>
  );
}

export function PreviousControl({
  color = COLOR.TEXT,
  iconSize = 24,
  style,
}: Omit<PlayerControlProps, "activeColor">) {
  const { status } = useSound();
  const { playbackMode, playPrevious } = useSongsStore();
  const { playingPlaylist } = usePlaylistsStore();
  if (!status) return null;
  return (
    <TouchableOpacity
      disabled={playbackMode === PLAYBACK_MODE.REPEAT_ONE}
      onPress={() => {
        playPrevious(playingPlaylist, playbackMode);
      }}
      style={style}
    >
      <FontAwesome5 name="step-backward" size={iconSize} color={color} />
    </TouchableOpacity>
  );
}

export function NextControl({
  color = COLOR.TEXT,
  iconSize = 24,
  style,
}: Omit<PlayerControlProps, "activeColor">) {
  const { status } = useSound();
  const { playbackMode, playNext } = useSongsStore();
  const { playingPlaylist } = usePlaylistsStore();
  if (!status) return null;
  return (
    <TouchableOpacity
      disabled={playbackMode === PLAYBACK_MODE.REPEAT_ONE}
      onPress={() => {
        playNext(playingPlaylist, playbackMode);
      }}
      style={style}
    >
      <FontAwesome5 name="step-forward" size={iconSize} color={color} />
    </TouchableOpacity>
  );
}

export function RepeatControl({
  color = COLOR.TEXT,
  iconSize = 24,
  style,
  activeColor = COLOR.PRIMARY,
}: PlayerControlProps) {
  const { playbackMode, selectPlaybackMode } = useSongsStore();
  const isActive = playbackMode === PLAYBACK_MODE.REPEAT_ONE;
  return (
    <TouchableOpacity
      onPress={() => {
        selectPlaybackMode(PLAYBACK_MODE.REPEAT_ONE);
      }}
      style={style}
    >
      <MaterialIcons
        name="repeat-one"
        size={iconSize}
        color={isActive ? activeColor : color}
      />
    </TouchableOpacity>
  );
}

export function CloseControl({
  color = COLOR.DRIMGRAY,
  iconSize = 20,
  style,
}: Omit<PlayerControlProps, "activeColor">) {
  const { unload } = useSound();
  return (
    <TouchableOpacity onPress={unload} style={style}>
      <FontAwesome name="close" size={iconSize} color={color} />
    </TouchableOpacity>
  );
}

export default function PlayerControls() {
  const { musicPlayerVisible, playingSong } = useSongsStore();
  const isFloatingPlayer = useMemo(
    () => playingSong && !musicPlayerVisible,
    [playingSong, musicPlayerVisible]
  );
  return (
    <View
      style={[
        styles.songActions,
        isFloatingPlayer
          ? { marginLeft: "auto" }
          : {
              justifyContent: "space-between",
              marginInline: 20,
              marginBottom: 20,
            },
      ]}
    >
      <Text>PlayerControls</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  songActions: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
