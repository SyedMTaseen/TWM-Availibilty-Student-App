import React, { Component } from 'react';
import { StatusBar, View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView, Keyboard } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
const background = require('../../assets/LoginBackground.png')
export default class Login extends Component {
  state = {
    email: '',
    password: '',
    emailVal: false,
    passwordVal: false,
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
  render() {
    return (
      <ImageBackground
        style={styles.container}
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
          </View>
          <Text style={this.state.emailVal ? styles.unhide : styles.hide}>This Field cannot be left empty</Text>
          <View style={styles.inputsView}>
            <TextInput
              onBlur={(e) => this.showErr('passwordVal', this.state.password)}
              onChangeText={(e) => this.getVariable(e, 'password')}
              style={styles.inputs}
              secureTextEntry={true}
              placeholderTextColor="#777777"
              placeholder='Password' />
          </View>
          <Text style={this.state.passwordVal ? styles.unhide : styles.hide}>This Field cannot be left empty</Text>


          <View style={styles.btnView}>
            <Text style={styles.btnText}>Sign In</Text>
            <TouchableOpacity style={styles.btn}>
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

          <TouchableOpacity>
            <Text style={styles.signinLink}>
              Forget Password
                            </Text>
          </TouchableOpacity>
        </View>


      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  btnView: {
    flex: 0.5,
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  btnText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unhide: {
    display: 'flex',
    color: 'red'
  },
  hide: {
    display: 'none',
  },
  signupLinkView: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  signinLink: {
    fontSize: 17,
    color: 'black',
    fontWeight: '500',
    padding: '10%'
  }





})