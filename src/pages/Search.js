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
    IonMenuButton,
    IonList,
    IonItem,
    IonLabel
} from '@ionic/react'
import CartIcon from '../components/layout/CartIcon'
import MenuButton from '../components/layout/MenuButton'
import { 
    Tab, 
    Tabs, 
    TabList, 
    TabPanel
} from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import Moment from 'react-moment'
import 'moment-timezone'
import { removeOrder } from '../store/order/actions'
import { Translation } from 'react-i18next'


class Search extends Component 
{
    static propTypes = {
        removeOrder: PropTypes.func.isRequired
    }

    render() {

        const { orderIDs } = this.props

        const orderList = orderIDs.length ? (
            <>
                {
                    orderIDs.map(p => (
                        <IonItem
                            detail={true}
                            lines="none"
                            onClick={() => this.props.history.push(`/order/${p.id}`)}
                            style={{
                                '--background': 'transparent',
                                fontSize: '16px',
                                borderLeft: '5px solid #007bff'
                            }}
                            className="m-3 bg-white shadow-sm rounded"
                            key={p.id}
                        >
                            <IonLabel>
                                <h2
                                    className="font-weight-bold text-dark"
                                >{p.id}</h2> 
                                <small className="text-muted">
                                    <Moment
                                        format="D MMMM YYYY , h:mm a"
                                    >
                                        {p.checkout.contact.dateRaw}
                                    </Moment>
                                </small>
                            </IonLabel>
                        </IonItem>
                    ))
                }
            </>
        ) : (
            <>
            </>
        )

        const invoiceList = orderIDs.length ? (
            <>
                {
                    orderIDs.map(p => (
                        <IonItem
                            detail={true}
                            lines="none"
                            onClick={() => this.props.history.push(`/invoice/${p.id}`)}
                            style={{
                                '--background': 'transparent',
                                fontSize: '16px',
                                borderLeft: '5px solid #007bff'
                            }}
                            className="m-3 bg-white shadow-sm rounded"
                            key={p.id}
                        >
                            <IonLabel>
                                <h2
                                    className="font-weight-bold text-dark"
                                >{p.invoice_number}</h2> 
                                <small className="text-muted">
                                    <Moment
                                        format="D MMMM YYYY , h:mm a"
                                    >
                                        {p.checkout.contact.dateRaw}
                                    </Moment>
                                </small>
                            </IonLabel>
                        </IonItem>
                    ))
                }
            </>
        ) : (
            <>
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
                                    {(t) => <>{t('main.menu.order')}</>}
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
                    <Tabs className="react-tabs search-tabs">
                        <TabList className="react-tabs__tab-list d-flex rounded-lg border border-primary mb-0">
                            <Tab 
                                className="d-block react-tabs__tab w-50 border-top-0 border-left-0 border-bottom-0 border-primary rounded-0 text-center shadow-none font-weight-bold"
                                style={{
                                    bottom: '0',
                                    lineHeight: '2',
                                    fontSize: '18px',
                                    color: '#007bff'
                                }}
                            >
                                <Translation>
                                    {(t) => <>{t('main.order')}</>}
                                </Translation>
                            </Tab>
                            <Tab 
                                className="d-block react-tabs__tab w-50 border-0 rounded-0 text-center shadow-none font-weight-bold"
                                style={{
                                    bottom: '0',
                                    lineHeight: '2',
                                    fontSize: '18px',
                                    color: '#007bff'
                                }}
                            >Invoice</Tab>
                        </TabList>

                        <TabPanel>
                            <IonList
                                className="py-0 mx-n3 bg-transparent"
                            >
                                {orderList}
                            </IonList>
                        </TabPanel>
                        <TabPanel>
                            <IonList
                                className="py-0 mx-n3 bg-transparent"
                            >
                                {invoiceList}
                            </IonList>
                        </TabPanel>
                    </Tabs>                    
                </IonContent>

            </IonPage>
        )
    }
}

const mapStateToProps = state => ({
    orderIDs: state.order
})

export default connect(mapStateToProps, {removeOrder})(withRouter(Search))