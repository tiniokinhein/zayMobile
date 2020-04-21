import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    loadCart,
    removeProduct,
    changeProductQuantity
} from '../store/cart/actions'
import { updateTotalCart } from '../store/total/actions'
import CartProduct from './CartProduct'
import { withRouter } from 'react-router-dom'
import { MdArrowBack } from 'react-icons/md'
import { currency } from '../utils'
import { Translation } from 'react-i18next'

class FloatCart extends Component 
{
    static propTypes = {
        loadCart: PropTypes.func.isRequired,
        removeProduct: PropTypes.func,
        changeProductQuantity: PropTypes.func,
        updateTotalCart: PropTypes.func.isRequired,
        cartProducts: PropTypes.array.isRequired,
        newProduct: PropTypes.object,
        productToRemove: PropTypes.object,
        productToChange: PropTypes.object
    }

    state = {
        isOpen: false
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.newProduct !== this.props.newProduct) {
            this.addProduct(nextProps.newProduct)
        }
        if(nextProps.productToRemove !== this.props.productToRemove) {
            this.removeProduct(nextProps.productToRemove)
        }
        if(nextProps.productToChange !== this.props.productToChange) {
            this.changeProductQuantity(nextProps.productToChange)
        }
    }

    openFloatCart = () => {
        // this.setState({
        //     isOpen: true
        // })

        document.getElementById('cartOpen').style.right = '0'
    }

    closeFloatCart = () => {
        // this.setState({
        //     isOpen: false
        // })

        document.getElementById('cartOpen').style.right = '-450px'       
    }

    addProduct = product => {
        const { cartProducts , updateTotalCart } = this.props
        let productAlreadyInCart = false
        cartProducts.forEach(cp => {
            if(cp.id === product.id) {
                cp.quantity += product.quantity
                productAlreadyInCart = true
            }
        })
        if(!productAlreadyInCart) {
            cartProducts.push(product)
        }
        updateTotalCart(cartProducts)
        this.openFloatCart()
    }

    removeProduct = product => {
        const { cartProducts , updateTotalCart } = this.props
        const index = cartProducts.findIndex(p => p.id === product.id)
        if(index >= 0) {
            cartProducts.splice(index,1)
            updateTotalCart(cartProducts)
        }
    }

    changeProductQuantity = changedProduct => {
        const { cartProducts , updateTotalCart } = this.props
        const product = cartProducts.find(p => p.id === changedProduct.id)
        product.quantity = changedProduct.quantity
        if(product.quantity <= 0) {
            this.removeProduct(product)
        }
        updateTotalCart(cartProducts)
    }

    proceedToCheckout = () => {
        const { productQuantity } = this.props.cartTotal
        if(!productQuantity) {
            alert('Add some product in the cart!')
        } else {
            this.props.history.push('/checkout')
            this.closeFloatCart()
        }
    }

    discountPrice = () => {
        const { cartTotal } = this.props
        return cartTotal.totalPrice / 100 * 3
    }

    allTotalPrice = () => {
        const { cartTotal } = this.props
        const TOTALPRICE = cartTotal.totalPrice - this.discountPrice()
        return TOTALPRICE
    }

    removeAllProducts = product => {
        const { cartProducts , updateTotalCart } = this.props
        const index = cartProducts.filter(p => p === product)
        if(index >= 0) {
            cartProducts.splice(index)
            updateTotalCart(cartProducts)
        }
        this.props.history.push('/')
    }

    render() {

        const { cartProducts , removeProduct , changeProductQuantity , cartTotal } = this.props

        const products = cartProducts.map(p => {
            return(
                <CartProduct key={p.id} product={p} removeProduct={removeProduct} changeProductQuantity={changeProductQuantity} />
            )
        })

        let classes = ['float-cart']

        if(!!this.state.isOpen) {
            classes.push('float-cart--open')
        }

        return (
            <div className={classes.join(' ')} id="cartOpen">

                <div className="float-cart__content">

                    {
                        products.length <=0 ? (
                            <>
                                <div
                                    style={{
                                        padding: '0 5%',
                                        top: '0',
                                        zIndex: '999',
                                        background: '#1b1a20'
                                    }}
                                    className="d-flex py-2 position-sticky sticky-cart-header"
                                >
                                    <div className="w-25 d-flex align-items-center">
                                        <div
                                            className="float-cart__close-btn text-left m-0 rounded-circle"
                                            style={{
                                                height: '25px',
                                                width: '25px'
                                            }}
                                            onClick={() => {
                                                    this.props.history.push('/')
                                                    this.closeFloatCart()
                                                }
                                            }
                                        >
                                            <MdArrowBack style={{width:'25px',height:'25px'}} />
                                        </div>
                                    </div>
                                    <h3 
                                        className="w-75 m-0 align-self-center"
                                        style={{
                                            background: '-webkit-linear-gradient(45deg, #fff, #007bff 80%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            color: 'transparent',
                                            lineHeight: '2'
                                        }}
                                    >
                                        <Translation>
                                            {(t) => <>{t('main.shoppingCart')}</>}
                                        </Translation>
                                    </h3>
                                </div>
                                <div 
                                    className="d-table w-100 h-100 px-4 position-relative"
                                    style={{
                                        paddingBottom: '112px'
                                    }}
                                >
                                    <div className="d-table-cell align-middle">
                                        <p 
                                            className="shelf-empty text-center mb-0"
                                            style={{
                                                lineHeight: '2',
                                                fontSize: '20px',
                                                color: '#fff'
                                            }}
                                        >
                                            <Translation>
                                                {(t) => <>{t('main.noItemsInCart')}</>}
                                            </Translation>
                                        </p>
                                    </div>
                                </div>
                                <div 
                                    className="position-absolute"
                                    style={{
                                        left: '0',
                                        right: '0',
                                        bottom: '0',
                                        zIndex: '99'
                                    }}
                                >
                                    <div 
                                        className="buy-btn mt-0 py-0 w-100 bg-transparent mr-0"
                                        style={{
                                            height:'56px'
                                        }}
                                    >
                                        <button 
                                            onClick={() => {
                                                    this.props.history.push('/')
                                                    this.closeFloatCart()
                                                }
                                            }
                                            className="d-block shadow-none py-2 w-100 text-decoration-none text-white shop-btn text-uppercase" 
                                            style={{ 
                                                background: '#0c0b10',
                                                height: '56px',
                                                fontSize: '18px',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            <span
                                                style={{
                                                    background: '-webkit-linear-gradient(45deg, #fff, #007bff 80%)',
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                    lineHeight: '2',
                                                    display: 'inline-block',
                                                    fontSize: '14px'
                                                }}
                                            >
                                                <Translation>
                                                    {(t) => <>{t('main.continueShopping')}</>}
                                                </Translation>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div
                                    style={{
                                        padding: '0 5%',
                                        top: '0',
                                        zIndex: '999',
                                        background: '#1b1a20'
                                    }}
                                    className="d-flex py-2 position-sticky sticky-cart-header"
                                >
                                    <div className="w-25 d-flex align-items-center">
                                        <div
                                            className="float-cart__close-btn text-left m-0 rounded-circle"
                                            style={{
                                                height: '25px',
                                                width: '25px'
                                            }}
                                            onClick={() => this.closeFloatCart()}
                                        >
                                            <MdArrowBack style={{width:'25px',height:'25px'}} />
                                        </div>
                                    </div>
                                    <h3 
                                        className="w-75 m-0 align-self-center"
                                        style={{
                                            background: '-webkit-linear-gradient(45deg, #fff, #007bff 80%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            color: 'transparent',
                                            lineHeight: '2'
                                        }}
                                    >
                                        <Translation>
                                            {(t) => <>{t('main.shoppingCart')}</>}
                                        </Translation>
                                    </h3>
                                </div>
                                

                                <div className="float-cart__shelf-container">
                                    {products}

                                    <div
                                        className="d-flex"
                                        style={{
                                            padding: '2rem 5%'
                                        }}
                                    >
                                        <button
                                            className="shadow-none btn text-white rounded-0 border-0 w-100 py-3 text-center"
                                            style={{
                                                letterSpacing: '0.5px',
                                                background: '#000'
                                            }}
                                            onClick={this.removeAllProducts}
                                        >
                                            <span
                                                style={{
                                                    background: '-webkit-linear-gradient(45deg, #fff, #007bff 80%)',
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                    display: 'inline-block',
                                                    lineHeight: '2'
                                                }}
                                            >
                                                <Translation>
                                                    {(t) => <>{t('main.deleteAllItems')}</>}
                                                </Translation>
                                            </span>
                                        </button>
                                    </div>
                                </div>

                                <div className="float-cart__footer p-0">
                                    <div 
                                        className="d-flex"
                                        style={{
                                            padding: '3% 5%'
                                        }}
                                    >
                                        <div 
                                            className="sub align-self-center text-light" 
                                            style={{
                                                lineHeight:'2'
                                            }}
                                        >
                                            <small>
                                                <Translation>
                                                    {(t) => <>{t('main.subtotal')}</>}
                                                </Translation>
                                            </small><br/ >
                                            <small>
                                                <Translation>
                                                    {(t) => <>{t('main.discount')}</>}
                                                </Translation> (3%)
                                            </small><br/ >
                                            <Translation>
                                                {(t) => <>{t('main.total')}</>}
                                            </Translation>
                                        </div>
                                        <div 
                                            className="sub-price align-self-center"
                                            style={{
                                                lineHeight:'2'
                                            }}
                                        >
                                            <p 
                                                className="sub-price__val text-secondary font-weight-bold mb-0"
                                                style={{
                                                    fontSize: '1rem'
                                                }}
                                            >
                                                <small>{cartTotal.totalPrice.toLocaleString('en-US')} {currency}</small><br />
                                                <small>- {this.discountPrice().toLocaleString('en-US')} {currency}</small><br />
                                                {this.allTotalPrice().toLocaleString('en-US')} {currency}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="d-flex" style={{height:'56px'}}>
                                        <div 
                                            className="buy-btn mt-0 py-0 w-50 float-left bg-transparent mr-0 d-flex align-items-center justify-content-center"
                                        >
                                            <button 
                                                onClick={() => {
                                                        this.props.history.push('/')
                                                        this.closeFloatCart()
                                                    }
                                                }
                                                className="d-block shadow-none py-2 w-100 text-decoration-none text-white shop-btn text-uppercase" 
                                                style={{ 
                                                    background: '#0c0b10',
                                                    height: '56px',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis',
                                                    overflow: 'hidden'
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        background: '-webkit-linear-gradient(45deg, #fff, #007bff 80%)',
                                                        WebkitBackgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent',
                                                        lineHeight: '2',
                                                        display: 'inline-block',
                                                        fontSize: '14px'
                                                    }}
                                                >
                                                    <Translation>
                                                        {(t) => <>{t('main.continueShopping')}</>}
                                                    </Translation>
                                                </span>
                                            </button>
                                        </div>
                                        <div 
                                            className="buy-btn mt-0 w-50 float-left py-2 d-flex align-items-center justify-content-center" 
                                            onClick={() => this.proceedToCheckout()}
                                        >
                                            <span
                                                style={{
                                                    lineHeight: '2',
                                                    fontSize: '14px'
                                                }}
                                            >
                                                <Translation>
                                                    {(t) => <>{t('main.checkout')}</>}
                                                </Translation>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    }

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    cartProducts: state.cart.products,
    newProduct: state.cart.productToAdd,
    productToRemove: state.cart.productToRemove,
    productToChange: state.cart.productToChange,
    cartTotal: state.total.data
})

export default connect(
    mapStateToProps,
    {
        loadCart, removeProduct , changeProductQuantity , updateTotalCart
    }
)(withRouter(FloatCart))