import React from 'react';
import { useEffect, useState } from "react";
import { View,
  Text,
  StyleSheet,
  Animated,
  TouchableHighlight,
  TouchableOpacity,
  StatusBar, Dimensions } from "react-native";
import { SwipeListView } from 'react-native-swipe-list-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const ListCart = (props) => {
  const { list } = props;
  const [listData, setListData] = useState(
    list.map((item, index) => ({
      key: `${index}`,
      name: item.name,
      quantity: item.quantity,
    })),
  );

  const deleteRow = (rowKey) => {
    const newData = [...listData];
    const prevIndex = listData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setListData(newData);
  };

  
  const VisibleItem = props => {
    const {
      data,
    } = props;
    
    return (
      <View
        style={[styles.rowFront, {height: 105}]}>
        <TouchableHighlight
          style={styles.rowFrontVisible}
          onPress={() => console.log('Element touched')}
          underlayColor={'#f0f0'}>
          <View>
            <Text style={styles.title} numberOfLines={1}>
              {data.item.name}
            </Text>
            <Text style={styles.details} numberOfLines={1}>
              {data.item.name}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }; 

  const renderItem = (data) => {
    return (
      <VisibleItem
        data={data}
      />
    );
  };

  const HiddenItemWithActions = props => {
    const {
      swipeAnimatedValue,
      onDelete,
    } = props;

    return (
      <View style={[styles.rowBack, {height: 100}]}>
          <View
            style={
              styles.buttonDelete
            }>
            <TouchableOpacity
              style={[styles.buttonDelete]}
              onPress={onDelete}>
              <Animated.View
                style={[
                  styles.trash,
                  {
                    transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [-screenWidth*0.25+12, 1.2],
                          outputRange: [1.2, 0],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={24}
                  color="#fff"
                />
              </Animated.View>
            </TouchableOpacity>
          </View>
      
      </View>
    );
  };

  const renderHiddenItem = (data, rowMap) => {

    return (
      <HiddenItemWithActions
        data={data}
        onDelete={() => deleteRow(rowMap, data.item.key)}
      />
    );

  };
  return (
    <View style={styles.container}>
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-screenWidth*0.25+12}
        disableRightSwipe
      />
      
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
 
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 75,
    width: "100%",
    marginBottom: 10,
    borderWidth: 1,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: 'pink',
    borderRadius: 5,
    height: "100%",
    padding: 12,

  },
  rowBack: {
    backgroundColor: 'red',
    width: screenWidth - 36,
    justifyContent: "flex-end",
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 5,
    marginLeft: 4,
  },

  buttonDelete: {
    backgroundColor: 'red',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    height:"100%",
    width:"27%",
  },
  trash: {
    height: 30,
    width: 30,
  },
  title: {
    fontSize: 14,
    fontFamily: "Quicksand-Bold",
    marginBottom: 1,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#999',
  },
});
export default ListCart;
