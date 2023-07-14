import * as React from "react";
import { Drawer } from "react-native-paper";

const CustomSidebarMenu = ({ navigation }) => {
  const [active, setActive] = React.useState("");

  return (
    <Drawer.Section title="QuickReg">
      <Drawer.Item
        label="First Item"
        active={active === "first"}
        onPress={() => setActive("first")}
      />
      <Drawer.Item
        label="Second Item"
        active={active === "second"}
        onPress={() => setActive("second")}
      />
      <Drawer.Item
        label="First Item"
        active={active === "first"}
        onPress={() => setActive("first")}
      />
      <Drawer.Item
        label="First Item"
        active={active === "first"}
        onPress={() => setActive("first")}
      />
    </Drawer.Section>
  );
};

export default CustomSidebarMenu;
