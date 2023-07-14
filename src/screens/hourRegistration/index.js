import * as React from "react";
import { SafeAreaView, View } from "react-native";
import { DataTable, FAB, ProgressBar, Text } from "react-native-paper";
import { commonStyles } from "../../styles";
import { i18n } from "../../i18n";
import { ScrollView } from "react-native-gesture-handler";
import { getHourRegs } from "../../redux/actions/hourRegsActions";
import { useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

const optionsPerPage = [2, 3, 4];

export default function HourRegistrationOverviewScreen({ route, navigation }) {
  const { isLoading } = useSelector((state) => state.common);
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  const { hourRegs } = useSelector((state) => state.hours);

  const handleNavigateToDetailsScreen = (id) => {
    navigation.navigate("HourRegistrations", {
      screen: "Details",
      params: {id},
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      getHourRegs();
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
                {i18n.t("hourRegistrationList")}
              </Text>
              <DataTable style={commonStyles.mb60}>
                <DataTable.Header>
                  <DataTable.Title style={{ minWidth: 50 }}>
                    {i18n.t("date")}
                  </DataTable.Title>
                  <DataTable.Title>{i18n.t("when")}</DataTable.Title>
                  <DataTable.Title>{i18n.t("to")}</DataTable.Title>
                  <DataTable.Title numeric style={commonStyles.mh20}>
                    {i18n.t("hoursTotal")}
                  </DataTable.Title>
                  <DataTable.Title numeric style={commonStyles.mh20}>
                    {i18n.t("status")}
                  </DataTable.Title>
                  {/* <DataTable.Title>{i18n.t("comments")}</DataTable.Title> */}
                </DataTable.Header>

                {hourRegs.map((e) => (
                  <DataTable.Row
                    key={e.id}
                    onPress={() => handleNavigateToDetailsScreen(e.id)}
                  >
                    <DataTable.Cell style={{ minWidth: 50 }}>
                      {new Date(e.hDate)
                        .toLocaleDateString("en-US", {
                          month: "2-digit",
                          day: "2-digit",
                        })
                        .replace("/", "-")}
                    </DataTable.Cell>
                    <DataTable.Cell>{e.startTime}</DataTable.Cell>
                    <DataTable.Cell>{e.endTime}</DataTable.Cell>
                    <DataTable.Cell numeric style={commonStyles.mh20}>
                      <Text style={commonStyles.bold}>{e.hoursTotal}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell numeric style={commonStyles.mh20}>
                      <Text style={commonStyles.bold}>{e.status}</Text>
                    </DataTable.Cell>
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
          navigation.navigate("HourRegistrations", {
            screen: "Create",
          });
        }}
      />
    </>
  );
}
