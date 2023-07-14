import { useCallback, useEffect, useState } from "react";
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
import { i18n } from "../../i18n";
import { useSelector } from "react-redux";
import SpeedDialForHourReg from "../../components/speedDials/SpeedDialForHourReg";
import { apis } from "../../apis";
import { useForm } from "react-hook-form";
import useSnackbar from "../../context/userSnackbar";
import { useFocusEffect } from "@react-navigation/native";
import { getHourRegById } from "../../redux/actions/hourRegsActions";

const HourRegDetailsScreen = ({ route, navigation }) => {
  const { dispatch: showSnackbar } = useSnackbar();
  const [fomattedKmExtra, setFomattedKmExtra] = useState([]);
  const [openDialog, setOpenDialog] = useState({ delete: false });
  const {
    myConfig: {
      keys: { HoursExtraskm },
    },
    isLoading,
  } = useSelector((state) => state.common);
  const { hourReg } = useSelector((state) => state.hours);
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const {
    params: { id },
  } = route;

  const handleDelete = async () => {
    try {
      const res = await apis.deleteHourReg(id);
      setOpenDialog({ ...openDialog, delete: false });
      showSnackbar({
        type: "open",
        message: i18n.t("hourRegistrationHaveDeletedSuccessfully"),
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
    useCallback(() => {
      getHourRegById(route.params.id);
    }, [])
  );

  useEffect(() => {
    const temp = String(hourReg?.kmExtraTypes).split(",");
    const array1 = [];
    temp.forEach((e) => {
      if (e.length > 0)
        HoursExtraskm.forEach((item) => {
          if (item.includes(e)) array1.push(item);
        });
    });
    setFomattedKmExtra(array1);
  }, [hourReg]);

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
              <Text variant="titleMedium">{i18n.t("whoWhereAndWhen")}</Text>
              <DataTable style={commonStyles.mb60}>
                <DataTable.Header>
                  <DataTable.Title>{i18n.t("key")}</DataTable.Title>
                  <DataTable.Title>{i18n.t("value")}</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                  <DataTable.Cell>{i18n.t("employeeNumber")}</DataTable.Cell>
                  <DataTable.Cell>{hourReg?.employeeNumber}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>{i18n.t("date")}</DataTable.Cell>
                  <DataTable.Cell>{hourReg?.hDate}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>{i18n.t("project")}</DataTable.Cell>
                  <DataTable.Cell>{hourReg?.projectNumber}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>{i18n.t("when")}</DataTable.Cell>
                  <DataTable.Cell>
                    {hourReg?.startTime}-{hourReg?.endTime}
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>{i18n.t("activity")}</DataTable.Cell>
                  <DataTable.Cell>{hourReg?.activityCode}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>{i18n.t("year")}</DataTable.Cell>
                  <DataTable.Cell>{hourReg?.hYear}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>{i18n.t("month")}</DataTable.Cell>
                  <DataTable.Cell>{hourReg?.hMonth}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>{i18n.t("week")}</DataTable.Cell>
                  <DataTable.Cell>{hourReg?.week}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>
                    {i18n.t("departmentEmployee")}
                  </DataTable.Cell>
                  <DataTable.Cell>{hourReg?.departmentEmployee}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>{i18n.t("departmentProject")}</DataTable.Cell>
                  <DataTable.Cell>{hourReg?.departmentProject}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>{i18n.t("projectManager")}</DataTable.Cell>
                  <DataTable.Cell>{hourReg?.projectManager}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>{i18n.t("externalId")}</DataTable.Cell>
                  <DataTable.Cell>{hourReg?.externalId}</DataTable.Cell>
                </DataTable.Row>
              </DataTable>

              <Text variant="titleMedium">{i18n.t("hours")}</Text>
              <DataTable style={commonStyles.mb60}>
                <DataTable.Header>
                  <DataTable.Title>{i18n.t("key")}</DataTable.Title>
                  <DataTable.Title>{i18n.t("value")}</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                  <DataTable.Cell>{i18n.t("registrations")}</DataTable.Cell>
                  <DataTable.Cell>
                    {hourReg?.startTime}-{hourReg?.endTime}:
                    {hourReg?.projectNumber}
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>{i18n.t("hoursTotal")}</DataTable.Cell>
                  <DataTable.Cell>{hourReg?.hoursTotal}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>{i18n.t("overtime50")}</DataTable.Cell>
                  <DataTable.Cell>{hourReg?.hours50}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>{i18n.t("overtime100")}</DataTable.Cell>
                  <DataTable.Cell>{hourReg?.hours100}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>{i18n.t("break")}</DataTable.Cell>
                  <DataTable.Cell>{hourReg?.hoursBreak}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>{i18n.t("ExtraNo1")}</DataTable.Cell>
                  <DataTable.Cell>{hourReg?.extra1}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>{i18n.t("ExtraNo2")}</DataTable.Cell>
                  <DataTable.Cell>{hourReg?.extra2}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>{i18n.t("comment")}</DataTable.Cell>
                  <DataTable.Cell>{hourReg?.comment}</DataTable.Cell>
                </DataTable.Row>
              </DataTable>

              <Text variant="titleMedium">{i18n.t("allowances")}</Text>
              <DataTable style={commonStyles.mb60}>
                <DataTable.Header>
                  <DataTable.Title>{i18n.t("key")}</DataTable.Title>
                  <DataTable.Title>{i18n.t("value")}</DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                  <DataTable.Cell>{i18n.t("km")}</DataTable.Cell>
                  <DataTable.Cell>{hourReg?.km}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>{i18n.t("kmExtra")}</DataTable.Cell>
                  <DataTable.Cell>
                    <View>
                      {fomattedKmExtra.map((e, index) => (
                        <Text key={e}>{e} </Text>
                      ))}
                    </View>
                  </DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>
                    {i18n.t("descriptionAndTravelRoute")}
                  </DataTable.Cell>
                  <DataTable.Cell>{hourReg?.kmDescription}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>{i18n.t("toll")}</DataTable.Cell>
                  <DataTable.Cell>{hourReg?.toll}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>{i18n.t("parking")}</DataTable.Cell>
                  <DataTable.Cell>{hourReg?.parking}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>{i18n.t("diet")}</DataTable.Cell>
                  <DataTable.Cell>{hourReg?.dietFrom}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>{i18n.t("dietPeriod")}</DataTable.Cell>
                  <DataTable.Cell>{hourReg?.dietTo}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>{i18n.t("outlay")}</DataTable.Cell>
                  <DataTable.Cell>{hourReg?.outlay}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>{i18n.t("description")}</DataTable.Cell>
                  <DataTable.Cell>{hourReg?.outlayDescription}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                  <DataTable.Cell>{i18n.t("outlayType")}</DataTable.Cell>
                  <DataTable.Cell>{hourReg?.outlayType}</DataTable.Cell>
                </DataTable.Row>
              </DataTable>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      <SpeedDialForHourReg handleDelete={showDialog} id={route.params.id} />
    </>
  );
};

export default HourRegDetailsScreen;
