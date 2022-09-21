import ajax from './ajax';

//登录
export const login = (param: object): any => ajax('/api/login', param, 'POST');
//注销
export const logout = (param?: object): any => ajax('/api/logout', param, 'POST');

/**首页 */
export const getBlogInfo = (param?: object): any => ajax('/api/bloggerInfo', param, 'GET');

/**文章管理 */
//首页文章查询
export const listHomeArticles = (param?: object):any => ajax('/api/home/articles', param, 'GET');
//根据Id查询前台文章
export const ArticleById = (id: number):any => ajax('/api/articles/'+id, {}, 'GET');
//文章归档
export const getArchive = (param?:object):any => ajax('/api/articles/archives', param, 'GET');
//查看文章排行榜
export const articleRank = (param?:object):any => ajax('/api/articles/recommend', param, 'GET');


/** 分类管理 */
// 查看分类列表
export const getCategoryList = ():any => ajax('/api/categories', {}, 'GET');

// 查看前台分类下的文章
export const getArticleListOfCategory = (id:number,param?:object):any => ajax('/api/categories/'+id, param, 'GET');


/** 标签管理 */
// 查看标签列表
export const getTagList = ():any => ajax('/api/tags', {}, 'GET');

// 查看前台标签下的文章
export const getArticleListOfTag = (id:number,param?:object):any => ajax('/api/tags/'+id, param, 'GET');