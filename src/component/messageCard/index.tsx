/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useMemo, useState } from 'react';
import { cataLogState } from '@/store';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Catalog from '../catalog';
import { Avatar } from 'antd';
import { getBlogInfo } from '@/api';
import './index.less';
export interface Props {
    catalog?: any[];
}

const MessageCard: FC<Props> = (props: Props) => {
    const { pathname } = useLocation();
    const cataLog = useRecoilValue(cataLogState);
    const [dataTarget, setDataTarget] = useState<string>('site-overview');
    const [blogInfo, setBlogInfo] = useState<any>({});
    const [dataMap, setDataMap] = useState<Map<string, React.ReactNode>>(new Map());

    useEffect(() => {
        getApiBlogInfo();
    }, []);

    const sideBarConfig = useMemo(
        () => [
            {
                key: 'post-toc-wrap',
                slot: <Catalog heads={cataLog}></Catalog>,
            },
            {
                key: 'site-overview',
                slot: (
                    <section className="site-overview">
                        <Avatar src={blogInfo.avatar} size={64} style={{ marginBottom: 10 }} />
                        <p>其实我是个程序员</p>
                        <nav className="site-state">
                            <div className="site-state-item">
                                <Link to="/archive">
                                    <div className="site-state-item-count">
                                        {blogInfo.articleCount}
                                    </div>
                                    <div className="site-state-item-name">文章</div>
                                </Link>
                            </div>
                            <div className="site-state-item">
                                <Link to="/article">
                                    <div className="site-state-item-count">
                                        {blogInfo.categoryCount}
                                    </div>
                                    <div className="site-state-item-name">分类</div>
                                </Link>
                            </div>
                            <div className="site-state-item">
                                <Link to="/archive">
                                    <div className="site-state-item-count">{blogInfo.tagCount}</div>
                                    <div className="site-state-item-name">标签</div>
                                </Link>
                            </div>
                        </nav>
                    </section>
                ),
            },
        ],
        [cataLog,blogInfo]
    );

    useEffect(() => {
        setField(sideBarConfig);
    }, [sideBarConfig]);


    const getApiBlogInfo = async () => {
        try {
            const {
                data: { bloggerInfo },
            } = await getBlogInfo();
            setBlogInfo(bloggerInfo);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        parseLocation(pathname);
    }, [pathname]);
    //解析路径
    const parseLocation = (pathname: string) => {
        let nav = document.getElementsByClassName('sidebar-nav')[0];
        if (pathname.search('article') === -1) {
            nav.classList.add('none');
            setDataTarget('site-overview');
        } else {
            setDataTarget('post-toc-wrap');
            nav.children[0].classList.add('sidebar-nav-active');
            nav.classList.remove('none');
        }
    };

    //改变内容
    const changeContent = (e: any) => {
        let dataTarget = e.target.getAttribute('data-target');
        let childNode = e.target.parentNode.children;
        for (let i = 0; i < childNode.length; i++) {
            childNode[i].classList.remove('sidebar-nav-active');
        }
        e.target.classList.add('sidebar-nav-active');
        setDataTarget(dataTarget);
    };

    //设置内容
    const setField = (sideBarConfig: any) => {
        let newMap = new Map();
        sideBarConfig.forEach((item: any) => {
            newMap.set(item.key, item.slot);
        });
        setDataMap(newMap);
    };

    //显示内容
    const getField = (dataTarget: string) => {
        return dataMap.get(dataTarget);
    };

    return (
        <div className="sidebar-inner">
            <ul className="sidebar-nav" onClick={changeContent}>
                <li
                    className="sidebar-nav-toc animate__animated animate__fadeInDown"
                    data-target="post-toc-wrap"
                >
                    文章目录
                </li>
                <li
                    className="sidebar-nav-overview animate__animated animate__fadeInDown"
                    data-target="site-overview"
                >
                    站点概览
                </li>
            </ul>
            <div className="sidebar-section">{getField(dataTarget)}</div>
        </div>
    );
};
export default MessageCard;
