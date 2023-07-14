import * as React from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import { DataTable, Text, ProgressBar, FAB } from "react-native-paper";
import { commonStyles } from "../../styles";
import { useSelector } from "react-redux";
import { getMovableHolidayHours } from "../../redux/actions/hourRegsActions";
import { i18n } from "../../i18n";
import { useFocusEffect } from "@react-navigation/native";

export default function MovableHOlidayOverviewScreen({ navigation }) {
  const { isLoading } = useSelector((state) => state.common);
  const { movableHolidayHours } = useSelector((state) => state.hours);
  useFocusEffect(
    React.useCallback(() => {
      getMovableHolidayHours();
    }, [])
  );

  const handleNavigateToMovableHolidayDetailsScreen = (id) => {
    navigation.navigate("Details", {
      params: { id },
    });
  };
  return (
    <>
      <SafeAreaView>
        <ScrollView>
          {isLoading ? (
            <ProgressBar indeterminate />
          ) : (
            <View style={commonStyles.container}>
              <Text variant="titleLarge" style={commonStyles.mv20}>
                {i18n.t("movableHolidayList")}
              </Text>
              <DataTable>
                <DataTable.Header>
                  <DataTable.Title style={{ minWidth: 50 }}>
                    {i18n.t("date")}
                  </DataTable.Title>
                  <DataTable.Title style={commonStyles.mh20}>
                    {i18n.t("project")}
                  </DataTable.Title>
                  <DataTable.Title style={commonStyles.mh20}>
                    {i18n.t("hours")}
                  </DataTable.Title>
                  <DataTable.Title style={commonStyles.mh20}>
                    {i18n.t("status")}
                  </DataTable.Title>
                </DataTable.Header>
                {movableHolidayHours.map((e) => (
                  <DataTable.Row
                    key={e.id}
                    onPress={() =>
                      handleNavigateToMovableHolidayDetailsScreen(e.id)
                    }
                  >
                    <DataTable.Cell style={{ minWidth: 50 }}>
                      {new Date(e.hDate)
                        .toLocaleDateString("en-US", {
                          month: "2-digit",
                          day: "2-digit",
                        })
                        .replace("/", "-")}
                    </DataTable.Cell>
                    <DataTable.Cell style={commonStyles.mh20}>
                      {e.projectNumber}
                    </DataTable.Cell>
                    <DataTable.Cell style={commonStyles.mh20}>
                      {e.hoursTotal}
                    </DataTable.Cell>
                    <DataTable.Cell style={commonStyles.mh20}>
                      {e.status}
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
          navigation.navigate("Create");
        }}
      />
    </>
  );
}
