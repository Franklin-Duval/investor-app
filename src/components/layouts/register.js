import React from 'react'
import 'antd/dist/antd.css'
import '../../assets/css/form.css'

import { connect } from 'react-redux'
import { createUser } from '../../redux/actions/action'
import Investisseur from './investisseur'
import Porteur from './porteur'

class Register extends React.Component{

    state = {
        isLoading: false,
        porteur: true
    }

    render(){
        return(
            <div className="container-fluid bodys" >
                <p style={styles.text}>Créez votre compte</p>
                <div className="forms">
                    <div style={{width: 350, marginBottom: 15}}>
                        <button
                            className="slide"
                            onClick={() => this.setState({porteur: true})}
                            style={this.state.porteur ? {backgroundColor: '#66bb6a', color: 'white'} : {}}
                        >
                            Porteur de Projet
                        </button>

                        <button
                            className="slide"
                            onClick={() => this.setState({porteur: false})}
                            style={!this.state.porteur ? {backgroundColor: '#66bb6a', color: 'white'} : {}}
                        >
                            Investisseur
                        </button>
                    </div>
                    {
                        this.state.porteur
                        ?
                        <Porteur />
                        :
                        <Investisseur />
                    }
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Register)