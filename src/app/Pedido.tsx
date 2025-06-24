import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import EvilIcons from '@expo/vector-icons/EvilIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import {useRouter} from "expo-router";
import { useNavigation} from '@react-navigation/native';



const carrinho = [
  {
    id: '1',
    nome: 'Cappuccino',
    descricao: 'Café com leite vaporizado',
    imagem: require('../../assets/images/cappuccino.jpg'),
  },
  {
    id: '2',
    nome: 'Croissant',
    descricao: 'Doce amanteigado',
    imagem: require('../../assets/images/croissant.jpg'),
  },
];

const CartScreen = () => {

  const rota = useRouter();

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
    rota.push('/detalhesPedido');
  };

  return (
    <View style={styles.container}>
  <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => rota.push('/')}
      >
        <MaterialIcons name="arrow-back" size={28} color="#A67C52" />
      </TouchableOpacity>

     
  <View style={styles.icons}>
    <TouchableOpacity onPress={() => rota.push('/pedido')}>
    <MaterialIcons name="shopping-cart" size={24} color="#D09290" />
  </TouchableOpacity>

  <TouchableOpacity onPress={() => rota.push('/cadastro')}>
        <AntDesign name="adduser" size={24} color="black" />
      </TouchableOpacity>
    </View>
    

      <Text style={styles.titulo}>CARRINHO</Text>

      <FlatList
        data={carrinho}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={item.imagem} style={styles.imagem} />
            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.descricao}>{item.descricao}</Text>
            </View>
            <View style={styles.iconess}>
  <TouchableOpacity onPress={() => editarItem(item.id)} style={styles.iconeAcao}>
    <MaterialIcons name="edit" size={24} color="black" />
  </TouchableOpacity>
  <TouchableOpacity onPress={() => removerItem(item.id)} style={styles.iconeAcao}>
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
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
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
  lixeira: {
    marginTop: 10,
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
  iconess: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconeAcao: {
    marginHorizontal: 6,
  },
  
});

