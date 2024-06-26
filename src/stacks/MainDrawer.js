import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';
import ListScreen from "../screens/ListScreen";
import IntegranteScreen from "../screens/IntegranteScreen";
import DrawerCustom from "../components/DrawerCustom";

const Drawer = createDrawerNavigator();

export default () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerCustom {...props} />}>
      <Drawer.Screen name="ListScreen" component={ListScreen} options={{ headerShown: true }} />
      <Drawer.Screen name="IntegranteScreen" component={IntegranteScreen} options={{ headerShown: true }} />
    </Drawer.Navigator>
  );
}
