import React from 'react';
import { Outlet } from 'react-router';
import Header from '../components/Header';

const HomeLayout = () => {
    return (
        <div>
            <header className=''>
        <Header></Header>
            </header>
            <main>
                <section>
                    <Outlet></Outlet>
                </section>
            </main>

        </div>
    );
};

export default HomeLayout;