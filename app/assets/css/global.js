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
        width: 200,
        alignSelf: 'center',
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

    input: {
        width: 300,
        paddingLeft:20,
        height: 40,
        borderWidth: 1,
        marginBottom:15,
        borderColor: "white",
        color: "white",
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    outerContainer: {

        backgroundColor: '#003366',
        borderBottomColor: '#f2f2f2',
        borderBottomWidth: 1,
        padding: 15,
        height: 70,
    }
})
