import * as React from "react";
import { SafeAreaView, View } from "react-native";
import { Text } from "react-native-paper";
import { commonStyles } from "../../styles";

export default function CookiesScreen() {
  return (
    <SafeAreaView>
      <View style={commonStyles.container}>
        <Text>Cookies Screen</Text>
      </View>
    </SafeAreaView>
  );
}
