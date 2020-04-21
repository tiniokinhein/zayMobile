import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import Spinner from '../../layout/Spinner'
import { withRouter } from 'react-router-dom'
import { fetchOils } from '../../../store/foods/actions'

import { FOODS } from '../../../api'
import { db } from '../../../firebase'
import { currency } from '../../../utils'
import { addProduct } from '../../../store/cart/actions'

import Skeleton from 'react-loading-skeleton'
import { Translation } from 'react-i18next'


class List extends React.Component 
{
    static propTypes = {
        fetchOils: PropTypes.func.isRequired,
        oils: PropTypes.array.isRequired,
        addProduct: PropTypes.func.isRequired
    }

    state = {
        oils: [],
        isLoading: false
    }

    handleFetchFoods = () => {
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
                oils: allItems,
                isLoading: true
            })
        })

    }

    componentDidMount() {
        this.handleFetchFoods()
    }

    render() {

        const { oils } = this.state

        const oilList = oils.length ? (
            <>
                <div
                    className="d-flex mb-2"
                >
                    <h5
                        className="mt-0 mb-0 text-dark font-weight-bold"
                        style={{
                            fontSize: '18px',
                            lineHeight: '2'
                        }}
                    >
                        <Translation>
                            {(t) => <>{t('main.list.oils')}</>}
                        </Translation>
                    </h5>
                    <div
                        className="text-dark ml-auto align-self-center"
                        style={{
                            fontSize: '14px',
                            lineHeight: '2',
                            cursor: 'pointer'
                        }}
                        onClick={() => this.props.history.push('/oil')}
                    >
                        <Translation>
                            {(t) => <>{t('main.list.seeAll')}</>}
                        </Translation> &#10230;
                    </div>
                </div>

                {
                    oils.slice(0,5).map((oil,index) => {

                        oil.quantity = 1

                        return(
                            <div
                                className="mb-3 bg-white shadow-sm rounded"
                                key={index}
                                style={{
                                    borderLeft: '5px solid #6fbd0c'
                                }}
                            >
                                <div className="d-flex py-2">
                                    <div className="pr-3">
                                        <img
                                            src={oil.image}
                                            alt={oil.title}
                                            className="rounded-left"
                                            style={{
                                                width: '100px',
                                                objectFit: 'cover',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => this.props.history.push(`/oil/${oil.slug}`)}
                                        />
                                    </div>
                                    <div
                                        className="align-self-center flex-grow-1"
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
                                            >( {oil.weight} )</small>
                                        </div>
                                        <div
                                            className="pt-2"
                                        >
                                            <small 
                                                className="font-weight-bold"
                                                style={{
                                                    fontSize: '11px'
                                                }}
                                            >{oil.price.toLocaleString('en-US')} {currency}</small> 
                                        </div>
                                    </div>

                                    <div
                                        className="align-self-center mr-3"
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
                    className="d-flex mb-2"
                >
                    <div
                        className="mt-0 mb-0"
                    >
                        <Skeleton width={100} height={28} />
                    </div>
                    <div
                        className="ml-auto"
                    >
                        <Skeleton width={108} height={28} />
                    </div>
                </div>
                <div
                    className="mb-3 rounded"
                >
                    <Skeleton height={108} width={'100%'} />
                </div>
                <div
                    className="mb-3 rounded"
                >
                    <Skeleton height={108} width={'100%'} />
                </div>
                <div
                    className="mb-3 rounded"
                >
                    <Skeleton height={108} width={'100%'} />
                </div>
                <div
                    className="mb-3 rounded"
                >
                    <Skeleton height={108} width={'100%'} />
                </div>
                <div
                    className="mb-3 rounded"
                >
                    <Skeleton height={108} width={'100%'} />
                </div>
            </>
        )
        

        return(
            <div
                className="pb-3 pt-4"
            >
                {oilList}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    oils: state.foods.oils
})

export default connect(mapStateToProps , {fetchOils,addProduct})(withRouter(List))