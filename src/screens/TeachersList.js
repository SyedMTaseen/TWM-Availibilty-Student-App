

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
class TeachersList extends Component {


  constructor(props) {
    super(props);
    this.state = ({
      DATA: [
        { id: 1, name: 'Sir Taseen', subject: 'Mobile Dev' },
        { id: 2, name: 'Sir Syed Muhammad Maaz', subject: 'Anime' },
      ],
      FullData: []
    })
  }
  // contains = ({ teacher_name, department }, query) => {

  //   if (teacher_name.toLowerCase().includes(query.toLowerCase()) || department.includes(query)) {
  //     return true;
  //   }
  //   return false;
  // }


  // searchData = text => {
  //   const data = _.filter(this.state.fulldata, DATA => { return this.contains(DATA, text); })
  //   this.setState({ query: text, DATA: data,  });

  // }

  render() {
    return (
      <View style={{ flex: 1, marginTop: '4%' }}>

        <View style={{ flex: 1, }}>
          <View style={{ justifyContent: 'center', marginTop: '7%', paddingHorizontal: '7%' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#777777' }}>
              Find Teachers'
                        </Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
              Availability
                        </Text>
          </View>
          <View style={{ height: "20%" }}></View>
          <View style={{ marginHorizontal: '7%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F0F0F0', borderRadius: 20, paddingHorizontal: '4%', height: "20%" }}>
            <TextInput style={{ height: '100%', width: '70%', fontSize: 16, fontWeight: 'bold', color: '#777777', }}
              //  onChangeText={this.searchData}
              placeholder='Search' >

            </TextInput>
            <Ionicons color='#777777' name='ios-search' size={20} />

          </View>

        </View>
        <View style={{ flex: 2.5, backgroundColor: '#F0F0F0', paddingTop: '8%', paddingHorizontal: '7%' }}>
          <FlatList showsVerticalScrollIndicator={false}
            data={this.state.DATA}
            renderItem={({ item }) =>
              <View style={{ marginBottom: '7%' }}>
                <TouchableOpacity style={{ height: 55, width: '100%', backgroundColor: 'white', borderRadius: 20, justifyContent: "center" }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold', paddingHorizontal: '7%' }}>
                    {item.name}
                  </Text>
                  <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#2B7C87', paddingHorizontal: '7%' }}>
                    {item.subject}
                  </Text>
                </TouchableOpacity>
              </View>
            } />
        </View>
      </View>
    );
  }
}

export default TeachersList


