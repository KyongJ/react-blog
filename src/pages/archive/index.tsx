import React, { FC, useEffect, useState } from 'react';
import { getArchive } from '@/api';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import Loading from '@/component/loading';
import './index.less';
export interface Props {}

const Archive: FC<Props> = (props: Props) => {
    const [page, setPage] = useState<number>(1);
    const [count, setCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [dataSource, setDataSource] = useState<Map<string, any>>(new Map());
    useEffect(() => {
        listArchive();
    }, []);

    const listArchive = async () => {
        setLoading(true)
        try {
            const {
                data: { archives },
            } = await getArchive({ current: page });
            setLoading(false)
            setDataSource(archiveToTree(archives.contentList));
            setCount(archives.count);
        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    };

    //转换数据
    const archiveToTree = (archive: any) =>
        archive.reduce((resMap: any, item: any) => {
            const { createTime } = item;
            const year = dayjs(createTime).format('YYYY');
            if (resMap.has(year)) {
                resMap.get(year).push(item);
            } else {
                resMap.set(year, [item]);
            }
            return resMap;
        }, new Map());

    return (
        <React.Fragment>
            {!loading ? (
                <div className="archive">
                    <div className="archive-title animate__animated animate__slideInDown">
                        <span>非常好！目前共计 {count} 篇日志，继续努力。</span>
                    </div>
                    {Array.from(dataSource.keys()).map((key: any) => (
                        <div className="archive-section" key={key}>
                            <div className="archive-year animate__animated animate__slideInDown">
                                <strong>{key}</strong>
                            </div>
                            {dataSource.get(key).map((item: any) => (
                                <article className="archive-article animate__animated animate__slideInDown" key={item.id}>
                                    <span style={{ fontSize: 12, marginRight: 10 }}>
                                        {dayjs(item.createTime).format('MM-DD')}
                                    </span>
                                    <span>
                                        <Link to={`/article/${item.id}`}>{item.articleTitle}</Link>
                                    </span>
                                </article>
                            ))}
                        </div>
                    ))}
                </div>
            ) : (
                <Loading />
            )}
        </React.Fragment>
    );
};
export default Archive;
