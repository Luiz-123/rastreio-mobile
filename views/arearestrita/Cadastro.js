import React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Button, ScrollView } from 'react-native';
import { css } from '../../assets/css/Css';
import AsyncStorage from '@react-native-community/async-storage';
import MenuAreaRestrita from '../../assets/components/MenuAreaRestrita';
import config from '../../config/config';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';

export default function Cadastro({navigation}) 
{    
    const address=config.origin;
    const [code, setCode]=useState(null);
    const [user, setUser]=useState(null);
    const [product, setProduct]=useState(null);
    const [response, setResponse]=useState(null);

    useEffect(()=>{
      getUser();
    },[]);

    useEffect(()=>{
      randomCode();
      setProduct('');
    },[response]);

    //Pegar o id do Usuário
    async function getUser()
    {
      let response= await AsyncStorage.getItem('userData');
      let json= JSON.parse(response);
      setUser(json.id);
    }

    //Gerar um código randômico
    async function randomCode()
    {
      let result = '';
      let length=20;
      let chars='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
      setCode(result);
    }

    //Envio do Formulário
    async function sendForm()
    {
      let response= await fetch(`${config.urlRoot}create`,{
        method: 'POST',
         headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           userId: user,
           code: code,
           product: product,
           local: address
         })
      });
           let json= await response.json();
           setResponse(json);
    }

    //Compartilhar o QRCode
    async function shareQR()
    {
      const image= `${config.urlRoot}`+'img/code.png';
      FileSystem.downloadAsync(
        image,
        FileSystem.documentDirectory+'code.png'
      ).then(({uri})=>{
        Sharing.shareAsync(uri);
      });
      //await Sharing.shareAsync();
    }

    return (
    <ScrollView style={css.darkbg}>  
      <View style={[css.container, css.containerTop, css.darkbg]}>
        <MenuAreaRestrita title='Cadastro' navigation={navigation} />
              
      
        <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
           <View style={[css.login_logomarca, css.logo_topo]}>
              <Image source={require('../../assets/img/cadastro.png')} />                     
           </View>
        </TouchableOpacity>

        {response && (
          <View style={css.login_logomarca}>
            <Image source={{uri:response, height:180, width:180}} />
            <Button title='Compartilhar' onPress={()=>shareQR()} />
          </View>
        )}         

        <View style={css.login_form}>         
          <TextInput style={css.login_input} 
              placeholder='Nome do Produto:' 
              onChangeText={text=>setProduct(text)} 
              value={product} 
          />
          <TouchableOpacity style={css.login_button} onPress={()=>sendForm()}>
            <Text style={css.login_buttonText}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </ScrollView>  
    );
}