import { useState, useEffect, useRef } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { View, Dimensions, StyleSheet, Text } from "react-native";
import { Image } from "native-base";
import tetbanner from "../../assets/food/tet_banner.jpg"
import { THEME_COLOR } from "../../Utils/themeColor";
import axios from "axios";
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const ImageTitle = (props) => {
  const IMAGE_HEIGHT = (9*screenWidth)/21
  const IMAGE_WIDTH = (21*screenHeight)/9
  const [activeSlide, setActiveSlide] = useState(0);
  const [listEvent,setListEvent] = useState([]);
  // const [listImage, setListImage] = useState([
  //   {
  //     id: 0,
  //     url: "https://live.staticflickr.com/65535/52481862060_6ee6633a16_b.jpg",
  //   },
  //   {
  //     id: 1,
  //     url: "https://live.staticflickr.com/65535/52480805917_6eed6d9010_b.jpg",
  //   },
  //   {
  //     id: 2,
  //     url: "https://live.staticflickr.com/65535/52481848958_4e6c4e755e_b.jpg",
  //   },
  //   {
  //     id: 3,
  //     url: "https://live.staticflickr.com/65535/52481307696_338f81e657_b.jpg",
  //   },
  // ]);
  const carousel = useRef();
  const [slides,setSlides] = useState([]);

  const getAllEvent = () => {
    axios
      .get(
        "http://tfsapiv1-env.eba-aagv3rp5.ap-southeast-1.elasticbeanstalk.com/api/events"
      )
      .then((response) => {
        setListEvent(response.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getAllEvent();
  }, []);
  

  const entriesSplitter = () => {
    let size = 1;
    while (listEvent.length > 0) {
      slides.push(listEvent.splice(0, size));
    }
  };
  const _renderItem = ({ item, index }) => {
    return (
      <View style={{ flexDirection: "row" }}>
        {item.map((item) => {
          return (
            <View key={item.eventId} style={styles.container}>
              <Image
                source={{
                  uri: item.image_url,
                }}           
                alt="Alternate Text"           
                height={IMAGE_HEIGHT}
                width={IMAGE_WIDTH}
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
        tappableDots={!!carousel}
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
