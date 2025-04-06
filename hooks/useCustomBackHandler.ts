import { useEffect } from "react";
import { BackHandler } from "react-native";

const useCustomBackHandler = (
  isCustomAction: boolean,
  customAction: () => void
) => {
  useEffect(() => {
    const backAction = () => {
      if (isCustomAction) {
        customAction(); // Gọi hành động tùy chỉnh
        return true; // Chặn back mặc định
      }
      return false; // Quay lại màn hình trước
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove(); // Cleanup khi unmount
  }, [isCustomAction, customAction]);
};

export default useCustomBackHandler;
