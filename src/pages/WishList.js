import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButtons,
    IonMenuButton
} from '@ionic/react'
import CartIcon from '../components/layout/CartIcon'
import MenuButton from '../components/layout/MenuButton'
import { removeWish , fetchWish } from '../store/whishlist/actions'
import { addProduct } from '../store/cart/actions'
import Wishes from '../components/Wishes'

class WishList extends Component 
{
    static propTypes = {
        fetchWish: PropTypes.func.isRequired,
        wishes: PropTypes.array.isRequired,
        addProduct: PropTypes.func.isRequired,
        add_wish: PropTypes.object,
        remove_wish: PropTypes.object
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.add_wish !== this.props.add_wish) {
            this.addWish(nextProps.add_wish)
        }
        if(nextProps.remove_wish !== this.props.remove_wish) {
            this.removeWish(nextProps.remove_wish)
        }
    }

    addWish = wish => {
        const { wishes } = this.props
        let wishInList = false
        wishes.forEach(cp => {
            if(cp.id === wish.id) {
                cp.quantity += wish.quantity
                wishInList = true
            }
        })
        if(!wishInList) {
            wishes.push(wish)
        }
    }

    removeWish = wish => {
        const { wishes } = this.props
        const index = wishes.findIndex(p => p.id === wish.id)
        if(index >= 0) {
            wishes.splice(index,1)
        }
    }

    render() {

        const { wishes , removeWish , addProduct } = this.props

        const productLists = wishes.map(p => {
            return(
                <Wishes key={p.id} wish={p} removeWish={removeWish} addProduct={addProduct} />
            )
        })


        return (
            <IonPage>
                <IonHeader className="ion-no-border">
                    <IonToolbar
                        style={{
                            '--ion-background': '#f8f9fa',
                            '--background': '#f8f9fa'
                        }}
                    >
                        <IonButtons slot="start">
                            <IonMenuButton>
                                <MenuButton />
                            </IonMenuButton>
                        </IonButtons>
                        <IonTitle className="ion-text-center">
                            <span
                                style={{
                                    background: '-webkit-linear-gradient(45deg, #007bff, #00fff3 80%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontSize: '20px',
                                    lineHeight: '2',
                                    display: 'inline-block'
                                }}
                            >
                                ‌ရွေးချယ်ထားသော ပစ္စည်းများ
                            </span>
                        </IonTitle>
                        <IonButtons slot="end">
                            <CartIcon />
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent 
                    className="ion-padding"
                    style={{
                        '--background':'#f8f9fa'
                    }}
                >
                    {productLists}          
                </IonContent>

            </IonPage>
        )
    }
}

const mapStateToProps = state => ({
    wishes: state.wishlist.wishes,
    add_wish: state.wishlist.add_wish,
    remove_wish: state.wishlist.remove_wish
})

export default connect(
    mapStateToProps,
    {
        removeWish,
        fetchWish,
        addProduct
    }
)(withRouter(WishList))