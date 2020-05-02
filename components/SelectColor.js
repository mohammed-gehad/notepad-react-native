import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import RadioButtonRN from "radio-buttons-react-native";

export const SelectColor = ({ setColor }) => {
  const size = 25;
  const [activeIndex, setActiveIndex] = useState(null);
  const data = [
    {
      color: "#7041EE",
    },
    {
      color: "#1ECD8C",
    },
    {
      color: "#524AFF",
    },
    {
      color: "#FA4F3B",
    },
    {
      color: "#FECD56",
    },
    {
      color: "#2C2929",
    },
  ];
  return (
    <View style={{ flexDirection: "row" }}>
      {data.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{
              backgroundColor: item.color,
              height: activeIndex == index ? size + 2 : size,
              width: activeIndex == index ? size + 2 : size,
              borderRadius: activeIndex == index ? size + 2 : size / 2,
              margin: 2,
            }}
            onPress={() => {
              setColor(item.color);
              setActiveIndex(index);
            }}
          ></TouchableOpacity>
        );
      })}
    </View>
  );
};
