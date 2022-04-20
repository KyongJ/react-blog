import React, { ReactElement, useMemo, useState } from 'react';
import { Anchor } from 'antd';
import CatalogLink from './CatalogLink';
import './index.less';

const { Link } = Anchor;

export interface TocItem {
    text: string;
    level: number;
    children?: Array<TocItem>;
}

const Catalog = ({ heads }: { heads: Array<any> }): ReactElement => {
    // const {hash} = useLocation();
    const [hashKey, setHashKey] = useState<string>('');
    // 重构的列表
    const catalogs = useMemo(() => {
        const tocItems: TocItem[] = [];

        heads.forEach(({ text, level }) => {
            const item = { level, text };

            if (tocItems.length === 0) {
                // 第一个 item 直接 push
                tocItems.push(item);
            } else {
                let lastItem = tocItems[tocItems.length - 1]; // 最后一个 item

                if (item.level > lastItem.level) {
                    // item 是 lastItem 的 children
                    for (let i = lastItem.level + 1; i <= 6; i++) {
                        const { children } = lastItem;
                        if (!children) {
                            // 如果 children 不存在
                            lastItem.children = [item];
                            break;
                        }

                        lastItem = children[children.length - 1]; // 重置 lastItem 为 children 的最后一个 item

                        if (item.level <= lastItem.level) {
                            // item level 小于或等于 lastItem level 都视为与 children 同级
                            children.push(item);
                            break;
                        }
                    }
                } else {
                    // 置于最顶级
                    tocItems.push(item);
                }
            }
        });

        return tocItems;
    }, [heads]);

    //展示子节点
    const showChildren = (tocItem: TocItem) => {
        if (tocItem.children) {
            return (
                <div className="catalog-container">
                    {tocItem.children.map(item => (
                        <CatalogLink key={`${item.level}-${item.text}`} tocItem={item} />
                    ))}
                </div>
            );
        }
        return;
    };

    return (
        <Anchor affix={false} showInkInFixed={false}>
            {catalogs.map(item => (
                <div key={item.text} onClick={() => setHashKey(`#${item.text}`)}>
                    <Link
                        href={`#${item.text}`}
                        title={item.text}
                        className="animate__animated animate__fadeInDown"
                    >
                        {hashKey === `#${item.text}` && showChildren(item)}
                    </Link>
                </div>
                // <CatalogLink key={`${item.level}-${item.text}`} tocItem={item}/>
            ))}
        </Anchor>
    );
};

export default Catalog;
