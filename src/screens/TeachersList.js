import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default class TeachersList extends Component {
  render() {
    return (
      <View style={styles.container}>
       <Text>TeachersList</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})