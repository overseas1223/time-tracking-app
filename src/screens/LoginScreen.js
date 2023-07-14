import * as React from "react";
import {
  Button,
  TextInput,
  Text,
  Checkbox,
  useTheme,
  HelperText,
} from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { i18n } from "../i18n";
import { commonStyles } from "../styles";
import useSnackbar from "../context/userSnackbar";
import { login } from "../redux/actions/authActions";

export default function LoginScreen() {
  const { dispatch: showSnackbar } = useSnackbar();
  const theme = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      code: "",
    },
  });
  const [rememberMe, setRememberMe] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false);

  const handleLogin = async (data) => {
    await login(data, showSnackbar);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={[commonStyles.container, styles.container]}>
          <View style={styles.logoContainer}>
            <Image source={require("../../assets/logo.png")} />
          </View>
          <Text variant="titleLarge" style={styles.title}>
            {i18n.t("welcomeToOurQuickReg")}
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label={i18n.t("username")}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                error={errors.username}
                style={commonStyles.mt20}
              />
            )}
            name="username"
          />
          <HelperText type="error" visible={!!errors.username}>
            {i18n.t("thisIsRequired")}
          </HelperText>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                label={i18n.t("password")}
                secureTextEntry={!showPass}
                error={errors.password}
                right={
                  <TextInput.Icon
                    icon={!showPass ? "eye" : "eye-off"}
                    onPress={() => setShowPass(!showPass)}
                  />
                }
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="password"
          />
          <HelperText type="error" visible={!!errors.password}>
            {i18n.t("thisIsRequired")}
          </HelperText>
          <Pressable
            style={styles.checkboxContainer}
            onPress={() => {
              setRememberMe(!rememberMe);
            }}
          >
            <Checkbox status={rememberMe ? "checked" : "unchecked"} />
            <Text> {i18n.t("rememberMe")}</Text>
          </Pressable>
          <Button
            mode="contained"
            loading={isSubmitting}
            onPress={handleSubmit(handleLogin)}
            style={commonStyles.mt20}
            disabled={isSubmitting}
          >
            {i18n.t("login")}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
  checkboxContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
