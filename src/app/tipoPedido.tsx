import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TipoPedidoScreen = () => {
  const router = useRouter();

  const selecionarTipo = (tipo: string) => {
    router.push({
      pathname: '/detalhesPedido',
      params: { tipoPedido: tipo },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Como deseja seu pedido?</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => selecionarTipo('delivery')}
      >
        <Text style={styles.textoBotao}>Delivery</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => selecionarTipo('mesa')}
      >
        <Text style={styles.textoBotao}>Mesa</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => selecionarTipo('balcao')}
      >
        <Text style={styles.textoBotao}>Balcão</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TipoPedidoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF8F3',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A67C52',
    marginBottom: 30,
    textAlign: 'center',
  },
  botao: {
    backgroundColor: '#C89D72',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
