import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { adaptNavigationTheme, useTheme } from "react-native-paper";
import LoginScreen from "../screens/LoginScreen";
import { i18n } from "../i18n";
import { storage } from "../utils/storage";
import { store } from "../redux/store";
import { LOGIN_SUCCESS } from "../redux/actionTypes";
import { darkTheme, lightTheme } from "../theme";
import RootDrawerNavigator from "./RootDrawerNavigator";

const Stack = createNativeStackNavigator();

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: lightTheme,
  reactNavigationDark: darkTheme,
});

function RootNavigator() {
  const { isLoggedin } = useSelector((state) => state.auth);
  const theme = useTheme();
  React.useEffect(() => {
    initAuth();
  }, []);
  const initAuth = async () => {
    try {
      const access_token = await storage.getItem("access_token");
      if (access_token) store.dispatch({ type: LOGIN_SUCCESS });
    } catch (error) {}
  };
  return (
    <NavigationContainer theme={theme.dark ? DarkTheme : LightTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {isLoggedin ? (
          <>
            <Stack.Screen
              name="Root"
              options={{ title: i18n.t("home") }}
              component={RootDrawerNavigator}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              options={{ title: i18n.t("login") }}
              component={LoginScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootNavigator;
