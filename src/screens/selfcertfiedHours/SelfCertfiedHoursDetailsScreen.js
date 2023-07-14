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
import { getSelfcertifiedHourById } from "../../redux/actions/hourRegsActions";
import { useFocusEffect } from "@react-navigation/native";
import { i18n } from "../../i18n";
import { useState, useEffect } from "react";
import SpeedDialSelfcertificatiedHours from "../../components/speedDials/SpeedDialSelfcertificatiedHours";
import { useForm } from "react-hook-form";
import useSnackbar from "../../context/userSnackbar";
import { apis } from "../../apis";

export default function SelfCertfiedHoursDetailsScreen({ route, navigation }) {
  const { dispatch: showSnackbar } = useSnackbar();
  const { selfcertifiedHour } = useSelector((state) => state.hours);
  const [reasonValue, setReasonValue] = useState("");
  const [careAlone, setCareAlone] = useState();
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

  const onChangeReason = (value) => {
    if (value === "00") {
      setReasonValue("egenSykdomOwnDisease(00)");
    } else if (value === "01") {
      setReasonValue("barnsSykdomKidsDisease(01)");
    } else {
      setReasonValue("barnepassersSykdomKidsSittersDisease(02)");
    }
  };

  const onChangeCareAlone = (value) => {
    value ? setCareAlone("False") : setCareAlone("True");
  };

  const handleDelete = async () => {
    try {
      await apis.deleteSelfcertifiedHours(id);
      setOpenDialog({ ...openDialog, delete: false });
      showSnackbar({
        type: "open",
        message: i18n.t("selfCertificatiedHoursHaveDeletedSuccessfully"),
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

  useEffect(() => {
    onChangeReason(selfcertifiedHour?.hrReason);
    onChangeCareAlone(selfcertifiedHour?.hrCareAlone);
  }, []);
  useFocusEffect(
    React.useCallback(() => {
      getSelfcertifiedHourById(id);
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
                    <DataTable.Cell>{selfcertifiedHour?.username}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("date")}</DataTable.Cell>
                    <DataTable.Cell>{selfcertifiedHour?.hDate}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("project")}</DataTable.Cell>
                    <DataTable.Cell>
                      {selfcertifiedHour?.projectNumber}
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("year")}</DataTable.Cell>
                    <DataTable.Cell>{selfcertifiedHour?.hYear}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("month")}</DataTable.Cell>
                    <DataTable.Cell>{selfcertifiedHour?.hMonth}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("week")}</DataTable.Cell>
                    <DataTable.Cell>{selfcertifiedHour?.week}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>
                      {i18n.t("departmentEmployee")}
                    </DataTable.Cell>
                    <DataTable.Cell>
                      {selfcertifiedHour?.departmentEmployee}
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>
                      {i18n.t("departmentProject")}
                    </DataTable.Cell>
                    <DataTable.Cell>
                      {selfcertifiedHour?.departmentProject}
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("projectManager")}</DataTable.Cell>
                    <DataTable.Cell>
                      {selfcertifiedHour?.username}
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("externalId")}</DataTable.Cell>
                    <DataTable.Cell>
                      {selfcertifiedHour?.externalId}
                    </DataTable.Cell>
                  </DataTable.Row>
                </DataTable>
              </View>
              <View style={commonStyles.mb20}>
                <Text variant="titleLarge">{i18n.t("hours")}</Text>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>{i18n.t("key")}</DataTable.Title>
                    <DataTable.Title>{i18n.t("value")}</DataTable.Title>
                  </DataTable.Header>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("hours")}</DataTable.Cell>
                    <DataTable.Cell>
                      {selfcertifiedHour?.hoursTotal}
                    </DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("cost")}</DataTable.Cell>
                    <DataTable.Cell>{selfcertifiedHour?.cost}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("payrollNumber")}</DataTable.Cell>
                    <DataTable.Cell>
                      {selfcertifiedHour?.payrollNumber}
                    </DataTable.Cell>
                  </DataTable.Row>
                </DataTable>
              </View>
              <View>
                <Text variant="titleLarge">{i18n.t("hr01NyNew")}</Text>
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title>{i18n.t("key")}</DataTable.Title>
                    <DataTable.Title>{i18n.t("value")}</DataTable.Title>
                  </DataTable.Header>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("reason")}</DataTable.Cell>
                    <DataTable.Cell>{reasonValue}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("careAlone")}</DataTable.Cell>
                    <DataTable.Cell>{careAlone}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell>{i18n.t("comment")}</DataTable.Cell>
                    <DataTable.Cell>
                      {selfcertifiedHour?.hrComment}
                    </DataTable.Cell>
                  </DataTable.Row>
                </DataTable>
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      <SpeedDialSelfcertificatiedHours
        handleDelete={showDialog}
        id={route.params.params.id}
      />
    </>
  );
}
