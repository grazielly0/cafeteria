import { useRouter, useSearchParams } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const pedidos = {
  delivery: {
    nome: 'Delivery',
    descricao: 'Entrega rápida e segura na sua casa.',
    imagem: require('../../assets/images/cafe1.jpg'), // coloque a imagem na pasta assets
  },
  mesa: {
    nome: 'Mesa',
    descricao: 'Consuma em uma de nossas mesas confortáveis.',
    imagem: require('../../assets/images/cafe1.jpg'),
  },
  balcao: {
    nome: 'Balcão',
    descricao: 'Retire seu pedido diretamente no balcão.',
    imagem: require('../../assets/images/cafe1.jpg'),
  },
};

const DetalhesPedido = () => {
  const params = useSearchParams();
  const router = useRouter();
  const tipoPedido = params.tipoPedido || 'não especificado';
  const pedido = pedidos[tipoPedido] || {
    nome: 'Tipo não encontrado',
    descricao: 'Não foi possível encontrar detalhes para este tipo de pedido.',
    imagem: null,
  };

  const finalizarPedido = () => {
    // Aqui você pode adicionar a navegação para próxima tela, por exemplo:
    router.push('/formaPagamento');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Detalhes do Pedido</Text>
      {pedido.imagem && <Image source={pedido.imagem} style={styles.imagem} />}
      <Text style={styles.nomePedido}>{pedido.nome}</Text>
      <Text style={styles.descricaoPedido}>{pedido.descricao}</Text>

      <TouchableOpacity style={styles.botaoFinalizar} onPress={finalizarPedido}>
        <Text style={styles.textoBotao}>Finalizar Pedido</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DetalhesPedido;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF8F3',
    padding: 20,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#A67C52',
    marginBottom: 20,
  },
  imagem: {
    width: 180,
    height: 180,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  nomePedido: {
    fontSize: 24,
    fontWeight: '600',
    color: '#5B3D1D',
    marginBottom: 10,
  },
  descricaoPedido: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  botaoFinalizar: {
    backgroundColor: '#C89D72',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
