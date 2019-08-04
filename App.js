import React from 'react';

import Signup from './screens/signup';
import Login from './screens/login';
import Main from './screens/main';
// import {AsyncStorage} from 'react-native';

class Signer extends React.Component {
  constructor(props){
    super(props);
    this.state = {create:true};
  }
  render() {
    return this.state.create ? <Signup cancel={() => this.setState({create:false})} login={this.props.login} /> : <Login login={this.props.login} signup={() => this.setState({create:true})} /> ;
  }
}

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {logged:false, user:{}}
  }
  render() {
    return this.state.logged?<Main screenProps={{}} />:<Signer login={user => this.setState({user, logged:true})} />;
  }
}
