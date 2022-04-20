export interface ArticleModel {
    id: number;
    articleTitle: string;
    articleCover: string;
    articleContent: string;
    createTime: Date;
    updateTime: Date;
}

export interface tag {
    id: number;
    tagName: string;
}

export interface Article extends ArticleModel {
    articleContent: string;
    categoryId: number;
    categoryName: string;
    tagDTOList: tag[];
    isTop: number;
}
