import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { i18n } from "../../i18n";
import SickLeaveOverviewScreen from "../../screens/sickLeave";
import SickLeaveDetailsScreen from "../../screens/sickLeave/SickLeaveDetailsScreen";
import SickLeaveCreateScreen from "../../screens/sickLeave/SickLeaveCreateScreen";
import SickLeaveEditScreen from "../../screens/sickLeave/SickLeaveEditScreen";

const Stack = createNativeStackNavigator();

function SickLeaveNavigator({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Overview"
        options={{ title: i18n.t("overview") }}
        component={SickLeaveOverviewScreen}
      />
      <Stack.Screen
        name="Details"
        options={{ title: i18n.t("details") }}
        component={SickLeaveDetailsScreen}
      />
      <Stack.Screen
        name="Create"
        options={{ title: i18n.t("create") }}
        component={SickLeaveCreateScreen}
      />
      <Stack.Screen
        name="Edit"
        options={{ title: i18n.t("edit") }}
        component={SickLeaveEditScreen}
      />
    </Stack.Navigator>
  );
}

export default SickLeaveNavigator;
