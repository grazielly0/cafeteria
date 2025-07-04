import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';

const categorias = ['Cafés', 'Chás', 'Doces', 'Salgados'];

import { supabase } from '@/database/useClienteDataBase';
import {  useEffect } from 'react';

export async function buscarCarrinho() {
  const { data: userData } = await supabase.auth.getUser()
  const user = userData?.user

  if (!user) {
    alert('Você precisa estar logado.')
    return null
  }

  
  const { data: carrinhoExistente, error: carrinhoError } = await supabase
    .from('carrinho')
    .select('id')
    .eq('user_id', user.id)
    .limit(1)

  console.log(carrinhoExistente)
  if (carrinhoError) {
    console.error('Erro ao buscar carrinho:', carrinhoError.message)
    return null
  }

  let carrinhoId

  if (carrinhoExistente && carrinhoExistente.length > 0) {
    carrinhoId = carrinhoExistente;
  } else {
    const { data: novoCarrinho, error: insertError } = await supabase
      .from('carrinho')
      .insert([{ user_id: user.id }])
      .select()
      .single()

    if (insertError) {
      console.error('Erro ao criar carrinho:', insertError.message)
      return null
    }

    carrinhoId = novoCarrinho.id
  }

  console.log (carrinhoId)

  return carrinhoId
}



export default function MenuScreen() {

  type Produto = {
    id: string;
    nome: string;
    preco: number;
    categoria: string;
    imagem: string;
  };

  const rota = useRouter();
  const [categoriaAtiva, setCategoriaAtiva] = useState('Cafés');
  
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [error, setError] = useState<any[]>([]);
  
  async function list(){
    try {
        const { data: produtos, error: error } = await supabase.from('produto').select();
          
        if (error) {
          console.error('Erro ao buscar os produtos:', error.message);          
        }
        
        if (produtos && produtos.length > 0) {
          setProdutos(produtos)
        }
        return;
    } catch (error) {
      console.error('Erro ao buscar os produtos:', (error as Error).message);
    }
  };

  useEffect(() => {list()}, [] );

  const produtosFiltrados = produtos.filter(p => p.categoria === categoriaAtiva);
  const [nome, setNome] = useState<any[]>([]);
  const [id, setId] = useState<any[]>([]);
  const [carrinhoId, setcarrinhoId] = useState('');
  const [quantidade, setQuantidade] = useState(1);




  const handleAddToCart = async (produto: any) => {


    const { data: userData } = await supabase.auth.getUser()
    const user = userData?.user
  
    if (!user) {
      alert('Você precisa estar logado.')
      return null
    }
  
    
    const { data: carrinhoExistente, error: carrinhoError } = await supabase
      .from('carrinho')
      .select('id')
      .eq('user_id', user.id)
      .limit(1)
  
    if (carrinhoError) {
      console.error('Erro ao buscar carrinho:', carrinhoError.message)
      return null
    }
  
    let carrinhoId
  
    if (carrinhoExistente && carrinhoExistente.length > 0) {
      carrinhoId = carrinhoExistente[0].id;
    } else {
      const { data: novoCarrinho, error: insertError } = await supabase
        .from('carrinho')
        .insert([{ user_id: user.id }])
        .select()
        .single()
  
      if (insertError) {
        console.error('Erro ao criar carrinho:', insertError.message)
        return null
      }
      carrinhoId = novoCarrinho.id
    }   

      if (!user) {
        alert("Você precisa estar logado.");
        return;
      }
      
      const { error } = await supabase
      .from('carrinho_produto')
      .insert([
        {       
          carrinho_id: carrinhoId ,
          produto_id: produto.id,
          quantidade: quantidade,
        }
  
      ]);   

      if (!carrinhoId || !produto.id) {
        console.error('ID inválido para carrinho ou produto');
        return;
      }
      

      if (error) {
        console.error('Erro ao adicionar ao carrinho:', error.message);
        alert("Erro ao adicionar ao carrinho.");
      } else {
        alert("Produto adicionado ao carrinho com sucesso!");


          rota.push('/pedido');
        };
      
      }
  
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
    

      <Text style={styles.titulo}>MENU</Text>

      <View style={styles.categorias}>
        {categorias.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoriaBotao, categoriaAtiva === cat && styles.categoriaAtiva]}
            onPress={() => setCategoriaAtiva(cat)}
          >
            <Text style={[styles.categoriaTexto, categoriaAtiva === cat && styles.categoriaTextoAtivo]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) =>  item.id}
        numColumns={2}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image
              source={{
                uri: `https://ioqmugedsxyximfdhjzp.supabase.co/storage/v1/object/public/images/${item.imagem}`,
              }}
              style={styles.imagem}
            />
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.preco}>{item.preco}</Text>
            <TouchableOpacity onPress={() => handleAddToCart(item)}  style={styles.botaoCarrinho}>
              <Text  style={styles.textoBotaoCarrinho}>Adicionar ao carrinho</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCF8F3',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  botaoVoltar: {
    position: 'absolute',
    top: 45,
    left: 16,
    zIndex: 10,
    padding: 4,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    marginBottom: 8,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#A67C52',
  },
  categorias: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  categoriaBotao: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#EEE0D0',
  },
  categoriaAtiva: {
    backgroundColor: '#C89D72',
  },
  categoriaTexto: {
    fontSize: 14,
    color: '#7C4F2D',
  },
  categoriaTextoAtivo: {
    color: '#fff',
    fontWeight: 'bold',
  },
  lista: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  card: {
    width: '45%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
    height: 230,
    justifyContent: 'space-between',
  },
  imagem: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  nome: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  preco: {
    fontSize: 14,
    color: '#7C4F2D',
    marginTop: 4,
  },
  botaoCarrinho: {
    marginTop: 8,
    backgroundColor: '#A67C52',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    width: "100%",
    height:"15%",
  },
  textoBotaoCarrinho: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
});