import React from 'react'
import { FiMail, FiLock, FiUser } from 'react-icons/fi'
import { FaPhoneAlt, FaAddressBook } from 'react-icons/fa'
import { Redirect } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'

import {API_URL} from './constants'

import { connect } from 'react-redux'
import { createUser } from '../../redux/actions/action'

class Investisseur extends React.Component{

    state = {
        isLoading: false,
        nom: "",
        prenom: "",
        email: "",
        password: "",
        contact: "",
        adresse: ""

    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.setState({isLoading: true})
        fetch(API_URL + 'investisseur/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                nom: this.state.nom,
                prenom: this.state.prenom,
                email: this.state.email,
                password: this.state.password,
                contact: this.state.contact,
                adresse: this.state.adresse,
                role: "Investisseur",
            })

        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (!responseJson.success){
                alert(responseJson.message)
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
            }
        })
        .catch((error) =>{
            console.log(error)
        })
        .then(() => this.setState({isLoading: false}))
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
            <div >
                <form onSubmit={(event) => this.handleSubmit(event)} >
                                        
                    <div className="form-group">
                        <FiUser color="#777" size={20} style={{marginRight: -30}} />
                        <input 
                            type="text"
                            className="text-field"
                            placeholder="Nom"
                            value={this.state.nom}
                            required
                            onChange={(event) => {
                                this.setState({nom: event.target.value})
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <FiUser color="#777" size={20} style={{marginRight: -30}} />
                        <input 
                            type="text" 
                            className="text-field"
                            placeholder="Prénom"
                            value={this.state.prenom}
                            required
                            onChange={(event) => {
                                this.setState({prenom: event.target.value})
                            }}
                        />
                    </div>
                    
                    <div className="form-group">
                        <FiMail color="#777" size={20} style={{marginRight: -30}} />
                        <input 
                            type="email" 
                            className="text-field"
                            placeholder="Email"
                            value={this.state.email}
                            required
                            onChange={(event) => {
                                this.setState({email: event.target.value})
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <FaAddressBook color="#777" size={20} style={{marginRight: -30}} />
                        <input 
                            type="text" 
                            className="text-field"
                            placeholder="Adresse"
                            value={this.state.adresse}
                            required
                            onChange={(event) => {
                                this.setState({adresse: event.target.value})
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <FaPhoneAlt color="#777" size={20} style={{marginRight: -30}} />
                        <input 
                            type="text" 
                            className="text-field"
                            placeholder="Contact"
                            value={this.state.contact}
                            required
                            onChange={(event) => {
                                this.setState({contact: event.target.value})
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <FiLock color="#777" size={20} style={{marginRight: -30}} />
                        <input 
                            type="password" 
                            className="text-field"
                            placeholder="Mot de Passe"
                            value={this.state.password}
                            required
                            onChange={(event) => {
                                this.setState({password: event.target.value})
                            }}
                        />
                    </div>
                    
                    <button type="submit" className="button" >Créer un Compte</button>
                    
                </form>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Investisseur)