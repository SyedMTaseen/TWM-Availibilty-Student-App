import React, { Component } from 'react';
import { StatusBar, View, Text, StyleSheet, ImageBackground, TextInput,Dimensions, TouchableOpacity, Modal, Platform,Keyboard,KeyboardAvoidingView, KeyboardAvoidingViewBase ,AsyncStorage} from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const background = require('../../assets/LoginBackground.png')
const fieldErr = `Some Fields are Empty \n Please fill them first`;
const screenHeight = Math.round(Dimensions.get('window').height);
import axios from 'axios';
const os = Platform.OS === 'android';
export default class Login extends Component {
  state = {
    email: '',
    password: '',
    emailVal: false,
    passwordVal: false,
    modal: false,
    errText: '',
    scroll: false,
    keyboard:false,
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
  signIn() {
    const { email, password } = this.state;
    if ((email === ' ' || email === '') || (password === '' || password === ' ')) {
      this.setState({ errText: "Some Fields are Empty \n Please fill them first", modal: true });
    }
    else {
      //login function code here
      link = "http://smustufaqadri.flavorsomemeals.com/UstadNow/fetchTeacherId.php?name="+email+"&password="+password
      console.log(link)
      axios.get(link).then((result) => {
        console.log(result.data)
        if(result.data.server_response=="")
        {
          this.setState({ errText: "Wrong email or password\n Please try again", modal: true });
        }else{
               var TeacherID=result.data.server_response[0].teacher_detail.teacher_id
               console.log(TeacherID)
               this._storeData(TeacherID)

   
        }



      })
    }
  }
  _storeData = async (id) => {

   
    try {

      await AsyncStorage.setItem('AVATeacherID', id);

      this.setState({ loading: false })
      this.props.navigation.navigate('Main')
     
    } catch (error) {
     
    }

  }
  forgetPassword() {
    //forget password code here
  }
  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        ()=>{
            this.setState({keyboard:true})
    }
      );
      this.keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        ()=>{
            this.setState({keyboard:false})
    }       
      );
    }
  
    componentWillUnmount() {
      this.keyboardDidShowListener.remove();
      this.keyboardDidHideListener.remove();
    }
  layout() {
    return (
      <ImageBackground
        style={styles.imgView}
        source={background}
        resizeMode='stretch'
        imageStyle={ os ? (this.state.keyboard) ? styles.keyImgStyleView : styles.ImageStyleView : 'none' }
     >
        <View style={(this.state.keyboard && os) ? styles.keyHeadView :styles.headView }>
          <Text style={styles.headText}>Welcome{'\n'}Back</Text>
        </View>
        <View style={(this.state.keyboard && os ) ? styles.keyFormView : styles.formView}>
          <View style={styles.inputsView}>
            <TextInput
              onBlur={(e) => this.showErr('emailVal', this.state.email)}
              onChangeText={(e) => this.getVariable(e, 'email')}
              style={styles.inputs}
              autoCapitalize="none"
              placeholderTextColor="#777777"
              placeholder='NU Email' />
            <MaterialIcons name='email' size={25} color='#2B7C87' />
          </View>
          <Text style={this.state.emailVal ? styles.unhide : styles.hide}>Email cannot be left empty</Text>
          <View style={styles.inputsView}>
            <TextInput
              onBlur={(e) => this.showErr('passwordVal', this.state.password)}
              onChangeText={(e) => this.getVariable(e, 'password')}
              style={styles.inputs}
              autoCapitalize="none"
              secureTextEntry={true}
              placeholderTextColor="#777777"
              placeholder='Password' />
            <Ionicons name='ios-lock' size={25} color='#2B7C87' />
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
        {/* <View style={(this.state.keyboard && os )? styles.keySignupLinkView :styles.signupLinkView}>
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
        </View> */}
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
  render() {
    if (Platform.OS === 'ios') {
      return <KeyboardAwareScrollView
          enableOnAndroid={true}
          onKeyboardWillShow={() => {
            this.setState({ scroll: true })
          }}
          onKeyboardWillHide={() => this.setState({ scroll: false })}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          scrollEnabled={this.state.scroll}
          enableAutomaticScroll={(Platform.OS === 'ios')}
        >
          {this.layout()}
        </KeyboardAwareScrollView>
    }
    else{
      return <KeyboardAvoidingView style={styles.container} behavior='padding'>
          {this.layout()}
        </KeyboardAvoidingView> 
  }
      
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    // marginTop: '5%'
  },
  imageStyleView:{
    height:screenHeight,
  },
  keyImgStyleView:{
    height:'100%',
  },
  imgView: {
    flex: 1,
  },
  headView: {
    flex: 0.4,
    justifyContent: 'center',
  },
  keyHeadView:{
    flex:0.4,
    justifyContent:'center',
  },
  headText: {
    fontSize: 30,
    color: 'white',
    marginLeft: '12%',
    fontWeight: 'bold',
  },
  formView: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyFormView:{
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputsView: {
    borderBottomWidth: 1,
    borderColor: '#d8d8d8',
    width: '80%',
    padding: 10,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputs: {
    width: '90%'
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
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    flex: 0.8,
    marginLeft: '10%'
  },
  unhide: {
    display: 'flex',
    color: '#d66278',
    fontSize: 12
  },
  hide: {
    display: 'none',
  },
  signupLinkView: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  keySignupLinkView:{
    display:"none",
  },
  signinLink: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
    marginLeft: '13%',
    paddingLeft: '13%',
    textDecorationLine: 'underline'
  },
  modalMainView: {
    flex: 1,
    borderWidth: 1,
    opacity: 0.7,
    backgroundColor: 'black'
  },
  modalView: {
    position: 'absolute',
    backgroundColor: 'white',
    alignSelf: 'center',
    top: '30%',
    bottom: '30%',
    width: '80%',
    height: '35%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    padding: 20,
    textAlign: 'center'
  },
  modalBtn: {
    backgroundColor: '#2B7C87',
    paddingHorizontal: 30,
    paddingVertical: 10
  },
  modalBtnText: {
    color: 'white',
    fontSize: 17
  }





})