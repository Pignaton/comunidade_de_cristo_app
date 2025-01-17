import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import C from "./style";
import { useStateValue } from "../../contexts/StateContext";
import api from "../../services/api";

export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();

  useEffect(() => {
    const checkLogin = async () => {
      let token = await api.getToken();
      if (token) {
        let result = await api.validateToken();
        if (result.error === "") {
          dispatch({ type: "setUser", payload: { user: result.user } });
          navigation.reset({
            index: 1,
            routes: [{ name: 'MainDrawer' }],
          });
        } else {
         // alert(result.error);
          dispatch({ type: "setToken", payload: { token: "" } });
          navigation.reset({
            index: 1,
            routes: [{ name: 'LoginScreen' }],
          });
        }
      } else {
        navigation.reset({
          index: 1,
          routes: [{ name: "HomeScreen" }],
        });
      }
    };
    checkLogin();
  }, []);
  return (
    <C.Container>
      <C.Logo source={require("../../assets/logo.png")} resizeMode="contain" />
      <C.LoadingIcon color="#FFF" size="large" />
    </C.Container>
  );
}
