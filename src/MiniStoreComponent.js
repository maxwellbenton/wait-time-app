import React from 'react'

export default function StudentsList(props){
    var est = (props.store.estimated_wait_time.map(wt => wt.wait_time).reduce((a,b) => a + b,0))/props.store.estimated_wait_time.length
  return(
    <div className="mapDiv">
      <img height="25" className="img-fluid" src="../pocket_watch_sm.png" alt="mini watch"/>
      {minutes(est, props)} min, {seconds(est, props)} sec - {props.store.name}
    </div>
  )
}

function minutes(wt, props) {
        if(props.store.estimated_wait_time.length) {
            return Math.floor(wt / 60000)
        } else {
            return "?"
        }
    }
function seconds(wt, props) {
    if(props.store.estimated_wait_time.length) {
        return ((wt % 60000) / 1000).toFixed(0) 
    } else {
        return "?"
    }
    
}