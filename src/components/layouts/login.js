import React from 'react'
import { FiMail, FiLock } from 'react-icons/fi'
import { Link, Redirect } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'

import {API_URL} from './constants'
import '../../assets/css/form.css'
import logo from '../../assets/images/security.png'

import { connect } from 'react-redux'
import { createUser } from '../../redux/actions/action'

class Login extends React.Component{

    state = {
        email: "",
        password: "",
        isLoading: false
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({isLoading: true})
        fetch(API_URL + 'login/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            })

        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (!responseJson.success){
                alert(responseJson.message)
                this.setState({isLoading: false})
            }
            else if (responseJson.success){
                this.props.save_user({
                    authentifie: true,
                    userType: responseJson.data.role,
                    id: responseJson.data.id,
                    nom: responseJson.data.nom,
                    prenom: responseJson.data.prenom,
                    email: responseJson.data.email,
                    url: responseJson.data.url
                })
                this.setState({isLoading: false})
            }

        })
        .catch((error) =>{
            console.log(error)
        })
    }

    render(){
        return(
            this.state.isLoading
            ?
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <BeatLoader loading={this.state.isLoading} size={20} color="#66bb6a" />
            </div>
            :
            this.props.user.authentifie && this.props.user.userType === "Admin"
            ?
            <Redirect to="/admin/acceuil" />
            :
            this.props.user.authentifie && this.props.user.userType === "Investisseur"
            ?
            <Redirect to="/investisseur/acceuil" />
            :
            this.props.user.authentifie && this.props.user.userType === "Porteur Projet"
            ?
            <Redirect to="/porteur/acceuil" />
            :
            <div className="container-fluid login" >
                <p style={styles.text}>Connectez-vous à votre compte</p>
                <form className="forms" onSubmit={(event) => this.handleSubmit(event)} >
                    <img src={logo} alt="" style={{width: 150, height: 150, marginBottom: 0}} />
                                        
                    <div className="form-group">
                        <FiMail color="#777" size={20} style={{marginRight: -30}} />
                        <input 
                            type="email" 
                            className="text-field" id="email"
                            placeholder="Email"
                            value={this.state.email}
                            required
                            onChange={(event) => {
                                this.setState({email: event.target.value})
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <FiLock color="#777" size={20} style={{marginRight: -30}} />
                        <input 
                            type="password" 
                            className="text-field" id="password"
                            placeholder="Mot de Passe"
                            value={this.state.password}
                            required
                            onChange={(event) => {
                                this.setState({password: event.target.value})
                            }}
                        />
                    </div>
                    
                    <button type="submit" className="button" >Connexion</button>
                    <div style={styles.subText}>
                        <Link to="/register" style={{color: 'black'}}>Créer un compte !</Link>
                    </div>
                </form>
                
            </div>
        )
    }
}

const styles = {
    text:{
        color: "#66bb6a",
        marginBottom: 30,
        fontSize: 40,
        fontFamily: 'Montserrat'
    },

    subText:{
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: 20,
        marginBottom: -20,
        fontFamily: "Tauri",
        fontSize: 14,
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.userReducer.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        save_user : (user) => dispatch(createUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)