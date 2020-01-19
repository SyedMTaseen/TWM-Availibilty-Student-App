import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import Day from '../screens/Day'
import React from 'react'


const TabNavigation = createMaterialTopTabNavigator({
    Mon: { screen: () => { return <Day name='Monday' /> }, },
    Tues: { screen: () => { return <Day name='Tuesday' /> }, },
    Wed: { screen: () => { return <Day name='wednesday' /> }, },
    Thur: { screen: () => { return <Day name='thursday' /> }, },
    Fri: { screen: () => { return <Day name='friday' /> }, },
}, {
    tabBarOptions: {
        activeBackgroundColor: 'white',
        activeTintColor: 'black',
        inactiveTintColor: 'black',
        inactiveBackgroundColor: 'black',
        style: {
            backgroundColor: 'white',
            color: 'black',
        },
        indicatorStyle: {
            backgroundColor: 'black',
            color: 'black'
        },
        allowFontScaling: true,
        labelStyle: {
            fontSize: 20,

        }

    }
});

const tabNavig = createAppContainer(TabNavigation);
export default tabNavig