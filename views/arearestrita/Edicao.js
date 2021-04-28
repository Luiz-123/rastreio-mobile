import React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Button, ScrollView } from 'react-native';
import { css } from '../../assets/css/Css';
import config from '../../config/config';
import AsyncStorage from '@react-native-community/async-storage';
import MenuAreaRestrita from '../../assets/components/MenuAreaRestrita';
import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding';

export default function Edicao({navigation}) 
{    

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [displayQR, setDisplayQR] = useState('flex');
  const [displayForm, setDisplayForm] = useState('none');
  const [code, setCode] = useState(null);
  const [product, setProduct] = useState(null);
  const [localization, setLocalization] = useState(null);
  const [response, setResponse] = useState(null);
  const [display, setDisplay]=useState('none');

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
    })()
  });

  //Leitura do Código QR
  async function handleBarCodeScanned({ type, data }) {
    setScanned(true);
    setDisplayQR('none');
    setDisplayForm('flex');
    setCode(data);
    await getLocation();
    await searchProduct(data);
  }
  
  //
  async function searchProduct(codigo) {
    let response= await fetch(`${config.urlRoot}searchProduct`,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({        
        code: codigo
      })
    });
    let json= await response.json();
    setProduct(json.Products[0].name);
  }

  //Envia o formulário com os dados para edição
  async function sendForm(){
    let response= await fetch(`${config.urlRoot}`+'update', {
      method: 'POST',
      headers:{
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        code: code, 
        product: product, 
        local: localization
      })
    });
    let json= await response.json();
    setResponse(json);

    if(json !== ''){
      setDisplay('flex');
      setTimeout(()=>{
         setDisplay('none');
      },2000);}

  }

  // Reescaneamento do QRCode
  async function readAgain()
  {
    setScanned(false);
    setDisplayQR('flex');
    setDisplayForm('none');
    setCode(null);
    setProduct(null);
    setLocalization(null);
  } 

  //Retorna a posição e endereço do usuário GPS
  async function getLocation()
  {
    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    /*
    Geocoder.init(config.geocodingAPI); 
    Geocoder.from(location.coords.latitude, location.coords.longitude)
      .then(json => {        		
        let number = json.results[0].address_components[0].short_name;
        let street = json.results[0].address_components[1].short_name;
        console.log(`${street} - ${number}`);
      })
      .catch(error => console.warn(error));
    */  
  }

    return (   
      <View style={[css.container, css.containerTop, css.darkbg]}>
          <MenuAreaRestrita title='Edição' navigation={navigation} />   

        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : value=>handleBarCodeScanned(value)}
          style={css.qr_code(displayQR)}
        />       

        <TouchableOpacity onPress={()=>readAgain()}>
          <View style={[css.logo_topo]}>
              <Image source={require('../../assets/img/barcode.png')} />                     
          </View>
        </TouchableOpacity>

        <View style={[css.qr_form(displayForm), css.login_form]}>          
          <Text style={css.login_logomarca}> {code} </Text>
          <Text style={css.login_msg(display)}> {response} </Text>
                   
            <TextInput style={css.login_input} 
                placeholder='Nome do Produto:' 
                onChangeText={text=>setProduct(text)} 
                value={product} 
            />
                            
            <TextInput style={css.login_input} 
                placeholder='Localização do Produto:' 
                onChangeText={text=>setLocalization(text)} 
                value={localization} 
            />
          
          <TouchableOpacity style={css.login_button} onPress={()=>sendForm()}>
            <Text style={css.login_buttonText}>Atualizar</Text>
          </TouchableOpacity>
                   
          {/*
          {scanned &&
              <TouchableOpacity style={css.login_button}>
                <Button 
                   title='Escanear novamente' 
                   onPress={()=>readAgain()}
                />                
              </TouchableOpacity>
          }
          */}

        </View>
      </View>
    );

}