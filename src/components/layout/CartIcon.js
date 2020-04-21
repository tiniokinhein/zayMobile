import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { FaShoppingBasket } from 'react-icons/fa'

class CartIcon extends Component 
{

    openCart = () => {
        document.getElementById('cartOpen').style.right = '0'
    }

    render() {

        const { cartTotal } = this.props

        return (
            <div
                className="text-center"
                style={{
                    width: '48px',
                    height: '48px',
                    lineHeight: '48px'
                }}
            >
                <span 
                    style={{
                        fontSize:'23px',
                        color:'#6fbd0c',
                        cursor: 'pointer',
                        height: '48px'
                    }}
                    className="d-flex"
                    onClick={() => this.openCart()}
                >
                    <span
                        className="mx-auto d-flex align-self-end mb-2"
                    ><FaShoppingBasket /></span>
                    <span 
                        style={{
                            fontSize:'14px',
                            // background: '-webkit-linear-gradient(45deg, #fff, #007bff 80%)',
                            // WebkitBackgroundClip: 'text',
                            // WebkitTextFillColor: 'transparent',
                            color: '#000',
                            right: '0',
                            top: '-2px',
                            lineHeight: '2',
                            display: 'inline-block',
                            zIndex: '9999',
                            height: 'auto',
                            width: '48px'
                        }}
                        className="font-weight-bold position-absolute"
                    >
                        {
                            cartTotal.productQuantity <= 0 ? (
                                <>{cartTotal.productQuantity}</>
                            ) : (
                                <span 
                                    className="cart-qty-alert d-inline-block"
                                    // style={{
                                    //     background: '-webkit-linear-gradient(45deg, #fff, #007bff 80%)',
                                    //     WebkitBackgroundClip: 'text',
                                    //     WebkitTextFillColor: 'transparent'
                                        
                                    // }}
                                >{cartTotal.productQuantity}</span>
                            )
                        }
                    </span>
                </span>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    cartTotal: state.total.data
})

export default connect(mapStateToProps)(withRouter(CartIcon))
