
import React , { Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    Button, 
    TouchableOpacity,
    ScrollView,
    FlatList 
} 
from 'react-native';



class TeachersAvailibility extends Component{

    constructor(props){
        super(props);
        this.state = ({
            DATA: [
                {id: '1', time: '08:00 AM - 09:00 AM'},
                {id: '2', time: '09:00 AM - 10:00 AM'},
                {id: '3', time: '10:00 AM - 11:00 AM'},
                {id: '4', time: '11:00 PM - 12:00 PM'},
                {id: '5', time: '12:00 PM - 01:00 PM'},
                {id: '6', time: '01:00 PM - 02:00 PM'},
                {id: '7', time: '02:00 PM - 03:00 PM'},
                {id: '8', time: '03:00 PM - 04:00 PM'},
            ],
            MondayActive: true,
            TuesdayActive: false,
            WednesdayActive: false,
            ThursdayActive: false,
            FridayActive: false,
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

        switch(day) {
 
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

    render(){
        return(
            <View style = {{flex:1,marginTop: '8%', backgroundColor: '#F0F0F0'}}>
                <View style = {{flex: 1 , backgroundColor: 'white'}}>
                <View style = {{justifyContent: 'center',  marginTop: '10%', paddingHorizontal: '10%'}}>
                        <Text style = {{fontSize: 20, fontWeight: 'bold', color: '#777777'}}>
                            Your
                        </Text>
                    </View>
                    <View style ={{paddingHorizontal: '13%',flexDirection: 'row', alignItems : 'center',justifyContent: 'space-between',  height: '30%', paddingHorizontal: '10%'}}>
                        <Text style = {{fontSize: 24, fontWeight: 'bold', fontFamily: 'Roboto'}}>
                            Availability
                        </Text>
                        <TouchableOpacity>
                            <View style = {{ height: '50%', backgroundColor: '#C4C4C4', borderRadius: 20, alignItems: 'center', justifyContent: 'center',}}>
                                <Text style = {{fontSize: 9, color: '#2B7C87',padding:6}}>
                                    Mark Whole Day Unavailable
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{height:"3%"}}></View>
                    <ScrollView contentContainerStyle = {{paddingLeft: '10%'}} horizontal = {true} showsHorizontalScrollIndicator = {false}>
                        <TouchableOpacity onPress = {()=> this.changecolor('Monday')} style = {{marginRight: 15}} >
                            <Text style = {{fontSize: 14, fontWeight: 'bold', color: this.state.MondayActive?'black':'#777777', paddingBottom:7}}>
                                Monday
                            </Text>
                            {
                                this.state.MondayActive?<View style = {{width: 7, height: 7, borderRadius: 30, backgroundColor: 'black', alignSelf: 'center'}}></View>:null
                            }        
                        </TouchableOpacity >
                        <TouchableOpacity onPress = {()=> this.changecolor('Tuesday')} style = {{marginRight: 15}} >
                            <Text style = {{fontSize: 14, fontWeight: 'bold', color: this.state.TuesdayActive?'black':'#777777', paddingBottom:7}}>
                                    Tuesday
                                </Text>
                                {
                                    this.state.TuesdayActive?<View style = {{width: 7, height: 7, borderRadius: 30, backgroundColor: 'black', alignSelf: 'center'}}></View>:null
                                }    
                            </TouchableOpacity>
                        <TouchableOpacity onPress = {()=> this.changecolor('Wednesday')} style = {{marginRight: 15}}>
                            <Text style = {{fontSize: 14, fontWeight: 'bold', color: this.state.WednesdayActive?'black':'#777777', paddingBottom:7}}>
                                    Wednesday
                                </Text>
                                {
                                    this.state.WednesdayActive?<View style = {{width: 7, height: 7, borderRadius: 30, backgroundColor: 'black', alignSelf: 'center'}}></View>:null
                                }    
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {()=> this.changecolor('Thursday')} style = {{marginRight: 15}}>
                            <Text style = {{fontSize: 14, fontWeight: 'bold', color: this.state.ThursdayActive?'black':'#777777', paddingBottom:7}}>
                                    Thursday
                                </Text>
                                {
                                    this.state.ThursdayActive?<View style = {{width: 7, height: 7, borderRadius: 30, backgroundColor: 'black', alignSelf: 'center'}}></View>:null
                                }  
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {()=> this.changecolor('Friday')} style = {{marginRight: 15}}>
                            <Text style = {{fontSize: 14, fontWeight: 'bold', color: this.state.FridayActive?'black':'#777777', paddingBottom:7}}>
                                    Friday
                                </Text>
                                {
                                    this.state.FridayActive?<View style = {{width: 7, height: 7, borderRadius: 30, backgroundColor: 'black', alignSelf: 'center'}}></View>:null
                                }    
                        </TouchableOpacity>
                        <Text>    </Text>
                    </ScrollView>
                </View>
                <View style = {{flex: 2.5 , backgroundColor: '#F0F0F0', }}>
                <FlatList showsVerticalScrollIndicator = {false}
                     data={this.state.DATA}
                     keyExtractor={(item, index) => item.id}
                     renderItem={({ item }) =>
                        <View style = {{marginTop: '8%'}}>
                            <TouchableOpacity style = {{width: '90%',height: 90, backgroundColor: 'white', borderRadius: 20, alignItems: 'center', justifyContent: "center", elevation: 5,alignSelf:'center' }}>
                                <Text style = {{fontSize: 24, fontWeight: 'bold'}}>
                                    {item.time}
                                </Text>
                            </TouchableOpacity>
                        </View>
                }/>
                </View>
            </View>
        );
    }
}

export default TeachersAvailibility

