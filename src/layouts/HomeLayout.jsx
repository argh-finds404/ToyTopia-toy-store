import React from 'react';
import { Outlet } from 'react-router';
import Header from '../components/Header';
import Slider from '../components/slider';

const HomeLayout = () => {
    return (
        <div>
            <header className=''>
        <Header></Header>
            </header>
            <main>
                <section>
                <Slider ></Slider>
                    <Outlet></Outlet>
                </section>
            </main>

        </div>
    );
};

export default HomeLayout;