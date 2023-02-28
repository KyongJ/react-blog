import React, { FC, useState } from 'react';
import MyNav from '@/component/nav';
import AuthRouter from '@/route/authRouter';
import routeConfig from '@/route';
import MyIconFont from '@/component/MyIconFont';
import useThrottle from '@/hooks/useThrottle';
import { Link } from 'react-router-dom';
import BackTop from '@/component/backTop';
import TopNavBar from '@/component/topNavbar';
import SideBar from '@/component/SideBar';
import Footer from '@/component/footer';
import './index.less';
export interface Props {}

const Home: FC<Props> = (props: Props) => {
    const [collapsed, setCollapsed] = useState<boolean>(false);

    const changeCollapsed = () => {
        setCollapsed(collapsed => !collapsed);
    };

    const showNav = useThrottle(changeCollapsed, 200, []);

    return (
        <div style={{ width: '100%', position: 'relative', background: 'var(--home-bgc)' }}>
            <div>
                <TopNavBar />
            </div>
            <div className="container">
                <main className="main">
                    <header className="header">
                        <div className="site-nav-toggle" onClick={() => showNav()}>
                            <MyIconFont type="icon-cebianlan"></MyIconFont>
                        </div>
                        <div className="site-meta">
                            <div className="site-title animate__animated animate__fadeInDown">
                                <Link to="/">Kyong's Blog</Link>
                            </div>
                            <p className="site-subtitle animate__animated animate__fadeInDown">
                                Just Do it
                            </p>
                        </div>
                        <nav
                            className={
                                collapsed ? ['site-nav', 'site-nav-on'].join(' ') : 'site-nav'
                            }
                        >
                            <MyNav></MyNav>
                        </nav>
                        <SideBar />
                    </header>
                    <section className="content">
                        <AuthRouter routes={routeConfig}></AuthRouter>
                    </section>
                </main>
                <Footer />
            </div>
            <div style={{ position: 'absolute', right: 0, bottom: 20 }}>
                <BackTop />
            </div>
        </div>
    );
};

export default Home;
