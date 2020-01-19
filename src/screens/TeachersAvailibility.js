
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableOpacity,
    ScrollView,
    FlatList, Dimensions, Animated,
    Picker
}
    from 'react-native';
import { Entypo } from '@expo/vector-icons';
import TabNavg from '../navigations/TabView'

class TeachersAvailibility extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            DATA: [
                { id: '1', time: '08:00 AM - 09:00 AM' },
                { id: '2', time: '09:00 AM - 10:00 AM' },
                { id: '3', time: '10:00 AM - 11:00 AM' },
                { id: '4', time: '11:00 PM - 12:00 PM' },
                { id: '5', time: '12:00 PM - 01:00 PM' },
                { id: '6', time: '01:00 PM - 02:00 PM' },
                { id: '7', time: '02:00 PM - 03:00 PM' },
                { id: '8', time: '03:00 PM - 04:00 PM' },
            ],
            MondayActive: true,
            TuesdayActive: false,
            WednesdayActive: false,
            ThursdayActive: false,
            FridayActive: false,
            index: 0,
            active: 'MondayActive'
        })
    }


    changecolor = (day) => {

        this.setState({
            MondayActive: false,
            TuesdayActive: false,
            WednesdayActive: false,
            ThursdayActive: false,
            FridayActive: false

        })

        switch (day) {

            case 'Monday':
                this.setState({
                    MondayActive: true
                });
                break;

            case 'Tuesday':
                this.setState({
                    TuesdayActive: true
                });
                break;

            case 'Wednesday':
                this.setState({
                    WednesdayActive: true
                });
                break;

            case 'Thursday':
                this.setState({
                    ThursdayActive: true
                });
                break;

            case 'Friday':
                this.setState({
                    FridayActive: true
                });
                break;

            default:
                this.setState({
                    MondayActive: false,
                    TuesdayActive: false,
                    WednesdayActive: false,
                    ThursdayActive: false,
                    FridayActive: false

                })
        }
    }

    momentumEnd() {
        if (this.state.index < 5 && this.state.index >= 0) {
            var arr = ['MondayActive', 'TuesdayActive', 'WednesdayActive', 'ThursdayActive', 'FridayActive'];
            this.setState({
                MondayActive: false,
                TuesdayActive: false,
                WednesdayActive: false,
                ThursdayActive: false,
                FridayActive: false
            })
            this.setState({ [arr[this.state.index]]: true, active: arr[this.state.index] })
        }
    }

    momentBegin() {
        var interval = 140;
        var snapTo = (this.scrollingRight) ? Math.ceil(this.lastx / interval) :
            Math.floor(this.lastx / interval);
        var scrollTo = interval * snapTo;
        this.setState({ index: snapTo })
        if (snapTo <= 4 && snapTo > -2)
            this.snapScroll.scrollTo(0, scrollTo);
    }

    render() {
        return (
            <View style={{ flex: 1, marginTop: '8%', backgroundColor: '#F0F0F0' }}>
                <View style={{ flex: 0.2, backgroundColor: 'white' }}>
                    <View style={{ flex:0.5,justifyContent: 'center', marginTop: '10%', paddingHorizontal: '10%' }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#777777' }}>
                            Your
                        </Text>
                    </View>
                    <View style={{ flex:0.5,paddingHorizontal: '13%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: '30%', paddingHorizontal: '10%' }}>
                        <Text style={{ fontSize: 30, fontWeight: 'bold', }}>
                            Availability
                        </Text>
                        <TouchableOpacity>
                            <View style={{ height: '50%', backgroundColor: '#C4C4C4', borderRadius: 20, alignItems: 'center', justifyContent: 'center', }}>
                                <Text style={{ fontSize: 12, color: '#2B7C87', padding: 6 }}>
                                    Mark Whole Day Unavailable
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{ height: "3%", }}></View>


                </View>
                <View style={{flex:0.7,}}>
                <TabNavg style={{height:'70%'}}/>
                </View>
                
            </View>
        );
    }
}
export const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    dayView: {
        width: 140,
        // borderWidth: 1,
    }
});

export default TeachersAvailibility

