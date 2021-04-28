import { StyleSheet } from 'react-native';

const css = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    containerTop:{
      justifyContent:'flex-start'
    },
    container2:{
      flex: 1,
      flexDirection:'row',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textPage:{
      backgroundColor:'orange',
      padding: 20,
    },
      button_home:{
      marginRight: 40
    },
    darkbg:{
      backgroundColor: '#E6E6FA'
    },
    login_logomarca:{
      textAlign:'center',
      marginBottom:40
    },
    login_msg:(text='none')=>({
      fontWeight:'bold', 
      fontSize:22,
      color:"red",
      marginTop:5,
      marginBottom:15,
      display:text
    }),
    login_form:{
      width:"80%"
    },
    login_input:{
      backgroundColor: '#fff',
      fontSize:19,
      borderRadius:10, 
      padding:7,
      marginBottom:15
    },
    login_button:{
      padding:12,
      backgroundColor: '#800080',       
      alignSelf:"center",
      width:"100%",
      borderRadius:10,
      marginBottom:20
    },
    login_buttonText:{
      fontWeight:'bold', 
      alignSelf:"center",
      fontSize:22,
      color:"#fff"
    },
    area_tab:{
      backgroundColor:'#800080',
      fontSize:20,
      fontWeight:'bold',
      color:'#333'
    },
    area_menu:{
      flexDirection:'row',
      paddingTop:40,
      paddingBottom:10,
      width:'100%',
      backgroundColor:'#800080',
      alignItems:'center',
      justifyContent: 'center'
    },
    area_home2:{
      textAlign:'left'
    },
    area_title:{
      width:'80%',
      fontWeight:'bold',
      fontSize:20,
      color:'#fff',
      textAlign:'center'
    },
    area_logout:{
      textAlign:'right'
    },
    logo_topo:{
      marginTop:20
    },
    qr_code:(display='flex')=>({
      width:'100%',
      height:'100%',
      backgroundColor:'#000',
      justifyContent: 'center',
      display: display
    }),
    qr_form:(display='none')=>({
      width:'100%',      
      display: display
    })
  });

  export {css};