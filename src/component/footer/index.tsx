import React, { FC } from 'react';
import './index.less';
interface Props {}

const Footer: FC<Props> = props => {
    return (
        <footer className="footer">
            <span>©2019 - 2022 By Kyong</span>
            <span>浙ICP备2021023205号</span>
        </footer>
    );
};

export default Footer;
