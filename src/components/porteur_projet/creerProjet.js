import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { BeatLoader } from 'react-spinners'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"

import '../../assets/css/header.css'
import Navigation from '../layouts/navigation_bar'
import { connect } from 'react-redux'
import { API_URL } from '../layouts/constants'

class CreerProjet extends Component {
    
    state = {
        nom: "",
        description: "",
        technologie: "",
        montant: "",
        duree: "",
        image: undefined,
        document: undefined,

        technologies: [],
        isLoading: true,
        finish: false,
        showModal: false,
        message: "",
        projet: {},
    }

    componentDidMount(){
        this.fetchTechnologie()
    }

    fetchTechnologie = () => {
        fetch(API_URL + 'technologie/')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            this.setState({
                technologies: responseJson,
                isLoading: false
            })
        })
    }

    submitForm = (event) => {
        event.preventDefault()
        this.setState({isLoading: true})

        let formData = new FormData()
        formData.append("nom", this.state.nom)
        formData.append("description", this.state.description)
        formData.append("technologie", this.state.technologie)
        formData.append("montant", this.state.montant)
        formData.append("duree", this.state.duree)
        formData.append("image", this.state.image)
        formData.append("document", this.state.document)
        formData.append("porteur", this.props.user.id)


        fetch(API_URL + 'create-project/', {
            method: 'POST',
            body: formData

        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.success){
                this.setState({
                    projet: responseJson.data,
                    isLoading: false,
                    finish: true
                })
            }
            else {
                this.setState({
                    showModal: true,
                    message: responseJson.message,
                })
            }

        })
        .catch((error) =>{
            console.log(error)
        })
    }
    
    render() {
        return (
            <div>
                <Navigation />
                <div className="top-header">
                    <div style={styles.headBox}>
                        <p style={styles.headTitle}>Avez-vous une idée de projet ?</p>
                        <p style={styles.headSubtitle}>Devenez vous aussi un porteur de projet innovant afin d'obtenir des financements.</p>

                        <Link className="head-button" to="/porteur/creer-projet">Créer un Projet</Link>
                    </div>
                </div>

                <div className="container">
                    <p className="home-title">Formulaire</p>
                    {
                        this.state.isLoading
                        ?
                        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', paddingBottom: 50}}>
                            <BeatLoader loading={this.state.isLoading} size={20} color="#66bb6a" />
                        </div>
                        :
                        this.state.finish
                        ?
                        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', paddingBottom: 50}}>
                            <Link
                                className="head-button"
                                to={{
                                    pathname: "/porteur/creer-tache",
                                    state: this.state.projet
                                }}
                            >
                                Continuer
                            </Link>
                        </div>
                        :
                        <form style={{padding: 50}} onSubmit={(event) => this.submitForm(event)} >
                            <div className="form-group">
                                <label style={styles.label}>Nom du projet</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    placeholder="Nom du Projet"
                                    value={this.state.nom}
                                    style={styles.textInput}
                                    required
                                    onChange={(event) => {
                                        this.setState({nom: event.target.value})
                                    }}
                                />
                            </div>
                            
                            <div className="form-group">
                                <label style={styles.label}>Description</label>
                                <textarea 
                                    type="text" 
                                    className="form-control"
                                    rows={7}
                                    placeholder="Description brève ou objectif du Projet"
                                    value={this.state.description}
                                    style={styles.textInput}
                                    required
                                    onChange={(event) => {
                                        this.setState({description: event.target.value})
                                    }}
                                />
                            </div>
                            
                            <div className="form-group">
                                <label style={styles.label}>Technologie</label>
                                <select className="form-control" required style={styles.dropDown} onChange={(event) => this.setState({technologie: event.target.value})} >
                                    <option value={""}>---</option>
                                    {
                                        this.state.technologies.map((item, index) => {
                                            return(
                                                <option key={index} value={item.id}>
                                                    {item.nom}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            
                            <div className="form-group">
                                <label style={styles.label}>Montant</label>
                                <input 
                                    type="number" 
                                    className="form-control"
                                    placeholder="Montant"
                                    value={this.state.montant}
                                    style={styles.textInput}
                                    required
                                    onChange={(event) => {
                                        this.setState({montant: event.target.value})
                                    }}
                                />
                            </div>
                            
                            <div className="form-group">
                                <label style={styles.label}>Durée (mois)</label>
                                <input 
                                    type="number" 
                                    className="form-control"
                                    placeholder="Durée (mois)"
                                    value={this.state.duree}
                                    style={styles.textInput}
                                    required
                                    onChange={(event) => {
                                        this.setState({duree: event.target.value})
                                    }}
                                />
                            </div>
                            
                            <div className="form-group">
                                <label style={styles.label}>Business Plan</label>
                                <input 
                                    type="file" 
                                    className="form-control-file"
                                    style={styles.textInput}
                                    required
                                    onChange={(event) => {
                                        console.log(event.target.files[0])
                                        this.setState({document: event.target.files[0]})
                                    }}
                                />
                            </div>
                            
                            {/* <div className="form-group">
                                <label style={styles.label}>Image descriptif du Projet</label>
                                <input 
                                    type="file" 
                                    className="form-control-file"
                                    style={styles.textInput}
                                    required
                                    onChange={(event) => {
                                        console.log(event.target.files[0])
                                        this.setState({image: event.target.files[0]})
                                    }}
                                />
                            </div> */}
                            
                            <div style={{marginTop: 30, display: 'flex', justifyContent: 'center'}}>
                                <button type="submit" className="button" >Valider</button>
                            </div>
                            
                        </form>
                    }

                    
                </div>
                
                <Modal isOpen={this.state.showModal} toggle={() => this.setState({showModal: !this.state.showModal})}>
                    <ModalHeader>Opération</ModalHeader>
                    <ModalBody>
                        {this.state.message}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.setState({showModal: !this.state.showModal})}>Fermer</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}


const styles = {

    headBox:{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 700,
        padding: 20
    },

    headTitle:{
        fontFamily: 'Montserrat',
        fontSize: 45,
        textAlign: 'center',
        color: 'white'
    },

    headSubtitle:{
        fontFamily: 'Montserrat',
        fontSize: 30,
        textAlign: 'center',
        color: 'white'
    },

    textInput:{
        fontFamily: 'Tauri',
        fontSize: 16,
        
    },

    label:{
        fontFamily: 'Montserrat',
        fontSize: 16,
    },

    dropDown: {
        width: '100%',
        fontFamily: 'Tauri',
        fontSize: 16,
        borderRadius: 5,
        paddingLeft: 10
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.userReducer.user
    }
}

export default connect(mapStateToProps)(CreerProjet)
