import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { i18n } from "../../i18n";
import DetailsScreen from "../../screens/hourRegistration/create/DetailsScreen";
import HoursScreen from "../../screens/hourRegistration/create/HoursScreen";
import AllowancesScreen from "../../screens/hourRegistration/create/AllowancesScreen";

const Stack = createNativeStackNavigator();

function CreateHourRegistrationNavigator({ navigation }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
      />
      <Stack.Screen
        name="Hours"
        component={HoursScreen}
      />
      <Stack.Screen
        name="Allowances"
        component={AllowancesScreen}
      />
    </Stack.Navigator>
  );
}

export default CreateHourRegistrationNavigator;
