import React from 'react';
import { Text, View, Button, Alert } from 'react-native';
import {css} from './assets/css/Css';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, Login, Rastreio } from './views/Index';
import AreaRestrita from './views/arearestrita/AreaRestrita';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen 
           name="Home" 
           component={Home} 
           options={{
             title:"Web - Design",
             headerStyle:{backgroundColor:'#800080'},
             headerTintColor:'#fff',
             headerTitleStyle:{fontWeight:'bold', alignSelf:'center'}
           }}
        />

        <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
        
        <Stack.Screen 
           name="Rastreio" 
           component={Rastreio} 
           options={{
             title:"Rastreio de Pedido",
             headerStyle:{backgroundColor:'#800080'},
             headerTintColor:'#fff',
             headerTitleStyle:{fontWeight:'bold', alignSelf:'center'}
           }} 
        />

        <Stack.Screen name="AreaRestrita" component={AreaRestrita} options={{headerShown:false}} />
     
      </Stack.Navigator>
    </NavigationContainer>
  );
}


