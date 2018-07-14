import { StyleSheet } from 'react-native';

export const GLOBAL_STYLE = StyleSheet.create({
  justifyEnd: {
    justifyContent: 'flex-end'
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyStretch: {
    justifyContent: 'space-between',
    paddingTop:70,
    paddingBottom:50
 },
 justifyMiddle: {
   justifyContent: 'center'
 },
    h1: {
        fontSize: 25,
        textAlign:'center',
        fontWeight: '600',
    },
    description: {
        fontSize: 16,
        textAlign:'center',
        fontWeight: '500',
    },
    miniDescription: {
        fontSize: 14,
        textAlign:'center',
        fontWeight: '100',
        color: '#333'
    },
    mainColor: {
      color: '#003366'
    },
  mainColorBG: {
    backgroundColor: '#003366',
    flex:1,
    alignItems: 'center',
  },
  greyColorBG: {
      backgroundColor: '#eeeeee',
      flex:1,
      alignItems: 'center',
  },

    whiteColorBG: {
        backgroundColor: '#ffffff',
        alignItems: 'center',
    },
  middleLogo: {
    width: 300,
    alignSelf: 'center',
    paddingLeft:50,
    resizeMode: 'contain'
  },
    headerMiddleLogo: {
        width: 150,
        resizeMode: 'contain',
    },
  sponsor: {
    marginTop:200,
    height:150,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  test: {
    height:1,
    width:50,
  },
  sponsorI: {
    height:30,
    resizeMode:'contain',
    marginTop:50,
  },
  sponsorText: {
    margin:0,
    color: 'white',
    alignItems: 'stretch',
  },
  slogant: {
    width:250,
      alignSelf: 'center',
    color:'white',
    textAlign:'center',
    fontSize:20
  },

  loginButton: {
    width:300,
    backgroundColor: '#ffffff',
    borderColor: 'white',
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
  },
  loginText : {
    color:'#003366'
  },
  container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
inputContainer: {
  marginBottom: 15,
},
    input: {
        width: 300,
        paddingLeft:20,
        paddingRight: 20,
        marginVertical:5,
        height: 40,
        borderWidth: 1,
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    numericInput: {borderWidth: 1,textAlign:'center',padding:0,height:30,width:40,borderTopColor:'#000000',borderBottomColor:'#000000',borderLeftColor:'#000000',borderRightColor:'#000000'},
innerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center'
    },
    outerContainer: {
        backgroundColor: '#003366',
        padding: 5,
        height: 85,
    }
});

export const timeLineStyle = StyleSheet.create({
    tabContainer: {
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        width: '100%',
        height: 40,
    },
    tabButton: {
        backgroundColor: 'white',
        flex: 1,
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabButtonText: {
        color: '#003366',
        fontWeight: '400',
        fontSize:16,
    },
    tabButtonPicto: {
        height: 15,
        width: 15,
        marginRight: 5
    },
    buttonBorder: {
        alignSelf: 'center',
        height: '70%',
        width: 1,
        backgroundColor: '#cccccc'
    },
    singlePost: {
        marginBottom: 200,
    },
    profilePic: {
        width: 45,
        height: 45,
        borderRadius: 45,
        marginRight: 5
    },
    text: {
        color: 'black',
        fontSize: 12
    },
    title: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500'
    },
});
