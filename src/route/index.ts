import { lazy } from 'react';
// import Archive from '@/pages/archive';
// import ArticleHomeList from '@/pages/articleHomeList';
// import Tag from '@/pages/tag';
// import Category from '@/pages/category';
import Article from '@/pages/article';
const Archive = lazy(
    () => import(/* webpackPrefetch: true, webpackChunkName: "Archive" */ '@/pages/archive')
);
// const Article = lazy(
//     () => import(/* webpackPrefetch: true, webpackChunkName: "Article" */ '@/pages/article')
// );
const ArticleHomeList = lazy(
    () =>
        import(
            /* webpackPrefetch: true, webpackChunkName: "ArticleHomeList" */ '@/pages/articleHomeList'
        )
);
const Category = lazy(
    () => import(/* webpackPrefetch: true, webpackChunkName: "Category" */ '@/pages/category')
);
const Tag = lazy(() => import(/* webpackPrefetch: true, webpackChunkName: "Tag" */ '@/pages/tag'));

const routeConfig: IRouter[] = [
    {
        name: '首页',
        path: '/',
        icon: 'icon-shouyetianchong',
        exact: true,
        key: 'home',
        component: ArticleHomeList,
    },
    {
        name: '归档',
        path: '/archive',
        icon: 'icon-xingzhuangjiehe1',
        exact: true,
        key: 'archive',
        component: Archive,
    },
    {
        name: '标签',
        path: '/tag',
        icon: 'icon-biaoqian',
        exact: true,
        key: 'tag',
        component: Tag,
    },
    {
        name: '分类',
        path: '/category',
        icon: 'icon-a-ziyuan613',
        exact: true,
        key: 'category',
        component: Category,
    },
    {
        name: '文章',
        path: '/article/*',
        icon: 'icon-a-ziyuan613',
        hidden: true,
        exact: true,
        key: 'article',
        component: Article,
    },
];

export default routeConfig;
