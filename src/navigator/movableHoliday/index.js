import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { i18n } from "../../i18n";
import MovableHOlidayOverviewScreen from "../../screens/movableHolidays";
import MovableHolidayDetailsScreen from "../../screens/movableHolidays/MovableHolidayDetailsScreen";
import MovableHolidayCreateScreen from "../../screens/movableHolidays/MovableHolidayCreateScreen";
import MovableHolidayEditScreen from "../../screens/movableHolidays/MovableHolidayEditScreen";

const Stack = createNativeStackNavigator();

function MovableHolidayNavigator({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Overview"
        options={{ title: i18n.t("overview") }}
        component={MovableHOlidayOverviewScreen}
      />
      <Stack.Screen
        name="Details"
        options={{ title: i18n.t("details") }}
        component={MovableHolidayDetailsScreen}
      />
      <Stack.Screen
        name="Create"
        options={{ title: i18n.t("create") }}
        component={MovableHolidayCreateScreen}
      />
      <Stack.Screen
        name="Edit"
        options={{ title: i18n.t("edit") }}
        component={MovableHolidayEditScreen}
      />
    </Stack.Navigator>
  );
}

export default MovableHolidayNavigator;
