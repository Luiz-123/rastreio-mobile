import React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, BackHandler, Alert } from 'react-native';
import { css } from '../../assets/css/Css';
import AsyncStorage from '@react-native-community/async-storage';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Profile, Cadastro, Edicao } from '../Index';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function AreaRestrita({navigation}) 
{
    const Tab = createMaterialBottomTabNavigator();
    const [user,setUser]=useState(null);

    useEffect(()=>{
        async function getUser()
        {
           let response= await AsyncStorage.getItem('userData');
           let json= JSON.parse(response);
           setUser(json.name);
        }
           getUser();
    }, []);


    useEffect(() => {
      const backAction = () => {
        Alert.alert("Alerta!", "Sair da área restrita?", [
          {
            text: "Não",
            onPress: () => null,
            style: "cancel"
          },
          { text: "Sim", onPress: () => {
            navigation.navigate('Home');
            //BackHandler.exitApp(); 
            }}
        ]);
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );
  
      return () => backHandler.remove();
    }, []);
  

    return (
        <Tab.Navigator
          activeColor='#999'
          inactiveColor='#fff'
          barStyle={css.area_tab}
        >
          <Tab.Screen 
          name="Perfil" 
          component={Profile}
          options={{
              tabBarIcon:()=>(
                  <Icon name="user" size={20} color="#999" />
              )
          }} 
          />
          <Tab.Screen 
          name="Cadastro" 
          component={Cadastro} 
          options={{
            tabBarIcon:()=>(
                <Icon name="archive" size={20} color="#999" />
            )
          }} 
          />
          <Tab.Screen 
          name="Edição" 
          component={Edicao} 
          options={{
            tabBarIcon:()=>(
                <Icon name="edit" size={20} color="#999" />
            )
          }} 
          />
        </Tab.Navigator>
    );
}