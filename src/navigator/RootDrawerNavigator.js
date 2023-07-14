import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Appbar, IconButton, useTheme } from "react-native-paper";
import HomeScreen from "../screens/home";
import SettingsScreen from "../screens/setting";
import ProfileScreen from "../screens/setting/ProfileScreen";
import AboutScreen from "../screens/setting/AboutScreen";
import CookiesScreen from "../screens/setting/CookiesScreen";
import { i18n } from "../i18n";
import { View } from "react-native";
import { useThemeMode } from "../context/useThemeModeContext";
import { CustomDrawerContent } from "../components/CustomDrawerContent";
import HourRegistrationNavigator from "./hourRegistration";
import SelfCertifiedRegNavigator from "./selfcertifiedHours";
import SickLeaveNavigator from "./sickLeave";
import MovableHolidayNavigator from "./movableHoliday";

const Drawer = createDrawerNavigator();

function RootDrawerNavigator({ route, navigation }) {
  const { themeMode, setThemeMode } = useThemeMode();
  const theme = useTheme();
  return (
    <Drawer.Navigator
      drawerContent={() => <CustomDrawerContent />}
      screenOptions={{
        headerTintColor: theme.colors.onPrimary,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerRight: () => (
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Appbar.Action
              icon={themeMode === "light" ? "brightness-7" : "brightness-3"}
              color={theme.colors.onPrimary}
              onPress={() =>
                setThemeMode(themeMode === "light" ? "dark" : "light")
              }
            />
            <IconButton
              icon="account"
              onPress={() => navigation.navigate("Setting")}
              iconColor={theme.colors.onPrimary}
            />
          </View>
        ),
      }}
    >
      <Drawer.Screen
        name="Home"
        options={{ title: i18n.t("home") }}
        component={HomeScreen}
      />
      <Drawer.Screen
        name="HourRegistrations"
        options={{ title: i18n.t("hourRegistrations") }}
        component={HourRegistrationNavigator}
      />
      <Drawer.Screen
        name="SelfcertfiedHours"
        options={{ title: i18n.t("selfcertfiedHours") }}
        component={SelfCertifiedRegNavigator}
      />
      <Drawer.Screen
        name="MovableHolidays"
        options={{ title: i18n.t("movableHolidays") }}
        component={MovableHolidayNavigator}
      />
      <Drawer.Screen
        name="SickLeave"
        options={{ title: i18n.t("sickLeave") }}
        component={SickLeaveNavigator}
      />
      <Drawer.Screen
        name="Setting"
        options={{ title: i18n.t("setting") }}
        component={SettingsScreen}
      />
      <Drawer.Screen
        name="Profile"
        options={{ title: i18n.t("profile") }}
        component={ProfileScreen}
      />
      <Drawer.Screen
        name="About"
        options={{ title: i18n.t("about") }}
        component={AboutScreen}
      />
      <Drawer.Screen
        name="Cookies"
        options={{ title: i18n.t("cookies") }}
        component={CookiesScreen}
      />
    </Drawer.Navigator>
  );
}

export default RootDrawerNavigator;
