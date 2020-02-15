
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableOpacity,
    ScrollView,
    FlatList,
    ActivityIndicator,
    AsyncStorage,
    Alert
}
    from 'react-native';

import axios from 'axios';

class TeachersAvailibility extends Component {

    constructor(props) {
        super(props);
        this.state = ({
            TeacherID: this.props.navigation.getParam('it', 'Something').teacher_id,
            TeacherName: this.props.navigation.getParam('it', 'Something').name,
            DefaultDATA: [
                { id: '1', time: '08:00 AM - 09:00 AM', active: false },
                { id: '2', time: '09:00 AM - 10:00 AM', active: false },
                { id: '3', time: '10:00 AM - 11:00 AM', active: false },
                { id: '4', time: '11:00 PM - 12:00 PM', active: false },
                { id: '5', time: '12:00 PM - 01:00 PM', active: false },
                { id: '6', time: '01:00 PM - 02:00 PM', active: false },
                { id: '7', time: '02:00 PM - 03:00 PM', active: false },
                { id: '8', time: '03:00 PM - 04:00 PM', active: false },
            ],
            DATA: [
                { id: '1', time: '08:00 AM - 09:00 AM', active: false },
                { id: '2', time: '09:00 AM - 10:00 AM', active: false },
                { id: '3', time: '10:00 AM - 11:00 AM', active: false },
                { id: '4', time: '11:00 PM - 12:00 PM', active: false },
                { id: '5', time: '12:00 PM - 01:00 PM', active: false },
                { id: '6', time: '01:00 PM - 02:00 PM', active: false },
                { id: '7', time: '02:00 PM - 03:00 PM', active: false },
                { id: '8', time: '03:00 PM - 04:00 PM', active: false },
            ],
            TotalData: [],
            MondayActive: true,
            TuesdayActive: false,
            WednesdayActive: false,
            ThursdayActive: false,
            FridayActive: false,
            activeDay: "",
            loading: false,
            DaysList: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            TeacherId: 1,
        })
    }
    componentDidMount = async () => {
        // const TeacherID = await AsyncStorage.getItem('AVATeacherID');
        // this.setState({ TeacherId: TeacherID }, () => {
        var d = new Date();
        var n = d.getDay();
        console.log(n)
        if (n > 5) {
            this.fetchdata("Monday")
        } else {
            console.log(this.state.DaysList[n - 1])
            this.fetchdata(this.state.DaysList[n - 1])
        }

        //     })



    }
    fetchdata = async (day) => {
        this.setState({ loading: true })
        link = "http://7hpowersolutions.com/UstadNow/fetchTeacherAvailibilityViaId.php?teacher_id=" + this.state.TeacherID
        console.log(link)
        axios.get(link).then((result) => {
            // console.log(result.data)
            var listData = []
            var len = result.data.server_response.length
            for (var i = 0; i < len; i++) {
                listData.push(result.data.server_response[i].teacher_availability)
            }
            console.log(listData)

            this.setState({ TotalData: listData })
            this.changecolor(day)

        })

    }
    CalculateListActive = (Day) => {
        var newData = []
        var len = this.state.TotalData.length
        var Update = false
        var lens = this.state.DefaultDATA.length
        for (var j = 0; j < lens; j++) {

            for (var i = 0; i < len; i++) {
                if (this.state.DefaultDATA[j].time == this.state.TotalData[i].slot && this.state.TotalData[i].day == Day) {
                    var itemData = { id: this.state.DefaultDATA[j].id, time: this.state.DefaultDATA[j].time, active: true }
                    newData.push(itemData)
                    Update = true
                }
            }
            if (!Update) {
                //  newData.push(this.state.DefaultDATA[j])

            }
            Update = false
        }

        //  console.log("hello")
        this.setState({ DATA: newData, loading: false })
        //  console.log(newData)
    }
    LogoutAskAlert = (props) => {
        Alert.alert(
            "Wait a second!",
            'Are you sure you want to log out?',
            [
                {
                    text: 'No',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Yes', onPress: () => this.logout(props) },
            ],
            { cancelable: false },
        );

    }
    logout = async () => {

        try {

            await AsyncStorage.setItem('AVATeacherID', "asd");

            setTimeout(() => {
                this.props.navigation.navigate("SignInScreen")
            }, 500);


        } catch (error) {
            // Error saving data
        }
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
        this.setState({ activeDay: day })
        this.CalculateListActive(day)
    }

    onPressCard = (item) => {
        var Day = this.state.activeDay
        var Slot = item.time

        if (item.active) {
            link = "http://7hpowersolutions.com/UstadNow/deleteAvailability.php?teacher_id=" + this.state.TeacherId + "&day=" + Day + "&slot=" + Slot
            console.log(link)
            axios.get(link).then((result) => {
                console.log(result.data)
                this.fetchdata(Day)
            })
            //  alert(Slot+" deleted "+Day)

        } else {
            link = "http://7hpowersolutions.com/UstadNow/insertAvailability.php?teacher_id=" + this.state.TeacherId + "&day=" + Day + "&slot=" + Slot
            console.log(link)
            axios.get(link).then((result) => {
                console.log(result.data)
                this.fetchdata(Day)
            })
            // alert(Slot+" Added "+Day)
        }


    }
    render() {
        return (
            <View style={{ flex: 1, marginTop: '8%', backgroundColor: '#F0F0F0' }}>
                <View style={{ flex: 1, backgroundColor: 'white' }}>
                    <View style={{ marginTop: '10%', paddingHorizontal: '10%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#777777' }}>
                            {this.state.TeacherName}
                        </Text>

                        {/* <TouchableOpacity onPress={this.LogoutAskAlert}>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#d66278', paddingRight: '3%' }}>
                                Logout
                        </Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={{ paddingHorizontal: '13%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: '30%', paddingHorizontal: '10%' }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', fontFamily: 'Roboto' }}>
                            Availability
                        </Text>
                        {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 20, height: 20, backgroundColor: "#2B7C87", borderRadius: 5 }}></View>
                            <Text style={{ fontSize: 12, color: '#2B7C87',fontWeight: 'bold', fontFamily: 'Roboto', paddingLeft: 6 }}>
                                 Busy Slots
                            </Text>
                        </View> */}
                        {/* <TouchableOpacity>
                            <View style={{ height: '50%', backgroundColor: '#C4C4C4', borderRadius: 20, alignItems: 'center', justifyContent: 'center', }}>
                                <Text style={{ fontSize: 9, color: '#2B7C87', padding: 6 }}>
                                    Mark Whole Day Unavailable
                                </Text>
                            </View>
                        </TouchableOpacity> */}
                    </View>
                    <View style={{ height: "3%" }}></View>
                    <ScrollView contentContainerStyle={{ paddingLeft: '10%' }} horizontal={true} showsHorizontalScrollIndicator={false}>
                        <TouchableOpacity onPress={() => this.changecolor('Monday')} style={{ marginRight: 15 }} >
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: this.state.MondayActive ? 'black' : '#777777', paddingBottom: 7 }}>
                                Monday
                            </Text>
                            {
                                this.state.MondayActive ? <View style={{ width: 7, height: 7, borderRadius: 30, backgroundColor: 'black', alignSelf: 'center' }}></View> : null
                            }
                        </TouchableOpacity >
                        <TouchableOpacity onPress={() => this.changecolor('Tuesday')} style={{ marginRight: 15 }} >
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: this.state.TuesdayActive ? 'black' : '#777777', paddingBottom: 7 }}>
                                Tuesday
                                </Text>
                            {
                                this.state.TuesdayActive ? <View style={{ width: 7, height: 7, borderRadius: 30, backgroundColor: 'black', alignSelf: 'center' }}></View> : null
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.changecolor('Wednesday')} style={{ marginRight: 15 }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: this.state.WednesdayActive ? 'black' : '#777777', paddingBottom: 7 }}>
                                Wednesday
                                </Text>
                            {
                                this.state.WednesdayActive ? <View style={{ width: 7, height: 7, borderRadius: 30, backgroundColor: 'black', alignSelf: 'center' }}></View> : null
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.changecolor('Thursday')} style={{ marginRight: 15 }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: this.state.ThursdayActive ? 'black' : '#777777', paddingBottom: 7 }}>
                                Thursday
                                </Text>
                            {
                                this.state.ThursdayActive ? <View style={{ width: 7, height: 7, borderRadius: 30, backgroundColor: 'black', alignSelf: 'center' }}></View> : null
                            }
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.changecolor('Friday')} style={{ marginRight: 15 }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: this.state.FridayActive ? 'black' : '#777777', paddingBottom: 7 }}>
                                Friday
                                </Text>
                            {
                                this.state.FridayActive ? <View style={{ width: 7, height: 7, borderRadius: 30, backgroundColor: 'black', alignSelf: 'center' }}></View> : null
                            }
                        </TouchableOpacity>
                        <Text>    </Text>
                    </ScrollView>
                </View>
                <View style={{ flex: 2.5, backgroundColor: '#F0F0F0', }}>
                    {this.state.DATA.length <= 0 ? <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{

                            fontSize: 18.6,
                            fontWeight: "800",
                            fontStyle: "normal",
                            color: "#444444",
                            alignSelf: 'center'
                        }}>Not available this day.</Text>
                    </View> :
                        <View>
                            {this.state.loading ? <ActivityIndicator size='large' color="#2B7C87" /> :
                                <FlatList showsVerticalScrollIndicator={false}
                                    data={this.state.DATA}
                                    keyExtractor={(item, index) => item.id}
                                    renderItem={({ item }) =>
                                        <View style={{ marginTop: '6%', marginBottom: "2%" }}>
                                            <View
                                                //   onPress={() => { this.onPressCard(item) }}
                                                style={{ width: '90%', height: 90, backgroundColor: item.active ? 'white' : "#2B7C87", borderRadius: 20, alignItems: 'center', justifyContent: "center", alignSelf: 'center' }}>
                                                <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                                                    {item.time}
                                                </Text>

                                            </View>
                                        </View>
                                    } />}
                        </View>}
                </View>
            </View>
        );
    }
}

export default TeachersAvailibility

