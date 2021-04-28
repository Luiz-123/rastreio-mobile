import React from 'react';
import { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Image, Text, TextInput, TouchableOpacity, View, Platform } from 'react-native';
import { css } from '../assets/css/Css';
import AsyncStorage from '@react-native-community/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import config from '../config/config';

export default function Login({navigation}) 
{
    const [display, setDisplay]=useState('none');
    const [user, setUser]=useState(null);
    const [password, setPassword]=useState(null);
    const [login, setLogin]=useState(false);

    useEffect(()=>{
       verifyLogin();
    }, []);

    useEffect(()=>{
      if(login === true){
         biometric();
      }
    }, [login]);

    //Verifica se o usuário já possui algum Login
    async function verifyLogin()
    {
       let response= await AsyncStorage.getItem('userData');
       let json= await JSON.parse(response);
       if(json !== null){
          setUser(json.name);
          setPassword(json.password);
          setLogin(true);
       }
    }

    //Biometria
    async function biometric()
    {
       let compatible= await LocalAuthentication.hasHardwareAsync();
       if(compatible){
          let biometricRecords= await LocalAuthentication.isEnrolledAsync();
          if(!biometricRecords){
             alert('Biometria não cadastrada!');
          }else{
             let result= await LocalAuthentication.authenticateAsync();
             if(result.sucess){
                sendForm();
             }else{
                setUser(null);
                setPassword(null);
             }
          }
       }
    }

    //Envio do formulário de login
    async function sendForm(){
       let response= await fetch(`${config.urlRoot}login`, {
         method: 'POST',
         headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json'
         },
         body: JSON.stringify({
           name: user,
           password: password
         })
       });
       let json= await response.json();
       if(json === 'error'){
          setDisplay('flex');
          setTimeout(()=>{
             setDisplay('none');
          },3000);
          await AsyncStorage.clear();  
       }else{
          await AsyncStorage.setItem('userData', JSON.stringify(json));         
          navigation.navigate('AreaRestrita');
       }
    }

    return (
      <KeyboardAvoidingView style={[css.container, css.darkbg]} behavior={Platform.OS === "ios" ? "padding" : "height"} >
         <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
         <View style={css.login_logomarca}>
            <Image source={require('../assets/img/buttonlogin.png')} />                     
         </View>
         </TouchableOpacity>

         <View>
            <Text style={css.login_msg(display)}>Usuário ou senha inválidos!</Text> 
         </View>

         <View style={css.login_form}>
            <TextInput style={css.login_input} placeholder='Usuário:' onChangeText={text=>setUser(text)} />
            <TextInput style={css.login_input} placeholder='Senha:' onChangeText={text=>setPassword(text)} secureTextEntry={true} />
            <TouchableOpacity style={css.login_button} onPress={()=>sendForm()}>
                <Text style={css.login_buttonText}>Entrar</Text>
            </TouchableOpacity>
         </View>
      </KeyboardAvoidingView>
    );
}