import React, { useEffect, useState } from "react";
import { Snackbar, Text, useTheme } from "react-native-paper";
import useSnackbar from "../context/userSnackbar";

const SnackBar = () => {
  const theme = useTheme();
  const [snackbarStyle, setSnackbarStyle] = useState({
    backgroundColor: theme.colors.primary,
  });
  const { dispatch, showSnackbar } = useSnackbar();

  useEffect(() => {
    switch ((!!showSnackbar && showSnackbar.snackbarType) || "default") {
      case "info":
        setSnackbarStyle({
          backgroundColor: theme.colors.onBackground,
        });
        break;
      case "error":
        setSnackbarStyle({
          backgroundColor: theme.colors.error,
        });
        break;
      case "success":
        setSnackbarStyle({
          backgroundColor: theme.colors.primary,
        });
        break;
      default:
        setSnackbarStyle({
          backgroundColor: theme.colors.primary,
        });
    }
  }, [showSnackbar]);

  const closeMe = () => {
    dispatch({ type: "close" });
  };

  return (
    <>
      {!!showSnackbar && showSnackbar.open && (
        <Snackbar
          style={snackbarStyle}
          visible
          onDismiss={closeMe}
          action={{
            label: "Ok",
            onPress: closeMe,
          }}
        >
          <Text
            style={{
              color:
                showSnackbar.snackbarType === "success"
                  ? theme.colors.onPrimary
                  : showSnackbar.snackbarType === "error"
                  ? theme.colors.onError
                  : theme.colors.onPrimary,
            }}
          >
            {!!showSnackbar && showSnackbar.message}
          </Text>
        </Snackbar>
      )}
    </>
  );
};

export default SnackBar;
