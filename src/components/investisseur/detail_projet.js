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

    investir = () => {
        fetch(API_URL + 'investir-project/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                investisseur: this.props.user.id,
                projet: this.state.projet.id,
            })

        })
        .then((response) => response.json())
        .then((responseJson) => {
            if (responseJson.success){
                this.setState({finish: true})
            }

        })
        .catch((error) =>{
            console.log(error)
        })
    }

    render() {
        return (this.state.finish
            ?
            <Redirect to="/investisseur/acceuil" />
            :
            <div>
                <Navigation />
                    <div className="top-header-investor">
                        <div style={styles.headBox}>
                            <p style={styles.headTitle}>Devenez vous aussi un investisseur d'un projet innovant.</p>

                        </div>
                    </div>

                    <div className="container" style={{paddingBottom: 50}}>
                        <p className="home-title">Détail du Projet</p>

                        <h1 className="text-center">{this.state.projet.nom} </h1>

                        <hr/>

                        <div className="box">
                            <div className="row" style={{padding: 20, marginTop: 30}}>
                                <div className="col-md-4" style={{marginBottom: 20}}>
                                    <img src={this.state.projet.image} alt="..." height={300} width={330} />
                                </div>
                                <div className="col-md-8">
                                    <div className="row">
                                        <a href={this.state.projet.document} className="detail-button">Télécharger le document</a>
                                        <button type="submit" className="button" onClick={() => this.investir()} >Investir</button>
                                    </div>
                                    <div style={{marginTop: 30, marginLeft: -15}}>
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
