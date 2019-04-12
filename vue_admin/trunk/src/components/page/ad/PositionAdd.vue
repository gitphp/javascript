<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-calendar"></i> 广告位管理</el-breadcrumb-item>
                <el-breadcrumb-item>添加广告位</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="form-box">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
					<el-form-item label="标识符">
					    <el-input v-model="form.iden"></el-input>
					</el-form-item>
					<el-form-item label="广告">
                        <ul>
                            <li v-for="(value,key,index) in form.imgs" :key="index" style="display: inline;margin-left: 10px;">
                                <i class="el-icon-close" style="position: absolute;padding-left: 121px;" v-on:click="closeImg(key)"></i>
                                <img :src="file_url + value" width="120" height="120" class="head_pic"/>
                            </li>
                        </ul>
                        <ul>
                            <li v-for="img in data" :key="img.id" style="display: inline;margin-left: 10px;">
                                <img :src="file_url + img.img" width="120" height="120" class="head_pic" v-on:click="addImg(img.id,img.img)"/>
                            </li>
                        </ul>
					</el-form-item>
                    <el-form-item label="状态">
                        <el-radio-group v-model="form.status">
                            <el-radio label="开启"></el-radio>
                            <el-radio label="禁用"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">保存</el-button>
                        <!--<el-button>取消</el-button>-->
                    </el-form-item>
					<el-form-item>

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
    import PositionBllayer from '../../../store/bllayer/PositionBllayer';
	
	export default {
	    name: 'baseform',
	    data: function(){
	        return {
	            form:{
                    name:'',
                    iden:'',
                    ads:'',
                    imgs:{},
                    status:'开启'
                },
                data:'',
                msgCue:'',
                file_url:''
	        }
	    },
	    methods: {
	        onSubmit() {
                let vm = this;
                this.form.status = this.form.status == '开启' ? '1' : '2'
                let ads_tmp =  ''
                for(let key in vm.form.imgs){
                    ads_tmp += key + ','
                }
                vm.form.ads = ads_tmp.slice(0,-1)
                PositionBllayer.add(vm)
	        },
            getAdPicList(){
	            let vm =this
	            PositionBllayer.adPic(vm)
            },
            addImg(id,img){
                if(this.form.imgs.length > 1){
                    if(typeof(this.form.imgs[id]) != 'undefined'){
                        //this.form.imgs[id] = img
                        this.$set(this.form.imgs, id, img)
                    }
                }else {
                    //this.form.imgs[id] = img
                    this.$set(this.form.imgs, id, img)
                }
                console.log(this.form.imgs)
            },
            closeImg(id){
	            console.log(this.form.imgs)
	            if(this.form.imgs[id]){
	                //delete this.form.imgs[id]
                this.$delete( this.form.imgs, id)
                }
            }
	    },
        mounted() {
	        this.getAdPicList()
        }
    }
    
</script>