import ModalActions, { ModalAction } from "@/components/modals/ModalActions";
import { useAddSongsToPlaylist } from "@/hooks/useAddSongToPlaylist";
import { usePlaylistsStore } from "@/hooks/usePlaylistsStore";
import { useRemoveSongsFromPlaylist } from "@/hooks/useRemoveSongsFromPlaylist";
import { useSongsStore } from "@/hooks/useSongsStore";
import { Song } from "@/types";
import { COLOR } from "@/utils/constants";
import { MaterialIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { TouchableOpacity, ViewStyle } from "react-native";

type ButtonSongMoreProps = {
  actions?: ModalAction[];
  style?: ViewStyle;
  song: Song;
  isFavorited?: boolean;
};

export default function ButtonSongMore({
  style,
  song,
  isFavorited,
}: ButtonSongMoreProps) {
  const [open, setOpen] = useState<boolean>(false);

  const { setCurrentSongAction } = useSongsStore();

  const { addSongs, removeSongs, openModalPlaylists } = usePlaylistsStore();

  const { mutate: addSongsToPlaylist } = useAddSongsToPlaylist();
  const { mutate: removeSongsFromPlaylist } = useRemoveSongsFromPlaylist();

  const handleClose = () => {
    setOpen(false);
    setCurrentSongAction(song);
  };

  const handleOpen = () => {
    setOpen(true);
    setCurrentSongAction(null);
  };

  const actions: ModalAction[] = useMemo(() => {
    return [
      isFavorited
        ? {
            title: "Bỏ yêu thích",
            onPress: () => {
              removeSongsFromPlaylist(
                {
                  playlistName: "Yêu thích",
                  songIds: [song.id],
                },
                {
                  onSuccess: () => {
                    removeSongs("Yêu thích", [song]);
                  },
                }
              );
            },
            icon: (
              <MaterialIcons name="favorite" color={COLOR.TEXT} size={20} />
            ),
          }
        : {
            title: "Yêu thích",
            onPress: () => {
              addSongsToPlaylist(
                {
                  playlistName: "Yêu thích",
                  songIds: [song.id],
                },
                {
                  onSuccess: () => {
                    addSongs("Yêu thích", [song]);
                  },
                }
              );
            },
            icon: (
              <MaterialIcons
                name="favorite-outline"
                color={COLOR.TEXT}
                size={20}
              />
            ),
          },
      {
        title: "Thêm vào danh sách phát",
        onPress: () => {
          openModalPlaylists();
        },
        icon: (
          <MaterialIcons name="playlist-add" color={COLOR.TEXT} size={20} />
        ),
      },
      {
        title: "Đổi tên",
        onPress: () => {},
        icon: <MaterialIcons name="edit" color={COLOR.TEXT} size={20} />,
      },
      {
        title: "Xóa",
        onPress: () => {},
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
