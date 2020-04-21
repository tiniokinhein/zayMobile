import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { currency } from '../../utils'
import { IoMdTrash } from 'react-icons/io'

export default class ShoppingCartProducts extends Component 
{
    static propTypes = {
        product: PropTypes.object.isRequired,
        removeProduct: PropTypes.func.isRequired,
        changeProductQuantity: PropTypes.func.isRequired
    }

    state = {
        product: this.props.product,
    }

    handleOnIncrease = () => {
        const { changeProductQuantity } = this.props
        const { product } = this.state
        product.quantity = product.quantity + 1
        changeProductQuantity(product)
    }

    handleOnDecrease = () => {
        const { changeProductQuantity } = this.props
        const { product } = this.state
        product.quantity = product.quantity - 1
        changeProductQuantity(product)
    }

    removeItem = product => {
        const { removeProduct } = this.props
        removeProduct(product)
    }

    render() {
        const { removeProduct } = this.props
        const { product } = this.state

        return (
            <div
                className="mb-3 bg-white shadow-sm rounded"
            >
                <div className="d-flex">
                    <div className="pr-3">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="rounded-left"
                            style={{
                                width: '100px'
                            }}

                        />
                    </div>
                    <div
                        className="align-self-center flex-grow-1"
                    >
                        <h6 
                            className="m-0 pb-1 text-dark"
                            style={{
                                fontSize: '14px'
                            }}
                        >{product.title}</h6>
                        <div>
                            <small 
                                className="font-weight-bold" 
                                style={{fontSize:'10px'}}
                            >{product.weight}</small>
                        </div>
                        <div
                            className="pt-2"
                        >
                            <small 
                                className="font-weight-bold"
                                style={{
                                    fontSize: '11px'
                                }}
                            >{product.price} {currency}</small> 
                        </div>
                    </div>
                    
                    <div
                        className="align-self-center mr-5"
                    >
                        <div className="d-flex flex-column">
                            <button 
                                className="border-0 text-white rounded-circle shadow-sm p-0 m-0" 
                                onClick={this.handleOnIncrease}
                                style={{
                                    background: '#6fbe0b',
                                    width: '20px',
                                    height: '20px'
                                }}
                            >+</button>
                            <p className="mb-0 text-center my-1"><small className="font-weight-bold">{product.quantity}</small></p>
                            <button 
                                className="border-0 text-white rounded-circle shadow-sm p-0 m-0" 
                                onClick={this.handleOnDecrease} 
                                disabled={product.quantity === 1 ? true : false}
                                style={{
                                    background: '#6fbe0b',
                                    width: '20px',
                                    height: '20px'
                                }}
                            >-</button>
                        </div>
                    </div>
                    <div
                        className="align-self-center mr-3 text-danger flex-grow-2"
                        onClick={this.removeItem.bind(this,product)}
                        style={{
                            cursor: 'pointer',
                            fontSize: '1.5rem'
                        }}
                    ><IoMdTrash /></div>
                </div>
            </div>
        )
    }                       
}
