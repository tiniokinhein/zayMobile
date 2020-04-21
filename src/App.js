import React from 'react'
import {
  IonApp,
  IonRouterOutlet
} from '@ionic/react'
import { Route , BrowserRouter as Router } from 'react-router-dom'
import Home from './pages/Home'
// import Cart from './pages/Cart'
import { IonReactRouter } from '@ionic/react-router'
import Menu from './components/layout/Menu'
import FloatCart from './components/FloatCart'
import Checkout from './pages/Checkout'
import CompletedOrder from './pages/CompletedOrder'
import Vegetable from './pages/Vegetable'
import Oil from './pages/Oil'
import Rice from './pages/Rice'
import VegetableDetail from './components/foods/vegetable/Detail'
import RiceDetail from './components/foods/rice/Detail'
import OilDetail from './components/foods/oil/Detail'
import Categories from './pages/Categories'
import Search from './pages/Search'
import OrderID from './pages/OrderID'
import InvoiceID from './pages/InvoiceID'
import WishList from './pages/WishList'

function App() {
  return (
    <Router>

      <IonApp className="col-12 col-lg-6 mx-auto">

        <IonReactRouter>
            <Menu />
            <IonRouterOutlet id="main">
                <Route exact path="/" component={Home} />
                <Route path="/invoice/:id" component={InvoiceID} />
                <Route path="/order/:id" component={OrderID} />
                <Route path="/completed/:id" component={CompletedOrder} />
                <Route path="/vegetable/:slug" component={VegetableDetail} />
                <Route path="/rice/:slug" component={RiceDetail} />
                <Route path="/oil/:slug" component={OilDetail} />
                {/* <Route path="/cart" component={Cart} /> */}
                <Route path="/checkout" component={Checkout} />
                <Route path="/vegetable" component={Vegetable} />
                <Route path="/oil" component={Oil} />
                <Route path="/rice" component={Rice} />
                <Route path="/categories" component={Categories} />
                <Route path="/search" component={Search} />
                <Route path="/wishlist" component={WishList} />
            </IonRouterOutlet>
            <FloatCart />
        </IonReactRouter>

      </IonApp>

    </Router>
  )
}

export default App
