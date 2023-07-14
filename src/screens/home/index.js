import * as React from "react";
import { useWindowDimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import HourSummary from "./HourSummary";
import HoursPerWeek from "./HoursPerWeek";
import HoursPerMonth from "./HoursPerMonth";
import { useTheme } from "react-native-paper";
import { i18n } from "../../i18n";
import { fetchHomeData } from "../../redux/actions/hourRegsActions";
import SpeedDialForHome from "../../components/speedDials/SpeedDialForHome";

const renderTabBar = (props) => {
  const theme = useTheme();
  return (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: theme.colors.onPrimary }}
      labelStyle={{
        color: theme.colors.elevation.level1,
        textTransform: "none",
        fontWeight: "bold",
        fontSize: 16,
        fontWeight: "normal",
      }}
      style={{ backgroundColor: theme.colors.primary }}
      activeColor={theme.colors.onPrimary}
    />
  );
};

export default function HomeScreen({ route, navigation }) {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "summary", title: i18n.t("summary") },
    { key: "perWeek", title: i18n.t("perWeek") },
    { key: "perMonth", title: i18n.t("perMonth") },
  ]);
  const renderScene = SceneMap({
    summary: HourSummary,
    perWeek: HoursPerWeek,
    perMonth: HoursPerMonth,
  });
  React.useEffect(() => {
    fetchHomeData();
  }, []);

  return (
    <>
      <TabView
        lazy
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
      <SpeedDialForHome />
    </>
  );
}
