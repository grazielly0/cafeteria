// src/components/CardPedido.tsx
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

interface CardPedidoProps {
  data: {
    id: number
    quantidade: number
    produto: {
      id: string
      nome: string
      preco: number
      categoria: string
      imagem: string
    }
  }
  onDelete: () => void
}

export default function CardPedido({ data, onDelete }: CardPedidoProps) {
  const precoTotal = data.produto.preco * data.quantidade

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{
            uri: `https://ioqmugedsxyximfdhjzp.supabase.co/storage/v1/object/public/images/${data.produto.imagem}`,
          }}
          style={styles.imagem}
        />
        
        <View style={styles.info}>
          <Text style={styles.nome}>{data.produto.nome}</Text>
          <Text style={styles.categoria}>{data.produto.categoria}</Text>
          <Text style={styles.quantidade}>Quantidade: {data.quantidade}</Text>
          <Text style={styles.precoUnitario}>R$ {data.produto.preco.toFixed(2)} cada</Text>
          <Text style={styles.precoTotal}>Total: R$ {precoTotal.toFixed(2)}</Text>
        </View>
        
        <TouchableOpacity onPress={onDelete} style={styles.botaoRemover}>
          <MaterialIcons name="delete" size={24} color="#D09290" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagem: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  categoria: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  quantidade: {
    fontSize: 14,
    color: '#A67C52',
    fontWeight: '600',
    marginBottom: 2,
  },
  precoUnitario: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  precoTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#C89D72',
  },
  botaoRemover: {
    padding: 8,
  },
})
