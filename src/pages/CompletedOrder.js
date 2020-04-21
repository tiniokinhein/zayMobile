import React, { Component } from 'react'
import { ORDERURL } from '../api'
import { db } from '../firebase'
import { withRouter } from 'react-router-dom'
import {
    IonHeader, 
    IonPage,
    IonContent,
    IonToolbar,
    IonButtons,
    IonTitle,
    IonMenuButton
} from '@ionic/react'
import CartIcon from '../components/layout/CartIcon'
import { currency } from '../utils'
import Moment from 'react-moment'
import 'moment-timezone'
import Skeleton from 'react-loading-skeleton'
import MenuButton from '../components/layout/MenuButton'
// import QRCode from 'qrcode.react'
// import FAVICON from '../assets/images/logo.jpg'
import { addOrder } from '../store/order/actions'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import { IoMdClose } from 'react-icons/io'
import { Translation } from 'react-i18next'


class CompletedOrder extends Component 
{
    static propTypes = {
        addOrder: PropTypes.func.isRequired
    }

    state = {
        item: null,
        show: false
    }
    
    getItem = () => {
        const id  = this.props.match.params.id
        db.ref(ORDERURL+`/${id}`).on('value' , snapshot => {
            const data = snapshot.val()
            this.setState({
                item: data
            })
        })
        this.showModal()
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

    // downloadQR = () => {
    //     const canvas = document.getElementById('HpQrcode')
    //     const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")

    //     let downloadLink = document.createElement("a")
    //     downloadLink.href = pngUrl
    //     downloadLink.download = "order-qr.png"
    //     document.body.appendChild(downloadLink)
    //     downloadLink.click()
    //     document.body.removeChild(downloadLink)
    // }

    // downloadInvoiceQR = () => {
    //     const canvas = document.getElementById('HpQrcode')
    //     const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")

    //     let downloadLink = document.createElement("a")
    //     downloadLink.href = pngUrl
    //     downloadLink.download = "invoice-qr.png"
    //     document.body.appendChild(downloadLink)
    //     downloadLink.click()
    //     document.body.removeChild(downloadLink)
    // }

    componentDidMount() {
        this.getItem()
    }

    render() {

        const { item , show } = this.state

        const successStyle = {
            content : {
                left: '0',
                right: '0',
                top: '0',
                bottom: '0',
                background: 'rgba(255, 255, 255, 0.42)',
                border: '0',
                padding: '0',
                borderRadius: '0'
            }
        }

        // const qr = {
        //     value: `${item ? <>{item.id}</> : null}`,
        //     size: 128,
        //     fgColor: '#000000',
        //     bgColor: '#ffffff',
        //     level: 'L',
        //     renderAs: 'canvas',
        //     includeMargin: false,
        //     includeImage: true,
        //     imageH: 15,
        //     imageW: 15,
        //     imageX: 0,
        //     imageY: 0,
        //     imageSrc: FAVICON,
        //     imageExcavate: true,
        //     centerImage: true,
        // }

        // const qr_invoice = {
        //     value: `${item ? <>{item.invoice_number}</> : null}`,
        //     size: 128,
        //     fgColor: '#000000',
        //     bgColor: '#ffffff',
        //     level: 'L',
        //     renderAs: 'canvas',
        //     includeMargin: false,
        //     includeImage: true,
        //     imageH: 15,
        //     imageW: 15,
        //     imageX: 0,
        //     imageY: 0,
        //     imageSrc: FAVICON,
        //     imageExcavate: true,
        //     centerImage: true,
        // }

        const orderList = 
                        <div className="w-100" id="capture">
                            {
                                item ? (
                                    <div key={item.id}>
                                        <div className="pt-3 pb-5">
                                            <h4
                                                className="font-weight-bold mb-2 mt-0"
                                                style={{
                                                    lineHeight: '2'
                                                }}
                                            >
                                                <Translation>
                                                    {(t) => <>{t('main.addressDetails')}</>}
                                                </Translation>
                                            </h4>

                                            <div
                                                className="shadow-sm rounded bg-white py-4 px-4"
                                                style={{
                                                    borderLeft: '5px solid #6fbd0c'
                                                }}
                                            >
                                                <h6
                                                    className="mt-0 mb-3"
                                                    style={{
                                                        lineHeight: '2'
                                                    }}
                                                >
                                                    <span>
                                                        <Translation>
                                                            {(t) => <>{t('main.orderDate')}</>}
                                                        </Translation> <br />
                                                        <strong>
                                                            <Moment format="D MMMM YYYY, h:mm a">{item.checkout.contact.dateRaw}</Moment>
                                                        </strong>
                                                    </span><br /><br />
                                                    <span>
                                                        <Translation>
                                                            {(t) => <>{t('main.orderNo')}</>}
                                                        </Translation> <br />
                                                        <i 
                                                            className="font-weight-bold" 
                                                            style={{
                                                                color:'#6fbd0c'
                                                            }}
                                                        >{item.id}</i>
                                                    </span><br /><br />
                                                    <span>
                                                        <Translation>
                                                            {(t) => <>{t('main.invoiceNo')}</>}
                                                        </Translation> <br />
                                                        <i 
                                                            className="font-weight-bold" 
                                                            style={{
                                                                color:'#6fbd0c'
                                                            }}
                                                        >{item.invoice_number}</i>
                                                    </span><br /><br />
                                                </h6>
                                                <p
                                                    className="font-weight-bold mb-3 text-secondary"
                                                    style={{
                                                        lineHeight: '2'
                                                    }}
                                                >
                                                    {
                                                        item.checkout.contact.name &&
                                                        <>{item.checkout.contact.name}<br /></>
                                                    }
                                                    {
                                                        item.checkout.contact.email &&
                                                        <>{item.checkout.contact.email}<br /></>
                                                    }
                                                    {
                                                        item.checkout.contact.phone &&
                                                        <>{item.checkout.contact.phone}<br /></>
                                                    }
                                                    {
                                                        item.checkout.contact.address &&
                                                        <>{item.checkout.contact.address}<br /></>
                                                    }
                                                    <br />
                                                </p>
                                                <p
                                                    className="mb-3"
                                                    style={{
                                                        lineHeight: '2'
                                                    }}
                                                >
                                                    <Translation>
                                                        {(t) => <>{t('main.payment')}</>}
                                                    </Translation> <br />
                                                    <strong>- {item.checkout.payment}</strong>
                                                </p>
                                                <p
                                                    className="mb-0"
                                                    style={{
                                                        lineHeight: '2'
                                                    }}
                                                >
                                                    <Translation>
                                                        {(t) => <>{t('main.deliveryTime')}</>}
                                                    </Translation> <br />
                                                    <strong>
                                                        {
                                                            item.products.delivery === 'ပုံမှန်ကြာချိန် (၂)ရက်' &&
                                                            <>
                                                                - {item.products.delivery} 
                                                                <small className="ml-2">
                                                                    ( <Moment 
                                                                        add={{ days:2 }}
                                                                        format="D MMMM YYYY , h:mm a"
                                                                    >
                                                                        {item.checkout.contact.dateRaw}
                                                                    </Moment> )
                                                                </small>
                                                            </>
                                                        }
                                                        {
                                                            item.products.delivery === 'ကြာချိန် (၁)ရက်' &&
                                                            <>
                                                                - {item.products.delivery} 
                                                                <small className="ml-2">
                                                                    ( <Moment 
                                                                        add={{ days:1 }}
                                                                        format="D MMMM YYYY , h:mm a"
                                                                    >
                                                                        {item.checkout.contact.dateRaw}
                                                                    </Moment> )
                                                                </small>
                                                            </>
                                                        }
                                                        {
                                                            item.products.delivery === 'ချက်ချင်း (၂)နာရီအတွင်း' &&
                                                            <>
                                                                - {item.products.delivery} 
                                                                <small className="ml-2">
                                                                    ( <Moment 
                                                                        add={{ hours:2 }}
                                                                        format="D MMMM YYYY , h:mm a"
                                                                    >
                                                                        {item.checkout.contact.dateRaw}
                                                                    </Moment> )
                                                                </small>
                                                            </>
                                                        }
                                                    </strong>                        
                                                </p>
                                            </div>

                                            
                                        </div>
                                        <h4
                                            className="font-weight-bold mb-3 mt-0"
                                            style={{
                                                lineHeight: '2'
                                            }}
                                        >
                                            <Translation>
                                                {(t) => <>{t('main.purchaseOrders')}</>}
                                            </Translation>
                                        </h4>
                                        {
                                            item.products.orderItems.map((p, index) => (

                                                <div 
                                                    className="d-flex mb-3 bg-white shadow-sm rounded" 
                                                    key={index}
                                                    style={{
                                                        borderLeft: '5px solid #6fbd0c'
                                                    }}
                                                >
                                                    <div className="pr-3">
                                                        <img
                                                            src={p.image}
                                                            alt={p.title}
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
                                                        >{p.title}</h6>
                                                        <small>({p.weight})</small>
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
                                                                        </Translation> -</strong> ( {p.quantity} )
                                                                </small>
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <small>
                                                                <strong>
                                                                    <Translation>
                                                                        {(t) => <>{t('main.itemPrice')}</>}
                                                                    </Translation> -</strong> {p.price} {currency}
                                                            </small>
                                                        </div>
                                                        <div>
                                                            <small>
                                                                <strong>
                                                                    <Translation>
                                                                        {(t) => <>{t('main.subtotal')}</>}
                                                                    </Translation> -</strong> {p.item_total} {currency}
                                                            </small>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <div 
                                            className="d-flex bg-white px-3 py-3 shadow-sm rounded"
                                            style={{
                                                borderLeft: '5px solid #6fbd0c',
                                                lineHeight: '2'
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
                                                    </Translation> <small>( {item.products.delivery} )</small></strong><br />
                                                <strong>
                                                    <Translation>
                                                        {(t) => <>{t('main.discount')}</>}
                                                    </Translation> <small>(3%)</small></strong><br />
                                                <strong>
                                                    <Translation>
                                                        {(t) => <>{t('main.total')}</>}
                                                    </Translation>
                                                </strong>
                                            </div>
                                            <div className="ml-auto text-right">
                                                <strong>{item.products.subtotal} {currency}</strong><br />
                                                <strong>
                                                    {
                                                        item.products.delivery_fee === '0' ? (
                                                            <>
                                                                <Translation>
                                                                    {(t) => <>{t('main.deliveryFreeShipping')}</>}
                                                                </Translation>
                                                            </>
                                                        ) : (
                                                            <><small>( + )</small> {item.products.delivery_fee} {currency}</>
                                                        )
                                                    }
                                                </strong><br />
                                                <strong><small>( - )</small> {item.products.discount_price} {currency}</strong><br />
                                                <strong>{item.products.total} {currency}</strong>
                                            </div>
                                        </div>
                                        <div
                                            className="pt-5 pb-4"
                                        >
                                            <button 
                                                onClick={() => this.props.history.push('/')}
                                                className="d-block shadow-none py-3 w-100 text-decoration-none text-white" 
                                                style={{ 
                                                    height: '56px',
                                                    background: '#6fbd0c'
                                                }}
                                            >
                                                <Translation>
                                                    {(t) => <>{t('main.continueShopping')}</>}
                                                </Translation>
                                            </button>
                                        </div>

                                        <Modal
                                            isOpen={show}
                                            contentLabel="ကျေးဇူးတင်ပါသည်"
                                            onRequestClose={() => {
                                                this.closeModal()
                                                this.props.addOrder(item)
                                            }}
                                            style={successStyle}
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
                                                    <button
                                                        className="position-absolute bg-white shadow-lg rounded-circle border-0"
                                                        style={{
                                                            left: '50%',
                                                            bottom: '15%',
                                                            marginLeft: '-25px',
                                                            width: '50px',
                                                            height: '50px',
                                                            fontSize: '22px'
                                                        }}
                                                        onClick={() => {
                                                            this.props.addOrder(item)
                                                            this.closeModal()
                                                        }}
                                                    >
                                                        <IoMdClose />
                                                    </button>
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
                                                            {(t) => <>{t('main.thankyouPurchasing')}</>}
                                                        </Translation>
                                                    </div>
                                                </div>
                                            </div>
                                        </Modal>
                                        
                                        {/* <div className="row mb-5">
                                            <div className="HpQrcode col-6 d-flex flex-column">
                                                <QRCode
                                                    id="HpQrcode"
                                                    value={qr.value}
                                                    size={qr.size}
                                                    fgColor={qr.fgColor}
                                                    bgColor={qr.bgColor}
                                                    level={qr.level}
                                                    renderAs={qr.renderAs}
                                                    includeMargin={qr.includeMargin}
                                                    imageSettings={
                                                        qr.includeImage ? {
                                                            src: qr.imageSrc,
                                                            height: qr.imageH,
                                                            width: qr.imageW,
                                                            x: qr.centerImage ? null : qr.imageX,
                                                            y: qr.centerImage ? null : qr.imageY,
                                                            excavate: qr.imageExcavate,
                                                        } : null
                                                    }
                                                    style={{
                                                        width: '100%',
                                                        height: '100%'
                                                    }}
                                                />

                                                <p
                                                    className="my-3 text-center"
                                                    style={{
                                                        lineHeight: '2',
                                                        color: '#6fbd0c'
                                                    }}
                                                >အော်ဒါ QR Code</p>

                                                <button
                                                    className="d-inline-block w-100 btn btn-primary rounded-0 border-0 py-2"
                                                    style={{
                                                        lineHeight: '2'
                                                    }}
                                                    onClick={this.downloadQR}
                                                >
                                                    ဒေါင်းထားမည်
                                                </button>
                                            </div>
                                            <div className="HpQrcode col-6 d-flex flex-column">
                                                <QRCode
                                                    id="HpQrcode"
                                                    value={qr_invoice.value}
                                                    size={qr_invoice.size}
                                                    fgColor={qr_invoice.fgColor}
                                                    bgColor={qr_invoice.bgColor}
                                                    level={qr_invoice.level}
                                                    renderAs={qr_invoice.renderAs}
                                                    includeMargin={qr_invoice.includeMargin}
                                                    imageSettings={
                                                        qr_invoice.includeImage ? {
                                                            src: qr_invoice.imageSrc,
                                                            height: qr_invoice.imageH,
                                                            width: qr_invoice.imageW,
                                                            x: qr_invoice.centerImage ? null : qr_invoice.imageX,
                                                            y: qr_invoice.centerImage ? null : qr_invoice.imageY,
                                                            excavate: qr_invoice.imageExcavate,
                                                        } : null
                                                    }
                                                    style={{
                                                        width: '100%',
                                                        height: '100%'
                                                    }}
                                                />

                                                <p
                                                    className="my-3 text-center"
                                                    style={{
                                                        lineHeight: '2',
                                                        color: '#6fbd0c'
                                                    }}
                                                >Invoice QR Code</p>

                                                <button
                                                    className="d-inline-block w-100 btn btn-primary rounded-0 border-0 py-2"
                                                    style={{
                                                        lineHeight: '2'
                                                    }}
                                                    onClick={this.downloadInvoiceQR}
                                                >
                                                    ဒေါင်းထားမည်
                                                </button>
                                            </div>
                                        </div> */}
                                    </div>
                                ) : (
                                    <>
                                        <div className="pt-3 pb-5">
                                            <div
                                                className="mb-2 mt-0"
                                            >
                                                <Skeleton width={182} height={40} />
                                            </div>
                                            <div
                                                className=""
                                            >
                                                <Skeleton width={'100%'} height={512} />
                                            </div>
                                            <div
                                                className="mb-3 mt-0"
                                            >
                                                <Skeleton width={72} height={40} />
                                            </div>

                                            <div className="mb-3 rounded">
                                                <Skeleton width={'100%'} height={100} />
                                            </div>
                                            <div className="mb-3 rounded">
                                                <Skeleton width={'100%'} height={100} />
                                            </div>
                                            <div className="mb-3 rounded">
                                                <Skeleton width={'100%'} height={100} />
                                            </div>

                                            <div 
                                                className="rounded"
                                            >
                                                <Skeleton width={'100%'} height={160} />
                                            </div>
                                            <div
                                                className="mt-5 mb-4"
                                            >
                                                <Skeleton width={'100%'} height={56} />
                                            </div>

                                        </div>
                                    </>
                                )
                            }
                        </div>
                        
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
                                    {(t) => <>{t('main.orderList')}</>}
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
                    {
                        orderList ? (
                            <>
                                {orderList}
                            </>
                        ) : (
                            <div className="d-table w-100 h-100">
                                <div className="d-table-cell align-middle text-center" style={{ height: '100vh' , minHeight: '600px' }}>
                                    <p>
                                        <Translation>
                                            {(t) => <>{t('main.noOrder')}</>}
                                        </Translation> <br />
                                        <button 
                                            className="btn bg-transparent rounded-0 border-0 shadow-none text-primary"
                                            onClick={() => this.props.history.push('/')}
                                        >
                                            <Translation>
                                                {(t) => <>{t('main.goShopping')}</>}
                                            </Translation>
                                        </button>
                                    </p>
                                </div>
                            </div>
                        )
                    }
                    
                </IonContent>
            </IonPage>
        )
    }
}

export default connect(null, {addOrder})(withRouter(CompletedOrder))