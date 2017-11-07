import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
        fontWeight: '400',
    },
    description: {
        fontSize: 16,
        textAlign:'center',
        fontWeight: '500',
    },
    miniDescription: {
        fontSize: 10,
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
        height: 40,
        borderWidth: 1,
        borderColor: "white",
        color: "white",
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'center'
    },
    outerContainer: {
        backgroundColor: '#003366',
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
        padding: 5,
        height: 70,
    }
});
