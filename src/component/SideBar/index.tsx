/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useRef, useState } from 'react';
import useThrottle from '@/hooks/useThrottle';
import { Affix } from 'antd';
import ArticleCard from '../articleCard';
import MessageCard from '../messageCard';
import './index.less';

interface Props {}

const SideBar: FC<Props> = props => {
    const [hideNav, setHideNav] = useState<boolean>(false);
    const scrollTop = useRef<number>(0)
    const navChange = () => {
        let curScrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        let topNav = document.querySelector('.top-nav');
        if (curScrollTop > 300 && curScrollTop > scrollTop.current) {
            topNav && topNav.classList.add('top-nav-hide');
            setHideNav(true);
        } else {
            topNav && topNav.classList.remove('top-nav-hide');
            setHideNav(false);
        }
        scrollTop.current = curScrollTop
    };
    const navShow = useThrottle(navChange, 200, []);

    useEffect(() => {
        window.addEventListener('scroll', navShow);
        return () => {
            window.removeEventListener('scroll', navShow);
        };
    }, []);
    return (
        <div className="sidebar">
            <Affix offsetTop={hideNav ? 10 : 65}>
                <div>
                    <aside id="aside" className="aside">
                        <MessageCard></MessageCard>
                    </aside>
                    <aside className="aside-article">
                        <ArticleCard></ArticleCard>
                    </aside>
                </div>
            </Affix>
        </div>
    );
};

export default SideBar;
