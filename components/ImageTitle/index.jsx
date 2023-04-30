import { useState, useEffect, useRef, useCallback } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { View, Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "native-base";
import { THEME_COLOR } from "../../Utils/themeColor";
import axios from "axios";
import { BASE_URL } from "../../services/baseURL";
import { useNavigation } from "@react-navigation/native";
import { useMemo } from "react";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const ImageTitle = (props) => {
  const { events, foods, regions } = props;
  const IMAGE_HEIGHT = useMemo(() => (9 * screenWidth) / 21, [screenWidth]);
  const IMAGE_WIDTH = useMemo(() => (21 * screenHeight) / 9, [screenHeight]);
  const [activeSlide, setActiveSlide] = useState(0);
  const navigation = useNavigation();
  const carousel = useRef();
  const [slides, setSlides] = useState([]);

  const eventList = useMemo(() => {
    return events.slice(0,5);
  }, []);
  const entriesSplitter = () => {
    let size = 1;
    while (eventList.length > 0) {
      slides.push(eventList.splice(0, size));
    }
  };
  const _renderItem = useCallback(
    ({ item, index }) => {
      return (
        <View style={{ flexDirection: "row" }}>
          {item.map((item) => (
            <TouchableOpacity
              key={item.eventId}
              style={styles.container}
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate("MoreScreen", {
                  food: foods,
                  events: events,
                  regions: regions,
                });
              }}
            >
              <Image
                source={{
                  uri:
                    item.image_url !== ""
                      ? item.image_url
                      : "https://live.staticflickr.com/65535/52482097903_8da5e0c69d_b.jpg",
                }}
                alt="Alternate Text"
                height={IMAGE_HEIGHT}
                width={IMAGE_WIDTH}
                borderRadius={10}
              />
            </TouchableOpacity>
          ))}
        </View>
      );
    },
    [navigation, IMAGE_HEIGHT, IMAGE_WIDTH]
  );
  return (
    <View style={{ paddingTop: 8, paddingBottom: 8 }}>
      {entriesSplitter()}
      <Carousel
        enableSnap={true}
        activeAnimationType="spring"
        ref={carousel}
        data={slides}
        renderItem={_renderItem}
        sliderWidth={screenWidth}
        sliderHeight={screenHeight}
        itemWidth={screenWidth - 32}
        inactiveSlideScale={1}
        inactiveSlideOpacity={0.5}
        loop={true}
        onSnapToItem={(index) => {
          setActiveSlide(index);
        }}
        //autoplay={true}
        autoplayDelay={500}
        autoplayInterval={4500}
      />
      <View>
        <Pagination
          containerStyle={styles.paginContainer}
          dotsLength={slides.length}
          activeDotIndex={activeSlide}
          dotColor={THEME_COLOR}
          dotStyle={styles.paginationDot}
          inactiveDotColor={"black"}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.8}
          carouselRef={carousel}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
  },
  paginContainer: {
    paddingVertical: 8,
  },
});
export default ImageTitle;
