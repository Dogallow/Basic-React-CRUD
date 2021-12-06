import React from 'react'
import {Link} from 'react-router-dom'
import Modal from '../Modal'
import {connect} from 'react-redux'
import {history} from '../../history'
import {fetchStream, deleteStream} from '../../actions'

class StreamDelete extends React.Component{
    componentDidMount(){
        this.props.fetchStream(this.props.match.params.id)

    }

    // renderTitle(){
    //     if(this.props.stream === )
    // }
        renderActions(){
            const id = this.props.match.params.id
            return (
                <React.Fragment>
                    <button onClick = {()=>this.props.deleteStream(id)} className = "ui negative button">Delete</button>
                    <Link to = "/" className = "ui button">Cancel</Link>
                </React.Fragment>
            )
        }

        renderContent(){
            if(!this.props.stream){
                return(
                       ' Are you sure you want to delete the stream.'
                )

            }
                return (
                    `Are you sure you want to delete the stream with title: ${this.props.stream.title}`
                )
        }
    render(){
        console.log(this.props.stream)
        return (
    
            
            
            <Modal onDismiss = {()=>history.push('/')} title = "Delete Stream" content = {this.renderContent()} actions = {this.renderActions()}/>
            
        )
    }

}

const mapStateToProps = (state, ownProps)=>{
    return{
        
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps,{
    fetchStream,
    deleteStream
})(StreamDelete)