import React, { Component } from 'react'
import { 
    IonContent,
    IonMenu,
    IonList,
    IonItem,
    IonMenuToggle,
    IonLabel
} from '@ionic/react'
import { withRouter } from 'react-router-dom'
import { AiOutlineShop , AiOutlineFileSearch } from 'react-icons/ai'
import { IoMdApps } from 'react-icons/io'
import { FaRegHeart } from 'react-icons/fa'
import LOGO from '../../assets/images/logo.jpg'
import { Translation } from 'react-i18next'
import EN from '../../assets/images/en.jpg'
import MM from '../../assets/images/mm.jpg'

class Menu extends Component 
{
    changeLanguage = code => e => {
        localStorage.setItem('language', code);
        window.location.reload();
    }

    render() {
        

        return (
            <IonMenu 
                contentId="main" 
                type="reveal"
                style={{
                    // '--ion-background': '#1b1a20',
                    // '--ion-background-color': '#1b1a20',
                    '--ion-background': '#000',
                    '--ion-background-color': '#000',
                    '--width': '700px',
                    '--max-width': '100%'
                }}
            >
                <IonContent>
                    <IonList>
                        <IonMenuToggle autoHide={true}>
                            <IonItem 
                                className="text-white mt-0" 
                                // style={{
                                //     cursor: 'pointer',
                                //     '--inner-padding-start': '15px',
                                //     '--inner-padding-end': '15px'
                                // }}
                                lines="none"
                            >
                                <img
                                    src={LOGO}
                                    alt="Bagan Zay"
                                    className="rounded-circle"
                                    style={{
                                        width: '130px'
                                    }}
                                />
                            </IonItem>
                            <IonItem 
                                className="text-white my-1" 
                                onClick={() => this.props.history.push('/')}
                                style={{
                                    cursor: 'pointer',
                                    '--inner-padding-start': '10px',
                                    '--inner-padding-end': '10px'
                                }}
                                lines="none"
                            >
                                <IonLabel
                                    style={{
                                        fontSize: '22px',
                                        margin: '0'
                                    }}
                                >
                                    <span 
                                        className="d-inline-block mr-2 text-light"
                                        style={{
                                            fontSize: '25px',
                                            lineHeight: '50px',
                                            display: 'inline-block'
                                        }}
                                    >
                                        <AiOutlineShop />
                                    </span>
                                    <span
                                        style={{
                                            background: '-webkit-linear-gradient(45deg, #007bff, #00fff3 80%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            fontFamily: "'Roboto', sans-serif",
                                            fontWeight: '900',
                                            letterSpacing: '-2px',
                                            lineHeight: '50px',
                                            display: 'inline-block'
                                        }}
                                    >BAGAN</span> <span
                                                    style={{
                                                        background: '-webkit-linear-gradient(45deg, #fff, #007bff 80%)',
                                                        WebkitBackgroundClip: 'text',
                                                        WebkitTextFillColor: 'transparent',
                                                        lineHeight: '50px',
                                                        display: 'inline-block'
                                                    }}
                                                  >စျေး</span>
                                </IonLabel>
                            </IonItem>
                            <IonItem 
                                className="text-white my-1" 
                                onClick={() => this.props.history.push('/categories')}
                                style={{
                                    cursor: 'pointer',
                                    '--inner-padding-start': '10px',
                                    '--inner-padding-end': '10px'
                                }}
                                lines="none"
                            >
                                <IonLabel
                                    style={{
                                        fontSize: '22px',
                                        lineHeight: '2',
                                        margin: '0'
                                    }}
                                >
                                    <span 
                                        className="d-inline-block mr-2 text-light"
                                        style={{
                                            fontSize: '25px',
                                            lineHeight: '50px',
                                            display: 'inline-block'
                                        }}
                                    >
                                        <IoMdApps />
                                    </span>
                                    <span
                                        style={{
                                            background: '-webkit-linear-gradient(45deg, #fff, #007bff 80%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            lineHeight: '50px',
                                            display: 'inline-block'
                                        }}
                                    >
                                        <Translation>
                                            {(t) => <>{t('main.menu.categories')}</>}
                                        </Translation>
                                    </span>
                                    
                                </IonLabel>
                            </IonItem>
                            {/* <IonItem 
                                className="text-white my-1" 
                                onClick={() => this.props.history.push('/wishlist')}
                                style={{
                                    cursor: 'pointer',
                                    '--inner-padding-start': '10px',
                                    '--inner-padding-end': '10px'
                                }}
                                lines="none"
                            >
                                <IonLabel
                                    style={{
                                        fontSize: '22px',
                                        lineHeight: '2',
                                        margin: '0'
                                    }}
                                >
                                    <span 
                                        className="d-inline-block mr-2 text-light"
                                        style={{
                                            fontSize: '25px',
                                            lineHeight: '50px',
                                            display: 'inline-block'
                                        }}
                                    >
                                        <FaRegHeart />
                                    </span>
                                    <span
                                        style={{
                                            background: '-webkit-linear-gradient(45deg, #fff, #007bff 80%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            lineHeight: '2',
                                            display: 'inline-block'
                                        }}
                                    >ရွေးချယ်ထားသော ပစ္စည်းများ</span>
                                </IonLabel>
                            </IonItem> */}
                            <IonItem 
                                className="text-white my-1" 
                                onClick={() => this.props.history.push('/search')}
                                style={{
                                    cursor: 'pointer',
                                    '--inner-padding-start': '10px',
                                    '--inner-padding-end': '10px'
                                }}
                                lines="none"
                            >
                                <IonLabel
                                    style={{
                                        fontSize: '22px',
                                        lineHeight: '2',
                                        margin: '0'
                                    }}
                                >
                                    <span 
                                        className="d-inline-block mr-2 text-light"
                                        style={{
                                            fontSize: '25px',
                                            lineHeight: '50px',
                                            display: 'inline-block'
                                        }}
                                    >
                                        <AiOutlineFileSearch />
                                    </span>
                                    <span
                                        style={{
                                            background: '-webkit-linear-gradient(45deg, #fff, #007bff 80%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            lineHeight: '50px',
                                            display: 'inline-block'
                                        }}
                                    >
                                        <Translation>
                                            {(t) => <>{t('main.menu.order')}</>}
                                        </Translation>
                                    </span>
                                </IonLabel>
                            </IonItem>
                            
                        </IonMenuToggle>
                    </IonList>
                    <IonItem
                        style={{
                            '--inner-padding-start': '10px',
                            '--inner-padding-end': '10px'
                        }}
                        lines="none"
                        className="my-5 pt-5"
                    >
                        <img
                            src={EN}
                            alt=""
                            className="rounded-circle mr-3"
                            style={{
                                cursor: 'pointer',
                                width: '40px'
                            }}
                            onClick={this.changeLanguage('en')}
                        />
                        <img
                            src={MM}
                            alt=""
                            className="rounded-circle"
                            style={{
                                cursor: 'pointer',
                                width: '40px'
                            }}
                            onClick={this.changeLanguage('mm')}
                        />
                    </IonItem>
                </IonContent>
            </IonMenu>
        )
    }
}

export default withRouter(Menu)