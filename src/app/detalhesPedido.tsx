import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const OrderDetailsScreen = () => {
  const rota = useRouter();

  const prosseguirPagamento = () => {
    rota.push('/formaPagamento'); // ou apenas 'FormaPagamento' se for uma rota relativa
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>DETALHES DO PEDIDO</Text>

      <FlatList
        data={detalhesPedido}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.texto}>Quantidade: {item.quantidade}</Text>
            <Text style={styles.texto}>Obs: {item.observacao}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <TouchableOpacity style={styles.botao} onPress={prosseguirPagamento}>
        <Text style={styles.textoBotao}>Prosseguir</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF8F3',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A67C52',
    textAlign: 'center',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#F0D2A6',
    borderRadius: 10,
    padding: 16,
    marginBottom: 15,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5B3D1D',
    marginBottom: 4,
  },
  texto: {
    fontSize: 14,
    color: '#333',
  },
  botao: {
    backgroundColor: '#E6D6BE',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 'auto',
  },
  textoBotao: {
    color: '#5B3D1D',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
