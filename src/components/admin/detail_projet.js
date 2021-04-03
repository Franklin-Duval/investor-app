import React, { Component } from 'react'

import Navigation from '../layouts/navigation_bar'
import '../../assets/css/pages.css'
import { connect } from 'react-redux'
import { API_URL } from '../layouts/constants'
import { Redirect } from 'react-router'

class Detail_projet extends Component {

    state = {
        projet: this.props.location.state,
        finish: false
    }

    validerProjet = () => {
        fetch(API_URL + 'validate-project/' + this.state.projet.id + '/')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            if (responseJson.success){
                this.setState({finish: true})
            }
        })
    }

    rejeterProjet = () => {
        fetch(API_URL + 'rejeter-project/' + this.state.projet.id + '/')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            if (responseJson.success){
                this.setState({finish: true})
            }
        })
    }


    render() {
        return (
            this.state.finish
            ?
            <Redirect to="/admin/acceuil" />
            :
            <div>
                <Navigation />
                    <div className="top-header">
                        <div style={styles.headBox}>
                            <p style={styles.headTitle}>Adminstrateur de la plateforme.</p>

                        </div>
                    </div>

                    <div className="container" style={{paddingBottom: 50}}>
                        <p className="home-title">Détail du Projet</p>

                        <h1 className="text-center">{this.state.projet.nom} </h1>
                        <hr/>
                        <div className="row" style={{marginTop: 30}}>
                            <div className="col-md-4" style={{marginBottom: 20}}>
                                <img src={this.state.projet.image} alt="..." height={300} width={330} />
                            </div>
                            <div className="col-md-8">
                                <div className="row">
                                    <button type="submit" className="detail-button" onClick={() => this.rejeterProjet()} >Rejeter le Projet</button>
                                    <button type="submit" className="button" onClick={() => this.validerProjet()} >Valider le Projet</button>
                                    <div style={{display: 'flex', width: '100%', justifyContent: 'center', marginTop: 10}}>
                                        <a href={this.state.projet.document} className="detail-button2">Télécharger le document</a>
                                    </div>
                                    
                                </div>
                                <div style={{marginLeft: -15}}>
                                    <p style={{fontFamily: 'Montserrat'}}>Autheur : <span style={{fontWeight: 'bold', fontSize: 25}}>{this.state.projet.porteur} </span> </p>
                                    <p style={{fontFamily: 'Montserrat'}}>{this.state.projet.description} </p>
                                </div>
                                
                            </div>
                        </div>

                        <p style={styles.text}>Statut : <span style={{
                                                    color: this.state.projet.statut === "En attente de validation" ? 'blueviolet':
                                                    this.state.projet.statut === "En attente de financement" ? '#ffa000' :
                                                    this.state.projet.statut === "Financé" ? 'green' : 'red',

                                                    fontWeight: 'bold',
                                                }}> {this.state.projet.statut}</span> </p>

                        <p style={styles.text}>Technologie : {this.state.projet.technologie} </p>
                        <p style={styles.text}>Durée : {this.state.projet.duree} mois </p>
                        <p style={styles.text}>Montant : {this.state.projet.montant} FCFA</p>
                    </div>
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
        textAlign: 'center'
    },

    text:{
        fontFamily: 'Montserrat',
        fontSize: 18
    }
}


const mapStateToProps = (state) => {
    return {
        user : state.userReducer.user
    }
}

export default connect(mapStateToProps)(Detail_projet)
