import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import Header from '../components/Header';
import Slider from '../components/slider';
import ShopInfo from '../components/ShopInfo';
import LeftAside from '../components/homelayout/Topside';
import Topside from '../components/homelayout/Topside';
import Footer from '../components/Footer';
import { Helmet } from "react-helmet-async";
import Loading from '../pages/Loading';

const HomeLayout = () => {
  const navigation = useNavigation();
    return (
      <div className="bg-[#fafaff] min-h-screen">
        <Helmet>
          <title>ToyTopia-Home</title>
        </Helmet>
        <header className="max-w-16/16 mx-auto">
          <Header></Header>
        </header>
        <main className="max-w-16/16 mx-auto">
          <section>
            <Slider></Slider>
            <ShopInfo></ShopInfo>
          </section>
          <div className="max-w-11/12 mx-auto my-5">
            <Topside></Topside>
          </div>
          <div>
            <section className="max-w-11/12 mx-auto my-5">
              {navigation.state === "loading" ? <Loading /> : <Outlet />}
            </section>
          </div>
          <div>
            <Footer></Footer>
          </div>
        </main>
      </div>
    );
};

export default HomeLayout;