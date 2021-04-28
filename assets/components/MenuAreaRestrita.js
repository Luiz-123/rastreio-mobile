import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { css } from '../css/Css';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function MenuAreaRestrita(props)
{
    async function logout()
    {
      await AsyncStorage.clear();
      props.navigation.navigate('Home');
    }

    return (
        <View style={css.area_menu}>
          <TouchableOpacity style={css.button_home2} onPress={()=>props.navigation.navigate('Home')}>
            <Icon name="home" size={20} color="#999" />
          </TouchableOpacity> 

          <Text style={css.area_title}>{props.title}</Text>   

          <TouchableOpacity style={css.button_logout} onPress={()=>logout()}>
            <Icon name="sign-out" size={20} color="#999" />
          </TouchableOpacity>  
        </View>
    );
}