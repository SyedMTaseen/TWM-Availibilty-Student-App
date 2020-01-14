import React, { Component } from 'react';
import { StatusBar, View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity,Modal   } from 'react-native'
import { Ionicons,MaterialIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const background = require('../../assets/LoginBackground.png') 
const  fieldErr=`Some Fields are Empty \n Please fill them first`;
export default class Login extends Component {
  state = {
    email: '',
    password: '',
    emailVal: false,
    passwordVal: false,
    modal:false,
    errText:'',
    scroll:false
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
  signIn(){
    const {email,password} = this.state;
    if((email===' ' || email=== '') || (password === '' || password===' ')  ){
      this.setState({errText:fieldErr,modal:true});
    }
    else{
      //login function code here
    }
  }
  forgetPassword(){
      //forget password code here
  }

  render() {
    return (
      <KeyboardAwareScrollView
            onKeyboardWillShow={()=>{
                this.setState({scroll:true})
            }}
            onKeyboardWillHide={()=>this.setState({scroll:false})}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={this.state.scroll}
            enableAutomaticScroll={true}
            >
      <ImageBackground
        style={styles.imgView}
        source={background}
      >
       
          <View style={styles.headView}>
          <Text style={styles.headText}>Welcome{'\n'}Back</Text>
        </View>
        <View style={styles.formView}>
          <View style={styles.inputsView}>
            <TextInput
              onBlur={(e) => this.showErr('emailVal', this.state.email)}
              onChangeText={(e) => this.getVariable(e, 'email')}
              style={styles.inputs}
              placeholderTextColor="#777777"
              placeholder='NU Email' />
              <MaterialIcons name='email' size={25} color='#2B7C87'/>
          </View>
          <Text style={this.state.emailVal ? styles.unhide : styles.hide}>Email cannot be left empty</Text>
          <View style={styles.inputsView}>
            <TextInput
              onBlur={(e) => this.showErr('passwordVal', this.state.password)}
              onChangeText={(e) => this.getVariable(e, 'password')}
              style={styles.inputs}
              secureTextEntry={true}
              placeholderTextColor="#777777"
              placeholder='Password' />
              <Ionicons name='ios-lock' size={25} color='#2B7C87'/>
          </View>
          <Text style={this.state.passwordVal ? styles.unhide : styles.hide}>Password cannot be left empty</Text>


          <View style={styles.btnView}>
            <Text style={styles.btnText}>Sign In</Text>
            <TouchableOpacity 
            onPress={this.signIn.bind(this)}
            style={styles.btn}>
              <Ionicons color='#2B7C87' name='ios-arrow-dropright-circle' size={70} />
            </TouchableOpacity>
          </View>

        </View>
        <View style={styles.signupLinkView}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('SignUpScreen')}>
            <Text style={styles.signinLink}>
              Sign Up
                            </Text>
          </TouchableOpacity>

          <TouchableOpacity
          onPress={this.forgetPassword.bind(this)}
          >
            <Text style={styles.signinLink}>
              Forget Password
                            </Text>
          </TouchableOpacity>
        </View>
        
   
        
        <Modal
        animationType='fade'
        transparent={true}
        visible={this.state.modal}>
          <View style={styles.modalMainView}></View>
                <View style={styles.modalView}>
                  <MaterialIcons name='error' color='#2B7C87' size={50}/> 
                  <Text style={styles.modalText}>{this.state.errText}</Text>
                  <TouchableOpacity
                  style={styles.modalBtn}
                  onPress={()=>this.setState({modal:false})}
                  >
                    <Text style={styles.modalBtnText}>
                        Ok
                    </Text>
                  </TouchableOpacity>
                </View>
        </Modal>
      </ImageBackground>
           </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:'100%',
    marginTop:'5%'
  },
  imgView:{
    flex:1,
  },
  headView: {
    flex: 0.4,
    justifyContent: 'center',
  },
  headText: {
    fontSize: 30,
    color: 'white',
    marginLeft: '12%',
    fontWeight: 'bold'
  },
  formView: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputsView: {
    borderBottomWidth: 1,
    borderColor: '#d8d8d8',
    width: '80%',
    padding: 10,
    margin: 10,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  inputs:{
    width:'90%'
  },
  btnView: {
    flex: 0.5,
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    flex: 0.8,
    marginLeft:'10%'
  },
  unhide: {
    display: 'flex',
    color: '#d66278',
    fontSize:12
  },
  hide: {
    display: 'none',
  },
  signupLinkView: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // borderWidth:1,
  },
  signinLink: {
    fontSize: 17,
    color: 'black',
    fontWeight: '500',
    marginLeft:'13%',
    paddingLeft:'13%', 
    // borderWidth:1,
    textDecorationLine:'underline'
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