import * as React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Divider, List, useTheme } from "react-native-paper";
import { useForm } from "react-hook-form";
import { i18n } from "../../i18n";
import { commonStyles } from "../../styles";
import { LOGOUT } from "../../redux/actionTypes";
import { storage } from "../../utils/storage";
import { store } from "../../redux/store";

export default function SettingsScreen({ navigation }) {
  const theme = useTheme();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const handleLogout = async () => {
    try {
      await storage.removeItem("access_token");
      store.dispatch({ type: LOGOUT });
    } catch (error) {}
  };
  return (
    <SafeAreaView
      style={[
        commonStyles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <View>
        <List.Section>
          <List.Item
            title={i18n.t("myPreference")}
            left={() => <List.Icon icon="account" />}
            onPress={() => navigation.navigate("Profile")}
            style={styles.listItem}
          />
          <Divider style={styles.divider} />
          <List.Item
            title={i18n.t("aboutUs")}
            left={() => <List.Icon icon="format-list-bulleted" />}
            onPress={() => navigation.navigate("About")}
            style={styles.listItem}
          />
          <Divider style={styles.divider} />
          <List.Item
            title={i18n.t("cookies")}
            left={() => <List.Icon icon="cookie" />}
            onPress={() => navigation.navigate("Cookies")}
            style={styles.listItem}
          />
          <Divider style={styles.divider} />
          <Button
            mode="contained-tonal"
            onPress={handleSubmit(handleLogout)}
            loading={isSubmitting}
            icon="logout"
            style={styles.mt20}
            disabled={isSubmitting}
          >
            {i18n.t("logout")}
          </Button>
        </List.Section>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  listItem: {
    paddingHorizontal: 5,
  },
  mt20: {
    marginTop: 20,
  },
  divider: {
    width: "100%",
    height: 1,
  },
});
