import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  justifyEnd: {
    justifyContent: 'flex-end'
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyStretch: {
  justifyContent: 'space-between'
 },
  mainColorBG: {
    backgroundColor: '#003366',
    flex:1,
    alignItems: 'center',
  },
  middleLogo: {
    width: 300,
    resizeMode: 'contain'
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
    width: 250,
    color:'white',
    textAlign:'center',
    fontSize:20
  },

  loginButton: {
    width:200,
    color:'#003366',
    backgroundColor: 'white',
  },container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 200,
        paddingLeft:20,
        height: 50,
        borderWidth: 1,
        borderColor: "red",
    }
})
