import React from 'react'
import {connect} from 'react-redux'
import {signIn , signOut } from '../actions/index'


class GoogleAuth extends React.Component{
    
    
    onAuthChange = (isSignedIn) =>{
        if (isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId())
        } else{
            this.props.signOut()
        }
    }
    onSignIn = ()=>{
        this.auth.signIn()
    }
    onSignOut = () =>{
        this.auth.signOut()
    }
    
    componentDidMount(){
        window.gapi.load('client:auth2', ()=>{
            window.gapi.client.init({
                clientId: '192252779903-0s419jgsn6c5oouig3li9iur15mnnula.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance()
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })

        
        
        
    }
    renderAuthButton(){
        if (this.props.isSignedIn === null){
        return null
    } else if (this.props.isSignedIn){
        return (
            <button onClick = {this.onSignOut} className = "ui red google button">
                <i className = "google icon"/>
                Sign Out
            </button>
        )
    } else{
        return (
            <button onClick = {this.onSignIn} className = "ui red google button">
            <i className = "google icon"/>
                Sign in with Google
            </button>
        )
    }
}
    render(){
        return (
            <div>{this.renderAuthButton()}
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return {isSignedIn: state.auth.isSignedIn}
}


export default connect(mapStateToProps, {
    signIn: signIn,
    signOut: signOut
})(GoogleAuth)