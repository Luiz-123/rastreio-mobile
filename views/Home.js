import React from 'react';
import { Text, View, Button, TouchableOpacity, Image } from 'react-native';
import { css } from '../assets/css/Css';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Home({navigation}) 
{    
    return (
       <View style={[css.container, css.containerTop, css.darkbg]}  >  
               
          <View style={[css.login_logomarca, css.logo_topo]}>
            <Image source={require('../assets/img/rastreio.png')} />
          </View>        

          <View style={css.login_form}> 
            <TouchableOpacity style={css.login_button} onPress={()=> navigation.navigate('Login')}>
              <Text style={css.login_buttonText}>
              <Icon name="user" size={25} color="#fff" />  Login</Text>
            </TouchableOpacity>  
                   
            <TouchableOpacity style={css.login_button} onPress={()=> navigation.navigate('Rastreio')}>
              <Text style={css.login_buttonText}>
              <Icon name="shopping-cart" size={25} color="#fff" />  Rastreio</Text>
            </TouchableOpacity> 
          </View>

       </View>
    );
}