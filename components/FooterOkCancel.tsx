import { utilsStyles } from "@/utils/styles";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type FooterOkCancelProps = {
  okText?: string;
  cancelText?: string;
  onOk?: () => void;
  onCancel?: () => void;
};

export default function FooterOkCancel({
  cancelText = "HỦY",
  okText = "OK",
  onCancel,
  onOk,
}: FooterOkCancelProps) {
  return (
    <View style={utilsStyles.horizontalEnd}>
      <TouchableOpacity style={[utilsStyles.button]} onPress={onCancel}>
        <Text style={utilsStyles.text}>{cancelText}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[utilsStyles.button]} onPress={onOk}>
        <Text style={utilsStyles.textPrimary}>{okText}</Text>
      </TouchableOpacity>
    </View>
  );
}
