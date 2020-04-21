import React, { Component } from 'react'
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
import VegetableList from '../components/foods/vegetable/List'
import RiceList from '../components/foods/rice/List'
import OilList from '../components/foods/oil/List'
import CartIcon from '../components/layout/CartIcon'
import MenuButton from '../components/layout/MenuButton'

class Home extends Component 
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
                            <IonMenuButton>
                                <MenuButton />
                            </IonMenuButton>
                        </IonButtons>
                        <IonTitle 
                            className="ion-text-center"
                            style={{
                                fontSize: '25px'
                            }}
                        >
                            <span
                                style={{
                                    background: '-webkit-linear-gradient(45deg, #007bff, #00fff3 80%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontFamily: "'Roboto', sans-serif",
                                    fontWeight: '900',
                                    letterSpacing: '-2px',
                                    lineHeight: '2',
                                    display: 'inline-block'
                                }}
                            >BAGAN</span> <span
                                            style={{
                                                background: '-webkit-linear-gradient(45deg, #fff, #007bff 80%)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                lineHeight: '2',
                                                display: 'inline-block'
                                            }}
                                            >စျေး</span>
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
                    <VegetableList /> 
                    <OilList />
                    <RiceList />
                </IonContent>

            </IonPage>
        )
    }
}


export default withRouter(Home)