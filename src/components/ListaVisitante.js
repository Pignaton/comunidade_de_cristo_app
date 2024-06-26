import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import { Portal, Paragraph, Button, Dialog, DefaultTheme, Card, Surface, Appbar } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet } from "react-native";
import Funcoes from "../functions/funcoes";

const Div = styled.SafeAreaView``;
const Box = styled.TouchableOpacity``;

export default ({ data }) => {

  const navigation = useNavigation();
  const [visibled, setVisibled] = React.useState(false);
  const showDialog = () => setVisibled(true);
  const hideDialog = () => setVisibled(false);
  const [codPessoa, setCodPessoa] = useState(data.cod_pessoa);

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: "#3498db",
      accent: "#f1c40f",
      background: "#FFF",
    },
  };

  const handleDeletaPessoa = () => {
    setCodPessoa(codPessoa);
    showDialog();
  };

  const handleDeleta = () => {
    hideDialog();
  };

  const handleVerPessoa = () => {
    navigation.navigate("IndexScreen", { cod_pessoa: data.cod_pessoa });
  };

  return (
    <Div>
      <Surface
        theme={theme}
        style={styles.surface}
        onPress={() => {
          alert("Option 2 was pressed");
        }}>
        <Box key={data} onPress={handleVerPessoa}>
          <Card.Title
            title={data.nome}
            subtitle={data.created_at}
            left={(props) => (
              <Icon name="newspaper-o" size={30} color="#8863e7" />
            )}
            right={(props) => (
              <Appbar.Action {...props} icon="delete-outline" color="#000" onPress={() => handleDeletaPessoa(1)} />
            )}
          />
          <Card.Content>
            <Paragraph> {data.idade + " anos " + Funcoes.estadoCivil(data.estado_civil)}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button
              color="#1A5893"
              onPress={() => handleEditarPessoa(1)}>
              Editar
            </Button>
            <Button onPress={() => handleDeletaPessoa(1)}>Visualizar</Button>
          </Card.Actions>
        </Box>
      </Surface>
      <Portal>
        <Dialog visible={visibled} onDismiss={hideDialog}>
          <Dialog.Title>Atenção!</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Essa ação não poderá ser revertida {data.cod_pessoa}
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleDeleta}>Deletar</Button>
            <Button onPress={hideDialog}>Cancelar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Div>
  );
};

const styles = StyleSheet.create({
  surface: {
    margin: 10,
    elevation: 2,
    borderRadius: 5,
    padding: 10,
  },
});

