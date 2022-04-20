import * as React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';

interface IAppProps {
    routes: IRouter[];
}
const AuthRouter: React.FunctionComponent<IAppProps> = props => {
    //获得当前路径
    let { pathname } = useLocation();
    const { routes } = props;
    //获取登录状态
    // const isLogin = window.sessionStorage.getItem('isLogin');
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    //匹配当前的路由
    if (pathname.includes('article')) {
        pathname = pathname.replace(/(\d+)/g, '*');
    }
    const targetRouterConfig = routes.find(item => item.path === pathname);
    if (targetRouterConfig) {
        const { exact, component } = targetRouterConfig;
        return <Route exact={exact} path={pathname} component={component} />;
    }
    // nprogress.done();
    return <Redirect to={'/'}></Redirect>;
};

export default AuthRouter;
