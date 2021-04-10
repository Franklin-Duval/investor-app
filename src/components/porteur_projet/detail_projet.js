import React, { Component } from 'react'
import ToolkitProvider from 'react-bootstrap-table2-toolkit'
import BootstrapTable from 'react-bootstrap-table-next'
import { BeatLoader } from 'react-spinners'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"
import Navigation from '../layouts/navigation_bar'
import '../../assets/css/pages.css'
import { connect } from 'react-redux'
import { API_URL } from '../layouts/constants'
import { Redirect } from 'react-router'

class Detail_projet extends Component {

	formatDate = (days, months, years) => {
		let month = '' + (months + 1)
		let day = '' + days
		let year = years

		if (month.length < 2) 
			month = '0' + month;
		if (day.length < 2) 
			day = '0' + day;

		return year + '-' + month + '-' + day
	}

    state = {
        projet: this.props.location.state,
        finish: false,
        taches: [],
        isLoading: true,
        showModal: false,
        idTache: "",
        debut: undefined,
        fin: undefined,
        avancement: 0,
        statut: "",
        image: undefined,

        calendar_debut: null,
        calendar_fin: null,
        today: this.formatDate((new Date()).getDate(), (new Date()).getMonth(), (new Date()).getFullYear()),
    }

    componentDidMount(){
        this.fetchTache()
    }

    fetchTache = () => {
        fetch(API_URL + 'get-taches/' + this.state.projet.id + '/')
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            if (responseJson.success){
                this.setState({
                    taches: responseJson.data,
                    isLoading: false
                })
            }
        })
    }

    submitModal = (event) => {
        event.preventDefault()
        this.setState({
            isLoading: true,
            showModal: !this.state.showModal
        })

        let formData = new FormData()
        formData.append("id", this.state.idTache)
        formData.append("debut", this.state.debut)
        formData.append("fin", this.state.fin)
        formData.append("avancement", this.state.avancement)
        formData.append("statut", this.state.statut)
        formData.append("image", this.state.image)


        fetch(API_URL + 'update-tache/', {
            method: 'POST',
            body: formData

        })
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            this.fetchTache()
        })
        .catch((error) =>{
            console.log(error)
            this.setState({isLoading:false})
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
                                <div style={{marginTop: 30, marginLeft: -15}}>
                                    <p style={{fontFamily: 'Montserrat'}}>Autheur : <span style={{fontWeight: 'bold', fontSize: 25}}>{this.props.user.nom} {this.props.user.prenom}</span> </p>
                                    <p style={{fontFamily: 'Montserrat'}}>Description : {this.state.projet.description} </p>
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

                        <hr/>

                        <p style={styles.textTache}>Taches</p>

                        {
                            this.state.isLoading
                            ?
                            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                                <BeatLoader loading={this.state.isLoading} size={20} color="#66bb6a" />
                            </div>
                            :
                            <ToolkitProvider
                                keyField="id"
                                data={this.state.taches}
                                columns={this.columns}
                                search
                            >
                                {(props) => (
                                    <div>
                                        <BootstrapTable
                                            hover
                                            bootstrap4
                                            {...props.baseProps}
                                            rowEvents={this.rowEvent}
                                            noDataIndication="Aucune tache n'est enregisté pour l'instant"
                                            bordered={false}
                                            rowStyle={{}}
                                            
                                        />
                                    </div>
                                )}
                            </ToolkitProvider>
                        }
                
                    </div>
                    
                </div>

                <Modal isOpen={this.state.showModal} toggle={() => this.setState({showModal: !this.state.showModal})}>
                    <ModalHeader>Modifier la Tache</ModalHeader>
                    <ModalBody>

                        <form style={{padding: 50}} onSubmit={(event) => this.submitModal(event)} >
                            
                            <div className="form-group">
                                <label style={styles.label}>Début</label>
                                <DatePicker
                                    className="form-control"									
                                    dateFormat="yyyy-MM-dd"
                                    selected={this.state.calendar_debut}
                                    showYearDropdown
                                    scrollableYearDropdown
                                    showMonthDropdown
                                    scrollableMonthYearDropdown
                                    placeholderText="Date de début"
                                    onChange={(date) => {
                                        this.setState({
                                            calendar_debut: date,
                                            debut: this.formatDate(date.getDate(), date.getMonth(), date.getFullYear())
                                        })
                                    
                                    }}
                                />
                            </div>
                            
                            <div className="form-group">
                                <label style={styles.label}>Fin</label>
                                <DatePicker
                                    className="form-control"									
                                    dateFormat="yyyy-MM-dd"
                                    selected={this.state.calendar_fin}
                                    showYearDropdown
                                    scrollableYearDropdown
                                    showMonthDropdown
                                    scrollableMonthYearDropdown
                                    placeholderText="Date de Fin"
                                    onChange={(date) => {
                                        this.setState({
                                            calendar_fin: date,
                                            fin: this.formatDate(date.getDate(), date.getMonth(), date.getFullYear())
                                        })
                                    
                                    }}
                                />
                            </div>
                            
                            <div className="form-group">
                                <label style={styles.label}>Etat d'avancement (%)</label>
                                <input 
                                    type="number"
                                    className="form-control"
                                    placeholder="Avancement"
                                    value={this.state.avancement}
                                    style={styles.textInput}
                                    onChange={(event) => {
                                        this.setState({avancement: event.target.value})
                                    }}
                                />
                            </div>

                            <div className="form-group">
                                <label style={styles.label}>Statut</label>
                                <select className="form-control" style={styles.dropDown} onChange={(event) => this.setState({statut: event.target.value})} >
                                    <option value="En attente">En attente</option>
                                    <option value="En cours">En cours</option>
                                    <option value="Terminé">Terminé</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label style={styles.label}>Image</label>
                                <input 
                                    type="file" 
                                    className="form-control-file"
                                    style={styles.textInput}
                                    onChange={(event) => {
                                        console.log(event.target.files[0])
                                        this.setState({image: event.target.files[0]})
                                    }}
                                />
                            </div>

                            <div style={{marginTop: 30, display: 'flex', justifyContent: 'center'}}>
                                <button type="submit" className="button" >Valider</button>
                            </div>

                        </form>
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={() => this.setState({showModal: !this.state.showModal})}>Fermer</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
    
    styles = {
        header:{
            backgroundColor: '#66bb6a',
            color: '#fff',
            fontFamily: 'Montserrat',
            fontSize: 16,
            minWidth: 150
        },

        headerSort:{
            backgroundColor: '#e0e0e0',

        },
    }

    etatFormatter = (cell, row) => {
        if (row.statut === "En cours"){
            return(
                <span>
                    <strong style={{color: 'green', fontSize: 18}}>{cell}</strong>
                </span>
            )
        }
        else if (row.statut === "Terminé"){
            return(
                <span>
                    <strong style={{color: 'red', fontSize: 18}}>{cell}</strong>
                </span>
            )
        }
        else{
            return(
                <span style={{color: '#03a9f4', fontSize: 18}}>
                    {cell}
                </span>
            )
        }
    }

    rowEvent = {
        onClick: (e, row, rowIndex) => {
            this.setState({
                idTache: row.id,
                avancement: row.avancement,
                statut: row.statut,
                debut: row.debut,
                fin: row.fin,
                calendar_debut: new Date(row.debut ? row.debut : this.state.today),
                calendar_fin: new Date(row.fin ? row.fin : this.state.today),
                showModal: true
            })    
        }
    }
    
    finFormatter = (cell, row) => {
        if (row.fin) {
            return(
                <span>
                    {cell}
                </span>
            )
        }
        else {
            return(
                <span>
                    Non défini
                </span>
            )
        }
    }

    debutFormatter = (cell, row) => {
        if (row.debut) {
            return(
                <span>
                    {cell}
                </span>
            )
        }
        else {
            return(
                <span>
                    Non défini
                </span>
            )
        }
    }

    columns = [
        {
            dataField: 'nom',
            text: 'Nom',
            sort: true,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'duree',
            text: 'Durée (jours)',
            sort: true,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'statut',
            text: 'Statut',
            sort: true,
            formatter: this.etatFormatter,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'avancement',
            text: 'Etat d\'avancement (%)',
            sort: true,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'debut',
            text: 'Debut',
            sort: true,
            formatter: this.debutFormatter,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },

        {
            dataField: 'fin',
            text: 'Fin',
            sort: true,
            formatter: this.finFormatter,
            headerStyle: this.styles.header,
            headerSortingStyle: this.styles.headerSort
        },
    ]

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
    },

    textTache:{
        fontFamily: 'Tauri',
        fontSize: 22,
        textAlign: 'center',
        textDecoration: 'underline'
    },

    textInput:{
        fontFamily: 'Tauri',
        fontSize: 16,
        
    },

    label:{
        fontFamily: 'Montserrat',
        fontSize: 16,
        display: 'block'
    },
    
}

const mapStateToProps = (state) => {
    return {
        user : state.userReducer.user
    }
}

export default connect(mapStateToProps)(Detail_projet)
