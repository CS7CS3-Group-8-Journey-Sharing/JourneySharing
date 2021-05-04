import React from "react";
import COLORS from "../common/colors";
import { Button } from "react-native-elements";
import { useColorScheme } from "react-native";

export default function CustomButton({style, onPress, title, disabled = false, deny = false, opposite = false}) {
  if (opposite) {
    return <Button
    style={style}
    onPress={onPress}
    title={title}
    titleStyle={{
      color: COLORS.mainColor
  }}
    buttonStyle={{ backgroundColor: "#FFF"}}
    disabled={disabled}
  />
  }
  return <Button
    style={style}
    onPress={onPress}
    title={title}
    buttonStyle={!deny ? { backgroundColor: COLORS.mainColor } : { backgroundColor: COLORS.denyColor }}
    disabled={disabled}
  />
};