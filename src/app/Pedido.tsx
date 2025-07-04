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
import CardPedido from '../components/cardPedido'

export default function PedidoScreen() {
 
      const [pedidos, setPedidos] = useState<any[]>([]);
      const [produtos, setProdutos] = useState<any[]>([]);
      const [carrinhoId, setCarrinhoId] = useState('')
      const [id, setId] = useState('');
      const [totalCarrinho, setTotalCarrinho] = useState(0);
      const rota = useRouter()
      const [preco, setPreco] = useState<any[]>([]);
 
   // Removendo o useEffect incorreto
   // useEffect(() => {
   //   handleAddToCart
   // }, [])

 
  

  async function pegarCarrinhoDoUsuario() {
    // pega o usuário atual
    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData.user) {
      console.error('Usuário não autenticado');
      return null;
    }
    const userId = userData.user.id;
  
    // busca o carrinho do usuário
    const { data: carrinhoData, error: carrinhoError } = await supabase
      .from('carrinho')
      .select('id')
      .eq('user_id', userId)
      .single(); // pega só 1 carrinho
  
    if (carrinhoError || !carrinhoData) {
      console.error('Erro ao buscar carrinho:', carrinhoError?.message);
      return null;
    }
  
    return carrinhoData.id;
  }
  

  useEffect(() => {
    async function carregarPedidos() {
      const carrinho = await pegarCarrinhoDoUsuario();
      if (!carrinho) return;
  
      setCarrinhoId(carrinho);
  
      // Fazendo JOIN com a tabela produto para buscar dados completos
      const { data: pedidosData, error: pedidosError } = await supabase
        .from('carrinho_produto')
        .select(`
          id,
          quantidade,
          produto:produto_id (
            id,
            nome,
            preco,
            categoria,
            imagem
          )
        `)
        .eq('carrinho_id', carrinho)
        .order('id', { ascending: false });
  
      if (pedidosError) {
        console.error('Erro ao buscar pedidos:', pedidosError.message);
        return;
      }
  
      setProdutos(pedidosData || []);
      
      // Calcula o total do carrinho
      const total = (pedidosData || []).reduce((acc, item) => {
        return acc + (item.produto.preco * item.quantidade);
      }, 0);
      setTotalCarrinho(total);
    }
  
    carregarPedidos();
  }, []);
  

  

    async function removerPedidoPorId(id: number) {
      const { error } = await supabase
        .from('carrinho_produto')
        .delete()
        .eq('id', id)
    
      if (error) {
        console.error('Erro ao excluir item do carrinho:', error.message)
        return false
      }
    
      return true
    }



  
    
    async function handleDelete(id: number) {
      const sucesso = await removerPedidoPorId(id)
    
      if (sucesso) {
        // Recarrega os produtos após deletar
        const carrinho = await pegarCarrinhoDoUsuario();
        if (!carrinho) return;
    
        const { data: pedidosData, error: pedidosError } = await supabase
          .from('carrinho_produto')
          .select(`
            id,
            quantidade,
            produto:produto_id (
              id,
              nome,
              preco,
              categoria,
              imagem
            )
          `)
          .eq('carrinho_id', carrinho)
          .order('id', { ascending: false });
    
        if (pedidosError) {
          console.error('Erro ao buscar pedidos:', pedidosError.message);
          return;
        }
    
        setProdutos(pedidosData || []);
        
        // Recalcula o total do carrinho
        const total = (pedidosData || []).reduce((acc, item) => {
          return acc + (item.produto.preco * item.quantidade);
        }, 0);
        setTotalCarrinho(total);
      }
    }
  
    const fazerPedido = () => {
      if (produtos.length === 0) {
        Alert.alert('Carrinho vazio', 'Adicione produtos ao carrinho antes de fazer o pedido.');
        return;
      }
      rota.push('/detalhesPedido');
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
        
        {produtos.length === 0 ? (
          <View style={styles.carrinhoVazio}>
            <MaterialIcons name="shopping-cart" size={64} color="#CCC" />
            <Text style={styles.textoCarrinhoVazio}>Seu carrinho está vazio</Text>
            <Text style={styles.subtextoCarrinhoVazio}>Adicione produtos do menu</Text>
          </View>
        ) : (
          <>
            <View style={styles.listaContainer}>
              <FlatList
                data={produtos}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                  <CardPedido data={item} onDelete={() => handleDelete(item.id)} />
                )}
                contentContainerStyle={{ gap: 16 }}
              />
            </View>
            
            <View style={styles.totalContainer}>
              <Text style={styles.totalText}>Total do Carrinho:</Text>
              <Text style={styles.totalValue}>R$ {totalCarrinho.toFixed(2)}</Text>
            </View>
          </>
        )}
   
        <TouchableOpacity 
          style={[styles.botaoPedido, produtos.length === 0 && styles.botaoPedidoDisabled]} 
          onPress={fazerPedido}
          disabled={produtos.length === 0}
        >
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
  carrinhoVazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoCarrinhoVazio: {
    fontSize: 18,
    color: '#666',
    marginTop: 16,
    fontWeight: '600',
  },
  subtextoCarrinhoVazio: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  listaContainer: {
    flex: 1,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C89D72',
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
  botaoPedidoDisabled: {
    backgroundColor: '#CCC',
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

