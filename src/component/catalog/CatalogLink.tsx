import React, { ReactElement } from 'react';
import { Anchor } from 'antd';
import { TocItem } from './';

const { Link } = Anchor;

interface CatalogLinkProps {
    tocItem: TocItem;
    showItemKey?: string;
}

const CatalogLink = ({ tocItem }: CatalogLinkProps): ReactElement => {
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
        <Link href={`#${tocItem.text}`} title={tocItem.text}>
            {showChildren(tocItem)}
        </Link>
    );
};

export default CatalogLink;
