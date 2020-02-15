import React from 'react';

import { StyleSheet, Text, SafeAreaView, Dimensions, Image, TouchableOpacity, ImageBackground, View, AsyncStorage, Alert } from 'react-native';
import { createDrawerNavigator, StatusBar, DrawerItems, createSwitchNavigator, createStackNavigator, createAppContainer, createMaterialTopTabNavigator } from 'react-navigation';

import { SplashScreen, } from 'expo';
import { Asset } from 'expo-asset';
import {AppContainer} from "./src/navigations/MainSwitchNavigator"
const { width, height } = Dimensions.get('screen');
export default class App extends React.Component {
  state = { areResourcesReady: false };



  constructor(props) {
    super(props);
    SplashScreen.preventAutoHide(); // Instruct SplashScreen not to hide yet
    this.state = ({
      Notactive: true
    })

  }

  async componentDidMount() {

    this.cacheResourcesAsync() // ask for resources
      .then(() => this.setState({ areResourcesReady: true })) // mark resources as loaded
      .catch(error => console.error(`Unexpected error thrown when loading:
${error.stack}`));


  }

  render() {
    if (!this.state.areResourcesReady) {
      return null;
    }

    return (
      <View style={{ flex: 1,backgroundColor:"#D2D2D2" }}>
        {this.state.Notactive ? <Image
        resizeMode="contain"
          style={{ width: width, height: height, alignSelf: 'center', }}
          source={require('./assets/splash1.png')}
          onLoadEnd={() => {
            // wait for image's content to fully load [`Image#onLoadEnd`] (https://facebook.github.io/react-native/docs/image#onloadend)
            console.log('Image#onLoadEnd: hiding SplashScreen');
            SplashScreen.hide(); // Image is fully presented, instruct SplashScreen to hide
            setTimeout(() => {

              this.setState({ Notactive: false })

            }, 500);

          }}
          fadeDuration={1000} // we need to adjust Android devices (https://facebook.github.io/react-native/docs/image#fadeduration) fadeDuration prop to `0` as it's default value is `300`
        /> :
          <AppContainer></AppContainer>}
      </View>
    );
  }

  async cacheResourcesAsync() {
    const images = [
      require('./assets/splash2.png'),
      require('./assets/LoginBackground.png'),
      require('./assets/SignupBackground.png'),
    ];


    const cacheImages = images.map(image => Asset.fromModule(image).downloadAsync());
    return Promise.all(cacheImages);
  }
}
