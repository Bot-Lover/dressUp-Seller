import React from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import Input from '../components/input';
import Button from '../components/button';

export default class Second extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', about: '' };
  }
  render() {
    return (
      <KeyboardAvoidingView style={{flex:1}} enabled behavior="padding">
        <ScrollView style={{flex:1, backgroundColor:'#008b8b', justifyContent:'center', paddingHorizontal:10}}>
          <Input placeholder="Enter the name of your shop" onInput={name=>this.setState({name})} warning="Name is required" ready={name => name.length>0} caption="Name:" />
          <Input placeholder="Enter Something about your shop. (Not Required)" onInput={about=>this.setState({about})} warning="About is not required" ready={about => true} caption="About:" other={{multiline:true}} textStyle={{height:150}} />
          <Button onPress={() => this.props.next(this.state.name, this.state.about)} enabled={this.state.name.length>0} title="Next" />
          <TouchableOpacity style={{}} onPress={this.props.cancel}>
            <Text style={{textAlign:'center', color:'#fff'}}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
