// Quotes.js
import React from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from "react-native";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faQuoteLeft, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
import Carousel from "react-native-reanimated-carousel";

const quotes = [
  "At this angle, sells are quick ...",
  "Turning Angles into Sells – SellAngle Style!",
  "Global Sells, Universal Angles – One Marketplace for All!",
  "Selling Perfected: It's the SellAngle Way!",
  "Sell with Ease, Master the Angle – SellAngle!",
  "Every Sell, Every Angle, Every Human – One Global Stop!",
  "Navigating Sell Success, One Angle at a Time!",
  "Global Sells, Infinite Angles – One Marketplace for All!",
  "From Every Angle, to Every Human – SellAngle!",
  "From Every Angle, One Global Sell Destination!",
  "Strategic Angles, Stellar Sells!",
  "Precision in Every Angle, Power in Every Sell! SellAngle!!",
  "Angles that Convert, Sells that Skyrocket!",
  "Angle Your Way to Instant Sells Success!",
  "Selling at Every Angle, Selling in a Flash!",
  "SellAngle: Where Every Angle Counts in Sells!",
  "Swift Sells at Every Angle!",
  "Maximize Sells Momentum with SellAngle!",
  "Precision Sells, Perfect Angles – SellAngle!",
  "Angles That Accelerate Sells!",
  "Sell Smart, Sell Quick with the Power of Angle",
  "Your Angle to Sell Success: SellAngle Unleashed!",
  "The Quickest Sells, All in the Right Angle!",
  "Sell Globally, Angle Locally with SellAngle!",
  "One Stop, Every Sell, Every Angle – Global Marketplace!",
  "Global Sells, One-Stop Angles – It's Marketplace Magic!",
  "Sell Smart, Angle Globally – Your One-Stop Hub!",
  "One Stop for Sells Worldwide – Master Every Angle!",
  "Sell Everywhere, Master Every Angle – SellAngle!",
  "Global Sells, Local Angles – One Marketplace!",
  "Sell at Every Turn, One Marketplace for All – SellAngle!",
  "Unlock Global Sells, Master Every Angle – SellAngle!",
  "Sells for All, Angles for Every Need – SellAngle!",
  "One Marketplace, All Humans – Sell and Angle Globally!",
  "All Humans, All Sells, All Angles – One Marketplace!",
  "For All, By All – SellAngle, Your Global Sells Hub!",
  "Sells for Every Human, Angles for Every Heart – SellAngle!",
  "One Marketplace, Infinite Sells, Endless Angles – SellAngle!",
  "All Humans, One Marketplace – Sell and Angle Worldwide!",
  "From Every Corner, For All Humans – SellAngle!",
  "Master the Art of Selling with SellAngle!",
];

const Quotes = () => {
  const renderQuoteItem = ({ index }) => (
    <View
      style={{
        height: 40,
        flex: 1,
        justifyContent: "center",
        padding: 20,
        paddingHorizontal: 20,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          justifyContent: "center",
          padding: 20,
          paddingHorizontal: 20,
          fontSize: 14,
        }}
      >
        <FontAwesomeIcon icon={faQuoteLeft} size={14} /> {quotes[index]}{" "}
        <FontAwesomeIcon icon={faQuoteRight} size={14} />
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.quote}>
            <Carousel
              loop
              width={Dimensions.get("window").width}
              height={Dimensions.get("window").width / 2}
              autoPlay={true}
              data={quotes}
              scrollAnimationDuration={3000}
              renderItem={renderQuoteItem}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingVertical: 10,
    paddingBottom: 10,
  },
  container: {
    // flex: 1,
    justifyContent: "center",
    paddingVertical: 10,
  },
  quote: {
    color: "#fff",
    fontStyle: "italic",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: 30,
  },
});

export default Quotes;
