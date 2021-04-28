import React from 'react';
import { useState, useEffect } from 'react';
import { Text, TextInput, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { css } from '../../assets/css/Css';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuAreaRestrita from '../../assets/components/MenuAreaRestrita';
import config from '../../config/config';

export default function Profile({navigation}) 
{ 
  const [idUser, setIdUser]= useState(null);
  const [senhaAntiga, setSenhaAntiga]= useState(null);
  const [novaSenha, setNovaSenha]= useState(null);
  const [confNovaSenha, setConfNovaSenha]= useState(null);
  const [msg, setMsg]= useState(null);
  const [display, setDisplay]=useState('none');

  useEffect(()=>{
    async function getIdUser(){
      let response= await AsyncStorage.getItem('userData');
      let json= JSON.parse(response);
      setIdUser(json.id);
    }
      getIdUser();
  });

  async function sendForm()
  {
    let response= await fetch(`${config.urlRoot}verifyPass`, {
      method:'POST',
      body:JSON.stringify({
        id: idUser,
        senhaAntiga: senhaAntiga,
        novaSenha: novaSenha,
        confNovaSenha: confNovaSenha
      }),
        headers:{
          Accept: 'application/json',
          'Content-Type': 'application/json'
        } 
    });
    let json= await response.json();  
    setMsg(json);

    if(json !== ''){
      setDisplay('flex');
      setTimeout(()=>{
         setDisplay('none');
      },3000);}

  }

  return(
  <ScrollView style={css.darkbg}>  
    <View style={[css.container, css.containerTop, css.darkbg]}>
      <MenuAreaRestrita title='Perfil' navigation={navigation} />
          

      <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
         <View style={[css.login_logomarca, css.logo_topo]}>
            <Image source={require('../../assets/img/senha.png')} />                     
         </View>
      </TouchableOpacity>

         <View>
           <Text style={css.login_msg(display)}>{msg}</Text>
         </View>


      <View style={css.login_form}>        
        <TextInput style={css.login_input} placeholder='Senha Antiga:' onChangeText={text=>setSenhaAntiga(text)} />
        <TextInput style={css.login_input} placeholder='Nova Senha:' onChangeText={text=>setNovaSenha(text)} />
        <TextInput style={css.login_input} placeholder='Confirmar Senha:' onChangeText={text=>setConfNovaSenha(text)} />

        <TouchableOpacity style={css.login_button} onPress={()=>sendForm()}>
          <Text style={css.login_buttonText}>Trocar</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  </ScrollView>   
  );
 
}