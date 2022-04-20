/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { articleRank } from '@/api';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { recommendArticleState } from '@/store';
import './index.less';
import Loading from '../loading';
import { useDebounce } from '@/hooks/useDebounce';
interface articleshow {
    id: number;
    articleTitle: string;
    articleCover: string;
    createTime: Date;
}
interface Props {}

const ArticleCard: React.FC<Props> = props => {
    const [articleList, setArticleList] = useState<articleshow[]>([]);
    const recommendList = useRecoilValue(recommendArticleState);
    const [loading, setLoading] = useState(false);
    const [isArticlePage, setIsArticlePage] = useState<boolean>(false);
    const rankList = useRef<articleshow[]>([]);
    const { pathname } = useLocation();
    useEffect(() => {
        listArticleRank();
    }, []);

    useEffect(() => {
        judgeArticlePath();
    }, [pathname]);

    const listArticleRank = async () => {
        try {
            const { data } = await articleRank();
            rankList.current = data.recommendList;
            setArticleList(data.recommendList);
        } catch (error) {
            console.log(error);
        }
    };

    const judgeArticlePath = () => {
        setIsArticlePage(pathname.split('/').includes('article'));
    };

    const setArticle = useDebounce(() => {
        isArticlePage ? setArticleList(recommendList) : setArticleList(rankList.current);
        setLoading(false);
    }, 500);

    const changeArticle = useCallback(() => {
        setLoading(true);
        setArticle();
    }, [isArticlePage, recommendList]);

    useEffect(() => {
        changeArticle();
    }, [changeArticle]);
    return (
        <div className="article-card">
            <div className="card-title">{isArticlePage ? '🍉 相关文章' : '🎖️ 文章排行'}</div>
            <div className="article-list">
                {!loading ? (
                    articleList.map(item => (
                        <div className="item" key={item.id}>
                            <Link to={`/article/${item.id}`}>
                                <img
                                    src={
                                        item.articleCover
                                            ? item.articleCover
                                            : 'https://blog.52itstyle.vip/usr/uploads/2021/04/429968771.png'
                                    }
                                    alt="error"
                                    className="thumb"
                                />
                                <div className="item-info ">
                                    <div className="item-title animate__animated animate__fadeInDown">
                                        {item.articleTitle}
                                    </div>
                                    <div className="item-date animate__animated animate__fadeInDown">
                                        {dayjs(item.createTime).format('YYYY-MM-DD')}
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                ) : (
                    <Loading top={0} />
                )}
            </div>
        </div>
    );
};

export default ArticleCard;
