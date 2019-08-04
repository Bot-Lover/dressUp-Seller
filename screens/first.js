import React from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import Input from '../components/input';
import Button from '../components/button';

export default class First extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: '', phone: '', password: '', confirm: '' };
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
        this.props.next(this.state.email, this.state.phone, this.state.password, this.state.confirm);
      }
    });
  }
  render() {
    return (
      <KeyboardAvoidingView style={{flex:1}} enabled behavior="padding">
        <ScrollView style={{flex:1, backgroundColor:'#008b8b', justifyContent:'center', paddingHorizontal:10}}>
          <Input placeholder="Enter your email address" onInput={email=>this.setState({email})} warning="Email is required" ready={email => email.length>0} caption="Email:" other={{keyboardType:'email-address'}} />
          <Input placeholder="Enter your phone number" onInput={phone=>this.setState({phone})} warning="Phone number is required" ready={phone => phone.length>0} caption="Phone:" other={{keyboardType:'phone-pad'}} />
          <Input placeholder="Enter a password" onInput={password=>this.setState({password})} warning="Atleast 6 characters are required" ready={password => password.length>5} caption="Password:" other={{keyboardType:'visible-password',secureTextEntry:true}} password />
          <Input placeholder="Confirm password" onInput={confirm=>this.setState({confirm})} warning="The passwords are different" ready={confirm => confirm===this.state.password} caption="Confirm Password:" other={{keyboardType:'visible-password',secureTextEntry:true}} />
          <Button onPress={this.checkShop} enabled={this.state.email.length>0&&this.state.phone.length>0&&this.state.password.length>5&&this.state.password===this.state.confirm} title="Next." />
          <TouchableOpacity style={{}} onPress={this.props.cancel}>
            <Text style={{textAlign:'center', color:'#fff'}}>Cancel</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
