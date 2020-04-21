import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { currency } from '../utils'
import { IoMdTrash } from 'react-icons/io'

class Wishes extends Component 
{
    static propTypes = {
        wish: PropTypes.object.isRequired,
        removeWish: PropTypes.func.isRequired,
        addProduct: PropTypes.func.isRequired
    }

    state = {
        wish: this.props.wish,
    }

    render() {

        const { wish } = this.state

        return (
            <div 
                className="d-flex mb-3 bg-white shadow-sm rounded" 
                key={wish.id}
                style={{
                    borderLeft: '5px solid #6fbd0c'
                }}
            >
                <div className="pr-3">
                    <img
                        src={wish.image}
                        alt={wish.title}
                        className="rounded-0"
                        style={{
                            width: '110px'
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
                    >{wish.title}</h6>
                    <small>({wish.weight})</small><br />
                    <small><strong>{wish.price} {currency}</strong></small>
                </div>
                <div className="d-flex align-self-center flex-column pr-3">
                    <button
                        className="btn border-0 py-2 mb-2 text-white text-center d-inline-block rounded shadow-none"
                        style={{
                            background: 'linear-gradient(90deg, black, #000000b3)',
                            fontSize: '14px'
                        }}
                        onClick={() => this.props.removeWish(wish)}
                    >
                        ပယ်ဖျက်မည်
                    </button>
                    <button
                        className="btn border-0 py-2 text-white text-center d-inline-block rounded shadow-none"
                        style={{
                            background: '#6fbd0c',
                            fontSize: '14px'
                        }}
                        onClick={() => {
                            this.props.addProduct(wish)
                            this.props.removeWish(wish)
                        }}
                    >
                        စျေးခြင်းထဲထည့်မည်
                    </button>
                </div>
            </div>
        )
    }
}

export default withRouter(Wishes)