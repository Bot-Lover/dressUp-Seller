import React from 'react';
import {createAppContainer, createMaterialTopTabNavigator} from 'react-navigation';
import {View, Text} from 'react-native';

class Tab1 extends React.Component {
  render() {
    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Text style={{fontSize:16}}>Welcome to the first tab</Text>
      </View>
    );
  }
}

class Tab2 extends React.Component {
  render() {
    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Text style={{fontSize:16}}>Welcome to the second tab</Text>
      </View>
    );
  }
}

export default createAppContainer(createMaterialTopTabNavigator({
  Tab1, Tab2
}));
