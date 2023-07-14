import * as React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Pressable,
} from "react-native";
import { commonStyles } from "../../styles";
import {
  HelperText,
  Text,
  TextInput,
  useTheme,
  Checkbox,
  Button,
} from "react-native-paper";
import { useEffect, useState } from "react";
import { apis } from "../../apis";
import { i18n } from "../../i18n";
import { Controller, useForm } from "react-hook-form";
import DropDown from "react-native-paper-dropdown";
import { labelToDropdownList } from "../../utils/labelToDropdownList";
import { DatePickerInput } from "react-native-paper-dates";
import { useSelector } from "react-redux";
import { Autocomplete } from "@telenko/react-native-paper-autocomplete";
import { stringToDropDownList } from "../../utils/stringToDropDownList";
import { getBreakHours, getWorkHours } from "../../utils";
import useSnackbar from "../../context/userSnackbar";

export default function HourRegEditScreen({ navigation, route }) {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState({ delete: false });
  const { dispatch: showSnackbar } = useSnackbar();
  const {
    setValue,
    formState: { isSubmitting, errors },
    clearErrors,
    setError,
    watch,
    handleSubmit,
    control,
  } = useForm({
    defaultValues: {
      projectNumber: null,
      hDate: null,
      startTime: null,
      endTime: null,
      activityCode: null,
      username: null,
      subProject: null,
      hoursTotal: null,
      hours50: null,
      hours100: null,
      hoursBreak: null,
      extra1Type: null,
      extra1: null,
      extra2Type: null,
      extra2: null,
      comment: null,
      km: null,
      kmExtraTypes: [],
      kmDescription: null,
      toll: null,
      parking: null,
      dietType: null,
      dietFrom: null,
      dietTo: null,
      outlay: null,
      outlayDescription: null,
      outlayType: null,
    },
  });

  const [projectList, setProjectList] = React.useState([]);
  const [subProjectList, setSubProjectList] = React.useState([]);
  const [showDropDown, setShowDropDown] = React.useState({
    projects: false,
    startTime: false,
    endTime: false,
    activityCode: false,
    extra1Type: false,
    extra2Type: false,
    dietType: false,
    dietFrom: false,
    dietTo: false,
    subProjects: false,
  });

  const {
    myConfig: {
      keys: {
        HoursMandatorysubproject,
        HoursShowActivity,
        HoursShowProject,
        HoursActivitycodes,
        HoursTimeslots,
        HoursExtras,
        HoursShowbreak,
        HoursShowextra1,
        HoursShowextra2,
        HoursExtraskm,
        HoursDiets,
        HoursOutlaytypes,
        HoursShowkm,
        HoursShowtoll,
        HoursShowparking,
        HoursShowdiet,
      },
      projects,
    },
  } = useSelector((state) => state.common);

  const { params } = route;
  React.useEffect(() => {
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

  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    try {
      const { data } = await apis.getHourReg(params.id);
      setValue("hDate", new Date(data.hDate));
      setValue("startTime", data.startTime);
      setValue("endTime", data.endTime);
      setValue(
        "activityCode",
        data.activityCode !== null
          ? String(data.activityCode)
          : data.activityCode
      );
      setValue("username", data.username);
      setValue("subProject", data.subProject);
      setValue("hoursTotal", data.hoursTotal && String(data.hoursTotal));
      setValue("hours50", data.hours50 && String(data.hours50));
      setValue("hours100", data.hours100 && String(data.hours100));
      setValue(
        "hoursBreak",
        data.hoursBreak !== null ? String(data.hoursBreak) : data.hoursBreak
      );
      setValue("extra1Type", data.extra1Type);
      setValue(
        "extra1",
        data.extra1 !== null ? String(data.extra1) : data.extra1
      );
      setValue("extra2Type", data.extra2Type);
      setValue(
        "extra2",
        data.extra2 !== null ? String(data.extra2) : data.extra2
      );
      setValue("comment", data.comment);
      setValue("km", data.km !== null ? String(data.km) : data.km);
      setValue("kmExtraTypes", String(data.kmExtraTypes).split(","));
      setValue("kmDescription", data.kmDescription);
      setValue("toll", data.toll !== null ? String(data.toll) : data.toll);
      setValue(
        "parking",
        data.parking !== null ? String(data.parking) : data.parking
      );
      setValue(
        "dietType",
        data.dietType !== null ? String(data.dietType) : data.dietType
      );
      setValue("dietFrom", new Date(data.dietFrom));
      setValue("dietTo", new Date(data.dietTo));
      setValue(
        "outlay",
        data.outlay !== null ? String(data.outlay) : data.outlay
      );
      setValue("outlayDescription", data.outlayDescription);
      setValue("outlayType", data.outlayType);
      setValue(
        "projectNumber",
        data.projectNumber !== null
          ? String(data.projectNumber)
          : data.projectNumber
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await apis.updateHourReg(params.id, data);
      setOpenDialog({ ...openDialog, delete: false });
      showSnackbar({
        type: "open",
        message: i18n.t("hourRegistrationHaveUpdatedSuccessfully"),
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

            <View>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DropDown
                    label={i18n.t("startTime")}
                    visible={showDropDown.startTime}
                    showDropDown={() =>
                      setShowDropDown({ ...showDropDown, startTime: true })
                    }
                    onDismiss={() =>
                      setShowDropDown({ ...showDropDown, startTime: false })
                    }
                    value={value}
                    setValue={onChange}
                    list={labelToDropdownList(HoursTimeslots)}
                    dropDownItemTextStyle={{ color: theme.colors.onBackground }}
                  />
                )}
                name="startTime"
              />

              <HelperText type="error" visible={!!errors.startTime}>
                {errors?.startTime?.message}
              </HelperText>
            </View>

            <View>
              <Controller
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DropDown
                    label={i18n.t("endTime")}
                    visible={showDropDown.endTime}
                    showDropDown={() =>
                      setShowDropDown({ ...showDropDown, endTime: true })
                    }
                    onDismiss={() =>
                      setShowDropDown({ ...showDropDown, endTime: false })
                    }
                    value={value}
                    setValue={onChange}
                    list={labelToDropdownList(HoursTimeslots)}
                    dropDownItemTextStyle={{ color: theme.colors.onBackground }}
                  />
                )}
                name="endTime"
              />
              <HelperText type="error" visible={!!errors.endTime}>
                {errors?.endTime?.message}
              </HelperText>
            </View>
            {HoursShowProject && (
              <View>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      multiple={false}
                      value={[value]}
                      onChange={onChange}
                      options={projectList}
                      label="Select Project"
                    />
                  )}
                  name="projectNumber"
                />
                <HelperText type="error" visible={!!errors.projectNumber}>
                  {errors?.projectNumber?.message}
                </HelperText>
              </View>
            )}

            {subProjectList.length > 0 && (
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

            {HoursShowActivity && (
              <View>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <DropDown
                      label={i18n.t("activityCode")}
                      visible={showDropDown.activityCode}
                      showDropDown={() =>
                        setShowDropDown({ ...showDropDown, activityCode: true })
                      }
                      onDismiss={() =>
                        setShowDropDown({
                          ...showDropDown,
                          activityCode: false,
                        })
                      }
                      value={value}
                      setValue={onChange}
                      list={stringToDropDownList(HoursActivitycodes)}
                      dropDownItemTextStyle={{
                        color: theme.colors.onBackground,
                      }}
                    />
                  )}
                  name="activityCode"
                />
                <HelperText type="error" visible={!!errors.activityCode}>
                  {errors?.activityCode?.message}
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

            <Controller
              control={control}
              // rules={{
              //   required: { value: true, message: i18n.t("thisIsRequired") },
              // }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label={i18n.t("overtime50")}
                  keyboardType="numeric"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.hours50}
                />
              )}
              name="hours50"
            />

            <HelperText type="error" visible={!!errors.hours50}>
              {errors?.hours50?.message}
            </HelperText>

            <Controller
              control={control}
              // rules={{
              //   required: { value: true, message: i18n.t("thisIsRequired") },
              // }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label={i18n.t("overtime100")}
                  keyboardType="numeric"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.hours100}
                />
              )}
              name="hours100"
            />

            <HelperText type="error" visible={!!errors.hours100}>
              {errors?.hours100?.message}
            </HelperText>

            {HoursShowbreak && (
              <Controller
                control={control}
                // rules={{
                //   required: { value: true, message: i18n.t("thisIsRequired") },
                // }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label={i18n.t("hoursBreak")}
                    keyboardType="numeric"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors.hoursBreak}
                  />
                )}
                name="hoursBreak"
              />
            )}

            <HelperText type="error" visible={!!errors.hoursBreak}>
              {errors?.hoursBreak?.message}
            </HelperText>

            {HoursShowextra1 && (
              <View style={styles.container1}>
                <View style={{ flex: 1 }}>
                  <Controller
                    control={control}
                    // rules={{
                    //   required: {
                    //     value: true,
                    //     message: i18n.t("thisIsRequired"),
                    //   },
                    // }}
                    render={({ field: { onChange, value } }) => (
                      <DropDown
                        label={i18n.t("extra1Type")}
                        visible={showDropDown.extra1Type}
                        showDropDown={() =>
                          setShowDropDown({ ...showDropDown, extra1Type: true })
                        }
                        onDismiss={() =>
                          setShowDropDown({
                            ...showDropDown,
                            extra1Type: false,
                          })
                        }
                        value={value}
                        setValue={onChange}
                        list={stringToDropDownList(HoursExtras)}
                        dropDownItemTextStyle={{
                          color: theme.colors.onBackground,
                        }}
                        style={{ flex: 1 }}
                      />
                    )}
                    name="extra1Type"
                  />

                  <HelperText type="error" visible={!!errors.extra1Type}>
                    {errors?.extra1Type?.message}
                  </HelperText>
                </View>
                <View style={{ flex: 1 }}>
                  <Controller
                    control={control}
                    // rules={{
                    //   required: {
                    //     value: true,
                    //     message: i18n.t("thisIsRequired"),
                    //   },
                    // }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        label={i18n.t("extra1")}
                        keyboardType="numeric"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={errors.extra1}
                      />
                    )}
                    name="extra1"
                  />

                  <HelperText type="error" visible={!!errors.extra1}>
                    {errors?.extra1?.message}
                  </HelperText>
                </View>
              </View>
            )}
            {HoursShowextra2 && (
              <View style={styles.container1}>
                <View style={{ flex: 1 }}>
                  <Controller
                    control={control}
                    // rules={{
                    //   required: {
                    //     value: true,
                    //     message: i18n.t("thisIsRequired"),
                    //   },
                    // }}
                    render={({ field: { onChange, value } }) => (
                      <DropDown
                        label={i18n.t("extra2Type")}
                        visible={showDropDown.extra2Type}
                        showDropDown={() =>
                          setShowDropDown({ ...showDropDown, extra2Type: true })
                        }
                        onDismiss={() =>
                          setShowDropDown({
                            ...showDropDown,
                            extra2Type: false,
                          })
                        }
                        value={value}
                        setValue={onChange}
                        list={stringToDropDownList(HoursExtras)}
                        dropDownItemTextStyle={{
                          color: theme.colors.onBackground,
                        }}
                        style={{ flex: 1 }}
                      />
                    )}
                    name="extra2Type"
                  />

                  <HelperText type="error" visible={!!errors.extra2Type}>
                    {errors?.extra2Type?.message}
                  </HelperText>
                </View>
                <View style={{ flex: 1 }}>
                  <Controller
                    control={control}
                    // rules={{
                    //   required: {
                    //     value: true,
                    //     message: i18n.t("thisIsRequired"),
                    //   },
                    // }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        label={i18n.t("extra2")}
                        keyboardType="numeric"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        error={errors.extra2}
                      />
                    )}
                    name="extra2"
                  />

                  <HelperText type="error" visible={!!errors.extra2}>
                    {errors?.extra2?.message}
                  </HelperText>
                </View>
              </View>
            )}
            <Controller
              control={control}
              // rules={{
              //   required: { value: true, message: i18n.t("thisIsRequired") },
              // }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label={i18n.t("comments")}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.comment}
                  multiline
                  numberOfLines={3}
                />
              )}
              name="comment"
            />

            <HelperText type="error" visible={!!errors.comment}>
              {errors?.comment?.message}
            </HelperText>
          </View>
          <View>
            <Text variant="titleLarge">{i18n.t("allowances")}</Text>
            {HoursShowkm && (
              <Controller
                control={control}
                rules={{
                  required: { value: true, message: i18n.t("thisIsRequired") },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label={i18n.t("km")}
                    keyboardType="numeric"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors.km}
                    style={commonStyles.mt20}
                  />
                )}
                name="km"
              />
            )}

            <HelperText type="error" visible={!!errors.km}>
              {errors?.km?.message}
            </HelperText>

            <Text variant="bodyLarge">{i18n.t("kmExtra")}</Text>
            {stringToDropDownList(HoursExtraskm).map((item, index) => (
              <Pressable
                style={styles.checkboxContainer}
                onPress={() => {
                  var value = watch("kmExtraTypes");
                  if (value.includes(item.value)) {
                    value = value.filter((e) => e !== item.value);
                    setValue("kmExtraTypes", value);
                  } else {
                    value.push(item.value);
                    setValue("kmExtraTypes", value);
                  }
                }}
                key={item.value}
              >
                <Checkbox
                  status={
                    watch("kmExtraTypes").includes(item.value)
                      ? "checked"
                      : "unchecked"
                  }
                />
                <Text> {item.label}</Text>
              </Pressable>
            ))}
            <Controller
              control={control}
              // rules={{
              //   required: { value: true, message: i18n.t("thisIsRequired") },
              // }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label={i18n.t("descriptionAndTravelRoute")}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.kmDescription}
                  multiline
                  numberOfLines={3}
                  style={commonStyles.mt20}
                />
              )}
              name="kmDescription"
            />

            <HelperText type="error" visible={!!errors.kmDescription}>
              {errors?.kmDescription?.message}
            </HelperText>

            {HoursShowtoll && (
              <Controller
                control={control}
                // rules={{
                //   required: { value: true, message: i18n.t("thisIsRequired") },
                // }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label={i18n.t("toll")}
                    keyboardType="numeric"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors.toll}
                  />
                )}
                name="toll"
              />
            )}

            <HelperText type="error" visible={!!errors.toll}>
              {errors?.toll?.message}
            </HelperText>

            {HoursShowparking && (
              <Controller
                control={control}
                // rules={{
                //   required: { value: true, message: i18n.t("thisIsRequired") },
                // }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    label={i18n.t("parking")}
                    keyboardType="numeric"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    error={errors.parking}
                  />
                )}
                name="parking"
              />
            )}

            <HelperText type="error" visible={!!errors.parking}>
              {errors?.parking?.message}
            </HelperText>

            {HoursShowdiet && (
              <View>
                <Controller
                  control={control}
                  // rules={{
                  //   required: { value: true, message: i18n.t("thisIsRequired") },
                  // }}
                  render={({ field: { onChange, value } }) => (
                    <DropDown
                      label={i18n.t("dietType")}
                      visible={showDropDown.dietType}
                      showDropDown={() =>
                        setShowDropDown({ ...showDropDown, dietType: true })
                      }
                      onDismiss={() =>
                        setShowDropDown({ ...showDropDown, dietType: false })
                      }
                      value={value}
                      setValue={onChange}
                      list={stringToDropDownList(HoursDiets)}
                      dropDownItemTextStyle={{
                        color: theme.colors.onBackground,
                      }}
                      style={{ flex: 1 }}
                    />
                  )}
                  name="dietType"
                />

                <HelperText type="error" visible={!!errors.dietType}>
                  {errors?.dietType?.message}
                </HelperText>
              </View>
            )}
            <Text variant="bodyLarge" style={commonStyles.mb10}>
              {i18n.t("dietPeriod")}
            </Text>
            <View style={{ flex: 1, flexDirection: "row", gap: 10 }}>
              <View style={{ flex: 1 }}>
                <Controller
                  control={control}
                  // rules={{
                  //   required: { value: true, message: i18n.t("thisIsRequired") },
                  // }}
                  render={({ field: { onChange, value } }) => (
                    <DropDown
                      label={i18n.t("dietFrom")}
                      visible={showDropDown.dietFrom}
                      showDropDown={() =>
                        setShowDropDown({ ...showDropDown, dietFrom: true })
                      }
                      onDismiss={() =>
                        setShowDropDown({ ...showDropDown, dietFrom: false })
                      }
                      value={value}
                      setValue={onChange}
                      list={labelToDropdownList(HoursTimeslots)}
                      dropDownItemTextStyle={{
                        color: theme.colors.onBackground,
                      }}
                    />
                  )}
                  name="dietFrom"
                />
                <HelperText type="error" visible={!!errors.dietFrom}>
                  {errors?.dietFrom?.message}
                </HelperText>
              </View>
              <View style={{ flex: 1 }}>
                <Controller
                  control={control}
                  // rules={{
                  //   required: { value: true, message: i18n.t("thisIsRequired") },
                  // }}
                  render={({ field: { onChange, value } }) => (
                    <DropDown
                      label={i18n.t("dietTo")}
                      visible={showDropDown.dietTo}
                      showDropDown={() =>
                        setShowDropDown({ ...showDropDown, dietTo: true })
                      }
                      onDismiss={() =>
                        setShowDropDown({ ...showDropDown, dietTo: false })
                      }
                      value={value}
                      setValue={onChange}
                      list={labelToDropdownList(HoursTimeslots)}
                      dropDownItemTextStyle={{
                        color: theme.colors.onBackground,
                      }}
                    />
                  )}
                  name="dietTo"
                />
                <HelperText type="error" visible={!!errors.dietTo}>
                  {errors?.dietTo?.message}
                </HelperText>
              </View>
            </View>

            <Controller
              control={control}
              // rules={{
              //   required: { value: true, message: i18n.t("thisIsRequired") },
              // }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label={i18n.t("outlay")}
                  keyboardType="numeric"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.outlay}
                />
              )}
              name="outlay"
            />
            <HelperText type="error" visible={!!errors.outlay}>
              {errors?.outlay?.message}
            </HelperText>

            <Controller
              control={control}
              // rules={{
              //   required: { value: true, message: i18n.t("thisIsRequired") },
              // }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label={i18n.t("outlayDescription")}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={errors.outlay}
                  multiline
                  numberOfLines={3}
                />
              )}
              name="outlayDescription"
            />
            <HelperText type="error" visible={!!errors.outlayDescription}>
              {errors?.outlayDescription?.message}
            </HelperText>

            <Controller
              control={control}
              // rules={{
              //   required: { value: true, message: i18n.t("thisIsRequired") },
              // }}
              render={({ field: { onChange, value } }) => (
                <DropDown
                  label={i18n.t("outlayType")}
                  visible={showDropDown.outlayType}
                  showDropDown={() =>
                    setShowDropDown({ ...showDropDown, outlayType: true })
                  }
                  onDismiss={() =>
                    setShowDropDown({ ...showDropDown, outlayType: false })
                  }
                  value={value}
                  setValue={onChange}
                  list={stringToDropDownList(HoursOutlaytypes)}
                  dropDownItemTextStyle={{ color: theme.colors.onBackground }}
                />
              )}
              name="outlayType"
            />
            <HelperText type="error" visible={!!errors.outlayType}>
              {errors?.outlayType?.message}
            </HelperText>
          </View>

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
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
  },
  checkboxContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
