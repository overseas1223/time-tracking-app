import * as React from "react";
import { View } from "react-native";
import { ActivityIndicator, Text } from "react-native-paper";

export default function SplashScreen() {
  return (
    <View>
      <ActivityIndicator animating={true} />
    </View>
  );
}
