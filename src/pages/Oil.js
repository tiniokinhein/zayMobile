import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButtons,
    IonBackButton
} from '@ionic/react'
import AllOil from '../components/foods/oil/AllList'
import CartIcon from '../components/layout/CartIcon'
import { Translation } from 'react-i18next'

class Oil extends Component 
{
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
                            <IonBackButton text="" style={{'--color':'rgb(0, 123, 255)'}} />
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
                                <Translation>
                                    {(t) => <>{t('main.list.oils')}</>}
                                </Translation>
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
                    <AllOil />
                </IonContent>

            </IonPage>
        )
    }
}

export default withRouter(Oil)