import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FOODS } from '../../../api'
import { db } from '../../../firebase'
import { currency } from '../../../utils'
// import Spinner from '../../../components/layout/Spinner'
import { addProduct } from '../../../store/cart/actions'
import { withRouter } from 'react-router-dom'

import Skeleton from 'react-loading-skeleton'
import { Translation } from 'react-i18next'


class Related extends Component 
{
    static propTypes = {
        addProduct: PropTypes.func.isRequired
    }

    state = {
        items: [],
        isLoading: false
    }

    getItems = () => {
        db 
        .ref(FOODS)
        .orderByChild('category/title')
        .equalTo('ဆီ')
        .on('value' , snapshot => {
            let data = []
            snapshot.forEach(snap => {
                data.push(snap.val())
            })
            const allItems = data.reverse()

            this.setState({
                items: allItems,
                isLoading: true
            })
        })
    }

    componentDidMount() {
        this.getItems()
    }

    render() {

        const { items } = this.state

        const Lists = items.length ? (
            <>
                <h5
                    className="mt-0 mb-3 d-inline-block text-dark font-weight-bold"
                    style={{
                        fontSize: '18px'
                    }}
                >
                    <Translation>
                        {(t) => <>{t('main.relatedItems')}</>}
                    </Translation>
                </h5>

                {
                    items.slice(0,5).map((oil) => {

                        oil.quantity = 1

                        return(
                            <div
                                className="mb-3 bg-white shadow-sm rounded"
                                key={oil.id}
                                style={{
                                    borderLeft: '5px solid #6fbd0c'
                                }}
                            >
                                <div className="d-flex">
                                    <div className="pr-3">
                                        <img
                                            src={oil.image}
                                            alt={oil.title}
                                            className="rounded-0"
                                            style={{
                                                width: '100px',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => this.props.history.push(`/oil/${oil.slug}`)}
                                        />
                                    </div>
                                    <div
                                        className="align-self-center flex-grow-1 py-2"
                                        style={{
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => this.props.history.push(`/oil/${oil.slug}`)}
                                    >
                                        <h6 
                                            className="m-0 pb-1 text-dark"
                                            style={{
                                                fontSize: '14px'
                                            }}
                                        >{oil.title}</h6>
                                        <div>
                                            <small 
                                                className="font-weight-bold" 
                                                style={{fontSize:'10px'}}
                                            ><span className="text-secondary">(</span>{oil.weight}<span className="text-secondary">)</span></small>
                                        </div>
                                        <div>
                                            <small 
                                                className="font-weight-bold"
                                                style={{
                                                    fontSize: '10px'
                                                }}
                                            >{oil.price.toLocaleString('en-US')} {currency}</small> 
                                        </div>
                                    </div>

                                    <div
                                        className="align-self-center mr-3 py-2"
                                    >
                                        <button
                                            className="btn border-0 w-100 py-2 text-white text-center d-inline-block rounded shadow-none"
                                            style={{
                                                background: '#6fbd0c',
                                                fontSize: '13px'
                                            }}
                                            onClick={() => this.props.addProduct(oil)}
                                        >
                                            <Translation>
                                                {(t) => <>{t('main.list.addToCart')}</>}
                                            </Translation>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </>
        ) : (
            <>
                <div
                    className="mt-0 mb-3 px-0 d-inline-block"
                >
                    <Skeleton width={100} height={24} />
                </div>
                <div
                    className="mb-3 rounded"
                >
                    <Skeleton height={100} width={'100%'} />
                </div>
                <div
                    className="mb-3 rounded"
                >
                    <Skeleton height={100} width={'100%'} />
                </div>
                <div
                    className="mb-3 rounded"
                >
                    <Skeleton height={100} width={'100%'} />
                </div>
                <div
                    className="mb-3 rounded"
                >
                    <Skeleton height={100} width={'100%'} />
                </div>
                <div
                    className="mb-3 rounded"
                >
                    <Skeleton height={100} width={'100%'} />
                </div>
            </>
        )
        

        return (
            <div 
                className="px-3 pt-3" 
                style={{
                    background:'#f8f9fa',
                    paddingBottom: '6rem'
                }}
            >
                {Lists}
            </div>
        )
    }
}

export default connect(null, {addProduct})(withRouter(Related))