<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 商户管理</el-breadcrumb-item>
                <el-breadcrumb-item>商户详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="店铺ID">
                        <el-input  v-model="form.shop_id" readyonly></el-input >
                    </el-form-item>
					<el-form-item label="店铺名称">
					    <el-input  v-model="form.shop_name"></el-input >
					</el-form-item>
					<el-form-item label="店铺LOGO">
					    <el-input  v-model="form.shop_logo"></el-input >
					</el-form-item>
					<el-form-item label="店铺所在的省">
					    <el-input  v-model="form.province_name"></el-input >
					</el-form-item>
                    <el-form-item label="店铺所在的市">
                        <el-input  v-model="form.city_name"></el-input >
                    </el-form-item>
                    <el-form-item label="邮政编码">
                        <el-input  v-model="form.shop_zip"></el-input >
                    </el-form-item>
                    <el-form-item label="店铺联系人">
                        <el-input  v-model="form.contacts"></el-input >
                    </el-form-item>
                    <el-form-item label="店铺电话">
                        <el-input  v-model="form.shop_tel"></el-input >
                    </el-form-item>
                    <el-form-item label="店铺手机号">
                        <el-input  v-model="form.phone"></el-input >
                    </el-form-item>
                    <el-form-item label="店铺邮箱">
                        <el-input  v-model="form.email"></el-input >
                    </el-form-item>
                    <el-form-item label="是否推荐">
                        <el-input  v-model="form.shop_recommend"></el-input >
                    </el-form-item>
                    <el-form-item label="店铺seo关键字">
                        <el-input  v-model="form.shop_keywords"></el-input >
                    </el-form-item>
                    <el-form-item label="店铺介绍">
                        <el-input  v-model="form.introduction"></el-input >
                    </el-form-item>
                    <el-form-item label="店铺状态">
                        <el-input  v-model="form.shop_status"></el-input >
                    </el-form-item>
                    <el-form-item label="店铺用户名">
                        <el-input  v-model="form.user_name"></el-input >
                    </el-form-item>
                    <el-form-item label="创建时间">
                        <el-input  v-model="form.create_time"></el-input >
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="back">返回</el-button>
                    </el-form-item>
                    <p class="login-tips">{{msgCue}}</p>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
	import 'quill/dist/quill.core.css';
	import 'quill/dist/quill.snow.css';
	import 'quill/dist/quill.bubble.css';
	import { quillEditor } from 'vue-quill-editor';
    import ShopBllayer from '../../../store/bllayer/ShopBllayer';

	export default {
	    name: 'baseform',
	    data: function(){
	        return {
	            form:{
                    shop_id:'',
                    shop_name:'',
                    shop_logo:'',
                    province_name:'',
                    city_name:'',
                    shop_zip:'',
                    contacts:'',
                    shop_tel:'',
                    phone:'',
                    email:'',
                    shop_recommend:'',
                    shop_keywords:'',
                    introduction:'',
                    shop_status:'',
                    user_name:'',
                    create_time:''
                }
	        }
	    },
	    methods: {
	        getDetail(){
                //console.log(this.$route.query.shop_id)
                var shop_id = this.$route.query.shop_id
                console.log(shop_id)
                var vm = this
                vm.params = shop_id
                ShopBllayer.getDetail(vm)
            },
            back(){
                window.opener=null;
                window.open('',self);
                window.close();
                this.$router.go(-1);//返回上一层
            }
	    },
        mounted(){
	        this.getDetail()
        }
	}
    
</script>