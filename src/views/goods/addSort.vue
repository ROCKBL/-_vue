<template>
    <div class="addSort">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm" size="mini">

            <el-row>
                <el-col :span="12">
                    <el-form-item label="分类名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所属父类" prop="upId">
                        <!-- <el-input v-model="ruleForm.upId"></el-input> -->
                        <el-select v-model="ruleForm.upId" placeholder="请选择所属父类">
                            <el-option
                              v-for="item in projectSortOption"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            
            <el-row>
                <el-col :span="12">
                    <el-form-item label="排序" prop="sort">
                        <el-input v-model="ruleForm.sort"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="开启显示" prop="showIs">
                        <el-switch v-model="ruleForm.showIs"></el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            
            
            <el-row>
                <el-col :span="12">
                    <el-form-item label="分类图标" prop="images" required >
                        <el-upload class="picUploader" :action="uploadSrc" :show-file-list="false" :headers="xhrHead" :on-success="logoUpLoaded" :before-upload="beforeUpload">
                            <img v-if="ruleForm.images" :src="ruleForm.images" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>


            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" v-if="type!='edite'" >立即创建</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')" v-else >保存修改</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
                <el-button @click="goback">返回</el-button>
            </el-form-item>


        </el-form>


    </div>
</template>

<script>
    // import ue from "@/components/ue/ue";
    // import { upload } from '@/api/upload'

    import { gsortpublish,gsortuploadUrl,gsortmodify,gsortlist } from '@/api/goods'

    import { getToken } from '@/utils/auth'

export default {
    data() {
        return {
            // uploadSrc:"https://jsonplaceholder.typicode.com/posts/", //图片上传地址
            // uploadSrc:"http://127.0.0.1:12345/upLoad", //图片上传地址

            uploadSrc:this.baseUrl+gsortuploadUrl,

            dialogImageUrl: '',//预览图片地址
            dialogVisible: false,//预览图片开关

            ruleForm: {
                
                name:"",//项目分类名称
                upId:"",//所属分类
                sort:"",//排序
                showIs:true,//是否显示
                images:"",//分类图标
            },
            rules: {
                name: [
                    { required: true, message: '请输入医院名称', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],

                
            },

            projectSortOption:[],

            type:"",//判断是编辑还是添加模式
            id:"",
        }
    },
    components: {

    },
    computed:{
        xhrHead(){
            var token=JSON.parse(getToken())
            var headers={}
            headers['_ym_token_'] = token['_ym_token_']
            headers['__userid__'] = token['__userid__']
            headers['_ym_client_'] = token['_ym_client_']
            return headers
        }
    },
    methods: {
        beforeUpload(file){
            // 商品主图和缩略图上传前检查图片函数

            // const isJPG = file.type === 'image/jpeg';
            // const isLt2M = file.size / 1024 / 1024 < 2;

            // if (!isJPG) {
            //   this.$message.error('上传头像图片只能是 JPG 格式!');
            // }
            // if (!isLt2M) {
            //   this.$message.error('上传头像图片大小不能超过 2MB!');
            // }
            // return isJPG && isLt2M;

            const isLt2M = file.size / 1024 / 1024 < 10;
            if (!isLt2M) {
              this.$message.error('上传图片大小不能超过 10MB!');
            }
            return  isLt2M;
        },

        logoUpLoaded(response, file, fileList){
            // 商品主图上传后函数

            // this.imageUrl = URL.createObjectURL(file.raw);
            // console.log(response)
            // console.log(file)
            // console.log(fileList)
            // this.ruleForm.logo=response.path
            if(response.msg=="success"){
                this.ruleForm.images=this.picBaseUrl+response.result.url
            }
        },




        submitForm(formName) {
            // 表单提交
            // console.log(this.ruleForm)
            // this.$refs[formName].validate((valid) => {
            //     if (valid) {
            //         alert('submit!');
            //     } else {
            //         console.log('error submit!!');
            //         return false;
            //     }
            // });

            var that=this;
            if(this.type=="edite"){
                this.ruleForm.id=this.id
                gsortmodify(this.ruleForm).then(function(response){
                    that.$router.go(-1)
                })
                return
            }

            gsortpublish(this.ruleForm).then(function(response){
                that.$router.go(-1)
            })
        },
        // resetForm(formName) {
        //     // 表单重置
        //     this.$refs[formName].resetFields();
        // },
        goback(){
            this.$router.go(-1)
        },
        init(){
            var that=this;

            gsortlist().then(function(response){
                that.projectSortOption=response.result
                // console.log(response)
                if(that.id){
                    var findIndex=that.projectSortOption.findIndex(function(obj){
                        return obj.id===that.id
                    })
                    if(findIndex>-1){
                        that.projectSortOption.splice(findIndex,1)
                    }
                }

            })
        }
    },
    created(){
        // 修改编辑页有值
        // console.log(this.$route.query)        

        if(this.$route.query.row){
            // 编辑模式
            this.type="edite"

            var row=JSON.parse(this.$route.query.row)
            
            // this.ruleForm.id=row.id
            this.ruleForm.name=row.name
            this.ruleForm.upId=row.upId
            this.ruleForm.sort=row.sort
            this.ruleForm.showIs=row.showIs
            this.ruleForm.images=row.images

            this.id=row.id
        }
        this.init()


    },
    mounted(){
       
    }
}
</script>

<style>
    .addSort{
        padding: 20px 10%;
    }

    .addSort .picUploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .addSort .picUploader .el-upload:hover {
        border-color: #409EFF;
    }
    .addSort .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .addSort .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .addSort .servesContentWords{
        color: rgba(0,0,0,0.4);
        font-size: 12px;
    }

</style>