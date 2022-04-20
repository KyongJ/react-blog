/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import MyIconFont from '@/component/MyIconFont';
import { List, Image } from 'antd';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { listHomeArticles } from '@/api';
import type { Article } from '@/model/article';
import './index.less';
export interface Props {}

const ArticleHomeList: FC<Props> = (props: Props) => {
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState<Article[]>([]);
    useEffect(() => {
        getHomeArticles();
    }, []);

    //获取文章列表
    const getHomeArticles = async () => {
        try {
            setLoading(true);
            const {
                data: { articleList },
            } = await listHomeArticles({ current: page });
            setLoading(false);
            setDataSource(articleList);
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <div className="article-list">
            <List
                itemLayout="vertical"
                dataSource={dataSource}
                loading={loading}
                pagination={{
                    position: 'bottom',
                    onChange: page => {
                        setPage(page);
                    },
                    responsive: true,
                    pageSize: 5,
                }}
                rowKey={item => item.id}
                split={false}
                renderItem={item => (
                    <List.Item>
                        <article
                            className="article-list-item animate__animated animate__zoomIn"
                            key={item.id}
                        >
                            <div className="article-title">
                                <div className="article-title-link">
                                    <Link to={`/article/${item.id}`}>{item.articleTitle}</Link>
                                </div>
                            </div>
                            <div className="article-meta">
                                <div className="article-meta-item">
                                    <div className="icon">
                                        <MyIconFont type="icon-riqi" />
                                    </div>
                                    {dayjs(item.createTime).format('YYYY-MM-DD')}
                                </div>
                                <div className="article-meta-item">
                                    <Link to={`/category?id=${item.categoryId}`}>
                                        <div className="icon">
                                            <MyIconFont type="icon-wenzhangfenlei" />
                                        </div>
                                        {item.categoryName}
                                    </Link>
                                </div>
                                <div className="article-meta-item">
                                    {item.tagDTOList.map((item: any) => (
                                        <div
                                            key={item.id}
                                            style={{ display: 'flex', marginRight: 5 }}
                                        >
                                            <Link to={`/tag?id=${item.id}`}>
                                                <div className="icon">
                                                    <MyIconFont type="icon-biaoqian" />
                                                </div>
                                                {item.tagName}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="article-cover">
                                <Image width="100%" src={item.articleCover} />
                                {item.isTop ? (
                                    <div className="isTop">
                                        <MyIconFont type="icon-top" style={{ fontSize: 48 }} />
                                    </div>
                                ) : (
                                    ''
                                )}
                            </div>
                            <div className="article-btn">
                                <Link to={`/article/${item.id}`}>阅读全文 »</Link>
                            </div>
                            <footer></footer>
                        </article>
                    </List.Item>
                )}
            />
        </div>
    );
};
export default ArticleHomeList;
