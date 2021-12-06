import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchStreams} from '../../actions/index'

class StreamList extends React.Component {
    componentDidMount(){
        this.props.fetchStreams()
    }

    renderList(){
        return this.props.streams.map((stream, isSignedIn)=>{
            return (

            <div className = "item" key={stream.id}>
                <i className ="large middle aligned icon camera"/>   
                <div className = "content">
                    <Link to ={`/streams/${stream.id}`}>
                    {stream.title}
                    </Link>
                    <div className = "description">
                        {stream.description}
                    </div>
                    {this.renderUser(stream)}
                </div>             
                    
                
                </div>
            )
        })
    }

    // BUTTONS
    renderUser(stream){
        if (stream.userId === this.props.currentUserId){
            return (
                <div className = "right floated content">
                    <Link to = {`streams/edit/${stream.id}`} className = "ui button primary">
                     Edit
                    </Link>
                    <Link to = {`streams/delete/${stream.id}`} className = "ui button secondary">
                     Delete
                    </Link>
                </div>
            )
        } 
    }
// CREATE STREAM BUTTON
    renderCreate(){
        if (this.props.isSignedIn){
            return (
                <button>create stream</button>
            )
        } 
        
    }
    
   
    render(){
        
        return (
            <div>
                <h2>Streams</h2>
                <div className ="ui celled list">

                {this.renderList()}
                </div>
                <Link to = {`streams/new`}>

                    {this.renderCreate()}
                </Link>
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return { 
        streams: Object.values(state.streams),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps,{
    fetchStreams: fetchStreams
})(StreamList)