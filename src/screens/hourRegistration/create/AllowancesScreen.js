import * as React from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import {
  Button,
  Checkbox,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { commonStyles } from "../../../styles";
import { Controller, useForm } from "react-hook-form";
import { i18n } from "../../../i18n";
import { apis } from "../../../apis";
import { useSelector } from "react-redux";
import { stringToDropDownList } from "../../../utils/stringToDropDownList";
import DropDown from "react-native-paper-dropdown";
import { labelToDropdownList } from "../../../utils/labelToDropdownList";

export default function AllowancesScreen({ route, navigation }) {
  const {
    myConfig: {
      keys: {
        HoursExtraskm,
        HoursDiets,
        HoursTimeslots,
        HoursOutlaytypes,
        HoursShowkm,
        HoursShowtoll,
        HoursShowparking,
        HoursShowdiet,
      },
    },
  } = useSelector((state) => state.common);
  const { params } = route;
  const theme = useTheme();
  const [showDropDown, setShowDropDown] = React.useState({
    dietType: false,
    dietFrom: false,
    dietTo: false,
  });
  const {
    setValue,
    formState: { isSubmitting, errors },
    clearErrors,
    setError,
    handleSubmit,
    watch,
    control,
  } = useForm({
    defaultValues: {
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

  const handleCreate = async (data) => {
    try {
      data = { ...params, ...data };
      const res = await apis.createHourReg(data);
      navigation.navigate("HourRegistrations", {
        screen: "Details",
        params: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={commonStyles.container}>
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
                    dropDownItemTextStyle={{ color: theme.colors.onBackground }}
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
                    dropDownItemTextStyle={{ color: theme.colors.onBackground }}
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
                    dropDownItemTextStyle={{ color: theme.colors.onBackground }}
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
          <Button
            mode="contained"
            onPress={handleSubmit(handleCreate)}
            loading={isSubmitting}
            disabled={isSubmitting}
            style={commonStyles.mv10}
          >
            {i18n.t("create")}
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.goBack()}
            style={commonStyles.mb60}
          >
            Back
          </Button>
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
