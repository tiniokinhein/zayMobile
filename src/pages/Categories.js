import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButtons,
    IonMenuButton,
    IonList,
    IonItem,
    IonLabel
} from '@ionic/react'
import CartIcon from '../components/layout/CartIcon'
import MenuButton from '../components/layout/MenuButton'
import VEGETABLE_IMG from '../assets/images/vegetable.png'
import RICE_IMG from '../assets/images/rice.png'
import OIL_IMG from '../assets/images/oil.png'
import { db } from '../firebase'
import { FOODS } from '../api'
import Skeleton from 'react-loading-skeleton'
import { Translation } from 'react-i18next'

class Categories extends Component 
{
    state = {
        vegetables: [],
        rices: [],
        oils: []
    }

    getVegetables = () => {
        db
        .ref(FOODS)
        .orderByChild('category/title')
        .equalTo('ဟင်းသီးဟင်းရွက်')
        .on('value' , snapshot => {
            let data = []
            snapshot.forEach(snap => {
                data.push(snap.val())
            })

            this.setState({
                vegetables: data
            })
        })
    }

    getRices = () => {
        db
        .ref(FOODS)
        .orderByChild('category/title')
        .equalTo('ဆန်')
        .on('value' , snapshot => {
            let data = []
            snapshot.forEach(snap => {
                data.push(snap.val())
            })

            this.setState({
                rices: data
            })
        })
    }

    getOils = () => {
        db
        .ref(FOODS)
        .orderByChild('category/title')
        .equalTo('ဆီ')
        .on('value' , snapshot => {
            let data = []
            snapshot.forEach(snap => {
                data.push(snap.val())
            })

            this.setState({
                oils: data
            })
        })
    }

    componentDidMount() {
        this.getVegetables()
        this.getRices()
        this.getOils()
    }

    render() {

        const { vegetables , rices , oils } = this.state

        const VEGETABLES = vegetables.length ? (
            <IonItem 
                detail="false"
                lines="full"
                style={{
                    cursor: 'pointer',
                    '--background': '#f8f9fa',
                    '--border-color': 'rgba(51, 51, 51, 0.08)'
                }}
                onClick={() => this.props.history.push('/vegetable')}
            >
                <IonLabel
                    className="py-4 m-0"
                >
                    <div
                        className="d-flex"
                    >
                        <img
                            src={VEGETABLE_IMG}
                            alt="ဟင်းသီးဟင်းရွက်"
                            className="rounded mr-3"
                            style={{
                                width: '80px',
                                background: '#fff'
                            }}
                        />
                        <div
                            className="flex-grow-1 align-self-center font-weight-bold text-dark"
                            style={{
                                fontSize: '18px',
                                lineHeight: '2'
                            }}
                        >
                            <Translation>
                                {(t) => <>{t('main.list.vegetables')}</>}
                            </Translation>
                            <h6 
                                className="m-0 text-muted font-weight-light"
                                style={{
                                    fontSize: '12px'
                                }}
                            >( {vegetables.length} <Translation>{(t) =><>{t('main.items')}</>}</Translation> )</h6>
                        </div>
                        <div
                            className="ml-auto align-self-center text-muted"
                            style={{
                                fontSize: '16px'
                            }}
                        >
                            &#10230;
                        </div>
                    </div>
                </IonLabel>
            </IonItem>
        ) : (
            <>
                <div 
                    className="py-4 px-3"
                    style={{
                        borderBottom: '1px solid rgba(51, 51, 51, 0.08)'
                    }}
                >
                    <div className="d-flex">
                        <div className="mr-3">
                            <Skeleton width={80} height={80} />
                        </div>
                        <div className="flex-grow-1 align-self-center">
                            <Skeleton width={100} height={24} /> <br />
                            <Skeleton width={40} height={16} />
                        </div>
                        <div className="ml-auto align-self-center">
                            <Skeleton width={22} height={10} />
                        </div>
                    </div>
                </div>
            </>
        )

        const RICES = rices.length ? (
            <IonItem 
                detail="false"
                lines="full"
                style={{
                    cursor: 'pointer',
                    '--background': '#f8f9fa',
                    '--border-color': 'rgba(51, 51, 51, 0.08)'
                }}
                onClick={() => this.props.history.push('/rice')}
            >
                <IonLabel
                    className="py-4 m-0"
                >
                    <div
                        className="d-flex"
                    >
                        <img
                            src={RICE_IMG}
                            alt="ဆန်"
                            className="rounded mr-3"
                            style={{
                                width: '80px',
                                background: '#fff'
                            }}
                        />
                        <div
                            className="flex-grow-1 align-self-center font-weight-bold text-dark"
                            style={{
                                fontSize: '18px',
                                lineHeight: '2'
                            }}
                        >
                            <Translation>
                                {(t) => <>{t('main.list.rices')}</>}
                            </Translation>
                            <h6 
                                className="m-0 text-muted font-weight-light"
                                style={{
                                    fontSize: '12px'
                                }}
                            >( {rices.length} <Translation>{(t) =><>{t('main.items')}</>}</Translation> )</h6>
                        </div>
                        <div
                            className="ml-auto align-self-center text-muted"
                            style={{
                                fontSize: '16px'
                            }}
                        >
                            &#10230;
                        </div>
                    </div>
                </IonLabel>
            </IonItem>
        ) : (
            <>
                <div 
                    className="py-4 px-3"
                    style={{
                        borderBottom: '1px solid rgba(51, 51, 51, 0.08)'
                    }}
                >
                    <div className="d-flex">
                        <div className="mr-3">
                            <Skeleton width={80} height={80} />
                        </div>
                        <div className="flex-grow-1 align-self-center">
                            <Skeleton width={100} height={24} /> <br />
                            <Skeleton width={40} height={16} />
                        </div>
                        <div className="ml-auto align-self-center">
                            <Skeleton width={22} height={10} />
                        </div>
                    </div>
                </div>
            </>
        )

        const OILS = oils.length ? (
            <IonItem 
                detail="false"
                lines="none"
                style={{
                    cursor: 'pointer',
                    '--background': '#f8f9fa',
                    '--border-color': 'rgba(51, 51, 51, 0.08)'
                }}
                onClick={() => this.props.history.push('/oil')}
            >
                <IonLabel
                    className="py-4 m-0"
                >
                    <div
                        className="d-flex"
                    >
                        <img
                            src={OIL_IMG}
                            alt="ဆီ"
                            className="rounded mr-3"
                            style={{
                                width: '80px',
                                background: '#fff'
                            }}
                        />
                        <div
                            className="flex-grow-1 align-self-center font-weight-bold text-dark"
                            style={{
                                fontSize: '18px',
                                lineHeight: '2'
                            }}
                        >
                            <Translation>
                                {(t) => <>{t('main.list.oils')}</>}
                            </Translation>
                            <h6 
                                className="m-0 text-muted font-weight-light"
                                style={{
                                    fontSize: '12px'
                                }}
                            >( {oils.length} <Translation>{(t) =><>{t('main.items')}</>}</Translation> )</h6>
                        </div>
                        <div
                            className="ml-auto align-self-center text-muted"
                            style={{
                                fontSize: '16px'
                            }}
                        >
                            &#10230;
                        </div>
                    </div>
                </IonLabel>
            </IonItem>
        ) : (
            <>
                <div 
                    className="py-4 px-3"
                    // style={{
                    //     borderBottom: '1px solid rgba(51, 51, 51, 0.08)'
                    // }}
                >
                    <div className="d-flex">
                        <div className="mr-3">
                            <Skeleton width={80} height={80} />
                        </div>
                        <div className="flex-grow-1 align-self-center">
                            <Skeleton width={100} height={24} /> <br />
                            <Skeleton width={40} height={16} />
                        </div>
                        <div className="ml-auto align-self-center">
                            <Skeleton width={22} height={10} />
                        </div>
                    </div>
                </div>
            </>
        )

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
                                <Translation>
                                    {(t) => <>{t('main.menu.categories')}</>}
                                </Translation>
                            </span>
                        </IonTitle>
                        <IonButtons slot="end">
                            <CartIcon />
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent 
                    className="ion-none-padding"
                    style={{
                        '--background':'#f8f9fa'
                    }}
                >
                    <IonList
                        style={{
                            background: '#f8f9fa'
                        }}
                    >
                        {VEGETABLES}
                        {RICES}
                        {OILS}
                    </IonList>
                </IonContent>
            </IonPage>
        )
    }
}

export default withRouter(Categories)