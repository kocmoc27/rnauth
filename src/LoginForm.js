import React, {Component} from 'react';
import firebase from 'firebase';
import {AsyncStorage, Text, View, Image } from 'react-native';
import {Input, CardSection, Card, Button, Spinner} from './components';

class LoginForm extends Component{
    state = {email: '', password: '', error: '', loading: false}; 

    componentDidMount = () => {
        AsyncStorage.getItem('password')
        .then((value) => this.setState({ password: value }));
        AsyncStorage.getItem('email')
        .then((value) => this.setState({ email: value }));  
    }

    onButtonPress(){
        const {email, password} = this.state;
        this.setState({ error:'', loading: true });
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this)) 
        .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(this.onLoginSuccess.bind(this))
                .catch(this.onLoginFail.bind(this));
        });
    }

    setEmail = (value) => {
        AsyncStorage.setItem('email', value);
        this.setState({ email: value });
     }
     
    setPassword = (value) => {
        AsyncStorage.setItem('password', value);
        this.setState({ password: value });
    }

    onLoginFail(){
        this.setState({error: 'Не удалось войти', loading: false });
    }

    onLoginSuccess(){
        this.setState({
            email:'',
            password:'',
            loading: false,
            error: ''
        });
    }

    renderButton(){
        if(this.state.loading) {
            return <Spinner size="small" />
        }
        return(
            <Button onPress={this.onButtonPress.bind(this)}>
                Вход 
            </Button>  
        );
    }

    render(){ 
    const srcImage = "http://bipbap.ru/wp-content/uploads/2017/05/VOLKI-krasivye-i-ochen-umnye-zhivotnye.jpg";
    return (
        <Card>
            <CardSection>
                <Text>Some text into Card</Text>
                <Image
                    source={{uri:srcImage}}
                    style={{width:50, height:50}}
                />
            </CardSection>
 
            <CardSection>
                <Input label="Email"
                    placeholder="Введите ваш email"
                    value={this.state.email}
                    onChangeText={this.setEmail}
                />
            </CardSection>
            <CardSection>
                <Input label="Password"
                    placeholder="Введите ваш пароль"
                    value={this.state.password}
                    onChangeText={this.setPassword}
                    secureTextEntry={ true }
                />
            </CardSection>
            <Text style={styles.errorTextStyle}>{this.state.email}</Text> 
            <CardSection>
                {this.renderButton()}
            </CardSection>

        </Card>
    ); 
 }
}

const styles = {
    errorTextStyle:{
        color:'red',
        fontSize: 20,
        alignSelf: 'center'
    }
}

export default LoginForm;