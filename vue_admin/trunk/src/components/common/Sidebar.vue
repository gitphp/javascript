<template>
    <div class="sidebar">
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" :collapse="collapse" background-color="#324157"
            text-color="#bfcbd9" active-text-color="#20a0ff" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item v-for="(threeItem,i) in subItem.subs" :key="i" :index="threeItem.index">
                                    {{ threeItem.title }}
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i><span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
    import bus from '../common/bus';
    export default {
        data() {
            return {
                collapse: false,
                items: [
                    /*{
                        icon: 'el-icon-lx-home',
                        index: 'dashboard',
                        title: '系统首页'
                    },
                    {
                        icon: 'el-icon-lx-cascades',
                        index: 'table',
                        title: '基础表格'
                    },
                    {
                        icon: 'el-icon-lx-calendar',
                        index: '3',
                        title: '表单相关',
                        subs: [
                            {
                                index: 'form',
                                title: '基本表单'
                            },
                            {
                                index: 'tabs',
                                title: 'tab选项卡'
                            },
                            {
                                index: 'icon',
                                title: '自定义图标'
                            },
                            {
                                index: 'charts',
                                title: 'schart图表'
                            },
                            {
                                index: '3-2',
                                title: '三级菜单',
                                subs: [
                                    {
                                        index: 'editor',
                                        title: '富文本编辑器'
                                    },
                                    {
                                        index: 'markdown',
                                        title: 'markdown编辑器'
                                    },
                                ]
                            },
                            {
                                index: 'upload',
                                title: '文件上传'
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-rank',
                        index: '6',
                        title: '拖拽组件',
                        subs: [
                            {
                                index: 'drag',
                                title: '拖拽列表',
                            },
                            {
                                index: 'dialog',
                                title: '拖拽弹框',
                            }
                        ]
                    },
                    {
                        icon: 'el-icon-lx-warn',
                        index: '7',
                        title: '错误处理',
                        subs: [
                            {
                                index: 'permission',
                                title: '权限测试'
                            },
                            {
                                index: '404',
                                title: '404页面'
                            }
                        ]
                    },*/
					{
					    icon: 'el-icon-lx-group',
					    index: '8',
					    title: '用户',
					    subs: [
					        {
					            index: 'userIndex',
					            title: '用户列表',
					        },
                            {
                                index: 'icon',
                                title: '自定义图标'
                            }
					    ]
					},
					{
					    icon: 'el-icon-lx-peoplefill',
					    index: '11',
					    title: '管理员',
					    subs: [
					        {
					            index: 'adminIndex',
					            title: '管理列表',
					        },
					        {
					            index: 'adminAdd',
					            title: '添加管理员',
					        }
					    ]
					},
					{
					    icon: 'el-icon-lx-goods',
					    index: '10',
					    title: '商品管理',
					    subs: [
					        {
					            index: 'goodsIndex',
					            title: '商品列表',
					        },
                            /*{
                                index: 'goodsAdd',
                                title: '添加商品',
                            },*/
                            {
                                index: 'attributeIndex',
                                title: '属性列表',
                            },
                            {
                                index: 'goodsAttr',
                                title: '添加属性',
                            },
                            {
                                index: 'specIndex',
                                title: '规格列表',
                            },
                            {
                                index: 'goodsSpec',
                                title: '规格添加',
                            },

							{
							    index: 'categoryIndex',
							    title: '商品分类',
							},
                            {
                                index: 'gcategoryAdd',
                                title: '添加商品分类',
                            },

					    ]
					},   
					{
					    icon: 'el-icon-lx-redpacket',
					    index: '12',
					    title: '订单管理',
					    subs: [
					        {
					            index: 'orderIndex',
					            title: '订单列表',
					        }
					    ]
					},
					{
					    icon: 'el-icon-lx-redpacket',
					    index: '14',
					    title: '商户管理',
					    subs: [
					        {
					            index: 'shopIndex',
					            title: '商户列表',
					        }
					    ]
					},
                    {
                        icon: 'el-icon-lx-redpacket',
                        index: '13',
                        title: '广告管理',
                        subs: [
                            {
                                index: 'adIndex',
                                title: '广告列表',
                            },
                            {
                                index: 'adAdd',
                                title: '添加广告',
                            },
                            {
                                index: 'PositionIndex',
                                title: '广告位列表',
                            },
                            {
                                index: 'PositionAdd',
                                title: '添加广告位',
                            }
                        ]
                    },
					{
					    icon: 'el-icon-lx-text',
					    index: '9',
					    title: '文章管理',
					    subs: [
					        {
					            index: 'articleIndex',
					            title: '文章列表',
					        },
					        {
					            index: 'articleAdd',
					            title: '新增文章',
					        },
							{
							    index: 'articleCategory',
							    title: '文章分类',
							},
							{
							    index: 'categoryAdd',
							    title: '添加分类',
							}
					    ]
					}
                ]
            }
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        },
        created(){
            // 通过 Event Bus 进行组件间通信，来折叠侧边栏
            bus.$on('collapse', msg => {
                this.collapse = msg;
            })
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        left: 0;
        top: 70px;
        bottom:0;
        overflow-y: scroll;
    }
    .sidebar::-webkit-scrollbar{
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse){
        width: 250px;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
