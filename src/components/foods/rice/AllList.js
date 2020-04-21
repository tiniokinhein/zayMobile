import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import Spinner from '../../layout/Spinner'
import { withRouter } from 'react-router-dom'
import { fetchRices } from '../../../store/foods/actions'

import { FOODS } from '../../../api'
import { db } from '../../../firebase'
import { currency } from '../../../utils'
import { addProduct } from '../../../store/cart/actions'
import Skeleton from 'react-loading-skeleton'
import { Translation } from 'react-i18next'

class AllList extends React.Component 
{
    static propTypes = {
        fetchRices: PropTypes.func.isRequired,
        rices: PropTypes.array.isRequired,
        addProduct: PropTypes.func.isRequired
    }

    state = {
        rices: [],
        isLoading: false
    }

    componentDidMount() {
        this.handleFetchFoods()
    }

    handleFetchFoods = () => {
        db 
        .ref(FOODS)
        .orderByChild('category/title')
        .equalTo('ဆန်')
        .on('value' , snapshot => {
            let data = []
            snapshot.forEach(snap => {
                data.push(snap.val())
            })
            const allItems = data.reverse()

            this.setState({
                rices: allItems,
                isLoading: true
            })
        })
    }

    render() {

        const { rices } = this.state

        const riceList = rices.length ? (
            <>
                <div className="row mx-n2">
                    {
                        rices.map((rice,index) => {

                            rice.quantity = 1

                            return(
                                <div 
                                    className="col-6 col-md-4 mb-3 px-2" 
                                    key={index}
                                >
                                    <div 
                                        className="shadow-sm rounded bg-white h-100"
                                    >
                                        <div className="position-relative">
                                            <img 
                                                src={rice.image} 
                                                alt={rice.title} 
                                                className="w-100 rounded-top"
                                                style={{
                                                    height: '180px',
                                                    objectFit: 'cover',
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => this.props.history.push(`/rice/${rice.slug}`)}
                                            />
                                            <div
                                                className="position-absolute text-white"
                                                style={{
                                                    left: '0',
                                                    bottom: '0',
                                                    right: '0'
                                                }}
                                            >
                                                <div 
                                                    className="px-2 pb-2 d-table w-100 font-weight-bold"
                                                    style={{
                                                        color: '#000',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => this.props.history.push(`/rice/${rice.slug}`)}
                                                >
                                                    <h6 
                                                        className="mt-3 mb-1 text-white"
                                                        style={{
                                                            fontSize: '14px',
                                                            textShadow: 'rgb(0, 0, 0) 0px 0px 5px'
                                                        }}
                                                    >{rice.title}</h6>
                                                    <small 
                                                        className="float-left font-weight-bold pr-3" 
                                                        style={{fontSize:'10px'}}
                                                    >( {rice.weight} )</small>
                                                    <small 
                                                        className="float-right font-weight-bold"
                                                        style={{
                                                            fontSize: '11px'
                                                        }}
                                                    >{rice.price.toLocaleString('en-US')} {currency}</small>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            className="btn border-0 w-100 py-3 text-white text-center d-inline-block rounded rounded-top-custom-none shadow-none"
                                            style={{
                                                background: '#6fbd0c',
                                                fontSize: '14px'
                                            }}
                                            onClick={() => this.props.addProduct(rice)}
                                        >
                                            <Translation>
                                                {(t) => <>{t('main.list.addToCart')}</>}
                                            </Translation>
                                        </button>
                                    </div>
                                </div>
                            )

                        })
                    }
                </div>
            </>
        ) : (
            <>
                <div className="row mx-n2">
                    <div 
                        className="col-6 col-md-4 mb-3 px-2" 
                    >
                        <Skeleton height={235} />
                    </div>
                    <div 
                        className="col-6 col-md-4 mb-3 px-2" 
                    >
                        <Skeleton height={235} />
                    </div>
                    <div 
                        className="col-6 col-md-4 mb-3 px-2" 
                    >
                        <Skeleton height={235} />
                    </div>
                    <div 
                        className="col-6 col-md-4 mb-3 px-2" 
                    >
                        <Skeleton height={235} />
                    </div>
                    <div 
                        className="col-6 col-md-4 mb-3 px-2" 
                    >
                        <Skeleton height={235} />
                    </div>
                    <div 
                        className="col-6 col-md-4 mb-3 px-2" 
                    >
                        <Skeleton height={235} />
                    </div>
                    <div 
                        className="col-6 col-md-4 mb-3 px-2" 
                    >
                        <Skeleton height={235} />
                    </div>
                    <div 
                        className="col-6 col-md-4 mb-3 px-2" 
                    >
                        <Skeleton height={235} />
                    </div>
                    <div 
                        className="col-6 col-md-4 mb-3 px-2" 
                    >
                        <Skeleton height={235} />
                    </div>
                </div>
            </>
        )
        

        return(
            <div>
                {riceList}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    rices: state.foods.rices,
    addProduct: PropTypes.func.isRequired
})

export default connect(mapStateToProps , {fetchRices,addProduct})(withRouter(AllList))