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
import { FiMoreVertical } from 'react-icons/fi'
import { removeOrder } from '../store/order/actions'
import { currency } from '../utils'
import Moment from 'react-moment'
import 'moment-timezone'
import Modal from 'react-modal'
import { Translation } from 'react-i18next'

class OrderID extends Component 
{
    state = {
        p: null,
        show: false
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

    showModal = () => {
        this.setState({
            show: true
        })
    }

    closeModal = () => {
        this.setState({
            show: false
        })
    }

    componentDidMount() {
        this.getOrder()
    }

    render() {

        const { p , show } = this.state

        const deleteStyle = {
            content : {
                left: '0',
                right: '0',
                top: '0',
                bottom: '0',
                background: 'transparent',
                backgroundColor: 'transparent',
                border: '0',
                padding: '0',
                borderRadius: '0'
            }
        }

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
                {p.id}
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
                            {(t) => <>{t('main.orderNo')}</>}
                        </Translation>
                    </h4>
                    <i 
                        className="font-weight-bold" 
                        style={{
                            color:'#6fbd0c'
                        }}
                    >{p.id}</i>
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

        const openModalList = 
            <Modal
                isOpen={show}
                contentLabel="ဖိုင်ဖျက်မည်"
                onRequestClose={this.closeModal}
                style={deleteStyle}
            >
                <div
                    className="col-12 col-lg-6 mx-auto h-100 d-table"
                >
                    <div
                        className="d-table-cell align-middle position-relative"
                        style={{
                            height: '300px'
                        }}
                    >
                        <div
                            className="rounded-lg shadow-lg bg-white text-center py-5 px-4 font-weight-bold"
                            style={{
                                lineHeight: '2',
                                fontSize: '22px',
                                color: '#6fbd0c',
                                margin: '0 8%',
                                letterSpacing: '0.5px'
                            }}
                        >
                            <Translation>
                                {(t) => <>{t('main.orderDelete')}</>}
                            </Translation>
                            <div
                                className="mt-4"
                            >
                                <button
                                    className="btn btn-danger border-0 rounded-sm shadow-none text-white px-3 py-2"
                                    style={{
                                        lineHeight: '2'
                                    }}
                                    onClick={() => {
                                        this.props.removeOrder()
                                        this.props.history.push('/search')
                                        this.closeModal()
                                    }}
                                >
                                    <Translation>
                                        {(t) => <>{t('main.orderDeleteYes')}</>}
                                    </Translation>
                                </button>
                                <button
                                    className="btn btn-primary border-0 rounded-sm shadow-none text-white px-3 py-2 ml-4"
                                    style={{
                                        lineHeight: '2'
                                    }}
                                    onClick={this.closeModal}
                                >
                                    <Translation>
                                        {(t) => <>{t('main.orderDeleteNo')}</>}
                                    </Translation>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>

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
                            <IonButton
                                onClick={this.showModal}
                            >
                                <FiMoreVertical
                                    style={{
                                        fontSize:'23px',
                                        color:'#000',
                                        cursor: 'pointer',
                                        height: '48px'
                                    }}
                                />
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
                    {openModalList}              
                </IonContent>

            </IonPage>
        )
    }
}

const mapStateToProps = state => ({
    orderIDs: state.order
})

export default connect(mapStateToProps, {removeOrder})(withRouter(OrderID))