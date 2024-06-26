import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { Provider, Searchbar, FAB, DefaultTheme, Checkbox, Surface } from "react-native-paper";
import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import C from "./style";
import { useStateValue } from "../../contexts/StateContext";
import api from "../../services/api";
import Lista from "../../components/ListaVisitante";


export default () => {
  const navigation = useNavigation();
  const [context, dispatch] = useStateValue();
  const [visitantes, setListaVisitantes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [visible, setVisible] = useState(true);
  const [checked, setChecked] = useState(false);
  const [busca, setBusca] = useState("");
  const onChangeBusca = (query) => setBusca(query);

  const bottomSheetRef = useRef(null);
  const bottomSheetModalRef = useRef(null);

  const handleSheetChanges = useCallback((index: number) => {
    //alert(index);
    if (index !== 1) {
      setVisible(true);
    }
  }, []);

  const handleAbreModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
    setVisible(false);
  }, []);

  const handleFechaModal = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    setVisible(true);
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Lista de Vistantes",
    });
    getListaVisitantes();
  }, []);

  const getListaVisitantes = async () => {
    setListaVisitantes([]);
    setLoading(true);
    const result = await api.listaVisitantes();
    setLoading(false);
    if (result.error === "") {
      setListaVisitantes(result.pessoas);
    } else {
      alert(result.error);
    }
  };
  const theme = {
    ...DefaultTheme,
    roundness: 5,
  };
  return (
    <Provider>
      <C.Container>
        <Searchbar
          style={styles.pesquisa}
          placeholder="Pesquisar por nome"
          onChangeText={onChangeBusca}
          value={busca}
        />
        {!loading && visitantes.length === 0 &&
          <C.NoListaArea>
            <C.NoListaTexto>Não há cadastro realizados.</C.NoListaTexto>
          </C.NoListaArea>
        }
        <C.List onRefresh={getListaVisitantes} refreshing={loading} data={visitantes}
                renderItem={({ item }) => <Lista data={item} />}
                keyExtractor={(item) => item.cod_pessoa.toString()} />
      </C.Container>
      {visible === true && (
        <FAB
          style={styles.fab}
          small
          icon="filter"
          label="Filtro"
          onPress={handleAbreModal}
        />
      )}
      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={["1%", "100%"]}
          index={1}
          handleIndicatorStyle={{ backgroundColor: "#FFF" }}
          onChange={handleSheetChanges}>
          <View style={styles.boxFilter}>
            <View style={styles.icon}>
              <Icon
                name="close"
                size={35}
                color="#FF0000"
                onPress={handleFechaModal}
              />
              <Text style={styles.textoFilter}>Filtrar</Text>
            </View>
            <View>
              <View>
                <Text style={styles.tituloFilter}>Sexo</Text>
              </View>
              <Surface style={styles.surface}>
                <Checkbox.Item
                  label="Mulher"
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
                <Checkbox.Item
                  label="Homem"
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
              </Surface>
              <View>
                <Text style={styles.tituloFilter}>Estado Civil</Text>
              </View>
              <Surface style={styles.surface}>
                <Checkbox.Item
                  label="Solteiro"
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
                <Checkbox.Item
                  label="Casado(a)"
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
                <Checkbox.Item
                  label="Viúvo(a)"
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
                <Checkbox.Item
                  label="Separado"
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
                <Checkbox.Item
                  label="Divorciado"
                  status={checked ? "checked" : "unchecked"}
                  onPress={() => {
                    setChecked(!checked);
                  }}
                />
              </Surface>
            </View>
          </View>
          <TouchableOpacity style={styles.filtrar}>
            <Text style={styles.textoBotao}>Filtrar</Text>
          </TouchableOpacity>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#388DB0",
  },
  pesquisa: {
    margin: 10,
  },
  boxFilter: {
    flex: 1,
  },
  tituloFilter: {
    margin: 10,
    fontSize: 15,
    color: "#000",
  },
  icon: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  textoFilter: {
    color: "#000",
    fontSize: 17,
    alignSelf: "center",
  },
  filtrar: {
    backgroundColor: "#388DB0",
    borderRadius: 5,
    padding: 10,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  textoBotao: {
    color: "#FFF",
  },
  surface: {
    elevation: 2,
  },
});

