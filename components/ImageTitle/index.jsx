import { useState, useEffect, useRef } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { View, Dimensions, StyleSheet, Text } from "react-native";
import { Image } from "native-base";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const ImageTitle = (props) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [listImage, setListImage] = useState([
    {
      id: 0,
      url: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 1,
      url: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 2,
      url: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
    {
      id: 3,
      url: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1600",
    },
  ]);
  const carousel = useRef();
  const [slides,setSlides] = useState([]);
  const entriesSplitter = () => {
    let size = 1;
    while (listImage.length > 0) {
      slides.push(listImage.splice(0, size));
    }
  };
  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ flexDirection: "row" }}>
        {item.map((item) => {
          return (
            <View key={item.id} style={styles.container}>
              <Image
                source={{
                  uri: item.url,
                }}
                alt="Alternate Text"
                width={screenWidth - 32}
                height={139}
                borderRadius={10}
              />
            </View>
          );
        })}
      </View>
    );
  };
  return (
    <View style={{ paddingTop: 8, paddingBottom: 8}}>
      {entriesSplitter()}
      <Carousel
        enableSnap={true}
        activeAnimationType="spring"
        ref={carousel}
        data={slides}
        renderItem={_renderItem}
        sliderWidth={screenWidth}
        sliderHeight={screenHeight}
        itemWidth={screenWidth - 64}
        inactiveSlideScale={1}
        inactiveSlideOpacity={0.5}
        loop={true}
        onSnapToItem={(index) => {
          setActiveSlide(index);
        }}
        //autoplay={true}
        autoplayInterval={4500}
      />
      <View>
      <Pagination
      containerStyle={styles.paginContainer}
        dotsLength={slides.length}
        activeDotIndex={activeSlide}
        dotColor={"#d83a3a"}
        dotStyle={styles.paginationDot}
        inactiveDotColor={"black"}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.8}
        carouselRef={carousel}
        tappableDots={!!carousel}
      />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: "100%",
    paddingHorizontal: 8,
  },
  paginContainer: {
    paddingVertical: 8,
  },
});
export default ImageTitle;
