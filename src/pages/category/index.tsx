import React, { useEffect, useState } from 'react';
import { randomRgbColor } from '@/utils/color';
import ArticleList from '@/component/articleList';
import { getCategoryList } from '@/api';
import { useLocation } from 'react-router-dom';
import './index.less';

interface Category {
    id: number;
    categoryName: string;
    createTime?: Date;
    articleCount: number;
}

interface Props {}

const MyCategory: React.FC<Props> = props => {
    const location = useLocation();
    const [categoryId, setCategoryId] = useState<number>(0);
    const [category, setCategory] = useState<Category[]>([]);

    useEffect(() => {
        listCategory();
    }, []);
    useEffect(() => {
        const param = location.search.split('?')?.[1];
        if (param) {
            const id = param.split('=')[1];
            setCategoryId(+id);
        }
    }, [location]);
    const listCategory = async () => {
        try {
            const {
                data: { data },
            } = await getCategoryList();
            const allCount = data.reduce((sum: number, item: any) => {
                return sum + item.articleCount;
            }, 0);
            data.unshift({ id: 0, categoryName: '全部', articleCount: allCount });
            setCategory(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="category ">
            <ul className="category-wrapper animate__animated animate__slideInUp">
                {category.map(item => (
                    <li
                        key={item.id}
                        onClick={() => {
                            setCategoryId(item.id);
                        }}
                        className={categoryId === item.id ? 'category-active' : ''}
                    >
                        <span>{item.categoryName}</span>
                        <span style={{ backgroundColor: randomRgbColor() }}>
                            {item.articleCount}
                        </span>
                    </li>
                ))}
            </ul>
            <section>
                <ArticleList moduleId={categoryId} />
            </section>
        </div>
    );
};

export default MyCategory;
