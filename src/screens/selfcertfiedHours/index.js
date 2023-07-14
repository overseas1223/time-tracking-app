import * as React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Text, ProgressBar, DataTable, FAB } from "react-native-paper";
import { commonStyles } from "../../styles";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { i18n } from "../../i18n";
import { useEffect } from "react";
import { getSelfcertifiedHours } from "../../redux/actions/hourRegsActions";

export default function SelfcertfiedHoursOverviewScreen({ navigation }) {
  const { isLoading } = useSelector((state) => state.common);
  const { selfcertifiedHours } = useSelector((state) => state.hours);

  const handleNavigateToSelfDetailsScreen = (id) => {
    navigation.navigate("Details", {
      params: { id },
    });
  };
  useFocusEffect(
    React.useCallback(() => {
      getSelfcertifiedHours();
    }, [])
  );

  return (
    <>
      <SafeAreaView>
        <ScrollView>
          {isLoading ? (
            <ProgressBar indeterminate />
          ) : (
            <View style={commonStyles.container}>
              <Text variant="titleLarge" style={commonStyles.mv20}>
                {i18n.t("selfcertifiedHourList")}
              </Text>
              <DataTable style={commonStyles.mb60}>
                <DataTable.Header>
                  <DataTable.Title>{i18n.t("date")}</DataTable.Title>
                  <DataTable.Title>{i18n.t("project")}</DataTable.Title>
                  <DataTable.Title>{i18n.t("hours")}</DataTable.Title>
                  <DataTable.Title>{i18n.t("status")}</DataTable.Title>
                  <DataTable.Title>{i18n.t("reason")}</DataTable.Title>
                  <DataTable.Title>{i18n.t("hrStatus")}</DataTable.Title>
                </DataTable.Header>
                {selfcertifiedHours.map((e) => (
                  <DataTable.Row
                    key={e.id}
                    onPress={() => handleNavigateToSelfDetailsScreen(e.id)}
                  >
                    <DataTable.Cell>
                      {new Date(e.hDate)
                        .toLocaleDateString("en-US", {
                          month: "2-digit",
                          day: "2-digit",
                        })
                        .replace("/", "-")}
                    </DataTable.Cell>
                    <DataTable.Cell>{e.projectNumber}</DataTable.Cell>
                    <DataTable.Cell>{e.hoursTotal}</DataTable.Cell>
                    <DataTable.Cell>{e.status}</DataTable.Cell>
                    <DataTable.Cell>{e.hrReason}</DataTable.Cell>
                    <DataTable.Cell>{e.hrStatus}</DataTable.Cell>
                  </DataTable.Row>
                ))}
              </DataTable>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
      <FAB
        icon="plus"
        label={i18n.t("create")}
        style={commonStyles.fab}
        onPress={() => {
          navigation.navigate("Create");
        }}
      />
    </>
  );
}
