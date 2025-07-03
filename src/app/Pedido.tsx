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
import { supabase } from '@/database/useClienteDataBase';
import {  useEffect,useState } from 'react';
import MenuScreen from './menu';



export default function PedidoScreen() {
      const [pedidos, setPedidos] = useState<any[]>([]);
      const [id, setId] = useState("")
      const [carrinhoId, setcarrinhoId] = useState("")
      const [produtoId, setProdutoId] = useState("")
      const [quantidade, setQuantidade] = useState("")
      const rota = useRouter()

    async function details(item:any){
    
      setId(String(item.id))
      setcarrinhoId(item.carrinhoId)
      setProdutoId(item.produtoId)
      setQuantidade(item.quantidade)
    }


    async function pegarPedido() {
    const { data, error } = await supabase
      .from('carrinho_produto')
      .select('id, carrinhoId,  produtoId(
        id,
        nome
        
      ) ,quantidade')
      .order('id', { ascending: false })


      if (error) {
        console.error('Erro ao buscar pedidos:', error.message);
      } else {
        setPedidos(data || []);
      }
    }

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
                data={pedidos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    
                    <View style={styles.info}>
                      <Text style={styles.nome}>{item.nome}</Text>
                      <Text style={styles.descricao}>{item.descricao}</Text>
                    </View>
                    <View style={styles.iconess}>
                    <TouchableOpacity onPress={() => String(item.id)} style={styles.iconeAcao}>
                      <MaterialIcons name="edit" size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => String(item.id)} style={styles.iconeAcao}>
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

