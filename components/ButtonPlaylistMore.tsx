import { useDeletePlaylists } from "@/hooks/useDeletePlaylists";
import { usePlaylistsStore } from "@/hooks/usePlaylistsStore";
import { Playlist } from "@/types";
import { COLOR } from "@/utils/constants";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { ReactElement, useMemo, useState } from "react";
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import ModalActions from "./modals/ModalActions";
import { useEditPlaylist } from "@/hooks/useEditPlaylist";

export type ModalAction = {
  title: string;
  onPress: () => void;
  textStyle?: TextStyle;
  icon?: ReactElement;
  style?: ViewStyle;
};

type ButtonSongMoreProps = {
  actions?: ModalAction[];
  style?: ViewStyle;
  playlist: Playlist;
  isFavorited?: boolean;
};

export default function ButtonPlaylistMore({
  style,
  playlist,
  isFavorited,
}: ButtonSongMoreProps) {
  const [open, setOpen] = useState<boolean>(false);

  const {
    isSelectingPlaylists,
    selectingPlaylistNames,
    deletePlaylists,
    openModalPlaylistForm,
    setCurrentPlaylistAction,
  } = usePlaylistsStore();

  const { mutate: deletePlaylistsMutate } = useDeletePlaylists();

  const handleClose = () => {
    setOpen(false);
    setCurrentPlaylistAction(playlist);
  };

  const handleOpen = () => {
    setOpen(true);
    setCurrentPlaylistAction(null);
  };

  const actions: ModalAction[] = useMemo(() => {
    return [
      {
        title: "Thêm bài hát",
        onPress: () => {
          // openModalPlaylists();
        },
        icon: (
          <MaterialCommunityIcons
            name="music-note-plus"
            color={COLOR.TEXT}
            size={20}
          />
        ),
      },
      {
        title: "Đổi tên",
        onPress: () => {
          openModalPlaylistForm();
        },
        icon: <MaterialIcons name="edit" color={COLOR.TEXT} size={20} />,
      },
      {
        title: "Xóa",
        onPress: () => {
          deletePlaylistsMutate([playlist.name], {
            onSuccess: () => {
              deletePlaylists([playlist.name]);
            },
          });
        },
        textStyle: {
          color: COLOR.RED,
        },
        icon: <MaterialIcons name="delete" color={COLOR.RED} size={20} />,
      },
    ];
  }, [isFavorited]);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          handleOpen();
        }}
        style={[
          {
            width: 36,
            height: 72,
            alignItems: "flex-end",
            justifyContent: "center",
          },
          style,
        ]}
      >
        <MaterialIcons name="more-horiz" size={24} color={COLOR.TEXT} />
      </TouchableOpacity>
      {open && (
        <ModalActions actions={actions} onClose={handleClose} visible={open} />
      )}
    </>
  );
}
