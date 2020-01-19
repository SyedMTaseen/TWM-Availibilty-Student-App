import { createMaterialTopTabNavigator,createAppContainer } from 'react-navigation';
import { View, Text,FlatList,TouchableOpacity } from 'react-native'
import React,{Component} from 'react'

class Day extends Component{
    state={
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
    }
render(){
    return <View style={{flex:1,}}>
        <View style={{flex:0.1,justifyContent:'center',alignItems:'center'}}>
        <Text style={{color:'black',fontSize:20}}>{this.props.name}</Text>
        </View>
        <View style={{ flex:1, backgroundColor: '#F0F0F0', }}>
                    <FlatList showsVerticalScrollIndicator={false}
                        data={this.state.DATA}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item }) =>
                            <View style={{ marginTop: '8%' }}>
                                <TouchableOpacity style={{ width: '90%', height: 90, backgroundColor: 'white', borderRadius: 20, alignItems: 'center', justifyContent: "center", elevation: 5, alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                                        {item.time}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        } />
                </View>
    </View>
}


}
export default Day;