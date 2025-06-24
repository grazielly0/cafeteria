import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const OrderConfirmationScreen = () => {
  const router = useRouter();
  const rota = useRouter();

  const voltarAoMenu = () => {
    rota.push('/menu'); // Ajuste para o caminho da sua tela do menu
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Pedido confirmado com sucesso!</Text>
      <TouchableOpacity style={styles.botao} onPress={voltarAoMenu}>
        <Text style={styles.botaoTexto}>Voltar ao Menu</Text>
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
  botaoTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },

    texto: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#4A2E14',
      marginBottom: 24,
      textAlign: 'center',
    },
});
