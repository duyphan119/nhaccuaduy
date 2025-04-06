import { COLOR } from "@/utils/constants";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { StyleProp, View, ViewStyle } from "react-native";

type IconsWrapperProps = {
  style?: StyleProp<ViewStyle>;
  iconSize?: number;
  iconColor?: string;
  size?: number;
  color?: string;
  children?: React.ReactNode;
};

function IconsWrapper({
  style,
  size = 100,
  color = COLOR.PRIMARY,
  children,
}: IconsWrapperProps) {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          backgroundColor: color,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 4,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function IconSong({
  iconSize = 50,
  iconColor = COLOR.WHITE,
  ...props
}: Omit<IconsWrapperProps, "children">) {
  return (
    <IconsWrapper {...props}>
      <FontAwesome5 name="music" size={iconSize} color={iconColor} />
    </IconsWrapper>
  );
}

export function IconPlaylist({
  iconSize = 50,
  iconColor = COLOR.WHITE,
  ...props
}: Omit<IconsWrapperProps, "children">) {
  return (
    <IconsWrapper {...props}>
      <MaterialCommunityIcons
        name="playlist-music"
        size={iconSize}
        color={iconColor}
      />
    </IconsWrapper>
  );
}

export function IconFavorite({
  iconSize = 50,
  iconColor = COLOR.WHITE,
  ...props
}: Omit<IconsWrapperProps, "children">) {
  return (
    <IconsWrapper {...props}>
      <MaterialIcons name="favorite" size={iconSize} color={iconColor} />
    </IconsWrapper>
  );
}
