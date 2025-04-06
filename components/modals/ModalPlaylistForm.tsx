import FooterOkCancel from "@/components/FooterOkCancel";
import { useCreatePlaylist } from "@/hooks/useCreatePlaylist";
import { useEditPlaylist } from "@/hooks/useEditPlaylist";
import { usePlaylistsStore } from "@/hooks/usePlaylistsStore";
import { COLOR } from "@/utils/constants";
import { utilsStyles } from "@/utils/styles";
import { useEffect, useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";

export default function ModalPlaylistForm() {
  const [name, setName] = useState<string>("");

  const { mutate: createPlaylistMutate } = useCreatePlaylist();
  const { mutate: editPlaylistMutate } = useEditPlaylist();

  const {
    currentPlaylistAction,
    modalCreateEditPlaylistVisible,
    closeModalPlaylistForm,
    createPlaylist,
    editPlaylist,
  } = usePlaylistsStore();

  const handleClose = () => {
    setName("");
    closeModalPlaylistForm();
  };

  const handleCreate = () => {
    if (name)
      createPlaylistMutate(
        { name },
        {
          onSuccess: (newPlaylist) => {
            if (newPlaylist) {
              createPlaylist(newPlaylist);
              handleClose();
            }
          },
        }
      );
  };

  const handleEdit = () => {
    if (name && currentPlaylistAction) {
      editPlaylistMutate(
        { oldName: currentPlaylistAction.name, newName: name },
        {
          onSuccess: () => {
            editPlaylist(name);
            handleClose();
          },
        }
      );
    }
  };

  useEffect(() => {
    if (modalCreateEditPlaylistVisible && currentPlaylistAction) {
      setName(currentPlaylistAction.name);
    }
  }, [modalCreateEditPlaylistVisible, currentPlaylistAction]);

  const isEditing = !!(modalCreateEditPlaylistVisible && currentPlaylistAction);

  return (
    <Modal
      visible={modalCreateEditPlaylistVisible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}
    >
      <Pressable
        onPress={handleClose}
        style={{
          height: "100%",
          justifyContent: "center",
          padding: 10,
        }}
      >
        <View
          style={{ backgroundColor: COLOR.BACKGROUND2, padding: 10, gap: 10 }}
        >
          <Text
            style={[utilsStyles.text, { fontSize: 24, fontWeight: "bold" }]}
          >
            {isEditing ? "SỬA" : "TẠO"} DANH SÁCH PHÁT
          </Text>
          {modalCreateEditPlaylistVisible && (
            <TextInput
              autoFocus={true}
              value={name}
              onChangeText={setName}
              onEndEditing={handleCreate}
              placeholder="Tên danh sách phát"
              placeholderTextColor={COLOR.WHITE}
              style={[
                utilsStyles.text,
                {
                  borderBottomWidth: 1,
                  borderBottomColor: COLOR.WHITE,
                },
              ]}
            />
          )}
          <FooterOkCancel
            okText={isEditing ? "SỬA" : "TẠO"}
            onCancel={handleClose}
            onOk={isEditing ? handleEdit : handleCreate}
          />
        </View>
      </Pressable>
    </Modal>
  );
}
