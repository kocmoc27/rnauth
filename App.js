import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import LoginForm from './src/LoginForm';
import { Header, Button , Card, CardSection, Spinner} from './src/components';

export default class App extends Component {
  state = {loggedIn: null };

  componentWillMount(){
    firebase.initializeApp({
        apiKey: "AIzaSyBb9ljWdJ67HEp9aK2eFPQ1QqcUA7FpO9E",
        authDomain: "globus-79e07.firebaseapp.com",
        databaseURL: "https://globus-79e07.firebaseio.com",
        projectId: "globus-79e07",
        storageBucket: "globus-79e07.appspot.com",
        messagingSenderId: "176566152483"
    });

    firebase.auth().onAuthStateChanged((user) => {
       if(user) {
         this.setState({loggedIn: true})
       } else {
         this.setState({loggedIn: false})
       }    
    });
  }

  renderContent(){
    switch(this.state.loggedIn){
      case false: return <LoginForm/>; 
      case true: return (
        <Card><CardSection>
         <Button onPress={() => firebase.auth().signOut()}> 
            Выход 
          </Button>
        </CardSection></Card>  
      );
      default: <Spinner size="large"/>;
    }  
  }

  render() {
    return (
      <View>
        <Header headerText="Авторизация"/>
        {this.renderContent()}
      </View>
    );
  }
}