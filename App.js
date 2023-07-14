import React, { useEffect, useState } from "react";
import "react-native-gesture-handler";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./src/redux/store";
import { MenuProvider } from "react-native-popup-menu";
import * as Localization from "expo-localization";
import { i18n } from "./src/i18n";
import { SnackbarProvider } from "./src/context/userSnackbar";
import SnackBar from "./src/components/Snackbar";
import { ThemeModeProvider } from "./src/context/useThemeModeContext";
import RootNavigator from "./src/navigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { en, registerTranslation } from "react-native-paper-dates";

registerTranslation("en", en);
i18n.locale = Localization.locale;
i18n.enableFallback = true;

export default function App() {
  return (
    <ReduxProvider store={store}>
      <ThemeModeProvider>
        <SafeAreaProvider>
          <SnackbarProvider>
            <MenuProvider>
              <RootNavigator />
            </MenuProvider>
            <SnackBar />
          </SnackbarProvider>
        </SafeAreaProvider>
      </ThemeModeProvider>
    </ReduxProvider>
  );
}
