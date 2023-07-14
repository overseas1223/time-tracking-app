import { SafeAreaView, ScrollView, View } from "react-native";
import { Text, useTheme } from "react-native-paper";
import { commonStyles } from "../../styles";
import CustomBarChart from "../../components/CustomBarChart";
import { i18n } from "../../i18n";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const HoursPerMonth = () => {
  const theme = useTheme();
  const [data, setData] = useState({ labels: [], datasets: [{ data: [] }] });
  const { hoursPerMonth } = useSelector((state) => state.hours);
  useEffect(() => {
    let labels = [];
    let data = [];
    hoursPerMonth.forEach((e) => {
      labels.push(e.keyLabel.slice(0, 3));
      data.push(e.hoursTotal);
    });
    setData({
      labels: labels,
      datasets: [{ data: data }],
    });
  }, [hoursPerMonth]);

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView>
        <View>
          <Text variant="titleLarge" style={commonStyles.mv20}>
            {i18n.t("hoursPerMonth")}
          </Text>
          <CustomBarChart data={data} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HoursPerMonth;
