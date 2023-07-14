import * as React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import {
  Button,
  DataTable,
  Dialog,
  Portal,
  ProgressBar,
  Text,
} from "react-native-paper";
import { commonStyles } from "../../styles";
import { useSelector } from "react-redux";
import { getSickLeaveById } from "../../redux/actions/hourRegsActions";
import { useFocusEffect } from "@react-navigation/native";
import { i18n } from "../../i18n";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useSnackbar from "../../context/userSnackbar";
import { apis } from "../../apis";
import SpeedDialSickLeaves from "../../components/speedDials/SpeedDialSickLeaves";

export default function SickLeaveDetailsScreen({ route, navigation }) {
  const { dispatch: showSnackbar } = useSnackbar();
  const { sickLeave } = useSelector((state) => state.hours);
  const [openDialog, setOpenDialog] = useState({ delete: false });
  const {
    params: {
      params: { id },
    },
  } = route;
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const { isLoading } = useSelector((state) => state.common);

  const handleDelete = async () => {
    try {
      await apis.deleteSickLeave(id);
      setOpenDialog({ ...openDialog, delete: false });
      showSnackbar({
        type: "open",
        message: i18n.t("sickLeaveHaveDeletedSuccessfully"),
        snackbarType: "success",
      });
      navigation.goBack();
    } catch (error) {
      console.log(error);
      setOpenDialog({ ...openDialog, delete: false });
      showSnackbar({
        type: "open",
        message: i18n.t("somethingWentWrong"),
        snackbarType: "error",
      });
    }
  };

  const showDialog = () => setOpenDialog({ ...openDialog, delete: true });
  const hideDialog = () => setOpenDialog({ ...openDialog, delete: false });

  useFocusEffect(
    React.useCallback(() => {
      getSickLeaveById(id);
    }, [])
  );

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <Portal>
            <Dialog visible={openDialog.delete} onDismiss={hideDialog}>
              <Dialog.Title>{i18n.t("delete")}</Dialog.Title>
              <Dialog.Content>
                <Text variant="bodyMedium">
                  {i18n.t("areYouSureToDeleteThisHourRegistration")}
                </Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog} disabled={isSubmitting}>
                  {i18n.t("cancel")}
                </Button>
                <Button
                  onPress={handleSubmit(handleDelete)}
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  {i18n.t("delete")}
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          {isLoading ? (
            <ProgressBar indeterminate />
          ) : (
            <View style={commonStyles.container}>
              <View style={commonStyles.mb20}>
                <Text variant="titleLarge">{i18n.t("whoWhereAndWhen")}</Text>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>{i18n.t("key")}</DataTable.Title>
                    <DataTable.Title>{i18n.t("value")}</DataTable.Title>
                  </DataTable.Header>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("who")}</DataTable.Cell>
                    <DataTable.Cell>{sickLeave?.username}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("date")}</DataTable.Cell>
                    <DataTable.Cell>{sickLeave?.hDate}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("project")}</DataTable.Cell>
                    <DataTable.Cell>{sickLeave?.projectNumber}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("year")}</DataTable.Cell>
                    <DataTable.Cell>{sickLeave?.hYear}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("month")}</DataTable.Cell>
                    <DataTable.Cell>{sickLeave?.hMonth}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("week")}</DataTable.Cell>
                    <DataTable.Cell>{sickLeave?.week}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>
                      {i18n.t("departmentEmployee")}
                    </DataTable.Cell>
                    <DataTable.Cell>
                      {sickLeave?.departmentEmployee}
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>
                      {i18n.t("departmentProject")}
                    </DataTable.Cell>
                    <DataTable.Cell>
                      {sickLeave?.departmentProject}
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("projectManager")}</DataTable.Cell>
                    <DataTable.Cell>{sickLeave?.projectManager}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("payroll")}</DataTable.Cell>
                    <DataTable.Cell>{sickLeave?.payrollNumber}</DataTable.Cell>
                  </DataTable.Row>
                </DataTable>
              </View>
              <View>
                <Text variant="titleLarge">{i18n.t("hours")}</Text>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>{i18n.t("key")}</DataTable.Title>
                    <DataTable.Title>{i18n.t("value")}</DataTable.Title>
                  </DataTable.Header>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("hours")}</DataTable.Cell>
                    <DataTable.Cell>{sickLeave?.hoursTotal}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("cost")}</DataTable.Cell>
                    <DataTable.Cell>{sickLeave?.cost}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("payroll")}</DataTable.Cell>
                    <DataTable.Cell>{sickLeave?.payrollNumber}</DataTable.Cell>
                  </DataTable.Row>
                </DataTable>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      <SpeedDialSickLeaves
        handleDelete={showDialog}
        id={route.params.params.id}
      />
    </>
  );
}
