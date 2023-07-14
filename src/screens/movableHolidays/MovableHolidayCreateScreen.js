import * as React from "react";
import { SafeAreaView, ScrollView, View, StyleSheet } from "react-native";
import {
  Text,
  HelperText,
  TextInput,
  Button,
  useTheme,
} from "react-native-paper";
import { commonStyles } from "../../styles";
import { i18n } from "../../i18n";
import { Controller, useForm } from "react-hook-form";
import { DatePickerInput } from "react-native-paper-dates";
import { useState } from "react";
import { Autocomplete } from "@telenko/react-native-paper-autocomplete";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { labelToDropdownList } from "../../utils/labelToDropdownList";
import { apis } from "../../apis";
import DropDown from "react-native-paper-dropdown";

export default function MovableHolidayCreateScreen({ route, navigation }) {
  const theme = useTheme();
  const [projectList, setProjectList] = useState([]);
  const [subProjectList, setSubProjectList] = useState([]);
  const [showDropDown, setShowDropDown] = React.useState({
    projects: false,
    subProjects: false,
  });
  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
    watch,
  } = useForm({
    defaultValues: {
      username: "",
      hDate: new Date(),
      projectNumber: "",
      hoursTotal: "",
    },
  });

  const {
    myConfig: {
      username,
      keys: { HoursShowProject },
      projects,
    },
  } = useSelector((state) => state.common);

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

  const handleCreate = async (data) => {
    try {
      data.username = username;
      const res = await apis.createMovableHolidayHours(data);
      navigation.navigate("Details", {
        params: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          <View style={commonStyles.container}>
            <View style={commonStyles.mb20}>
              <Text variant="titleLarge">{i18n.t("whoWhereAndWhen")}</Text>
              <Controller
                control={control}
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
                name="hDate"
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
                          setShowDropDown({
                            ...showDropDown,
                            subProjects: true,
                          })
                        }
                        onDismiss={() =>
                          setShowDropDown({
                            ...showDropDown,
                            subProjects: false,
                          })
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
              <Text variant="titleLarge">{i18n.t("hours")}</Text>
              <Controller
                control={control}
                rules={{
                  required: { value: true, message: i18n.t("thisIsRequired") },
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

              <Button
                mode="contained"
                onPress={handleSubmit(handleCreate)}
                loading={isSubmitting}
                disabled={isSubmitting}
                style={commonStyles.mv10}
              >
                {i18n.t("create")}
              </Button>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
