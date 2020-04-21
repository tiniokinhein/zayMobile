import React, { Component } from 'react'

export default class MenuButton extends Component 
{
    render() {
        return (
            <div className="d-flex flex-column ml-2">
                <span
                    className="d-block"
                    style={{
                        width: '20px',
                        height: '2px',
                        background: 'linear-gradient(45deg, #007bff, #00fff3 80%)',
                        marginLeft: '10px'
                    }}
                />
                <span
                    className="d-block"
                    style={{
                        width: '30px',
                        height: '2px',
                        background: 'linear-gradient(45deg, #007bff, #00fff3 80%)',
                        margin: '5px 0'
                    }}
                />
                <span
                    className="d-block"
                    style={{
                        width: '25px',
                        height: '2px',
                        background: 'linear-gradient(45deg, #007bff, #00fff3 80%)',
                        marginLeft: '5px'
                    }}
                />
            </div>
        )
    }
}
