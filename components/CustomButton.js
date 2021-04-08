import React from "react";
import COLORS from "../common/colors";
import { Button } from "react-native-elements";

export default function CustomButton({style, onPress, title}) {
  return <Button
    style={style}
    onPress={onPress}
    title={title}
    buttonStyle={{ backgroundColor: COLORS.mainColor }}
  />
};