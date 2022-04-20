import React, { FC } from 'react';
import { BackTop } from 'antd';
import MyIconFont from '../MyIconFont';
import './lndex.less';
export interface Props {}

const MyBackTop: FC<Props> = props => {
    return (
        <BackTop>
            <MyIconFont type="icon-jiantou-copy" style={{fontSize:20}}></MyIconFont>
        </BackTop>
    );
};
export default MyBackTop;
