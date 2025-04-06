import { StyleSheet } from "react-native";
import { COLOR, PADDING } from "./constants";

export const utilsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BACKGROUND,
    paddingBlock: PADDING / 2,
    gap: 10,
  },
  songActions: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  horizontalBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  horizontal: {
    flexDirection: "row",
    alignItems: "center",
  },
  horizontalCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  horizontalEnd: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  text: {
    color: COLOR.TEXT,
  },
  textPrimary: {
    color: COLOR.PRIMARY,
  },
  button: {
    paddingInline: 10,
    paddingBlock: 8,
  },
});
