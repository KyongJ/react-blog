import React, { useEffect, useState } from 'react';
import { getTagList } from '@/api';
import ArticleList from '@/component/articleList';
import { randomRgbColor } from '@/utils/color';
import { useLocation } from 'react-router-dom';
import './index.less';

interface Tag {
    id: number;
    tagName: string;
}

interface Props {}

const MyTag: React.FC<Props> = props => {
    const location = useLocation();
    const [tagId, setTagId] = useState<number>(0);
    const [tag, setTag] = useState<Tag[]>([]);

    useEffect(() => {
        listCategory();
    }, []);

    useEffect(() => {
        const param = location.search.split('?')?.[1];
        if (param) {
            const id = param.split('=')[1];
            setTagId(+id);
        }
    }, [location]);
    const listCategory = async () => {
        try {
            const {
                data: { data },
            } = await getTagList();
            data.unshift({ id: 0, tagName: '全部' });
            setTag(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="tag ">
            <ul className="tag-wrapper animate__animated animate__slideInUp">
                {tag.map(item => (
                    <li
                        key={item.id}
                        onClick={() => {
                            setTagId(item.id);
                        }}
                        style={{ backgroundColor: randomRgbColor() }}
                        className={tagId === item.id ? 'tag-active' : ''}
                    >
                        <span>{item.tagName}</span>
                    </li>
                ))}
            </ul>
            <section>
                <ArticleList moduleId={tagId} />
            </section>
        </div>
    );
};

export default MyTag;
