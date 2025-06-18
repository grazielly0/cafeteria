import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const carrinho = [
  {
    id: '1',
    nome: 'Cappuccino',
    descricao: 'Café com leite vaporizado',
    // imagem: require('../assets/cappuccino.jpg'),
  },
  {
    id: '2',
    nome: 'Croissant',
    descricao: 'Doce amanteigado',
    // imagem: require('../assets/croissant.jpg'),
  },
];

const CartScreen = () => {
  const navigation = useNavigation();

  const removerItem = (id) => {
    Alert.alert('Remover item', 'Tem certeza que deseja remover este item?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Remover', onPress: () => console.log('Item removido:', id) },
    ]);
  };

  const editarItem = (id) => {
    Alert.alert('Editar item', 'Função de edição ainda não implementada.');
  };

  const fazerPedido = () => {
    navigation.navigate('DetalhesPedido');
  };

  return (
    <View style={styles.container}>

      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.navigate('index')}
        >
          <MaterialIcons name="arrow-back" size={24} color="#A67C52" />
          <Text style={styles.textoBotaoVoltar}>Voltar</Text>
        </TouchableOpacity>

        <Text style={styles.titulo}>CARRINHO</Text>

        <View style={styles.icons}>
          <MaterialIcons name="shopping-cart" size={24} color="#D09290" style={{marginRight: 16}} />
          <AntDesign name="adduser" size={24} color="black" />
        </View>
      </View>

      <FlatList
        data={carrinho}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.imagem} />
            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.descricao}>{item.descricao}</Text>
            </View>
            <View style={styles.icones}>
              <TouchableOpacity onPress={() => editarItem(item.id)}>
                <MaterialIcons style={styles.icon} name="edit" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removerItem(item.id)} style={{ marginTop: 10 }}>
                <EvilIcons name="trash" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

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
    padding: 20,
  },

  // Cabeçalho com espaçamento entre os 3 elementos
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  botaoVoltar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textoBotaoVoltar: {
    color: '#A67C52',
    fontSize: 16,
    marginLeft: 5,
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#A67C52',
    // Para o título ficar no centro real, a largura deve ocupar o espaço entre os dois lados
    // Mas como usamos space-between, ele estará centrado entre botaoVoltar e icons
    textAlign: 'center',
    flex: 1,
  },

  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  imagem: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  descricao: {
    fontSize: 14,
    color: '#666',
  },
  icones: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoPedido: {
    backgroundColor: '#C89D72',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 'auto',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: 30,
  },
});

