import ArticleModel from '../api/ArticleModel'
//import md5 from 'js-md5'
import { local_save_set } from '../../helper/cmm_helper'

export default class ArticleBllayer {
	constructor() {
		
	}
	static getList(vm) {
		var articleModel = new ArticleModel()
		var data = vm.params
	
		articleModel.getList(data,function(sucResp){
			var data,code, msg,items
			data = sucResp.data
			code = data.code
			msg = data.msg
			items = data.data
			if(code == '100'){
				vm.data = items.data
                vm.limit = parseInt(items.limit)
                vm.totalCount = parseInt(items.total)
			}else{
				vm.msgCue = msg
			}	
		},function(errResp){
			console.log(errResp)
		})
	}

    // 编辑文章
    static edit(vm) {
        var articleModel = new ArticleModel()
        var data={
        	article_id:vm.params.article_id,
			title:vm.params.title,
            origin:vm.params.origin,
            img:vm.params.img,
            editor:vm.params.editor,
            article_category_id: vm.params.article_category_id,
            peruse_num:vm.params.peruse_num,
            iden:vm.params.iden,
            keywords:vm.params.keywords,
            description:vm.params.description,
            status:vm.params.status,
            content:vm.params.content,
			sort:vm.params.sort
        }
        articleModel.edit(data,function(sucResp){
            var data,code, msg,item
            data = sucResp.data
            code = data.code
            msg = data.msg
            item = data.data
            if(code == '100'){
                vm.updateGetList()
            }else{
                vm.msgCue = msg
            }
        },function(errResp){
            console.log(errResp)
        })
    }
    // 下架文章
    static articleDelete(vm) {

        var articleModel = new ArticleModel()
        var data={article_id:vm.inits.article_id}

        articleModel.articleDelete(data,function(sucResp){
            var data,code, msg,item
            data = sucResp.data
            code = data.code
            msg = data.msg
            item = data.data
            if(code == '100'){

            }else{
                vm.msgCue = msg
            }
        },function(errResp){
            console.log(errResp)
        })
    }

    // 新增文章
    static add(vm) {

        var articleModel = new ArticleModel()
        var data=vm.form

        articleModel.add(data,function(sucResp){
            console.log(sucResp)
            var data,code,msg
            data = sucResp.data
            code = data.code
            msg = data.msg
            if(code == '100'){

            }else{
                vm.msgCue = msg
            }
        },function(errResp){
            console.log(errResp)
        })
    }

    // 文章分类列表
    static getCats(vm) {
        var articleModel = new ArticleModel()
        var data = {}
        articleModel.category(data,function(sucResp){
            console.log(sucResp)
            vm.attr = sucResp.data.data
            console.log(sucResp.data.data)
        },function(errResp){
            console.log(errResp)
        })
    }

	
}