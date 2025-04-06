import { COLOR } from "@/utils/constants";
import { MaterialIcons } from "@expo/vector-icons";
import { ReactElement, useState } from "react";
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import ModalActions from "./modals/ModalActions";

export type ModalAction = {
  title: string;
  onPress: () => void;
  textStyle?: TextStyle;
  icon?: ReactElement;
  style?: ViewStyle;
};

type ButtonMoreProps = {
  actions?: ModalAction[];
  style?: ViewStyle;
  onPress: () => void;
  onClose: () => void;
};

export default function ButtonMore({
  style,
  actions = [],
  onPress,
  onClose,
}: ButtonMoreProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  const handleOpen = () => {
    setOpen(true);
    onPress();
  };

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
      {actions && (
        <ModalActions actions={actions} visible={open} onClose={handleClose} />
      )}
    </>
  );
}
