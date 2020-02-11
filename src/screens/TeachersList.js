

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
  TextInput
}
  from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash';
import axios from 'axios';
class TeachersList extends Component {


  constructor(props) {
    super(props);
    this.state = ({
      DATA: [
        { id: 1, name: 'Sir Taseen', subject: 'Mobile Dev' },
        { id: 2, name: 'Sir Syed Muhammad Maaz', subject: 'Anime' },
      ],
      FullData: [],
      DATAS:[]
    })
  }
  componentDidMount=()=>{
  
    link = "https://smustufaqadri.000webhostapp.com/Ustad%20Now/fetchTeachersList.php"
    console.log(link)
    axios.get(link).then((result) => {
      console.log(result.data)
      var listData=[]
       var len =result.data.server_response.length
       for(var i=0;i<len;i++){
        listData.push(result.data.server_response[i].teacher_detail)
       }
       console.log(listData)

      this.setState({DATAS:listData,FullData:listData})

      
    })
    // console.log(this.state.DATAS)
  }
  contains = ({ name }, query) => {

    if (name.toLowerCase().includes(query.toLowerCase()) ) {
      return true;
    }
    return false;
  }


  searchData = text => {
    const data = _.filter(this.state.FullData, DATAS => { return this.contains(DATAS, text); })
    this.setState({ query: text, DATAS: data,  });

  }

  

  PassTeacherItem = (item) => {
    this.props.navigation.navigate('TeachersAvailibility')
  }
  render() {
    return (
      <View style={{ flex: 1, marginTop: '4%' }}>

        <View style={{ flex: 1, }}>
          <View style={{ justifyContent: 'center', marginTop: '7%', paddingHorizontal: '7%' }}>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#777777' }}>
                Find Teachers'
                        </Text>
              {/* <TouchableOpacity>
                <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#d66278' }}>
                  Logout
                        </Text>
              </TouchableOpacity> */}
            </View>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
              Availability
                        </Text>
          </View>
          <View style={{ height: "20%" }}></View>
          <View style={{ marginHorizontal: '7%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F0F0F0', borderRadius: 20, paddingHorizontal: '4%', height: "20%" }}>
            <TextInput style={{ height: '100%', width: '70%', fontSize: 16, fontWeight: 'bold', color: '#777777', }}
               onChangeText={this.searchData}
              placeholder='Search' >

            </TextInput>
            <Ionicons color='#777777' name='ios-search' size={20} />

          </View>

        </View>
        <View style={{ flex: 2.5, backgroundColor: '#F0F0F0', paddingTop: '8%', paddingHorizontal: '7%' }}>
         
        {this.state.DATAS.length <= 0 ? <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{
                                  
                                    fontSize: 18.6,
                                    fontWeight: "800",
                                    fontStyle: "normal",
                                    color: "#444444",
                                    alignSelf: 'center'
                                }}>We couldn't find anything.</Text>
                            </View> :
          <FlatList showsVerticalScrollIndicator={false}
            data={this.state.DATAS}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) =>
              <View style={{ marginBottom: '7%' }}>
                <TouchableOpacity style={{ height: 55, width: '100%', backgroundColor: 'white', borderRadius: 20, justifyContent: "center" }} onPress={() => { this.PassTeacherItem(item) }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', paddingHorizontal: '7%' }}>
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#2B7C87', paddingHorizontal: '7%' }}>
                    {item.department}
                  </Text>
                </TouchableOpacity>
              </View>
            } />}
        </View>
      </View>
    );
  }
}

export default TeachersList


