import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const OrderConfirmationScreen = ({ navigation }) => {
  const voltarAoMenu = () => {
    navigation.navigate('Menu');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>☕</Text>
      <Text style={styles.titulo}>Pedido Confirmado!</Text>
      <Text style={styles.subtitulo}>
        Obrigado por comprar com a gente. Seu pedido está sendo preparado com carinho! 💛
      </Text>

      <TouchableOpacity style={styles.botao} onPress={voltarAoMenu}>
        <Text style={styles.textoBotao}>Voltar ao menu</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderConfirmationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF8F3',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 10,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#A67C52',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 16,
    color: '#5B3D1D',
    textAlign: 'center',
    marginBottom: 40,
  },
  botao: {
    backgroundColor: '#C89D72',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
