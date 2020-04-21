import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FOODS } from '../../../api'
import { db } from '../../../firebase'
import { currency } from '../../../utils'
import { 
    IonPage, 
    IonToolbar, 
    IonHeader, 
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent
} from '@ionic/react'
import CartIcon from '../../layout/CartIcon'
// import Spinner from '../../layout/Spinner'
import Related from './Related'
import { withRouter } from 'react-router-dom'
import { addProduct } from '../../../store/cart/actions'

import Skeleton from 'react-loading-skeleton'
import { Translation } from 'react-i18next'


class Detail extends Component 
{
    static propTypes = {
        addProduct: PropTypes.func.isRequired,
    }

    state = {
        p: null,
        isLoading: false
    }

    getPDetail = () => {
        const slug = this.props.match.params.slug
        db
        .ref(FOODS+`/${slug}`)
        .on('value' , snapshot => {
            const data = snapshot.val()
            this.setState({
                p: {
                    ...data,
                    quantity: 1
                },
                isLoading: true
            })
        })
    }

    componentDidMount() {
        this.getPDetail()
    }

    componentDidUpdate(prevProps) {
        if(prevProps.match.params.slug !== this.props.match.params.slug) {
            this.getPDetail()
        }
    }

    render() {

        const { p } = this.state

        const pTitle = p ? (
            <p 
                className="mb-0 text-center" 
                key={p.id}
                style={{
                    background: '-webkit-linear-gradient(45deg, #007bff, #00fff3 80%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'transparent',
                    fontSize: '20px',
                    lineHeight: '2'
                }}
            >{p.title}</p>
        ) : null

        const pDetail = p ? (
                        <div 
                            key={p.slug} 
                            className="px-3 pb-5" 
                            style={{
                                background:'#f8f9fa',
                                borderTopLeftRadius: '15%',
                                borderTopRightRadius: '15%'
                            }}
                        >
                            <div className="mx-n3" style={{height:'5px',background:'#f8f9fa'}} />
                            <div
                                className="bg-white shadow rounded border-0"
                            >
                                <img 
                                    src={p.image} 
                                    alt={p.title} 
                                    className="w-auto d-block mx-auto" 
                                    style={{
                                        height: '300px',
                                    }}
                                />
                                <div
                                    className="px-4 pb-4 pt-3"
                                >
                                    <h6 
                                        className="my-0"
                                        style={{
                                            fontSize: '20px',
                                            lineHeight: '2'
                                        }}
                                    >{p.title}</h6>
                                    <small 
                                        className="font-weight-bold" 
                                        style={{
                                            fontSize:'14px'
                                        }}
                                    >( {p.weight} ) - </small>
                                    <small 
                                        className="font-weight-bold"
                                        style={{
                                            fontSize: '14px'
                                        }}
                                    >{p.price.toLocaleString('en-US')} {currency}</small>
                                </div>
                            </div>
                            {
                                p.description &&
                                <div className="py-3">
                                    <p 
                                        className="mb-0 text-secondary"
                                        style={{
                                            lineHeight: '2',
                                            fontSize: '14px'
                                        }}
                                    >
                                        {p.description}
                                    </p>
                                </div>
                            }
                        </div>
                    ) : (
                        <>
                            <div 
                                className="px-3 pb-5" 
                                style={{
                                    background:'#f8f9fa',
                                    borderTopLeftRadius: '15%',
                                    borderTopRightRadius: '15%'
                                }}
                            >
                                <div className="mx-n3" style={{height:'10px',marginBottom:'-5px',background:'#f8f9fa'}} />
                                <div className="rounded">
                                    <Skeleton height={470} width={'100%'} />
                                </div>
                            </div>
                        </>
                    )

        const pCart =
                    <div
                        className="position-fixed"
                        style={{
                            left: '0',
                            right: '0',
                            bottom: '0',
                            zIndex: '5'
                        }}
                    >
                        <div
                            className="d-flex"
                            style={{
                                background: '#000'
                            }}
                        >
                            <div 
                                className="text-white px-4 align-self-center"
                                style={{
                                    lineHeight: '2'
                                }}
                            >
                                {
                                    p ? (
                                        <small key={p.slug}>{p.price.toLocaleString('en-US')} {currency}</small>
                                    ) : null
                                }
                            </div>
                            <button
                                className="btn border-0 flex-grow-1 py-3 text-white text-center d-inline-block rounded-0 shadow-none"
                                style={{
                                    background: '#6fbd0c',
                                    fontSize: '16px',
                                    letterSpacing: '0.5px',
                                    lineHeight: '2'
                                }}
                                onClick={() => this.props.addProduct(p)}
                            >
                                <Translation>
                                    {(t) => <>{t('main.list.addToCart')}</>}
                                </Translation>
                            </button>
                        </div>
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
                            <IonBackButton defaultHref="/oil" text="" style={{'--color':'rgb(0, 123, 255)'}} />
                        </IonButtons>
                        <IonTitle>
                            {pTitle}
                        </IonTitle>
                        <IonButtons slot="end">
                            <CartIcon />
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                
                <IonContent 
                    style={{
                        '--background':'#f8f9fa'
                    }}
                >
                    {pDetail}
                    <Related />
                    {pCart}
                </IonContent>
            </IonPage>
        )
    }
}


export default connect(null,{addProduct})(withRouter(Detail))