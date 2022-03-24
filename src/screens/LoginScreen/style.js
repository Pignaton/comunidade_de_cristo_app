import styled from "styled-components/native";

export default {
  Container: styled.SafeAreaView`
    flex: 1;
    padding: 20px;
    background-color: #F5F6FA;
  `,
  Logo: styled.Image`
    width: 250px;
    height: 150px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
  `,

  Titulo: styled.View`
    justify-content: space-around;
    align-items: flex-start;
    font-size: 18px;
    margin: 10px;
    padding-bottom: 10px;
    color: #000;
    font-weight: bold;
    background-color: transparent;
  `,
  TextoLogin: styled.Text`
    color:#000;
    margin-bottom:5px;
    font-size:25px;
    font-family:Fredoka-Bold;
  `,
  Texto: styled.Text`
    color: #A7A7A7;
    font-family:Roboto-Bold;
  `,
  Field: styled.TextInput.attrs({
    placeholderTextColor: "#BDBDBD",
  })`
    border-width: 1px;
    border-color: #BDBDBD;
    /*background-color:#F5F6FA;*/
    background-color: #F5F5F5;
    border-radius: 5px;
    color:#000;
    font-size:15px;
    margin-bottom:15px;
    padding: 15px;
  `,
  View: styled.View`
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: 15px;
  `,
  Checkbox: styled.View`
    flex-direction: row;
  `,
  TextoCheckbox: styled.Text`
    margin-top: 8px;
    color:#000;
    font-family: Roboto-Bold;
  `,
  Senha: styled.Text`
    margin-top:8px;
    color:#55A1DC;
    font-family: Roboto-Bold;
  `,
  ButtonArea: styled.TouchableOpacity`
    background-color: #55A1DC;
    padding: 15px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-bottom: 15px;
  `,
  ButtonText: styled.Text`
    color:#FFF;
    font-size:15px;
    font-weight: bold;
    font-family:Roboto-Bold;
  `,

};
