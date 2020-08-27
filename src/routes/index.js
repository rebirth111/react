import {
    Dashboard,
    Login,
    NotFound,
    Settings,
    ArticleList,
    ArticleEdit,
    Notifications
}from '../views'


export const mainRoutes= [{
    pathname: '/login',
    component: Login
},{
    pathname: '/404',
    component: NotFound
}]

export const adminRoutes=[{
    pathname: '/admin/dashboard',
    component: Dashboard,
    title: '仪表盘',
    icon: 'dashboard',
    isNav: true
},{
    pathname: '/admin/article',
    component: ArticleList,
    title: '文章管理',
    icon: 'unordered-list',
    isNav: true,
    exact: true
},{
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit
},{
    pathname: '/admin/notifications',
    component: Notifications
},{
    pathname: '/admin/settings',
    component: Settings,
    title: '设置',
    icon: 'setting',
    isNav: true
}]


