import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { currency } from '../utils'
import { IoMdTrash } from 'react-icons/io'
import { withRouter } from 'react-router-dom'

class CartProduct extends Component 
{
    static propTypes = {
        product: PropTypes.object.isRequired,
        removeProduct: PropTypes.func.isRequired,
        changeProductQuantity: PropTypes.func.isRequired
    }

    state = {
        product: this.props.product,
        isMouseOver: false
    }

    handleMouseOver = () => {
        this.setState({
            isMouseOver: true
        })
    }

    handleMouseOut = () => {
        this.setState({
            isMouseOver: false
        })
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
        const { product } = this.state
        const classes = ['shelf-item']

        if(!!this.state.isMouseOver) {
            classes.push('shelf-item--mouseover')
        }

        return (
            <div className={classes.join(' ')}>
                <img
                    src={product.image}
                    alt={product.title}
                    className="shelf-item__thumb align-top"
                />
                <div className="shelf-item__details align-top">
                    <p className="title">{product.title}</p>
                    <p className="mb-0 text-muted"><small style={{fontSize:'10px'}}>({product.weight})</small></p>
                    {/* <p className="desc">
                        <small 
                            style={{lineHeight:'2'}}
                        >အရေအတွက် : </small> 
                        <small
                            className="text-white font-weight-bold"
                        ><span className="text-secondary">(</span> {product.quantity} <span className="text-secondary">)</span></small>
                    </p> */}
                </div>
                <div className="shelf-item__price">
                    <p
                        className="font-weight-bold text-white-50 mb-2"
                        style={{
                            fontSize: '15px'
                        }}    
                    >{product.price.toLocaleString('en-US')} {currency}</p>
                    <div className="d-flex justify-content-end">
                        <div className="d-flex">
                            <button 
                                className="change-product-button shadow-none rounded-circle" 
                                onClick={this.handleOnIncrease}
                                style={{
                                    width: '30px',
                                    height: '30px'
                                }}
                            >+</button>
                            <div className="flex-grow px-2 align-self-center">
                                <small
                                    className="text-white font-weight-bold"
                                >{product.quantity}</small>
                            </div>
                            <button 
                                className="change-product-button shadow-none rounded-circle" 
                                onClick={this.handleOnDecrease} 
                                disabled={product.quantity === 1 ? true : false}
                                style={{
                                    width: '30px',
                                    height: '30px'
                                }}
                            >-</button>
                        </div>
                        <div
                            className="shelf-item__del float-left text-center ml-2 text-white bg-transparent d-flex align-items-center justify-content-center"
                            onMouseOver={() => this.handleMouseOver()}
                            onMouseOut={() => this.handleMouseOut()}
                            onClick={this.removeItem.bind(this,product)}
                            style={{
                                fontSize: '20px'
                            }}
                        >
                            <IoMdTrash />
                        </div>
                    </div>
                </div>
            </div>
        )
    }                       
}

export default withRouter(CartProduct)