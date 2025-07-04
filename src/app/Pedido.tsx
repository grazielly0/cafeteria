import { MaterialIcons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from "expo-router";
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Cliente from '../components/Cliente'; // ajuste o caminho conforme necessário

const CartScreen = ({ cliente = [], remove = () => {} }) => {
  const rota = useRouter();

  const fazerPedido = () => {
    rota.push('/tipoPedido');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.botaoVoltar} onPress={() => rota.push('/')}>
          <MaterialIcons name="arrow-back" size={28} color="#A67C52" />
        </TouchableOpacity>

        <View style={styles.icons}>
          <TouchableOpacity onPress={() => rota.push('/pedido')} style={styles.iconeAcao}>
            <MaterialIcons name="shopping-cart" size={24} color="#D09290" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => rota.push('/cadastro')} style={styles.iconeAcao}>
            <AntDesign name="adduser" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.titulo}>CARRINHO</Text>

      <View style={styles.flat}>
        <FlatList 
          data={cliente}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Cliente 
              data={item} 
              onEditar={() => rota.push({ pathname: '/Atualizar', params: item })} 
              onDelete={() => remove(item.id)} 
            />
          )}
          contentContainerStyle={{ gap: 16 }}
        />
      </View>

      <TouchableOpacity style={styles.botaoPedido} onPress={fazerPedido}>
        <Text style={styles.textoBotao}>Fazer pedido</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF8F3',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  botaoVoltar: {
    padding: 4,
  },
  icons: {
    flexDirection: 'row',
    gap: 16,
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#A67C52',
    textAlign: 'center',
    marginBottom: 20,
  },
  flat: {
    flex: 1,
    marginBottom: 20,
  },
  iconeAcao: {
    marginHorizontal: 6,
  },
  botaoPedido: {
    backgroundColor: '#C89D72',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


 