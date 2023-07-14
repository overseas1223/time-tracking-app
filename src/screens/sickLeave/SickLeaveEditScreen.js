import * as React from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import {
  Text,
  HelperText,
  useTheme,
  Button,
  TextInput,
} from "react-native-paper";
import { commonStyles } from "../../styles";
import { i18n } from "../../i18n";
import { Controller, useForm } from "react-hook-form";
import { apis } from "../../apis";
import { useEffect } from "react";
import { DatePickerInput } from "react-native-paper-dates";
import { useSelector } from "react-redux";
import { Autocomplete } from "@telenko/react-native-paper-autocomplete";
import { useState } from "react";
import { labelToDropdownList } from "../../utils/labelToDropdownList";
import DropDown from "react-native-paper-dropdown";
import useSnackbar from "../../context/userSnackbar";

export default function SickLeaveEditScreen({ navigation, route }) {
  const theme = useTheme();

  const [projectList, setProjectList] = useState([]);
  const [subProjectList, setSubProjectList] = useState([]);
  const { dispatch: showSnackbar } = useSnackbar();
  const [showDropDown, setShowDropDown] = React.useState({
    projects: false,
    subProjects: false,
  });
  const [openDialog, setOpenDialog] = useState({ delete: false });

  const {
    myConfig: {
      username,
      keys: { HoursShowProject, HoursShowselfcertified },
      projects,
    },
  } = useSelector((state) => state.common);
  const {
    params: {
      params: { id },
    },
  } = route;
  const {
    setValue,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },
  } = useForm({
    defaultValues: {
      hDate: null,
      projectNumber: "",
      hoursTotal: null,
      username: "",
      subProject: null,
    },
  });
  useEffect(() => {
    projects.forEach((e) => {
      if (e.key == watch("projectNumber")) {
        setSubProjectList(e.subProjects);
      }
    });
  }, [watch("projectNumber")]);
  React.useEffect(() => {
    var array;
    if (HoursShowProject) {
      array = [];
      projects.forEach((e) => {
        array.push({ label: e.label, value: e.key });
      });
      setProjectList(array);
    }
  }, [projects]);

  const init = async () => {
    try {
      const { data } = await apis.getSickLeave(id);
      setValue("hDate", new Date(data.hDate));
      setValue(
        "projectNumber",
        data.projectNumber && String(data.projectNumber)
      );
      setValue("hoursTotal", data.hoursTotal && String(data.hoursTotal));
      setValue("username", username);
      setValue("subProject", data.subProject && String(data.subProject));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleUpdate = async (data) => {
    try {
      await apis.updateSickLeave(id, data);
      setOpenDialog({ ...openDialog, delete: false });
      showSnackbar({
        type: "open",
        message: i18n.t("SickLeaveHaveUpdatedSuccessfully"),
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

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={commonStyles.container}>
          <View>
            <Text variant="titleLarge">{i18n.t("whoWhereAndWhen")}</Text>
            <Controller
              control={control}
              name="hDate"
              rules={{
                required: { value: true, message: i18n.t("thisIsRequired") },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <DatePickerInput
                  locale="en"
                  onBlur={onBlur}
                  label={i18n.t("date")}
                  value={value}
                  onChange={onChange}
                  inputMode="start"
                  style={commonStyles.mt20}
                />
              )}
            />
            <HelperText type="error" visible={!!errors.hDate}>
              {errors?.hDate?.message}
            </HelperText>

            {HoursShowProject && (
              <View>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      multiple={false}
                      value={value}
                      onChange={onChange}
                      options={projectList}
                      label={i18n.t("selectProject")}
                    />
                  )}
                  name="projectNumber"
                />
                <HelperText type="error" visible={!!errors.projectNumber}>
                  {errors?.projectNumber?.message}
                </HelperText>
              </View>
            )}

            {subProjectList?.length > 0 && (
              <View>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <DropDown
                      label={i18n.t("subProjects")}
                      visible={showDropDown.subProjects}
                      showDropDown={() =>
                        setShowDropDown({ ...showDropDown, subProjects: true })
                      }
                      onDismiss={() =>
                        setShowDropDown({ ...showDropDown, subProjects: false })
                      }
                      value={value}
                      setValue={onChange}
                      list={labelToDropdownList(subProjectList)}
                      dropDownItemTextStyle={{
                        color: theme.colors.onBackground,
                      }}
                    />
                  )}
                  name="subProject"
                />
                <HelperText type="error" visible={!!errors.subProject}>
                  {errors?.subProject?.message}
                </HelperText>
              </View>
            )}
          </View>
          <View>
            {HoursShowselfcertified && (
              <View>
                <Text variant="titleLarge">{i18n.t("hours")}</Text>
                <Controller
                  control={control}
                  rules={{
                    required: {
                      value: true,
                      message: i18n.t("thisIsRequired"),
                    },
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      label={i18n.t("hoursTotal")}
                      keyboardType="numeric"
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={String(value)}
                      error={errors.hoursTotal}
                      style={commonStyles.mt20}
                    />
                  )}
                  name="hoursTotal"
                />
                <HelperText type="error" visible={!!errors.hoursTotal}>
                  {errors?.hoursTotal?.message}
                </HelperText>
              </View>
            )}
            <Button
              mode="contained"
              onPress={handleSubmit(handleUpdate)}
              style={commonStyles.mv10}
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {i18n.t("update")}
            </Button>
            <Button
              mode="outlined"
              onPress={() => navigation.goBack()}
              style={commonStyles.mb60}
            >
              {i18n.t("back")}
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
