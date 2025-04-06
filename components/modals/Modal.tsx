import {
  StyleSheet,
  Text,
  View,
  Modal as RNModal,
  Pressable,
  FlexStyle,
} from "react-native";

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  justifyContent?: FlexStyle["justifyContent"];
  children?: React.ReactNode;
  animationType?: "none" | "fade" | "slide";
};

export default function Modal({
  visible,
  justifyContent = "center",
  children,
  onClose,
  animationType = "slide",
}: ModalProps) {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType={animationType}
      onRequestClose={onClose}
    >
      <Pressable
        onPress={onClose}
        style={{
          height: "100%",
          justifyContent,
          padding: 10,
        }}
      >
        {children}
      </Pressable>
    </RNModal>
  );
}
