import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ORDERURL } from '../api'
import { db } from '../firebase'
import {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonButtons,
    IonBackButton,
    IonButton
} from '@ionic/react'
import { currency } from '../utils'
import Moment from 'react-moment'
import 'moment-timezone'
import { Translation } from 'react-i18next'

class InvoiceID extends Component 
{
    state = {
        p: null
    }

    getOrder = () => {
        const id = this.props.match.params.id
        db 
        .ref(ORDERURL+`/${id}`)
        .on('value', snapshot => {
            const data = snapshot.val()
            this.setState({
                p: data
            })
        })
    }

    componentDidMount() {
        this.getOrder()
    }

    render() {

        const { p } = this.state

        const titleList = p ? (
            <span
                key={p.slug}
                style={{
                    background: '-webkit-linear-gradient(45deg, #007bff, #00fff3 80%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: '20px',
                    lineHeight: '2',
                    display: 'inline-block'
                }}
            >
                {p.invoice_number}
            </span>
        ) : null

        const lists = p ? (
            <div key={p.id}>
                <div 
                    className="pt-3 pb-4 mb-4 px-3 bg-white rounded shadow-sm"
                    style={{
                        borderLeft: '5px solid #007bff'
                    }}
                >
                    <h4
                        className="text-secondary mb-2 mt-0"
                        style={{
                            lineHeight: '2'
                        }}
                    >
                        <Translation>
                            {(t) => <>{t('main.orderDate')}</>}
                        </Translation>
                    </h4>
                    <Moment format="D MMMM YYYY, h:mm a">{p.checkout.contact.dateRaw}</Moment>
                </div>
                <div 
                    className="pt-3 pb-4 mb-4 px-3 bg-white rounded shadow-sm"
                    style={{
                        borderLeft: '5px solid #007bff'
                    }}
                >
                    <h4
                        className="text-secondary mb-2 mt-0"
                        style={{
                            lineHeight: '2'
                        }}
                    >
                        <Translation>
                            {(t) => <>{t('main.invoiceNo')}</>}
                        </Translation>
                    </h4>
                    <i 
                        className="font-weight-bold" 
                        style={{
                            color:'#6fbd0c'
                        }}
                    >{p.invoice_number}</i>
                </div>
                <div 
                    className="pt-3 pb-4 mb-4 px-3 bg-white rounded shadow-sm"
                    style={{
                        borderLeft: '5px solid #007bff'
                    }}
                >
                    <h4
                        className="text-secondary mb-2 mt-0"
                        style={{
                            lineHeight: '2'
                        }}
                    >
                        <Translation>
                            {(t) => <>{t('main.addressDetails')}</>}
                        </Translation>
                    </h4>
                    <p
                        className="font-weight-bold mb-0 text-secondary"
                        style={{
                            lineHeight: '2'
                        }}
                    >
                        {
                            p.checkout.contact.name &&
                            <>{p.checkout.contact.name}<br /></>
                        }
                        {
                            p.checkout.contact.email &&
                            <>{p.checkout.contact.email}<br /></>
                        }
                        {
                            p.checkout.contact.phone &&
                            <>{p.checkout.contact.phone}<br /></>
                        }
                        {
                            p.checkout.contact.address &&
                            <>{p.checkout.contact.address}</>
                        }
                    </p>
                </div>
                <div 
                    className="pt-3 pb-4 mb-4 px-3 bg-white rounded shadow-sm"
                    style={{
                        borderLeft: '5px solid #007bff'
                    }}
                >
                    <h4
                        className="text-secondary mb-2 mt-0"
                        style={{
                            lineHeight: '2'
                        }}
                    >
                        <Translation>
                            {(t) => <>{t('main.payment')}</>}
                        </Translation>
                    </h4>
                    <strong>{p.checkout.payment}</strong>
                </div>
                <div 
                    className="pt-3 pb-4 mb-4 px-3 bg-white rounded shadow-sm"
                    style={{
                        borderLeft: '5px solid #007bff'
                    }}
                >
                    <h4
                        className="text-secondary mb-2 mt-0"
                        style={{
                            lineHeight: '2'
                        }}
                    >
                        <Translation>
                            {(t) => <>{t('main.deliveryTime')}</>}
                        </Translation>
                    </h4>
                    <strong>
                        {p.products.delivery} 
                        <small className="ml-2">
                            ( <Moment 
                                format="D MMMM YYYY , h:mm a"
                            >
                                {p.checkout.contact.dateRaw}
                            </Moment> )
                        </small>
                    </strong> 
                </div>
                <div className="pb-5">
                    <h4
                        className="font-weight-bold mb-2 mt-0"
                        style={{
                            lineHeight: '2'
                        }}
                    >
                        <Translation>
                            {(t) => <>{t('main.purchaseOrders')}</>}
                        </Translation>
                    </h4>
                    {
                        p.products.orderItems.map((po, index) => (
                            <div 
                                className="d-flex mb-3 bg-white shadow-sm rounded" 
                                key={index}
                                style={{
                                    borderLeft: '5px solid #007bff'
                                }}
                            >
                                <div className="pr-3">
                                    <img
                                        src={po.image}
                                        alt={po.title}
                                        className="rounded-0"
                                        style={{
                                            width: '100px'
                                        }}

                                    />
                                </div>
                                <div
                                    className="align-self-center flex-grow-1"
                                >
                                    <h6 
                                        className="m-0 pb-1 text-dark font-weight-bold"
                                        style={{
                                            fontSize: '16px'
                                        }}
                                    >{po.title}</h6>
                                    <small>({po.weight})</small>
                                </div>
                                <div
                                    className="align-self-center ml-auto mr-3 text-right"
                                >
                                    <div>
                                        <p className="mb-0">
                                            <small>
                                                <strong>
                                                    <Translation>
                                                        {(t) => <>{t('main.itemQuantity')}</>}
                                                    </Translation> -</strong> ( {po.quantity} )
                                            </small>
                                        </p>
                                    </div>
                                    <div>
                                        <small>
                                            <strong>
                                                <Translation>
                                                    {(t) => <>{t('main.itemPrice')}</>}
                                                </Translation> -</strong> {po.price} {currency}
                                        </small>
                                    </div>
                                    <div>
                                        <small>
                                            <strong>
                                                <Translation>
                                                    {(t) => <>{t('main.subtotal')}</>}
                                                </Translation> -</strong> {po.item_total} {currency}
                                        </small>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                    <div 
                        className="d-flex bg-white px-3 py-3 shadow-sm rounded"
                        style={{
                            lineHeight: '2',
                            borderLeft: '5px solid #007bff'
                        }}
                    >
                        <div>
                            <strong>
                                <Translation>
                                    {(t) => <>{t('main.subtotal')}</>}
                                </Translation>
                            </strong><br />
                            <strong>
                                <Translation>
                                    {(t) => <>{t('main.deliveryFee')}</>}
                                </Translation> <small>( {p.products.delivery} )</small>
                            </strong><br />
                            <strong>
                                <Translation>
                                    {(t) => <>{t('main.discount')}</>}
                                </Translation> <small>(3%)</small>
                            </strong><br />
                            <strong>
                                <Translation>
                                    {(t) => <>{t('main.total')}</>}
                                </Translation>
                            </strong>
                        </div>
                        <div className="ml-auto text-right">
                            <strong>{p.products.subtotal} {currency}</strong><br />
                            <strong>
                                {
                                    p.products.delivery_fee === '0' ? (
                                        <>
                                            <Translation>
                                                {(t) => <>{t('main.deliveryFreeShipping')}</>}
                                            </Translation>
                                        </>
                                    ) : (
                                        <><small>( + )</small> {p.products.delivery_fee} {currency}</>
                                    )
                                }
                            </strong><br />
                            <strong><small>( - )</small> {p.products.discount_price} {currency}</strong><br />
                            <strong>{p.products.total} {currency}</strong>
                        </div>
                    </div>
                </div>
            </div>
        ) : null

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
                            {titleList}
                        </IonTitle>
                        <IonButtons slot="end">
                            <IonButton>
                            </IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>

                <IonContent 
                    className="ion-padding"
                    style={{
                        '--background':'#f8f9fa'
                    }}
                >
                    {lists}              
                </IonContent>

            </IonPage>
        )
    }
}

const mapStateToProps = state => ({
    orderIDs: state.order
})

export default connect(mapStateToProps)(withRouter(InvoiceID))