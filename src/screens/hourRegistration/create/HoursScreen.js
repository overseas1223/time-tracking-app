import * as React from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import {
  Button,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { commonStyles } from "../../../styles";
import { Controller, useForm } from "react-hook-form";
import { i18n } from "../../../i18n";
import DropDown from "react-native-paper-dropdown";
import { useSelector } from "react-redux";
import { stringToDropDownList } from "../../../utils/stringToDropDownList";
import { getBreakHours, getWorkHours } from "../../../utils";

export default function HoursScreen({ route, navigation }) {
  const { params } = route;
  const theme = useTheme();
  const {
    setValue,
    formState: { errors },
    handleSubmit,
    control,
    watch,
  } = useForm({
    defaultValues: {
      hoursTotal: null,
      hours50: null,
      hours100: null,
      hoursBreak: null,
      extra1Type: null,
      extra1: null,
      extra2Type: null,
      extra2: null,
      comment: null,
    },
  });
  const [showDropDown, setShowDropDown] = React.useState({
    extra1Type: false,
    extra2Type: false,
  });
  const {
    myConfig: {
      keys: {
        HoursExtras,
        HoursHoursnormal,
        HoursShowbreak,
        HoursShowextra1,
        HoursShowextra2,
        Hours2ndbreak,
        HoursBreak,
        HoursBreaklength,
        HoursTimeroundto,
        HoursBiasedrounding,
        HoursMandatorycomment,
      },
    },
  } = useSelector((state) => state.common);
  const handleNext = async (data) => {
    try {
      navigation.push("Allowances", {
        ...params,
        ...data,
      });
    } catch (error) {}
  };

  React.useEffect(() => {
    setValue("hoursTotal", Number(HoursHoursnormal));
  }, [HoursHoursnormal]);

  React.useEffect(() => {
    setValue(
      "hoursTotal",
      String(
        getWorkHours(
          params.startTime,
          params.endTime,
          HoursBreak,
          Hours2ndbreak,
          HoursBreaklength,
          HoursTimeroundto,
          HoursBiasedrounding
        )
      )
    );
    setValue(
      "hoursBreak",
      String(
        getBreakHours(
          params.startTime,
          params.endTime,
          HoursBreak,
          Hours2ndbreak,
          HoursBreaklength,
          HoursTimeroundto,
          HoursBiasedrounding
        )
      )
    );
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={commonStyles.container}>
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
                        setShowDropDown({ ...showDropDown, extra1Type: false })
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
                        setShowDropDown({ ...showDropDown, extra2Type: false })
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
          {HoursMandatorycomment && (
            <View>
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
          )}

          <Button
            mode="contained"
            onPress={handleSubmit(handleNext)}
            style={commonStyles.mv10}
          >
            {i18n.t("next")}
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
});
