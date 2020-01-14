import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
       <Text>Login</Text>
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