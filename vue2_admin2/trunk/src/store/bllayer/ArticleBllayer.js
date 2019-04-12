import ArticleModel from '../api/ArticleModel'
//import md5 from 'js-md5'
import { local_save_set } from '../../helper/cmm_helper'

export default class ArticleBllayer {
	constructor() {
		
	}
	static changePwd(vm) {
		var ArticleModel = new ArticleModel()
		var data = vm.form
		//data.password = md5(data.password)
		ArticleModel.ArticleList(data,function(sucResp){
			var data,code, msg,item
			data = sucResp.data
			code = data.code
			msg = data.msg
			item = data.data
			if(code == '100'){
				vm.$message.success(msg)
			}else{
				vm.msgCue = msg
			}	
		},function(errResp){
			console.log(errResp)
		})
	}
}