import React, { Component } from 'react'
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView, Modal } from 'react-native'
import { Ionicons,MaterialIcons,FontAwesome} from '@expo/vector-icons';


const  fieldErr=`Some Fields are Empty \n Please fill them first`;
const background = require('../../assets/SignupBackground.png')
class Signup extends Component {


    state = {
        name: '',
        email: '',
        password: '',
        faculty: '',
        nameVal: false,
        emailVal: false,
        passwordVal: false,
        facultyVal: false,
        modal:false,
        errText:''
    }

    getVariable(text, variable) {
        this.setState({ [variable]: text });
    }
    showErr(variable, inputVal) {
        if (inputVal === '' || inputVal === ' ')
            this.setState({ [variable]: true });
        else
            this.setState({ [variable]: false });
    }
    signUp(){
        const {name,email,password,faculty} = this.state;
        if(email ===''|| email===' ' || name==='' || name===' ' || password==='' ||password===' '||faculty === '' || faculty === ' '){
            this.setState({errText:fieldErr,modal:true})
        }
        else{
            //signUp code here
        }
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
                <View style={styles.formView}>
                    <View style={styles.inputsView}>
                        <TextInput
                            onBlur={() => this.showErr('nameVal', this.state.name)}
                            onChangeText={(e) => this.getVariable(e, 'name')}
                            style={styles.inputs}
                            placeholderTextColor="white"
                            placeholder='Full Name' />
                            <FontAwesome name='user' color='white' size={25} />
                    </View>
                    <Text style={this.state.nameVal ? styles.unhide : styles.hide}>Name cannot be left empty</Text>
                    <View style={styles.inputsView}>
                        <TextInput
                            onBlur={() => this.showErr('emailVal', this.state.email)}
                            onChangeText={(e) => this.getVariable(e, 'email')}
                            style={styles.inputs}
                            placeholderTextColor="white"
                            placeholder='NU Email' />
                         <MaterialIcons name='email' size={25} color='white'/>
                     </View>
                    <Text style={this.state.emailVal ? styles.unhide : styles.hide}>Email cannot be left empty</Text>

                    <View style={styles.inputsView}>
                        <TextInput
                            onBlur={() => this.showErr('passwordVal', this.state.password)}
                            onChangeText={(e) => this.getVariable(e, 'password')}
                            style={styles.inputs}
                            secureTextEntry={true}
                            placeholderTextColor="white"
                            placeholder='Password' />
                              <Ionicons name='ios-lock' size={25} color='white'/>
                    </View>
                    <Text style={this.state.passwordVal ? styles.unhide : styles.hide}>Password cannot be left empty</Text>

                    <View style={styles.inputsView}>
                        <TextInput
                            onBlur={() => this.showErr('facultyVal', this.state.faculty)}
                            onChangeText={(e) => this.getVariable(e, 'faculty')}
                            style={styles.inputs}
                            placeholderTextColor="white"
                            placeholder='Faculty' />
                            <MaterialIcons name='face' color='white' size={25}/>
                    </View>
                    <Text style={this.state.facultyVal ? styles.unhide : styles.hide}>Faculty cannot be left empty</Text>

                    <View style={styles.btnView}>
                        <Text style={styles.btnText}>Sign Up</Text>
                        <TouchableOpacity
                        onPress={this.signUp.bind(this)}
                        style={styles.btn}>
                            <Ionicons color='white' name='ios-arrow-dropright-circle' size={70} />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={styles.signinLinkView}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SignInScreen')}>
                        <Text style={styles.signinLink}>
                            SignIn
                        </Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType='fade'
                    transparent={true}
                    visible={this.state.modal}>
                    <View style={styles.modalMainView}></View>
                    <View style={styles.modalView}>
                        <MaterialIcons name='error' color='#2B7C87' size={50} />
                        <Text style={styles.modalText}>{this.state.errText}</Text>
                        <TouchableOpacity
                            style={styles.modalBtn}
                            onPress={() => this.setState({ modal: false })}
                        >
                            <Text style={styles.modalBtnText}>
                                Ok
                    </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
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
        // borderWidth:1,
    },
    inputsView: {
        borderBottomWidth: 1,
        borderColor: 'white',
        width: '80%',
        padding: 10,
        margin: 10,
        flexDirection:'row'
    },
    inputs: {
        color: 'white',
        width:'90%'
    },
    btnView: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        // borderWidth:1,
    },
    btnText: {
        fontSize: 25,
        color: 'white',
        flex: 0.8,
        marginLeft:'9%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    unhide: {
        display: 'flex',
        color: '#d66278',
        fontSize: 12
    },
    hide: {
        display: 'none',
    },
    signinLinkView: {
        width: '100%',
        paddingVertical: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
        // borderWidth:1,
    },
    signinLink: {
        marginLeft:'9%',
        fontSize: 20,
        color: 'white',
    },
    modalMainView:{
     flex:1,
     borderWidth:1,
     opacity:0.7,
     backgroundColor:'black'
    },
    modalView:{
      position:'absolute',
      backgroundColor:'white',
      alignSelf:'center',
      top:'30%',
      bottom:'30%',
      width:'80%',
      height:'30%',
      justifyContent:'center',
      alignItems:'center'
    },
    modalText:{
      fontSize:20,
      padding:20,
      textAlign:'center'
    },
    modalBtn:{
      backgroundColor:'#2B7C87',
      paddingHorizontal:30,
      paddingVertical:10
    },
    modalBtnText:{
      color:'white',
      fontSize:17
    }








})