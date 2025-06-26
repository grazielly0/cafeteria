import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from 'expo-router';

const categorias = ['Cafés', 'Chás', 'Doces', 'Salgados'];

const produtosold = [

  {
    id: '1',
    nome: 'Café Preto',
    preco: 'R$ 8,00',
    categoria: 'Cafés',
    imagem: require('../../assets/images/cafepre.jpg'),
  },
  {
    id: '2',
    nome: 'Cappuccino',
    preco: 'R$ 11,00',
    categoria: 'Cafés',
    imagem: require('../../assets/images/cappuccino.jpg'),
  },
  {
    id: '3',
    nome: 'Croissant recheado Chocolate',
    preco: 'R$ 9,50',
    categoria: 'Doces',
    imagem: require('../../assets/images/croissant.jpg'),
  },
  {
    id: '4',
    nome: 'Café com leite',
    preco: 'R$ 9,00',
    categoria: 'Cafés',
    imagem: require('../../assets/images/cafeCleite.jpg'),
  },
  {
    id: '5',
    nome: 'Cappuccino Italiano',
    preco: 'R$  12,00',
    categoria: 'Cafés',
    imagem: require('../../assets/images/italiano.jpg'),
  },
  {
    id: '6',
    nome: 'Mocha',
    preco: 'R$ 13,00',
    categoria: 'Cafés',
    imagem: require('../../assets/images/mocha.jpg'),
  },
  {
    id: '7',
    nome: 'Latte Macchiato',
    preco: 'R$ 12,00',
    categoria: 'Cafés',
    imagem: require('../../assets/images/latteMacch.jpg'),
  },

  {
    id: '8',
    nome: 'Macaccino',
    preco: 'R$ 12,00',
    categoria: 'Cafés',
    imagem: require('../../assets/images/macaccino.jpg'),
  },
  {
    id: '9',
    nome: 'Café Gelado com Baunilha',
    preco: 'R$ 14,00',
    categoria: 'Cafés',
    imagem: require('../../assets/images/affogato.jpg'),
  },

  {
    id: '10',
    nome: 'Chá de Camomila',
    preco: 'R$  8,00',
    categoria: 'Chás',
    imagem: require('../../assets/images/camomila.jpg'),
  },

  {
    id: '11',
    nome: 'Chá Detox',
    preco: 'R$ 9,00',
    categoria: 'Chás',
    imagem: require('../../assets/images/detox.jpg'),
  },

  {
    id: '12',
    nome: 'Chá de frutas Vermelhas',
    preco: 'R$ 9,00',
    categoria: 'Chás',
    imagem: require('../../assets/images/frutRed.jpg'),
  },

  {
    id: '13',
    nome: 'Cookie recheado e tradicional',
    preco: 'R$ 6,00',
    categoria: 'Doces',
    imagem: require('../../assets/images/cookie.jpg'),
  },

  {
    id: '14',
    nome: 'Brownie de Chocolate',
    preco: 'R$ 12,00',
    categoria: 'Doces',
    imagem: require('../../assets/images/brownie.jpg'),
  },

  {
    id: '15',
    nome: 'Donuts',
    preco: 'R$ 7,00',
    categoria: 'Doces',
    imagem: require('../../assets/images/donuts.jpg'),
  },

  {
    id: '16',
    nome: 'Cheescake',
    preco: 'R$ 12,50',
    categoria: 'Doces',
    imagem: require('../../assets/images/chescake.jpg'),
  },
  {
    id: '16',
    nome: 'Torta de Limão',
    preco: 'R$ 13,50',
    categoria: 'Doces',
    imagem: require('../../assets/images/torta.jpg'),
  },
  {
    id: '17',
    nome: 'Chá Gelado',
    preco: 'R$ 10,50',
    categoria: 'Chás',
    imagem: require('../../assets/images/chaCold.jpg'),
  },
  {
    id: '18',
    nome: 'Chá Preto',
    preco: 'R$ 8,00',
    categoria: 'Chás',
    imagem: require('../../assets/images/chápreo.jpg'),
  },
  {
    id: '19',
    nome: 'Chá Verde com Hotelã',
    preco: 'R$ 9,00',
    categoria: 'Chás',
    imagem: require('../../assets/images/cháVerHorte.webp'),
  },

  {
    id: '20',
    nome: 'Bolo de Chocolate',
    preco: 'R$ 10,00',
    categoria: 'Doces',
    imagem: require('../../assets/images/bolodechoco.jpg'),
  },

  {
    id: '21',
    nome: 'Bolo de Cenoura com Brigadeiro',
    preco: 'R$ 10,50',
    categoria: 'Doces',
    imagem: require('../../assets/images/boloCeno.jpg'),
  },

  {
    id: '22',
    nome: 'Coxinha de Frango com Catupiry',
    preco: 'R$ 12,50',
    categoria: 'Salgados',
    imagem: require('../../assets/images/CoxiCatu.webp'),
  },

  {
    id: '23',
    nome: 'Empada de Palmito',
    preco: 'R$ 14,50',
    categoria: 'Salgados',
    imagem: require('../../assets/images/empada.jpg'),
  },

  {
    id: '24',
    nome: 'Pão de Queijo',
    preco: 'R$ 8,50',
    categoria: 'Salgados',
    imagem: require('../../assets/images/paoQuei.webp'),
  },

  {
    id: '25',
    nome: 'Quiche de Alho-Poró',
    preco: 'R$ 12,50',
    categoria: 'Salgados',
    imagem: require('../../assets/images/quecheAlho.avif'),
  },

  {
    id: '26',
    nome: 'Sanduíche Natural de Frango',
    preco: 'R$ 10,00',
    categoria: 'Salgados',
    imagem: require('../../assets/images/sanatural.webp'),
  },

  {
    id: '27',
    nome: 'Expresso Romano',
    preco: 'R$  11,00',
    categoria: 'Cafés',
    imagem: require('../../assets/images/expressoRoma.jpg'),
  },
  
  {
    id: '28',
    nome: 'Macchiato Caramelizado',
    preco: 'R$  13,00',
    categoria: 'Cafés',
    imagem: require('../../assets/images/macchiatoCara.jpg'),
  },

  {
    id: '29',
    nome: 'Latte de Lavanda',
    preco: 'R$ 15,50',
    categoria: 'Chás',
    imagem: require('../../assets/images/lattelavan.jpg'),
  },

  {
    id: '30',
    nome: 'Golden Milk',
    preco: 'R$ 12,50',
    categoria: 'Chás',
    imagem: require('../../assets/images/golden.jpg'),
  },

  {
    id: '31',
    nome: 'Chá de Erva-Doce com Anis ',
    preco: 'R$ 8,00',
    categoria: 'Chás',
    imagem: require('../../assets/images/chaervado.jpg'),
  },

  {
    id: '32',
    nome: 'Matcha Latte ',
    preco: 'R$ 12,50',
    categoria: 'Chás',
    imagem: require('../../assets/images/matcha.jpg'),
  },

  {
    id: '33',
    nome: 'Chá de Hibisco com Maçã ',
    preco: 'R$ 8,00',
    categoria: 'Chás',
    imagem: require('../../assets/images/chama.jpg'),
  },


  {
    id: '34',
    nome: 'Chá de Hortelã ',
    preco: 'R$ 6,50',
    categoria: 'Chás',
    imagem: require('../../assets/images/chahorte.jpg'),
  },

  {
    id: '35',
    nome: 'Bolo Red Velvet',
    preco: 'R$ 12,50',
    categoria: 'Doces',
    imagem: require('../../assets/images/bolored.jpg'),
  },

  {
    id: '36',
    nome: 'Mini Pizza de Calabresa',
    preco: 'R$ 12,00',
    categoria: 'Salgados',
    imagem: require('../../assets/images/minipizza.jpg'),
  },

  
  {
    id: '37',
    nome: 'Mini Hambúrguer Artesanal',
    preco: 'R$ 13,00',
    categoria: 'Salgados',
    imagem: require('../../assets/images/hambu.jpg'),
  },

  {
    id: '38',
    nome: 'Esfiha de Carne',
    preco: 'R$ 9,00',
    categoria: 'Salgados',
    imagem: require('../../assets/images/esfi.jpg'),
  },

  {
    id: '39',
    nome: 'Empada de Frango',
    preco: 'R$ 14,00',
    categoria: 'Salgados',
    imagem: require('../../assets/images/empa.jpg'),
  },

  {
    id: '40',
    nome: 'Misto Quente',
    preco: 'R$ 12,00',
    categoria: 'Salgados',
    imagem: require('../../assets/images/misto.jpg'),
  },

  {
    id: '41',
    nome: 'Pavê de Chocolate e Avelã ',
    preco: 'R$ 14,50',
    categoria: 'Doces',
    imagem: require('../../assets/images/pavechoco.jpg'),
  },

  {
    id: '42',
    nome: 'Café Pingado ',
    preco: 'R$ 14,50',
    categoria: 'Cafés',
    imagem: require('../../assets/images/pingado.jpg'),
  },
  {
    id: '43',
    nome: 'Café Americano',
    preco: 'R$ 10,00',
    categoria: 'Cafés',
    imagem: require('../../assets/images/cafe1.jpg'),
  },


];
import { useEffect } from 'react';
import { supabase } from '@/database/useClienteDataBase';


export default function MenuScreen() {

  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const getProdutos = async () => {
      try {
        const { data: produtos, error } = await supabase.from('produto').select();

        if (error) {
          console.error('Error fetching produtos:', error.message);
          return;
        }

        if (produtos && produtos.length > 0) {
          setProdutos(produtos);
        }
      } catch (error) {
        console.error('Error fetching produtos:', error.message);
      }
    };

    getProdutos();
  }, []);
  const navigation = useNavigation();
  const router = useRouter();
  const rota = useRouter();

  const [categoriaAtiva, setCategoriaAtiva] = useState('Cafés');
  const produtosFiltrados = produtos.filter(p => p.categoria === categoriaAtiva);

  const handleAddToCart = (produto) => {
    console.log(`Adicionado ao carrinho: ${produto.nome}`);
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
        keyExtractor={(item) => item.id}
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
            <TouchableOpacity style={styles.botaoCarrinho} onPress={() => handleAddToCart(item)}>
              <Text style={styles.textoBotaoCarrinho}>Adicionar ao carrinho</Text>
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