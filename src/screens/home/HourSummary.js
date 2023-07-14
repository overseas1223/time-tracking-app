import { SafeAreaView, ScrollView, View } from "react-native";
import { DataTable, Text, useTheme } from "react-native-paper";
import { commonStyles } from "../../styles";
import { i18n } from "../../i18n";
import { useSelector } from "react-redux";

const HourSummary = () => {
  const theme = useTheme();
  const { hoursPerMonth, hoursPerWeek } = useSelector((state) => state.hours);
  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView>
        <View>
          <Text variant="titleLarge" style={commonStyles.mv20}>
            {i18n.t("hoursSummary")}
          </Text>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title></DataTable.Title>
              <DataTable.Title numeric>{i18n.t("this")}</DataTable.Title>
              <DataTable.Title numeric>{i18n.t("previous")}</DataTable.Title>
            </DataTable.Header>

            <DataTable.Row>
              <DataTable.Cell>{i18n.t("hoursWeek")}</DataTable.Cell>
              <DataTable.Cell numeric>
                <Text variant="bodyLarge">
                  {hoursPerMonth[hoursPerMonth.length - 1]?.hoursTotal || 0}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text variant="bodyLarge">
                  {hoursPerMonth[hoursPerMonth.length - 2]?.hoursTotal || 0}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>{i18n.t("hoursMonth")}</DataTable.Cell>
              <DataTable.Cell numeric>
                <Text variant="bodyLarge">
                  {hoursPerWeek[hoursPerWeek.length - 1]?.hoursTotal || 0}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell numeric>
                <Text variant="bodyLarge">
                  {hoursPerWeek[hoursPerWeek.length - 2]?.hoursTotal || 0}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>
          </DataTable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HourSummary;
