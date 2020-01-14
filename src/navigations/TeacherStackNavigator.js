
import {  createStackNavigator, createAppContainer,  } from 'react-navigation';
import TeachersList from "../screens/TeachersList"
import TeachersAvailibility from "../screens/TeachersAvailibility"

/** Signup Screen */
const TeachersAvailibilityStackNavigator = createStackNavigator({
    TeacherList: {
      screen: TeachersList,
      navigationOptions: ({ navigation }) => ({
  
        headerTransparent: true,
  
      })
    },
    TeachersAvailibility: {
      screen: TeachersAvailibility,
      navigationOptions: ({ navigation }) => ({
     
        headerTransparent: true,
  
      })
    },
   
  
  
  
  }, {
    initialRouteName: 'TeacherList',
    //transitionConfig: () => fromTop(500),
  })
  export const TeacherAvailibilityContainer=createAppContainer(TeachersAvailibilityStackNavigator);
  