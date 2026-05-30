import { useEffect, useState } from "react";
import { Dimensions } from "react-native";

const useDeviceWidth = () => {
  const [blockWidth, setWidth] = useState();

  //set device screen size
  const defineWidth = () => {
    const screenWidth = Dimensions.get("screen").width;
    let crop = screenWidth / 2;
    setWidth(crop);
  };

  useEffect(() => {
    defineWidth();
  }, []);

  return { blockWidth };
};

export default useDeviceWidth;
