import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from '../app/menu';
import PedidoScreen from '../app/pedido';
import { CartProvider } from '../context/CartContext';

const Stack = createNativeStackNavigator();

export default function App() {
  console.log('teste');
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Menu" component={MenuScreen} />
          <Stack.Screen name="Pedido" component={PedidoScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
