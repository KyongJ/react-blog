/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, Pagination } from 'antd';
import MyIconFont from '../MyIconFont';
import { getArticleListOfCategory, getArticleListOfTag } from '@/api';
import dayjs from 'dayjs';
import Loading from '../loading';
import './index.less';
export interface Props {
    moduleId?: number;
}

const ArticleList: FC<Props> = ({ moduleId = 0 }) => {
    const { pathname } = useLocation();
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [articleList, setArticleList] = useState<any[]>([]);

    useEffect(() => {
        getArticle();
    }, [moduleId]);

    const getArticle = async () => {
        setLoading(true);
        try {
            const {
                data: {
                    data: { articleList },
                },
            } =
                pathname.split('/')[1] === 'category'
                    ? await getArticleListOfCategory(moduleId, { current: page })
                    : await getArticleListOfTag(moduleId, { current: page });
            setArticleList(articleList);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const filterContent = (article: string) => {
        // 去除标题
        let titleReg = /\s*#{1,6}\s/g;
        // 去除代码
        let codeReg = /`+\S+(\s*)/g;
        return article.replace(titleReg, '').replace(codeReg, '');
    };

    return (
        <div className={`module-article`}>
            {!loading ? (
                <List
                    itemLayout="vertical"
                    dataSource={articleList}
                    renderItem={item => (
                        <List.Item className="animate__animated animate__slideInUp">
                            <Link to={`/article/${item.id}`}>
                                <div className="module-article-title">
                                    <Link to={`/article/${item.id}`}>{item.articleTitle}</Link>
                                </div>
                                <div className="module-article-content">
                                    <div className="custom-block">
                                        <p>{filterContent(item.articleContent.slice(0, 200))}</p>
                                    </div>
                                </div>
                                <div className="module-article-meta">
                                    <div className="meta-item">
                                        <MyIconFont type="icon-xingzhuangjiehe1" />
                                        Kyong
                                    </div>
                                    <div className="meta-item">
                                        <MyIconFont type="icon-xingzhuangjiehe1" />
                                        {dayjs(item.createTime).format('YYYY/MM/DD')}
                                    </div>
                                    <div className="meta-item">
                                        {item.tagDTOList.map((item: any) => (
                                            <span key={item.id} style={{ marginRight: 10 }}>
                                                <MyIconFont type="icon-xingzhuangjiehe1" />
                                                {item.tagName}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        </List.Item>
                    )}
                />
            ) : (
                <Loading />
            )}
            {articleList.length > 0 && (
                <div style={{ marginTop: 20, textAlign: 'center' }}>
                    <Pagination
                        total={articleList.length}
                        onChange={page => {
                            setPage(page);
                        }}
                        defaultCurrent={1}
                        hideOnSinglePage
                    />
                </div>
            )}
        </div>
    );
};
export default ArticleList;
