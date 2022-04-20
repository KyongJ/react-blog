/**
 * 路由配置的参数类型
 */
 interface IRouter {
    name: string;
    path: string;
    icon:string;
    key: string;
    hidden?:boolean;
    exact?: boolean;
    component?: ReactNode;
    childrens?: IRouter[];
}

