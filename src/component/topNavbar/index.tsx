/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useState } from 'react';
import routeConfig from '@/route';
import MyIconFont from '../MyIconFont';
import { Link, useLocation } from 'react-router-dom';
import { Input } from 'antd';
import './index.less';
const { Search } = Input;
export interface Props {}

const TopNavBar: FC = props => {
    const { pathname } = useLocation();
    const [theme, setTheme] = useState<string>('light');
    // const [scrollTop, setScrollTop] = useState<number>(0);
    const getField = (routeConfig: IRouter[]) => {
        return routeConfig.map(item => {
            if (item.hidden) {
                return null;
            }
            return (
                <li key={item.key} className={item.path === pathname ? 'top-nav-active' : ''}>
                    <Link to={item.path}>
                        <span style={{ marginRight: 5 }}>
                            <MyIconFont type={item.icon} />
                        </span>
                        <span>{item.name}</span>
                    </Link>
                </li>
            );
        });
    };

    const onClick = () => {
        const body = document.body;
        // 判断当前是否是黑夜模式，从而切换模式
        if (Array.from(body.classList).indexOf('dark') !== -1) {
            body.classList.remove('dark');
            setTheme('light');
        } else {
            body.classList.add('dark');
            setTheme('dark');
        }
    };

    // const navChange = () => {
    //     let curScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    //     let topNav = document.querySelector('.top-nav');
    //     if (curScrollTop > 300 && curScrollTop > scrollTop) {
    //         topNav && topNav.classList.add('top-nav-hide');
    //     } else {
    //         topNav && topNav.classList.remove('top-nav-hide');
    //     }
    //     setScrollTop(curScrollTop);
    // };
    // const navShow = useThrottle(navChange, 200, []);

    // useEffect(() => {
    //     window.addEventListener('scroll', navShow);
    //     return () => {
    //         window.removeEventListener('scroll', navShow);
    //     };
    // }, []);

    return (
        <nav className="top-nav">
            <div className="blog-title">Kyong</div>
            <div className="blog-link">
                <div className="skin" onClick={() => onClick()}>
                    <MyIconFont
                        type={theme === 'light' ? 'icon-a-17-01' : 'icon-shouhuiyueliang'}
                        style={{ fontSize: 18, marginRight: 20 }}
                    />
                </div>
                <div className="search">
                    <Search
                        placeholder="input search text"
                        // onSearch={onSearch}
                        style={{ width: 200 }}
                    />
                </div>
                <ul className="nav-link">{getField(routeConfig)}</ul>
                <div className="github-link">
                    <a href="https://github.com/KyongJ" target="_blank" rel="noreferrer">
                        <MyIconFont
                            type="icon-github-fill"
                            style={{ fontSize: 18, marginRight: 5 }}
                        />
                        <span>Github</span>
                        <MyIconFont type="icon-wailian2" style={{ fontSize: 10, marginLeft: 5 }} />
                    </a>
                </div>
            </div>
        </nav>
    );
};
export default TopNavBar;
