import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { darkTheme, lightTheme } from "../theme";
import { storage } from "../utils/storage";
import { PaperProvider } from "react-native-paper";
const ThemeModeContext = createContext();

export const ThemeModeProvider = ({ children }) => {
  const [themeMode, _setThemeMode] = useState("dark");

  useEffect(() => {
    const initTheme = async () => {
      try {
        const theme_mode = await storage.getItem("theme_mode");
        _setThemeMode(theme_mode);
      } catch (error) {}
    };
    initTheme();
  }, []);
  const setThemeMode = async (e) => {
    try {
      await storage.setItem("theme_mode", e);
      _setThemeMode(e);
    } catch (error) {}
  };

  const value = useMemo(
    () => ({
      themeMode,
      setThemeMode,
    }), // eslint-disable-next-line
    [themeMode]
  );
  return (
    <ThemeModeContext.Provider value={value}>
      <PaperProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
        {children}
      </PaperProvider>
    </ThemeModeContext.Provider>
  );
};

export const useThemeMode = () => {
  return useContext(ThemeModeContext);
};
