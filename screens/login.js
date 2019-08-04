import React from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import Input from '../components/input';
import Button from '../components/button';

export default class Second extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', pass: '' };
  }
  checkShop = () => {
    fetch('https://dressup-854e9.firebaseapp.com/getShop', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email.replace('.', '%2E')
      }),
    }).then(response => response.text()).then(responseText => {
      console.log(responseText);
      if (responseText==='yes') {
        alert('Account already exists');
      } else if(responseText==='no') {
        console.log("First Form Completed.")
        this.props.next(this.state.email, this.state.phone, this.state.password, this.state.confirm);
      }
    });
  }
  render() {
    return (
      <KeyboardAvoidingView style={{flex:1}} enabled behavior="padding">
        <ScrollView style={{flex:1, backgroundColor:'#008b8b', justifyContent:'center', paddingHorizontal:10}}>
          <Input placeholder="Enter your email" onInput={email=>this.setState({email})} warning="Email is required" ready={email => email.length>0} caption="Email:" />
          <Input placeholder="Your password" onInput={pass=>this.setState({pass})} warning="A Password with atleast 6 characters is required" ready={pass => pass.length>5} caption="Password:" password other={{keyboardType:'visible-password'}} />
          <Button onPress={() => this.props.login(this.state.email, this.state.pass)} enabled={this.state.email.length>0&&this.state.pass.length>5} title="Login" />
          <Text style={{textAlign:'center',color:'#fff', marginBottom:15}}>OR</Text>
          <Button onPress={this.props.signup} enabled title="Sign Up" />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
