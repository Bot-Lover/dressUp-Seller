import React from 'react';
import {View, Text, TextInput} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Input extends React.Component{
  constructor(props){
    super(props);
    this.state = {text:'', edit:false};
  }
  render(){
    var {placeholder, onInput, warning, ready, caption, other, password, textStyle} = this.props;
    return (
      <View style={{marginBottom:15}}>
        <Text style={{color:'#fff', fontWeight:'bold'}}>{caption}</Text>
        <View style={{backgroundColor:'#fff', paddingHorizontal:2, marginTop:5, marginBottom:5}}>
          <TextInput secureTextEntry={password} {...other} placeholder={this.props.placeholder} onChangeText={text => {this.setState({text, edit:true});onInput(text);}} style={{textAlignVertical:'top', ...textStyle}} />
        </View>
        {this.state.edit?(ready(this.state.text)?null:<View style={{flexDirection: 'row', alignItems:'center', justifyContent:'center'}}><Ionicons name='ios-warning' size={24} color='#d00' /><Text style={{color:'#fff'}}>  {warning}</Text></View>):null}
      </View>
    );
  }
}