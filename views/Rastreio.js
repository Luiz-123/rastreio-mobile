import React, {useState, useEffect} from 'react';
import { Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import { css } from '../assets/css/Css';
import config from '../config/config';

export default function Rastreio({navigation}) 
{
    const [code, setCode] = useState(null);
    const [response, setResponse] = useState(null);

    //Envia os dados do formulário
    async function sendForm()
    {
      let response = await fetch(`${config.urlRoot}`+'rastreio', {
        method: 'POST',
        headers:{
          Accept: 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          code: code           
        })

      });
      let json= await response.json();
      setResponse(json);
    }

    return (
      <View style={[css.container, css.containerTop, css.darkbg]}  >  
               
        <TouchableOpacity onPress={()=>navigation.navigate('Home')}>       
            <View style={[css.login_logomarca, css.logo_topo]}>
              <Image source={require('../assets/img/buttonrastreio.png')} />
            </View>
        </TouchableOpacity >

            <View style={css.login_form}>
              <TextInput 
                 placeholder='Digite o código de rastreio:'
                 onChangeText={text=>setCode(text)}  
                 style={css.login_input}          
              />                         
              <TouchableOpacity style={css.login_button} onPress={()=>sendForm()}>
                 <Text style={css.login_buttonText}>Rastrear</Text>
              </TouchableOpacity>  

              <Text> {response} </Text>
            </View> 
        
      </View>
    );
}