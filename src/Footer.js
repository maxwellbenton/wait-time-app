import React, { Component } from 'react';
import { Link } from 'react-router-dom'


export default class Footer extends Component {

render() {
    return(
        <div>
            <div className="row text-center">
                <div className="col-sm-1 col-sm-offset-5"><Link to="/about">About</Link></div>
                <div className="col-sm-1"><Link to="/contact">Contact</Link></div>
            </div>
            <div className="row text-center">
                <div className="col-sm-4 col-sm-offset-4">© Maxwell Benton</div> 
            </div>
        </div>
    )
}

}