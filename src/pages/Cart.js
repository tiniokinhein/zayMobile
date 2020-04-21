import React, { Component } from 'react'
import {
    IonHeader, 
    IonPage,
    IonContent,
    IonToolbar,
    IonButtons,
    IonTitle,
    IonMenuButton
} from '@ionic/react'
import { withRouter } from 'react-router-dom'
import ShoppingCart from '../components/shoppingCart/ShoppingCart'

class Cart extends Component {
    render() {
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
                            <IonMenuButton />
                        </IonButtons>
                        <IonTitle className="ion-text-center">စျေးခြင်း</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonContent 
                    className="ion-padding"
                    style={{
                        '--background':'#f8f9fa'
                    }}
                >
                    <ShoppingCart />
                </IonContent>

            </IonPage>
        )
    }
}

export default withRouter(Cart)