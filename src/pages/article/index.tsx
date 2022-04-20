/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useState } from 'react';
import { ArticleById } from '@/api';
import MyIconFont from '@/component/MyIconFont';
import dayjs from 'dayjs';
import { Image } from 'antd';
import Editor, { HeadList } from 'md-editor-rt';
import { Link, useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { recommendArticleState, cataLogState } from '@/store';
import 'md-editor-rt/lib/style.css';
import './index.less';
import Loading from '@/component/loading';
interface RelatedArticle {
    id: number;
    articleTitle: string;
    articleCover: string;
    createTime?: Date;
}

interface ArticleInfo {
    id: number;
    categoryId: number;
    articleTitle: string;
    articleCover: string;
    articleContent: string;
    categoryName: string;
    tagDTOList: { id: number; tagName: string }[];
    createTime: Date;
    updateTime: Date;
    viewsCount: number;
    likeCount: number;
    articleRecommendList: RelatedArticle[];
    lastArticle: RelatedArticle;
    nextArticle: RelatedArticle;
}

export interface Props {}

const Article: FC<Props> = (props: Props) => {
    const [article, setArticle] = useState<ArticleInfo>();
    const [catalogList, setList] = useState<HeadList[]>([]); //目录
    const [loading, setLoading] = useState<boolean>(false);
    const setCataLog = useSetRecoilState(cataLogState);
    const setRecommendArticle = useSetRecoilState(recommendArticleState);
    const { pathname } = useLocation();

    useEffect(() => {
        const id = getArticleId();
        getArticleById(+id);
    }, [pathname]);
    useEffect(() => {
        setCataLog(catalogList);
    }, [catalogList]);

    const getArticleById = async (id: number) => {
        setLoading(true);
        try {
            const {
                data: { article },
            } = await ArticleById(id);
            setArticle(article);
            setRecommendArticle(article.articleRecommendList);
            setLoading(false);
            console.log(article);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const getArticleId = () => {
        return pathname.split('/')[2];
    };

    return (
        <div>
            {!loading && article ? (
                <article className="article">
                    <div className="article-title">{article.articleTitle}</div>
                    <div className="article-meta">
                        <div className="article-meta-item">
                            <div className="icon">
                                <MyIconFont type="icon-24gf-calendar" />
                            </div>
                            {dayjs(article.createTime).format('YYYY-MM-DD')}
                        </div>
                        <div className="article-meta-item">
                            <Link to={`/category?id=${article.categoryId}`}>
                            <div className="icon">
                                <MyIconFont type="icon-wenzhangfenlei" />
                            </div>
                            {article.categoryName}</Link>
                        </div>
                        <div className="article-meta-item">
                            {article.tagDTOList.map((item: any) => (
                                <div key={item.id} style={{ display: 'flex', marginRight: 5 }}>
                                   <Link to={`/tag?id=${item.id}`}>
                                   <div className="icon">
                                        <MyIconFont type="icon-biaoqian" />
                                    </div>
                                    {item.tagName}
                                   </Link>
                                </div>
                            ))}
                        </div>
                        <div className="article-meta-item">
                            <div className="icon">
                                <MyIconFont type="icon-icon" />
                            </div>
                            浏览量 : {article.viewsCount}
                        </div>
                    </div>
                    <div className="article-cover">
                        <Image
                            width="100%"
                            src={article.articleCover}
                        />
                    </div>
                    <div className="article-content">
                        <Editor
                            modelValue={article.articleContent}
                            onGetCatalog={setList}
                            previewOnly
                            prettier
                        />
                    </div>

                    <div className="article-end" style={{ color: '#555' }}>
                        <div style={{ textAlign: 'center' }}>
                            <img
                                src="https://blog.52itstyle.vip/usr/uploads/6359488940289160158582279.gif"
                                alt="error"
                            />
                        </div>
                        <div className="custom-block">
                            <p>作者: Kyong</p>
                            <p>出处: http://www.kyong.top</p>
                            <p>
                                分享知识是一件快乐的事，本人尚未工作，精力有限，
                                基于自身认知不足之处在所难免，也请大家指正，共同进步。
                            </p>
                            <p>
                                本文版权归作者所有，欢迎转载，但未经作者同意必须保留此段声明，且在文章页面明显位置给出，
                                如有问题，可邮件（kyongbest@163.com）咨询。
                            </p>
                        </div>
                    </div>

                    <div className="article-near">
                        <div className="article-near-item">
                            {article.lastArticle.id && (
                                <Link to={`/article/${article.lastArticle.id}`}>
                                    <img
                                        src={article.lastArticle.articleCover}
                                        alt="error"
                                    />
                                    <div className="article-near-item-info">
                                        <div className="info-label">上一篇</div>
                                        <div className="info-title">
                                            {article.lastArticle.articleTitle}
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </div>
                        <div className="article-near-item">
                            {article.nextArticle.id && (
                                <Link to={`/article/${article.nextArticle.id}`}>
                                    <img
                                        src={article.nextArticle.articleCover}
                                        alt="error"
                                    />
                                    <div
                                        className="article-near-item-info"
                                        style={{ left: 'auto', right: '10%' }}
                                    >
                                        <div className="info-label">下一篇</div>
                                        <div className="info-title">
                                            {article.nextArticle.articleTitle}
                                        </div>
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </article>
            ) : (
                <Loading />
            )}
        </div>
    );
};
export default Article;
