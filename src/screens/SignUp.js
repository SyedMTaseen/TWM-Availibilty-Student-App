import React, { Component } from 'react'
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView,Keyboard } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

const background = require('../../assets/SignupBackground.png')
class Signup extends Component {

   
    state={
    name:'',
    email:'',
    password:'',
    faculty:'',
    nameVal:false,
    emailVal:false,
    passwordVal:false,
    facultyVal:false
    }

    getVariable(text,variable){ 
        this.setState({[variable] : text});
    }
    showErr(variable,inputVal){
        if(inputVal === '' || inputVal === ' ')
            this.setState({[variable] :true });
        else
        this.setState({[variable]:false});
}
    render() {
        return (
            <ImageBackground
                style={styles.container}
                source={background}
                resizeMode='stretch'
            >
                <View style={styles.headView}>
                    <Text style={styles.headText}>Create{'\n'}Account</Text>
                </View>
                <View  style={styles.formView}>
                    <View style={styles.inputsView}>
                        <TextInput
                            onBlur={()=>this.showErr('nameVal',this.state.name)}
                            onChangeText={(e)=>this.getVariable(e,'name')}
                            style={styles.inputs}
                            placeholderTextColor="white"
                            placeholder='Full Name' />
                    </View>
                    <Text style={this.state.nameVal?styles.unhide:styles.hide}>This Field cannot be left empty</Text>
                    <View style={styles.inputsView}>
                        <TextInput
                            onBlur={()=>this.showErr('emailVal',this.state.email)}
                            onChangeText={(e)=>this.getVariable(e,'email')}
                            style={styles.inputs}
                            placeholderTextColor="white"
                            placeholder='NU Email' />
                    </View>
                    <Text style={this.state.emailVal?styles.unhide:styles.hide}>This Field cannot be left empty</Text>
                    
                    <View style={styles.inputsView}>
                        <TextInput
                            onBlur={()=>this.showErr('passwordVal',this.state.password)}
                            onChangeText={(e)=>this.getVariable(e,'password')}
                            style={styles.inputs}
                            secureTextEntry={true}
                            placeholderTextColor="white"
                            placeholder='Password' />
                    </View>
                    <Text style={this.state.passwordVal?styles.unhide:styles.hide}>This Field cannot be left empty</Text>
                    
                    <View style={styles.inputsView}>
                        <TextInput
                            onBlur={()=>this.showErr('facultyVal',this.state.faculty)}
                            onChangeText={(e)=>this.getVariable(e,'faculty')}
                            style={styles.inputs}
                            placeholderTextColor="white"
                            placeholder='Faculty' />
                    </View>
                    <Text style={this.state.facultyVal?styles.unhide:styles.hide}>This Field cannot be left empty</Text>
                    
                    <View style={styles.btnView}>
                        <Text style={styles.btnText}>Sign Up</Text>
                        <TouchableOpacity style={styles.btn}>
                            <Ionicons color='white' name='ios-arrow-dropright-circle' size={70} />
                        </TouchableOpacity>
                    </View>
                    
                </View>
                <View style={styles.signinLinkView}>
                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignInScreen')}>
                        <Text style={styles.signinLink}>
                            SignIn
                        </Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        )
    }


}
export default Signup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: '5%',
    },
    headView: {
        flex: 0.4,
        justifyContent: 'center',
    },
    headText: {
        fontSize: 30,
        marginLeft: '12%',
        fontWeight: 'bold'
    },
    formView: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',

    },
    inputsView: {
        borderBottomWidth: 1,
        borderColor: 'white',
        width: '80%',
        padding: 10,
        margin: 10,
    },
    inputs:{
        color:'white'
    },
    btnView: {
        // flex: 0.5,
        flexDirection: 'row',
        width: '100%',
        marginTop: 20,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    btnText: {
        fontSize: 25,
        color: 'white',
        flex: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
   },
    unhide:{
        display:'flex',
        color:'#004752'
    },
    hide:{
        display:'none',
    },
    signinLinkView:{
        width:'100%',
        padding:20,
        alignSelf:'center',
        marginLeft:'15%',
        fontWeight:'bold'
    },
    signinLink:{
        fontSize:20,
        color:'white',
        

    }








})