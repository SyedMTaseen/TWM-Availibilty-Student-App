import { createSwitchNavigator, createAppContainer, } from 'react-navigation';
;

import AuthLogin from "../auth/auth"
import Login from "../screens/Login"
import SignUp from "../screens/SignUp"
import { TeacherAvailibilityContainer } from "./TeacherStackNavigator"

const SwithStartNavigator = createSwitchNavigator({

    // Auth: AuthLogin,

    // SignInScreen: Login,
    // SignUpScreen: SignUp,
    Main: TeacherAvailibilityContainer


})
export const AppContainer = createAppContainer(SwithStartNavigator);