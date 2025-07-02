import { useSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DetalhesPedido = () => {
  const params = useSearchParams();
  const tipoPedido = params.tipoPedido || 'não especificado';

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalhes do Pedido</Text>
      <Text style={styles.subtitulo}>Tipo do pedido: {tipoPedido}</Text>
      {/* Resto do seu componente */}
    </View>
  );
};

export default DetalhesPedido;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF8F3',
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#A67C52',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 20,
    color: '#333',
  },
});
