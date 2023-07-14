import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { i18n } from "../../i18n";
import SelfcertfiedHoursOverviewScreen from "../../screens/selfcertfiedHours";
import SelfCertfiedHoursDetailsScreen from "../../screens/selfcertfiedHours/SelfCertfiedHoursDetailsScreen";
import SelfCertfiedHoursCreateScreen from "../../screens/selfcertfiedHours/SelfCertfiedHoursCreateScreen";
import SelfCertfiedHoursEditScreen from "../../screens/selfcertfiedHours/SelfCertfiedHoursEditScreen";

const Stack = createNativeStackNavigator();

function SelfCertifiedRegNavigator({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Overview"
        options={{ title: i18n.t("overview") }}
        component={SelfcertfiedHoursOverviewScreen}
      />
      <Stack.Screen
        name="Details"
        options={{ title: i18n.t("details") }}
        component={SelfCertfiedHoursDetailsScreen}
      />
      <Stack.Screen
        name="Create"
        options={{ title: i18n.t("create") }}
        component={SelfCertfiedHoursCreateScreen}
      />
      <Stack.Screen
        name="Edit"
        options={{ title: i18n.t("edit") }}
        component={SelfCertfiedHoursEditScreen}
      />
    </Stack.Navigator>
  );
}

export default SelfCertifiedRegNavigator;
