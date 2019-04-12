<template>
    <el-upload
        class="file-uploader"
    	ref="upload" 
        drag
        action=""
        :show-file-list="false"
    	:name="fileFieldName"
    	:limit="1"
    	:before-upload="beforeUploadFile"
    	:http-request="uploadFile">
    	<img  v-if="imgSrc" :src="imgSrc" class="file">
    	<i v-if="!imgSrc" class="el-icon-upload"></i>
    	<div v-if="!imgSrc" class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    	<div v-loading="loading" class="file-uploader-loading"></div>
    	<div class="file-uploader-progres"  v-if="showProgress" ><el-progress type="circle" :percentage="100" status="success"></el-progress></div>
        <div class="el-upload__tip" slot="tip">上传jpg/png文件，且不超过2mb</div>
    </el-upload>
</template>

<script>
	import UploadFileBllayer from '../../store/bllayer/UploadFileBllayer'
    export default {
        //name: 'upload',
        data: function(){
            return {
                imgSrc: '',
				fileFieldName:'fileupload',
				remoteFileName:'',
				remoteFileUrl:'',
				loading:false,
				showProgress:false
            }
        }, 
        methods:{
			beforeUploadFile(file){
				const isJPG = file.type === 'image/jpeg'
				const isPNG = file.type === 'image/png'
				const isLt2M = file.size / 1024 / 1024 < 2
				
				if (!isJPG&&!isPNG) {
				  this.$message.error('上传头像图片只能是 JPG或PNG 格式!')
				}
				if (!isLt2M) {
				  this.$message.error('上传头像图片大小不能超过 2MB!')
				}
				return (isJPG||isPNG) && isLt2M
			},
			uploadFile(params){
				var vm = this,
				file = params.file/*,
				fileType = file.type
				isImage = fileType.indexOf('image') != -1,
				isVideo = fileType.indexOf('video') != -1,
				file_url = vm.$refs.upload.uploadFiles[0].url*/
				//vm.imgSrc = URL.createObjectURL(file)
				UploadFileBllayer.uploadFile(vm,file)
			},
			passRemoteFile(){
				this.$emit('remote-file-change',this.remoteFileUrl,this.remoteFileName)
			}
        },
        created(){
            //this.cropImg = this.defaultSrc;
        }
    }
</script>

<style scoped>
    .file-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .file-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  
  .file {
	position:absolute;
	left: 50%;
	margin-left: -89px;
	top:50%;
	margin-top: -89px;
    width: 178px;
    height: 178px;
    display: block;
  }
  .file-uploader-loading{
	position:relative;
	left: 50%;
	margin-left: -89px;
	/*top:50%;*/
	margin-top: -35%;
	width: 178px;
	height: 178px;
	display: block;  
  }
  .file-uploader-progres{
  	position:relative;
  	left: 50%;
  	margin-left: -95px;
  	/*top:50%;*/
  	margin-top: -42%;
  	width: 190px;
  	height: 178px;
  	display: block;
	background: #fff;
  }
</style>