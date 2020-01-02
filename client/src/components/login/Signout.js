import React, {Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../actions'

class Signout extends Component {
componentDidMount(){
    //both clears localStorage 'jwt' and authenticated jwt from reducer
    this.props.signout()
}

    render(){
        return <div>Come back soon!</div>
    }
}

export default connect(null, actions)(Signout)