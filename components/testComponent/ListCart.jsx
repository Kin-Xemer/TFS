import React from 'react';
import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";

const ListCart = (props) => {
  const { list } = props;
  return (
    <View style={styles.container}>
      {list.map((item, index) => (
        <Text key={item.id}>{item.name} | {item.quantity}</Text>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
export default ListCart;
