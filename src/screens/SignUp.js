import React, { Component, useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, Modal, Keyboard, Platform,AsyncStorage,ActivityIndicator } from 'react-native'
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const fieldErr = `Some Fields are Empty \n Please fill them first`;
const background = require('../../assets/SignupBackground.png')
const os = Platform.OS === 'android';
const screenHeight = Math.round(Dimensions.get('window').height);
import axios from 'axios';
export default class Signup extends Component {


    state = {
        name: '',
        email: '',
        password: '',
        faculty: '',
        nameVal: false,
        emailVal: false,
        passwordVal: false,
        facultyVal: false,
        modal: false,
        errText: '',
        scroll: true,
        keyboard: false,
        showPassword: true,
        loading:false,
    }
    toggleSwitch = () => {
        this.setState({ showPassword: !this.state.showPassword });
    }
    Layout() {
        return (
            <ImageBackground
                style={this.state.keyboard && os ? styles.keyImgView : styles.imgView}
                source={background}
                // imageStyle={this.state.keyboard && {marginTop:-90}}
                resizeMode='stretch'
            >
                <View style={this.state.keyboard && os ? styles.keyHeadView : styles.headView}>
                    <Text style={styles.headText}>Create{'\n'}Account</Text>
                </View>
                <View style={this.state.keyboard && os ? styles.keyFormView : styles.formView}>
                    <View style={this.state.keyboard && os ? styles.keyInputsView : styles.inputsView}>
                        <TextInput
                            onBlur={() => this.showErr('nameVal', this.state.name)}
                            onChangeText={(e) => this.getVariable(e, 'name')}
                            style={styles.inputs}
                            autoCapitalize="none"
                            placeholderTextColor="white"
                            placeholder='Full Name' />
                        <FontAwesome name='user' color='white' size={25} />
                    </View>
                    <Text style={this.state.nameVal ? styles.unhide : styles.hide}>Name cannot be left empty</Text>
                    <View style={this.state.keyboard && os ? styles.keyInputsView : styles.inputsView}>
                        <TextInput
                            onBlur={() => this.showErr('emailVal', this.state.email)}
                            onChangeText={(e) => this.getVariable(e, 'email')}
                            style={styles.inputs}
                            placeholderTextColor="white"
                            autoCapitalize="none"
                            placeholder='NU Email' />
                        <MaterialIcons name='email' size={25} color='white' />
                    </View>
                    <Text style={this.state.emailVal ? styles.unhide : styles.hide}>Email cannot be left empty</Text>

                    <View style={this.state.keyboard && os ? styles.keyInputsView : styles.inputsView}>
                        <TextInput
                            onBlur={() => this.showErr('passwordVal', this.state.password)}
                            onChangeText={(e) => this.getVariable(e, 'password')}
                            style={styles.inputs}
                            secureTextEntry={this.state.showPassword}
                            placeholderTextColor="white"
                            autoCapitalize="none"
                            placeholder='Password' />
                           {this.state.showPassword ?
                        <Ionicons onPress={this.toggleSwitch} name="md-eye-off" size={25} color="white" /> : <Ionicons onPress={this.toggleSwitch} name="md-eye" size={25} color="#fff" />}
   
                    </View>
                    <Text style={this.state.passwordVal ? styles.unhide : styles.hide}>Password cannot be left empty</Text>

                    <View style={this.state.keyboard && os ? styles.keyInputsView : styles.inputsView}>
                        <TextInput
                            onBlur={() => this.showErr('facultyVal', this.state.faculty)}
                            onChangeText={(e) => this.getVariable(e, 'faculty')}
                            style={styles.inputs}
                            placeholderTextColor="white"
                            autoCapitalize="none"
                            placeholder='Faculty' />
                        <MaterialIcons name='face' color='white' size={25} />
                    </View>
                    <Text style={this.state.facultyVal ? styles.unhide : styles.hide}>Faculty cannot be left empty</Text>

                    <View style={this.state.keyboard && os ? styles.keyBtnView : styles.btnView}>
                        <Text style={styles.btnText}>Sign Up</Text>
                        <TouchableOpacity
                            onPress={this.signUp.bind(this)}
                            style={styles.btn}>
                                  {this.state.loading ? <ActivityIndicator size='large' color="#fff" /> :
                            <Ionicons color='white' name='ios-arrow-dropright-circle' size={60} />}
                        </TouchableOpacity>
                    </View>
                    <View style={this.state.keyboard && os ? styles.keySigninLinkView : styles.signinLinkView}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('SignInScreen')}>
                            <Text style={styles.signinLink}>
                                Sign In
                        </Text>
                        </TouchableOpacity>
                    </View>
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
    getVariable(text, variable) {
        this.setState({ [variable]: text });
    }
    showErr(variable, inputVal) {
        if (inputVal === '' || inputVal === ' ')
            this.setState({ [variable]: true });
        else
            this.setState({ [variable]: false });
    }
    signUp() {
        this.setState({loading:true})
        const { name, email, password, faculty } = this.state;
        if (email === '' || email === ' ' || name === '' || name === ' ' || password === '' || password === ' ' || faculty === '' || faculty === ' ') {
            this.setState({ errText: fieldErr, modal: true })
            this.setState({loading:false})
        }
        else {
            //signUp code here
            link = "http://7hpowersolutions.com/UstadNow/insertTeacher.php?name="+name+"&password="+password+"&department="+faculty+"&email="+email
            console.log(link)
            axios.get(link).then((result) => {
                console.log(result.data)
                if (result.data.server_response == "Teacher registeration successfully!") {
                    alert("Registration successfully!")
                    link = "http://7hpowersolutions.com/UstadNow/fetchTeacherId.php?email=" + email + "&password=" + password
                    console.log(link)
                    axios.get(link).then((result) => {
                        console.log(result.data)
                        if (result.data.server_response == "") {
                            this.setState({loading:false})
                            // this.setState({ errText: "Wrong email or password\n Please try again", modal: true });
                        } else {
                            var TeacherID = result.data.server_response[0].teacher_detail.teacher_id
                            console.log(TeacherID)
                            this._storeData(TeacherID)
                            this.setState({loading:false})
                        }
                    })

                } else {
                    this.setState({ errText: "Registration failed \n Please try again", modal: true });
                    this.setState({loading:false})
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
    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                this.setState({ keyboard: true })
            }
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                this.setState({ keyboard: false })
            }
        );
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    render() {
        if (Platform.OS === 'ios') {
            return <KeyboardAwareScrollView
                onKeyboardWillShow={() => {
                    this.setState({ scroll: true })
                }}
                onKeyboardWillHide={() => this.setState({ scroll: false })}
                resetScrollToCoords={{ x: 0, y: 0 }}
                contentContainerStyle={styles.container}
                scrollEnabled={this.state.scroll}
                enableAutomaticScroll={true}
            >
                {this.Layout()}
            </KeyboardAwareScrollView>
        }
        else
            return <KeyboardAvoidingView behavior='padding' style={styles.container}>
                {this.Layout()}
            </KeyboardAvoidingView>
    }


}

const styles = StyleSheet.create({
    container: {
        top: '3%',
        flex: 1,
        justifyContent: 'flex-end'
    },
    imgView: {
        flex: 1,
        height: screenHeight

    },
    keyImgView: {
        height: '100%'
    },
    headView: {
        flex: 0.4,
        justifyContent: 'center',
    },
    keyHeadView: {
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
    },
    keyFormView: {
        flex: 0.9,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,

    },
    inputsView: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'white',
        width: '90%',
        padding: 5,
        margin: 5,
        flexDirection: 'row',

    },
    keyInputsView: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'white',
        width: '80%',
        padding: 0,
        margin: 0,
        flexDirection: 'row',

    },
    inputs: {
        color: 'white',
        width: '90%'
    },
    btnView: {
        flex: 0.3,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 10,
    },
    keyBtnView: {
        flex: 0.5,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 5,
    },
    btnText: {
        fontSize: 24,
        color: 'white',
        width: '73%',
        marginLeft: '7%',
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
        flex: 0.1,
        width: '100%',
        alignSelf: 'flex-end',
        marginTop: '15%',
        marginBottom: '-8%',
        fontWeight: 'bold',
    },
    keySigninLinkView: {
        display: "none",
    },
    signinLink: {
        marginLeft: '9%',
        fontSize: 16,
        color: 'white',
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
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
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