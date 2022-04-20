import React, { FC } from 'react';
import routeConfig from '@/route';
import { Link, useLocation } from 'react-router-dom';
import MyIconFont from '../MyIconFont';
import './index.less';
export interface Props {}

const MyNav: FC<Props> = (props: Props) => {
    const { pathname } = useLocation();

    const getField = (routeConfig: IRouter[]) => {
        return routeConfig.map(item => {
            if(item.hidden){
                return null;
            }
            return (
                <li key={item.key} className={item.path === pathname ? 'nav-active' : ''}>
                    <Link to={item.path}>
                        <div className="icon animate__animated animate__fadeInDown">
                            <MyIconFont type={item.icon} />
                        </div>
                        <div className="link animate__animated animate__fadeInDown">{item.name}</div>
                    </Link>
                </li>
            );
        });
    };

    return (
        <>
            <ul id="menu" className="menu">
                {getField(routeConfig)}
            </ul>
        </>
    );
};
export default MyNav;
