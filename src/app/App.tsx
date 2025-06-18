import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuScreen from '../app/menu';
import PedidoScreen from '../app/Pedido';
import { CartProvider } from '../context/CartContext';

const Stack = createNativeStackNavigator();

export default function App() {
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
