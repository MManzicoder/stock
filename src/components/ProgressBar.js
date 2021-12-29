

import React from 'react'

const ProgressBar = (props) => {

    const { bgcolor, completed } = props

    const containerStyles = {
        height: 15,
        width: '80%',
        backgroundColor: 'blue',
        borderRadius: 50,
        margin: 10
      }
    
      const fillerStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: bgcolor,
        borderRadius: 'inherit',
        textAlign: 'right',
        transition: 'width 1s ease-in-out',
      }
    
      const labelStyles = {
        padding: 5,
        color: 'white',
        fontWeight: 'bold'
      }
     
    return (
        <div>
             <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
        </div>
    )
}

export default ProgressBar
