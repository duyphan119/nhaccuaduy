import { COLOR } from "@/utils/constants";
import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ModalAction } from "../ButtonMore";

type ModalActionsProps = {
  visible: boolean;
  onClose: () => void;
  actions: ModalAction[];
};

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ModalActions({
  actions,
  visible,
  onClose,
}: ModalActionsProps) {
  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      transparent
      animationType="slide"
    >
      <View style={{ height: SCREEN_HEIGHT }}>
        <TouchableOpacity
          onPress={onClose}
          style={{ flex: 1 }}
        ></TouchableOpacity>
        <View
          style={{
            backgroundColor: COLOR.BACKGROUND2,
            marginTop: "auto",
            borderTopWidth: 1,
            borderTopColor: COLOR.BACKGROUND,
          }}
        >
          {actions.map((action) => {
            return (
              <TouchableOpacity
                key={action.title}
                onPress={() => {
                  action.onPress();
                  onClose();
                }}
                style={[
                  action.icon
                    ? {
                        flexDirection: "row",
                        gap: 10,
                        alignItems: "center",
                      }
                    : {},
                  { padding: 16 },
                  action.style,
                ]}
              >
                {action.icon}
                <Text
                  style={[
                    {
                      color: COLOR.TEXT,
                      fontSize: 16,
                    },
                    action.textStyle,
                  ]}
                >
                  {action.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
