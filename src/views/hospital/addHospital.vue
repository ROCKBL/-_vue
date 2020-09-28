<template>
    <div class="addHospital">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm" size="mini">

            <el-row>
                <el-col :span="12">
                    <el-form-item label="医院名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="医院电话" prop="phone">
                        <!-- <el-input v-model.number="ruleForm.phone"></el-input> -->
                        <el-input v-model.number="ruleForm.phone"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            
            <el-row>
                <el-col :span="12">
                    <el-form-item label="医院地址" prop="address">
                        <el-input v-model="ruleForm.address"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="医院特色" prop="characteristic">
                        <el-input v-model="ruleForm.characteristic"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="医院经度" prop="longitude">
                        <el-input v-model.number="ruleForm.longitude" placeholder="请输入经度，例如：120.672111"></el-input>
                        <!-- <div class="getAddress" @click="getAddress">点击获取经纬度</div> -->
                        <a class="linkPick" target="_blank" href="https://lbs.amap.com/console/show/picker"><i class="el-icon-view el-icon--right" href="https://lbs.amap.com/console/show/picker" ></i>点击获取经纬度</a>
                        <!-- <el-link type="primary" :underline="false"><i class="el-icon-view el-icon--right" href="https://lbs.amap.com/console/show/picker" ></i>点击获取经纬度</el-link> -->
                    </el-form-item>

                </el-col>
                <el-col :span="12">
                    <el-form-item label="医院纬度" prop="latitude">
                        <el-input v-model.number="ruleForm.latitude" placeholder="请输入纬度，例如：28.000575"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="医院类型" prop="type">
                        <el-input v-model="ruleForm.type"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            
            <el-row>
                <el-col :span="12">
                    <el-form-item label="医院logo" prop="logo" >
                        <el-upload class="picUploader" :action="uploadSrc" :show-file-list="false"  :on-success="logoUpLoaded" :headers="xhrHead" :before-upload="beforeUpload">
                            <img v-if="ruleForm.logo" :src="ruleForm.logo" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="医院图片" prop="mainPic" >
                        <el-upload class="picUploader" :action="uploadSrc" :show-file-list="false"  :on-success="picUpLoaded" :headers="xhrHead" :before-upload="beforeUpload">
                            <img v-if="ruleForm.images" :src="ruleForm.images" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                </el-col>
            </el-row>


            <el-form-item label="医院简介" >
                <div style="width:100%;">
                    <!-- <ue @onEditorChange="onEditorChange" v-model="ruleForm.introduction" @fileChange="hasImgAndUpload" /> -->

                    <wang v-model="ruleForm.introduction" :upload="upLoadFunc" ref="wangEditor"></wang>
                </div>
            </el-form-item>

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

    import wang from "@/components/wangEditor";

    import { publish,upload,uploadUrl,modify } from '@/api/hospital'

    import { getToken } from '@/utils/auth'

export default {
    data() {
        return {
            // uploadSrc:"https://jsonplaceholder.typicode.com/posts/", //图片上传地址
            // uploadSrc:"http://127.0.0.1:12345/upLoad", //图片上传地址
            upLoadFunc:upload,
            uploadSrc:this.baseUrl+uploadUrl,

            dialogImageUrl: '',//预览图片地址
            dialogVisible: false,//预览图片开关

            ruleForm: {
                name:"",//医院名称
                phone:"",//医院电话
                address:"",//医院地址

                longitude:"",//医院经度
                latitude:"",//医院纬度
                characteristic:"",//医院特色 
                logo:"",//医院logo地址
                images:"",//医院图片地址

                type:"",//医院类型
                introduction:"",//富文本编辑器内容,医院简介
            },
            rules: {
                name: [
                    { required: true, message: '请输入医院名称', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                phone:[
                    { required: true, message: '请输入医院电话', trigger: 'blur' },
                    { type: 'number', message: '电话必须为数字', trigger: 'blur'},
                ],
                address:[
                    { required: true, message: '请输入医院地址', trigger: 'blur' },
                ],

                type:[
                    { required: true, message: '请输入医院类型', trigger: 'blur' },
                ],

                longitude:[
                    { required: true, message: '请输入医院经度', trigger: 'blur' },
                    { type: 'number', message: '经度必须为数字', trigger: 'blur'},
                ],
                latitude:[
                    { required: true, message: '请输入医院纬度', trigger: 'blur' },
                    { type: 'number', message: '纬度必须为数字',trigger: 'blur'},
                ],
                characteristic:[
                    { required: true, message: '请输入医院特色', trigger: 'blur' },
                ]
            },

            type:"",//判断是编辑还是添加模式

            id:"",
            
        }
    },
    components: {
        // ue,
        wang,
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
        },

        logoUpLoaded(response, file, fileList){
            // 商品主图上传后函数

            // this.imageUrl = URL.createObjectURL(file.raw);
            // console.log(response)
            // console.log(file)
            // console.log(fileList)
            if(response.msg=="success"){
                this.ruleForm.logo=this.picBaseUrl+response.result.url
            }
            // this.ruleForm.logo=response.path
        },

        picUpLoaded(response, file, fileList){
            // 商品主图上传后函数

            // this.imageUrl = URL.createObjectURL(file.raw);
            // console.log(response)
            // console.log(file)
            // console.log(fileList)
            if(response.msg=="success"){
                this.ruleForm.images=this.picBaseUrl+response.result.url
            }
            
        },


        submitForm(formName) {
            // 表单提交
            // console.log(this.ruleForm)
            var that=this;

            // 编辑器赋值修正Bug
            this.ruleForm.introduction=this.$refs.wangEditor.getWords()


            if(this.type=="edite"){
                this.ruleForm.id=this.id
                modify(this.ruleForm).then(function(response){
                    that.$router.go(-1)
                })
                return
            }

            publish(this.ruleForm).then(function(response){
                // console.log(response)
                that.$router.go(-1)
                // if(response.code===1){
                //     // that.$router.replace("/jifenInfo")

                // }else{

                // }
            })

            // this.$refs[formName].validate((valid) => {
            //     if (valid) {
            //         alert('submit!');
            //     } else {
            //         console.log('error submit!!');
            //         return false;
            //     }
            // });
        },
        // resetForm(formName) {
        //     // 表单重置
        //     this.$refs[formName].resetFields();
        // },



        // hasImgAndUpload(e, editor){
        //     // 富文本编辑器上传图片
        //     var file = e.target.files[0];
        //     // console.log(e)
        //     // console.log(file)
        //     var formData = new FormData();
        //     formData.append('file', file);
        //     var that=this;
        //     upload(formData).then(function(res){

        //         editor.editor.insertEmbed(
        //             editor.editor.getSelection().index,
        //             "image",
        //             // res.path
        //             that.picBaseUrl+res.result.url
        //         );

        //     })           
        // },

        // onEditorChange(val){
        //     // 富文本编辑器内容改变
        //     this.ruleForm.introduction=val
        // },

        getAddress(){},

        goback(){
            this.$router.go(-1)
        }

    },
    created(){
        // 修改编辑页有值
        console.log(this.$route.query)

        if(this.$route.query.row){
            // 编辑模式
            this.type="edite"

            var row=JSON.parse(this.$route.query.row)
            this.ruleForm.name=row.name
            this.ruleForm.phone=row.phone
            this.ruleForm.address=row.address
            this.ruleForm.longitude=row.longitude
            this.ruleForm.latitude=row.latitude
            this.ruleForm.characteristic=row.characteristic
            this.ruleForm.logo=row.logo
            this.ruleForm.images=row.images
            this.ruleForm.introduction=row.introduction

            this.ruleForm.type=row.type

            this.id=row.id

        }


    },
    mounted(){
       // console.log(this.uploadSrc)
    }
}
</script>

<style>
    .addHospital{
        padding: 20px 10%;
    }

    .addHospital .picUploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .addHospital .picUploader .el-upload:hover {
        border-color: #409EFF;
    }
    .addHospital .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .addHospital .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .addHospital .servesContentWords{
        color: rgba(0,0,0,0.4);
        font-size: 12px;
    }

    .addHospital .linkPick{
        color: #409eff;
    }
    .addHospital .linkPick:hover{
        color: #66b1ff;
    }
</style>