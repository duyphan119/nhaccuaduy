import ModalActions, { ModalAction } from "@/components/modals/ModalActions";
import { useDeletePlaylists } from "@/hooks/useDeletePlaylists";
import { usePlaylistsStore } from "@/hooks/usePlaylistsStore";
import { Playlist } from "@/types";
import { COLOR } from "@/utils/constants";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { TouchableOpacity, ViewStyle } from "react-native";

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
