import React from "react";
import COLORS from "../common/colors";
import { Button } from "react-native-elements";

export default function CustomButton({style, onPress, title, disabled = false, deny = false}) {
  return <Button
    style={style}
    onPress={onPress}
    title={title}
    buttonStyle={!deny ? { backgroundColor: COLORS.mainColor } : { backgroundColor: COLORS.denyColor }}
    disabled={disabled}
  />
};