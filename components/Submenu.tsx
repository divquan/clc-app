import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Popover from "react-native-popover-view/dist/Popover";
import { TouchableOpacity } from "react-native";

const Submenu = ({
  Parent,
  menuItems,
}: {
  Parent: any;
  menuItems: { name: string; function: any }[];
}) => {
  return (
    <Popover from={<Parent />}>
      {menuItems.map((item, index) => {
        const nem = () => {
          item.function();
        };
        return (
          <Pressable onPress={nem}>
            <View key={index}>{item.name}</View>
          </Pressable>
        );
      })}
    </Popover>
  );
};

export default Submenu;

const styles = StyleSheet.create({});
