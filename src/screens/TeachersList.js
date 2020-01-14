

import React , { Component } from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    Button, 
    TouchableOpacity,
    ScrollView,
    FlatList,
    TextInput 
} 
from 'react-native';

class TeachersList extends Component{


    constructor(props){
        super(props);
        this.state = ({
            DATA: [
                {id: 1, name: 'Sir Taseen', subject: 'Mobile Dev'},
                {id: 2, name: 'Sir Syed Muhammad Maaz', subject: 'Anime'},
            ]
        })
    }


    render(){
        return(
            <View style = {{flex: 1}}>
               <View style = {{flex: 1, }}>
                    <View style = {{justifyContent: 'center',  marginTop: '7%', paddingHorizontal: '7%'}}>
                        <Text style = {{fontSize :20, fontWeight: 'bold', color: '#777777'}}>
                            Find Teachers'
                        </Text>
                        <Text style = {{fontSize :24, fontWeight: 'bold'}}>
                            Availability
                        </Text>
                    </View>
                    <View style = {{paddingHorizontal: '7%', paddingTop: '10%'}}>
                        <TextInput style = {{height: '40%', width: '100%', backgroundColor: '#F0F0F0', borderRadius: 20 , fontSize: 16 , fontWeight: 'bold', color: '#777777', paddingHorizontal: '5%'}} 
                        placeholder = 'Search' >
                    </TextInput>
                    </View>
               </View>
               <View style = {{flex: 2.8, backgroundColor: '#F0F0F0', paddingTop: '8%', paddingHorizontal: '7%'}}>
               <FlatList showsVerticalScrollIndicator = {false}
                     data={this.state.DATA}
                     renderItem={({ item }) =>
                        <View style = {{marginBottom: '7%'}}>
                            <TouchableOpacity style = {{height: 55, width: '100%', backgroundColor: 'white', borderRadius: 20, justifyContent: "center" }}>
                                <Text style = {{fontSize: 16, fontWeight: 'bold', paddingHorizontal: '7%'}}>
                                    {item.name}
                                </Text>
                                <Text style = {{fontSize: 12, fontWeight: 'bold', color: '#2B7C87', paddingHorizontal: '7%'}}>
                                    {item.subject}
                                </Text>
                            </TouchableOpacity>
                        </View>
                }/>
               </View>     
            </View>
        );
    }
}

export default TeachersList


