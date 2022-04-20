import React, { FC } from 'react';
import { Spin } from 'antd';

export interface Props {
    top?: number;
}

const Loading: FC<Props> = ({ top = 200 }) => {
    return (
        <div style={{ textAlign: 'center', marginTop: top }}>
            <Spin size="large" />
        </div>
    );
};
export default Loading;
