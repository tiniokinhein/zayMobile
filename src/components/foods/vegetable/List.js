import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import Carousel from "react-multi-carousel"
// import "react-multi-carousel/lib/styles.css"
// import Spinner from '../../layout/Spinner'
import { withRouter } from 'react-router-dom'
import { fetchVegetables } from '../../../store/foods/actions'

import { FOODS } from '../../../api'
import { db } from '../../../firebase'
import { currency } from '../../../utils'
import { addProduct } from '../../../store/cart/actions'
import { addWish , removeWish } from '../../../store/whishlist/actions'
import { AiOutlineHeart } from 'react-icons/ai'

import Skeleton from 'react-loading-skeleton'
import Swiper from 'react-id-swiper'
import 'swiper/css/swiper.css'
import { Translation } from 'react-i18next'


class List extends React.Component 
{
    static propTypes = {
        fetchVegetables: PropTypes.func.isRequired,
        vegetables: PropTypes.array.isRequired,
        addProduct: PropTypes.func.isRequired,
        add_wish: PropTypes.object,
        remove_wish: PropTypes.object,
        wishes: PropTypes.array.isRequired
    }

    state = {
        isLoading: false,
        vegetables: []
    }

    handleFetchFoods = () => {
        db 
        .ref(FOODS)
        .orderByChild('category/title')
        .equalTo('ဟင်းသီးဟင်းရွက်')
        .on('value' , snapshot => {
            let data = []
            snapshot.forEach(snap => {
                data.push(snap.val())
            })
            const allItems = data.reverse()

            this.setState({
                vegetables: allItems,
                isLoading: true
            })
        })

    }

    componentDidMount() {
        this.handleFetchFoods()
        window.scrollTo(0,0)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if(nextProps.add_wish !== this.props.add_wish) {
            this.addWish(nextProps.add_wish)
        }
        if(nextProps.remove_wish !== this.props.remove_wish) {
            this.removeWish(nextProps.remove_wish)
        }
    }

    addWish = wish => {
        const { wishes } = this.props
        let wishInList = false
        wishes.forEach(cp => {
            if(cp.id === wish.id) {
                cp.quantity += wish.quantity
                wishInList = true
            }
        })
        if(!wishInList) {
            wishes.push(wish)
        }
    }

    removeWish = wish => {
        const { wishes } = this.props
        const index = wishes.findIndex(p => p.id === wish.id)
        if(index >= 0) {
            wishes.splice(index,1)
        }
    }

    render() {

        const { vegetables } = this.state

        const params = {
            spaceBetween: 15,
            loop: true,
            // centeredSlides: true,
            scrollbar: {
                el: '.swiper-scrollbar',
                hide: false
            },
            breakpoints: {
                0: {
                    slidesPerView: 2
                },
                464: {
                    slidesPerView: 2
                },
                1024: {
                    slidesPerView: 3
                }
            },
        }

        const vegetableList = vegetables.length ? (
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
                            {(t) => <>{t('main.list.vegetables')}</>}
                        </Translation>
                    </h5>
                    <div
                        className="text-dark ml-auto align-self-center"
                        style={{
                            fontSize: '14px',
                            lineHeight: '2',
                            cursor: 'pointer'
                        }}
                        onClick={() => this.props.history.push('/vegetable')}
                    >
                        <Translation>
                            {(t) => <>{t('main.list.seeAll')}</>}
                        </Translation> &#10230;
                    </div>
                </div>

                <Swiper {...params}>
                    {
                        vegetables.map((vegetable,index) => {

                            vegetable.quantity = 1

                            return(
                                <div 
                                    className="shadow-sm rounded bg-white h-100"
                                    key={index}
                                >
                                    <div className="position-relative">
                                        <img 
                                            src={vegetable.image} 
                                            alt={vegetable.title} 
                                            className="w-100 rounded-top"
                                            onClick={() => this.props.history.push(`/vegetable/${vegetable.slug}`)}
                                            style={{
                                                height: '180px',
                                                objectFit: 'cover',
                                                cursor: 'pointer'
                                            }}
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
                                                onClick={() => this.props.history.push(`/vegetable/${vegetable.slug}`)}
                                            >
                                                <h6 
                                                    className="mt-3 mb-1 text-white"
                                                    style={{
                                                        fontSize: '14px',
                                                        textShadow: 'rgb(0, 0, 0) 0px 0px 5px'
                                                    }}
                                                >{vegetable.title}</h6>
                                                <small 
                                                    className="float-left font-weight-bold pr-3" 
                                                    style={{fontSize:'10px'}}
                                                >( {vegetable.weight} )</small>
                                                <small 
                                                    className="float-right font-weight-bold"
                                                    style={{
                                                        fontSize: '11px'
                                                    }}
                                                >{vegetable.price.toLocaleString('en-US')} {currency}</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div 
                                        className="d-flex rounded-bottom"
                                        style={{
                                            background: '#6fbd0c'
                                        }}
                                    >
                                        
                                        {/* <button
                                            className="btn rounded-0 border-0 shadow-none text-white"
                                            onClick={() => this.props.addWish(vegetable)}
                                        >
                                            <AiOutlineHeart />
                                        </button>                                 */}
                                                                             
                                        <button
                                            className="btn border-0 flex-grow-1 py-3 text-white text-center d-inline-block rounded rounded-top-custom-none shadow-none"
                                            style={{
                                                background: '#6fbd0c',
                                                fontSize: '14px'
                                            }}
                                            onClick={() => this.props.addProduct(vegetable)}
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
                </Swiper>
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
                <div className="row mx-n2">
                    <div 
                        className="rounded col-6 col-md-4 px-2"
                    >
                        <Skeleton height={235} />
                    </div>
                    <div 
                        className="rounded col-6 col-md-4 px-2"
                    >
                        <Skeleton height={235} />
                    </div>
                    <div 
                        className="rounded d-none d-md-block col-md-4 px-2"
                    >
                        <Skeleton height={235} />
                    </div>
                </div>
            </>
        )

        return(
            <div className="pb-3">
                {vegetableList}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    vegetables: state.foods.vegetables,
    wishes: state.wishlist.wishes,
    add_wish: state.wishlist.add_wish,
    remove_wish: state.wishlist.remove_wish
})

export default connect(mapStateToProps , {fetchVegetables,addProduct,addWish,removeWish})(withRouter(List))