import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const TipoPedidoScreen = () => {
  const rota = useRouter();

  const selecionarTipo = (tipo: string) => {
    rota.push({
      pathname: '/detalhesPedido',
      params: { tipoPedido: tipo },
    });
  };

  return (
    <View style={styles.container}>
      {/* TopBar */}
      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => rota.push('/')}
        >
          <MaterialIcons name="arrow-back" size={28} color="#A67C52" />
        </TouchableOpacity>

        <View style={styles.icons}>
          <TouchableOpacity onPress={() => rota.push('/Pedido')}>
            <MaterialIcons name="shopping-cart" size={24} color="#D09290" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => rota.push('/cadastro')}>
            <AntDesign name="adduser" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.titulo}>Como deseja retirar seu pedido?</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => rota.push('/formaEntrega')}
      >
        <Text style={styles.textoBotao}>Delivery</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => rota.push('/formaPagamento')}
      >
        <Text style={styles.textoBotao}>Mesa</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => rota.push('/formaPagamento')}
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
    paddingHorizontal: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  topBar: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  botaoVoltar: {
    padding: 4,
    marginTop:40,
  },
  icons: {
    flexDirection: 'row',
    gap: 16,
    marginTop:40,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A67C52',
    marginBottom: 30,
    textAlign: 'center',
    marginTop:'50%',
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



  