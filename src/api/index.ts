import ajax from './ajax';

//登录
export const login = (param: object): any => ajax('/login', param, 'POST');
//注销
export const logout = (param?: object): any => ajax('/logout', param, 'POST');

/**首页 */
export const getBlogInfo = (param?: object): any => ajax('/bloggerInfo', param, 'GET');

/**文章管理 */
//首页文章查询
export const listHomeArticles = (param?: object):any => ajax('/home/articles', param, 'GET');
//根据Id查询前台文章
export const ArticleById = (id: number):any => ajax('/articles/'+id, {}, 'GET');
//文章归档
export const getArchive = (param?:object):any => ajax('/articles/archives', param, 'GET');
//查看文章排行榜
export const articleRank = (param?:object):any => ajax('/articles/recommend', param, 'GET');


/** 分类管理 */
// 查看分类列表
export const getCategoryList = ():any => ajax('/categories', {}, 'GET');

// 查看前台分类下的文章
export const getArticleListOfCategory = (id:number,param?:object):any => ajax('/categories/'+id, param, 'GET');


/** 标签管理 */
// 查看标签列表
export const getTagList = ():any => ajax('tags', {}, 'GET');

// 查看前台标签下的文章
export const getArticleListOfTag = (id:number,param?:object):any => ajax('/tags/'+id, param, 'GET');