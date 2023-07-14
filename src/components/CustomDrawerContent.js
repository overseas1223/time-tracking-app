import React from "react";
import { StyleSheet } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { Button, Divider, Drawer, Text } from "react-native-paper";
import { i18n } from "../i18n";
import { useNavigation } from "@react-navigation/native";
import { logout } from "../redux/actions/authActions";

export function CustomDrawerContent() {
  const navigation = useNavigation();
  const handleNavigate = (to) => {
    setActive(to);
    navigation.navigate(to);
  };
  const [active, setActive] = React.useState("");

  return (
    <DrawerContentScrollView>
      <Text
        variant="titleLarge"
        style={styles.title}
        onPress={() => handleNavigate("Home")}
      >
        {i18n.t("quickReg")}
      </Text>
      <Drawer.Item
        style={styles.drawerItem}
        icon="home"
        label={i18n.t("home")}
        active={active === "Home"}
        onPress={() => handleNavigate("Home")}
      />
      <Drawer.Item
        style={styles.drawerItem}
        icon="clock-time-nine"
        label={i18n.t("hourRegistrations")}
        active={active === "HourRegistrations"}
        onPress={() => handleNavigate("HourRegistrations")}
      />
      <Drawer.Item
        style={styles.drawerItem}
        icon="account-check"
        label={i18n.t("selfcertfiedHours")}
        active={active === "SelfcertfiedHours"}
        onPress={() => handleNavigate("SelfcertfiedHours")}
      />
      <Drawer.Item
        style={styles.drawerItem}
        icon="emoticon-sick"
        label={i18n.t("sickLeave")}
        active={active === "SickLeave"}
        onPress={() => handleNavigate("SickLeave")}
      />
      <Drawer.Item
        style={styles.drawerItem}
        icon="calendar-clock"
        label={i18n.t("movableHolidays")}
        active={active === "MovableHolidays"}
        onPress={() => handleNavigate("MovableHolidays")}
      />
      <Drawer.Item
        style={styles.drawerItem}
        icon="account"
        label={i18n.t("myPreference")}
        active={active === "Profile"}
        onPress={() => handleNavigate("Profile")}
      />
      <Drawer.Item
        style={styles.drawerItem}
        icon="account-supervisor-circle"
        label={i18n.t("aboutUs")}
        active={active === "About"}
        onPress={() => handleNavigate("About")}
      />
      <Drawer.Item
        style={styles.drawerItem}
        icon="cookie"
        label={i18n.t("cookies")}
        active={active === "Cookies"}
        onPress={() => handleNavigate("Cookies")}
      />
      <Divider style={styles.divider} />
      <Button
        mode="contained-tonal"
        style={styles.logoutButton}
        onPress={() => logout()}
      >
        Logout
      </Button>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 30,
  },
  drawerItem: {
    height: 50,
    borderRadius: 5,
    marginVertical: 3,
  },
  logoutButton: {
    margin: 16,
  },
  divider: {
    height: 1,
    marginHorizontal: 16,
  },
});
