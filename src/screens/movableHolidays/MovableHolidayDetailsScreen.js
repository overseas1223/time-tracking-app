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
import { getMovableHolidayHourById } from "../../redux/actions/hourRegsActions";
import { useFocusEffect } from "@react-navigation/native";
import { i18n } from "../../i18n";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useSnackbar from "../../context/userSnackbar";
import { apis } from "../../apis";
import SpeedDialMovableHoliday from "../../components/speedDials/SpeedDialMovableHoliday";

export default function MovableHolidayDetailsScreen({ route, navigation }) {
  const { dispatch: showSnackbar } = useSnackbar();
  const { movableHolidayHour } = useSelector((state) => state.hours);
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
      await apis.deleteMovableHolidayHour(id);
      setOpenDialog({ ...openDialog, delete: false });
      showSnackbar({
        type: "open",
        message: i18n.t("movablHolidayHaveDeletedSuccessfully"),
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
      getMovableHolidayHourById(id);
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
                    <DataTable.Cell>
                      {movableHolidayHour?.username}
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("date")}</DataTable.Cell>
                    <DataTable.Cell>{movableHolidayHour?.hDate}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("project")}</DataTable.Cell>
                    <DataTable.Cell>
                      {movableHolidayHour?.projectNumber}
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("year")}</DataTable.Cell>
                    <DataTable.Cell>{movableHolidayHour?.hYear}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("month")}</DataTable.Cell>
                    <DataTable.Cell>
                      {movableHolidayHour?.hMonth}
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("week")}</DataTable.Cell>
                    <DataTable.Cell>{movableHolidayHour?.week}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>
                      {i18n.t("departmentEmployee")}
                    </DataTable.Cell>
                    <DataTable.Cell>
                      {movableHolidayHour?.departmentEmployee}
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>
                      {i18n.t("departmentProject")}
                    </DataTable.Cell>
                    <DataTable.Cell>
                      {movableHolidayHour?.departmentProject}
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("projectManager")}</DataTable.Cell>
                    <DataTable.Cell>
                      {movableHolidayHour?.projectManager}
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("payroll")}</DataTable.Cell>
                    <DataTable.Cell>
                      {movableHolidayHour?.payrollNumber}
                    </DataTable.Cell>
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
                    <DataTable.Cell>
                      {movableHolidayHour?.hoursTotal}
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("cost")}</DataTable.Cell>
                    <DataTable.Cell>{movableHolidayHour?.cost}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("payroll")}</DataTable.Cell>
                    <DataTable.Cell>
                      {movableHolidayHour?.payrollNumber}
                    </DataTable.Cell>
                  </DataTable.Row>
                </DataTable>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      <SpeedDialMovableHoliday
        handleDelete={showDialog}
        id={route.params.params.id}
      />
    </>
  );
}
