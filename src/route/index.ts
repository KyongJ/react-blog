import Archive from '@/pages/archive';
import Article from '@/pages/article';
import ArticleHomeList from '@/pages/articleHomeList';
import Category from '@/pages/category';
import Tag from '@/pages/tag';

const routeConfig: IRouter[] = [
    {
        name: '首页',
        path: '/',
        icon:'icon-shouyetianchong',
        exact: true,
        key: 'home',
        component: ArticleHomeList,
    },
    {
        name: '归档',
        path: '/archive',
        icon:'icon-xingzhuangjiehe1',
        exact: true,
        key: 'archive',
        component: Archive,
    },
    {
        name: '标签',
        path: '/tag',
        icon:'icon-biaoqian',
        exact: true,
        key: 'tag',
        component: Tag,
    },
    {
        name: '分类',
        path: '/category',
        icon:'icon-a-ziyuan613',
        exact: true,
        key: 'category',
        component: Category,
    },
    {
        name: '文章',
        path: '/article/*',
        icon:'icon-a-ziyuan613',
        hidden:true,
        exact: true,
        key: 'article',
        component: Article,
    }

];

export default routeConfig;
