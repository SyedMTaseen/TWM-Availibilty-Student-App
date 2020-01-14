import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, AsyncStorage } from 'react-native';

// import  { Auth } from 'aws-amplify';


class AuthLogin extends React.Component {

    constructor() {
        super()
        

    }

     async componentDidMount() {
        // const customerID = await AsyncStorage.getItem('AVAStudentID');

 
        //     if(customerID=="asd")
        //     {
        //         this.props.navigation.navigate('SignInScreen')
        //     }
        //     else{
        //         this.props.navigation.navigate('Swiper')
        //     }
     
        this.props.navigation.navigate('Login')
    }

 
    render() {
        return (
            <View style={styles.container}>
              <ActivityIndicator size='large' color="#0ca9dd" /> 
          
            </View>
        );
    }
}

export default AuthLogin;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});