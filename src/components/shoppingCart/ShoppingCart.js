import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
    loadCart,
    removeProduct,
    changeProductQuantity
} from '../../store/cart/actions'
import { updateTotalCart } from '../../store/total/actions'
import { Link , withRouter } from 'react-router-dom'
import ShoppingCartProducts from './ShoppingCartProducts'

class ShoppingCart extends Component 
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

    componentWillReceiveProps(nextProps) {
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

    addProduct = product => {
        const { cartProducts , updateTotalCart } = this.props
        let productAlreadyInCart = false
        cartProducts.forEach(cp => {
            if(cp.id === product.id) {
                cp.quantity = product.quantity
                productAlreadyInCart = true
            }
        })
        if(!productAlreadyInCart) {
            cartProducts.push(product)
        }
        updateTotalCart(cartProducts)
    }

    removeProduct = product => {
        const { cartProducts , updateTotalCart } = this.props
        const index = cartProducts.findIndex(p => p.id === product.id)
        if(index >= 0) {
            cartProducts.splice(index , 1)
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
            // alert(`Checkout - Subtotal: ${currencyFormat} ${formatPrice(totalPrice , currencyId)}`)
            this.props.history.push('/checkout')
        }
    }

    continueHandleLink = () => {
        this.props.history.push('/')
    }

    render() {

        const { cartProducts , removeProduct , changeProductQuantity , cartTotal } = this.props

        const products = cartProducts.map(p => {
            return(
                <ShoppingCartProducts key={p.id} product={p} removeProduct={removeProduct} changeProductQuantity={changeProductQuantity} />
            )
        })

        let classes = ['float-cart-o h-100']

        if(!!this.state.isOpen) {
            classes.push('float-cart-o--open')
        }

        return (
            <div className={classes.join(' ')}>
                {
                    products.length <=0 ? (
                        <div className="d-table w-100 h-100">
                            <div className="d-table-cell align-middle">
                                <p className="text-center text-secondary mb-0">
                                    စျေးခြင်းတောင်းထဲတွင် ပစ္စည်းများ မရှိသေးပါ ...<br /><br />
                                    <button 
                                        className="rounded-0 border-0 py-0 px-1 m-0 font-weight-bold bg-transparent"
                                        onClick={() => this.props.history.push('/')}
                                        style={{
                                            color: '#6fbd0c'
                                        }}
                                    >ပစ္စည်းများ ဝယ်မည်</button>
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="">
                                {products}
                                <div className="d-flex justify-content-between mt-3 mb-5 p-3 bg-white shadow-sm rounded">
                                    <p className="mb-0">အားလုံးစုပေါင်း</p>
                                    <p 
                                        className="mb-0 font-weight-bold"
                                        style={{
                                            fontSize: '1rem'
                                        }}
                                    >{cartTotal.totalPrice} {cartTotal.currencyFormat}</p>
                                </div>
                                <div className="d-flex mb-5">
                                    <div className="w-50">
                                        <button 
                                            className="shadow-none py-3 w-100 text-white rounded-left"
                                            onClick={this.continueHandleLink}
                                            style={{
                                                background: '#333'
                                            }}
                                        >ထပ်ဝယ်မည်</button>
                                    </div>
                                    <div className="w-50">
                                        <button 
                                            className="shadow-none w-100 py-3 text-white rounded-right" 
                                            onClick={() => this.proceedToCheckout()}
                                            style={{
                                                background: '#6fbe0b'
                                            }}
                                        >ငွေရှင်းမည်</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) 
                }
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
    { loadCart , removeProduct , changeProductQuantity , updateTotalCart }
)(withRouter(ShoppingCart))