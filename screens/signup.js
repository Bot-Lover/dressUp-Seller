import React from 'react';

import First from './first';
import Second from './second';
import Third from './third';
import SelLoc from './selLoc';

export default class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state = {current:1, email:'', phone:'', password:'', name:'', about:''}
  }
  signup = (coordinate, address) => {
    fetch('https://dressup-854e9.firebaseapp.com/createShop', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...this.state, ...coordinate, address}),
    }).then(reply => reply.json()).then(reply => {
      console.log(JSON.stringify(reply));
      if (reply.error) {
        alert("Couldn't create Account");
      } else if(reply.sid) {
        console.log("Created account.");
        this.props.login({email:this.state.email, phone:this.state.phone, address:this.state.address, about:this.state.about, name:this.state.name, latitude:this.state.coordinate.latitude, longitude:this.state.coordinate.longitude, sid:this.state.sid});
      }
    });
  }
  render() {
    switch(this.state.current) {
      case 1:
      console.log("khxshgb")
        return <First cancel={this.props.cancel} next={(email, phone, password) => this.setState({email, phone, password, current:2})} />;
      case 2:
        return <Second cancel={this.props.cancel} next={(name, about) => this.setState({name, about, current:3})} />;
      case 3:
        return <Third screenProps={{cancel:this.props.cancel, signup:this.signup}} />;

    }
  }
}