import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { currency } from '../utils'
import { Translation } from 'react-i18next'

class OrderItems extends Component 
{
    static propTypes = {
        product: PropTypes.object.isRequired,
        changeProductQuantity: PropTypes.func.isRequired
    }

    state = {
        product: this.props.product
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

    totalPrice = productTotal => {
        const { product } = this.state
        productTotal = product.price * product.quantity
        return productTotal
    }

    render() {
        const { product } = this.state

        return (
            <div
                className="mb-3 bg-white shadow-sm rounded"
                style={{
                    borderLeft: '5px solid #6fbd0c'
                }}
            >
                <div className="d-flex">
                    <div className="pr-3">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="rounded-0"
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
                            >({product.weight})</small> <br />
                            <small>
                                {product.price.toLocaleString('en-US')} {currency}
                            </small>
                        </div>
                    </div>
                    <div
                        className="align-self-center ml-auto mr-3 text-right d-flex flex-column"
                    >
                        <div className="d-flex mb-2 ml-auto">
                            <button 
                                className="change-product-button shadow-none rounded-circle text-white font-weight-bold" 
                                onClick={this.handleOnIncrease}
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    background: '#6fbd0c'
                                }}
                            >+</button>
                            <div className="flex-grow px-2 align-self-center">
                                <small
                                    className="text-dark font-weight-bold"
                                >{product.quantity}</small>
                            </div>
                            <button 
                                className="change-product-button shadow-none rounded-circle text-white disabled-button-1 font-weight-bold" 
                                onClick={this.handleOnDecrease} 
                                disabled={product.quantity === 1 ? true : false}
                                style={{
                                    width: '30px',
                                    height: '30px',
                                    background: '#6fbd0c'
                                }}
                            >-</button>
                        </div>
                        <div>
                            <small>
                                <strong>
                                    <Translation>
                                        {(t) => <>{t('main.subtotal')}</>}
                                    </Translation> -
                                </strong> {this.totalPrice().toLocaleString('en-US')} {currency}</small></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderItems