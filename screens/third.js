
import React from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import Input from '../components/input';
import Button from '../components/button';
import MapView from 'react-native-maps';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Constants from 'expo-constants';

class Maps extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {pressed:false, coordinate:props.navigation.getParam('coordinate', {latitude:11.054456,longitude:75.858357})}
  }
  render() {
    return (
      <View style={{flex:1}}>
        <View style={{backgroundColor:'#008b8b',paddingTop:Constants.statusBarHeight, height:50+Constants.statusBarHeight, flexDirection:'row', alignItems:'center'}}>
          <TouchableOpacity style={{marginLeft:10}} onPress={this.props.navigation.goBack}>
            <Ionicons name="md-arrow-back" size={25} color='#fff' />
          </TouchableOpacity>
          <Text style={{color:'#fff', fontWeight:'bold', flex:1, marginLeft:20, fontSize:20}}>Your Shop's Location</Text>
          {this.state.pressed?<TouchableOpacity style={{marginRight:10}} onPress={() => this.props.navigation.navigate("Third", {coordinate:this.state.coordinate, set:true})}>
            <Ionicons name="md-checkmark" size={25} color='#fff' />
          </TouchableOpacity>:null}
        </View>
        <MapView
          style={{flex:1}}
          initialRegion={{
            latitude: 11.054456,
            longitude: 75.858357,
            latitudeDelta: 0.04,
            longitudeDelta: 0.03,
          }}
          onPress={(x) => this.setState({pressed:true, coordinate:x.nativeEvent.coordinate})}
          onPoiClick={x => this.setState({pressed:true, coordinate:x.nativeEvent.coordinate})}>
            <MapView.Marker
            coordinate={this.state.coordinate}
            title={""}
            description={""}
          />
        </MapView>
      </View>
    );
  }
}

class Third extends React.Component {
  constructor(props) {
    super(props);
    this.state = {coordinate:null,address:'',configured:false};
  }
  componentWillUpdate() {
    setTimeout(() =>{
      if(this.props.navigation.getParam('set', null)) this.setState({coordinate:this.props.navigation.getParam('coordinate', null), configured:true});
      this.props.navigation.setParams({set: null})
    },10)
  }
  render() {
    return (
      <KeyboardAvoidingView style={{flex:1}} enabled behavior="padding">
        <ScrollView style={{flex:1, backgroundColor:'#008b8b', justifyContent:'center', paddingHorizontal:10}}>
          <Input placeholder="Enter your shop's address" onInput={address=>this.setState({address})} warning="Address is required" ready={address => address.length>0} caption="Address:" other={{multiline:true, numberOfLines:4}} />
          <Button title="Select Your Shop's Location" enabled={true} onPress={() => this.props.navigation.navigate("Maps", {coordinate:this.state.configured?this.state.coordinate:{latitude:11.054456,longitude:75.858357}})} />
          <Button onPress={() => this.props.screenProps.signup(this.state.coordinate, this.state.address)} enabled={this.state.address.length>0&&this.state.coordinate} title="Next" />
          <TouchableOpacity style={{}} onPress={this.props.screenProps.cancel}>
            <Text style={{textAlign:'center', color:'#fff'}}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default createAppContainer(createStackNavigator({
  Third, Maps, 
},{
  defaultNavigationOptions:{
    header:null
  }
}))