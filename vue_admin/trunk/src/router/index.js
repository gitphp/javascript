import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            //redirect: '/dashboard'
			redirect:'/userIndex'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/dashboard',
                    component: resolve => require(['../components/page/Dashboard.vue'], resolve),
                    meta: { title: '系统首页' }
                },
				{
				    path: '/changepwd',
				    component: resolve => require(['../components/page/ChangePwd.vue'], resolve),
				    meta: { title: '修改密码' }
				},
                {
                    path: '/icon',
                    component: resolve => require(['../components/page/Icon.vue'], resolve),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: resolve => require(['../components/page/BaseTable.vue'], resolve),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: resolve => require(['../components/page/Tabs.vue'], resolve),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve),
                    meta: { title: 'markdown编辑器' }    
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve),
                    meta: { title: '文件上传' }   
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: resolve => require(['../components/page/DragList.vue'], resolve),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: resolve => require(['../components/page/DragDialog.vue'], resolve),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: resolve => require(['../components/page/Permission.vue'], resolve),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                },
                {
                    path: '/userIndex',
                    component: resolve => require(['../components/page/user/UserIndex.vue'], resolve),
                    meta: { title: '用户列表' }
                },
                {
                    path: '/adminIndex',
                    component: resolve => require(['../components/page/admin/AdminTable.vue'], resolve),
                    meta: { title: '管理员列表' }
                },
                {
                    path: '/adminAdd',
                    component: resolve => require(['../components/page/admin/AdminAdd.vue'], resolve),
                    meta: { title: '管理员添加' }
                },
				{
				    path: '/articleIndex',
				    component: resolve => require(['../components/page/article/ArticleList.vue'], resolve),
				    meta: { title: '文章列表' }
				},
				{
				    path: 'articleAdd',
				    component: resolve => require(['../components/page/article/ArticleAdd.vue'], resolve),
				    meta: { title: '添加文章' }
				},
				{
				    path: 'articleCategory',
				    component: resolve => require(['../components/page/article/ArticleCategory.vue'], resolve),
				    meta: { title: '文章分类' }
				},
				{
				    path: '/categoryAdd',
				    component: resolve => require(['../components/page/article/CategoryAdd.vue'], resolve),
				    meta: { title: '文章分类添加' }
				},
				{
				    path: '/goodsIndex',
				    component: resolve => require(['../components/page/goods/GoodsIndex.vue'], resolve),
				    meta: { title: '商品列表' }
				},
                {
                    path: '/goodsAdd',
                    component: resolve => require(['../components/page/goods/GoodsAdd.vue'], resolve),
                    meta: { title: '添加商品' }
                },
                {
                    path: '/goodsAttr',
                    component: resolve => require(['../components/page/goods/GoodsAttr.vue'], resolve),
                    meta: { title: '添加属性' }
                },
                {
                    path: '/goodsSpec',
                    component: resolve => require(['../components/page/goods/GoodsSpec.vue'], resolve),
                    meta: { title: '添加规格' }
                },
				{
				    path: '/categoryIndex',
				    component: resolve => require(['../components/page/goods/CategoryIndex.vue'], resolve),
				    meta: { title: '分类列表' }
				},
                {
                    path: '/gcategoryAdd',
                    component: resolve => require(['../components/page/goods/CategoryAdd.vue'], resolve),
                    meta: { title: '添加分类' }
                },
				{
				    path: '/attributeIndex',
				    component: resolve => require(['../components/page/goods/AttributeIndex.vue'], resolve),
				    meta: { title: '属性列表' }
				},
				{
				    path: '/specIndex',
				    component: resolve => require(['../components/page/goods/SpecIndex.vue'], resolve),
				    meta: { title: '规格列表' }
				},
                {
                    path: '/adIndex',
                    component: resolve => require(['../components/page/ad/AdTable.vue'], resolve),
                    meta: { title: '广告列表' }
                },
                {
                    path: '/adAdd',
                    component: resolve => require(['../components/page/ad/AdAdd.vue'], resolve),
                    meta: { title: '广告添加' }
                },
                {
                    path: '/shopIndex',
                    component: resolve => require(['../components/page/shop/ShopTable.vue'], resolve),
                    meta: { title: '商户列表' }
                },
                {
                    path: '/shopDetail',
                    component: resolve => require(['../components/page/shop/ShopDetail.vue'], resolve),
                    meta: { title: '商户列表' }
                },
                {
                    path: '/orderIndex',
                    component: resolve => require(['../components/page/order/OrderIndex.vue'], resolve),
                    meta: { title: '订单列表' }
                },
                {
                    path: '/positionIndex',
                    component: resolve => require(['../components/page/ad/PositionTable.vue'], resolve),
                    meta: { title: '广告位列表' }
                },
                {
                    path: '/positionAdd',
                    component: resolve => require(['../components/page/ad/PositionAdd.vue'], resolve),
                    meta: { title: '广告位添加' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
