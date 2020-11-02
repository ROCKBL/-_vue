<template>
    <div class="addDiarySort">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm" size="mini">

            <el-row>
                <el-col :span="12">
                    <el-form-item label="分类名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="排序" prop="sort">
                        <el-input v-model="ruleForm.sort"></el-input>
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

    import { dcmodify,dcpublish } from '@/api/diary'



export default {
    data() {
        return {
            // uploadSrc:"https://jsonplaceholder.typicode.com/posts/", //图片上传地址
            // uploadSrc:"http://127.0.0.1:12345/upLoad", //图片上传地址

            // uploadSrc:this.baseUrl+sortuploadUrl,

            ruleForm: {
                
                name:"",//日志分类名称
                sort:"",//排序
            },
            rules: {
                name: [
                    { required: true, message: '请输入医院名称', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
            },

            type:"",//判断是编辑还是添加模式
            id:"",
        }
    },
    components: {

    },
    computed:{

    },
    methods: {

        submitForm(formName) {
            // 表单提交
            var that=this;
            if(this.type=="edite"){
                this.ruleForm.id=this.id
                dcmodify(this.ruleForm).then(function(response){
                    that.$router.go(-1)
                })
                return
            }

            dcpublish(this.ruleForm).then(function(response){
                that.$router.go(-1)
            })
        },

        goback(){
            this.$router.go(-1)
        },

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
            this.ruleForm.sort=row.sort
            this.id=row.id
        }
    },
    mounted(){
       
    }
}
</script>

<style>
    .addDiarySort{
        padding: 20px 10%;
    }

    .addDiarySort .picUploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .addDiarySort .picUploader .el-upload:hover {
        border-color: #409EFF;
    }
    .addDiarySort .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .addDiarySort .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .addDiarySort .servesContentWords{
        color: rgba(0,0,0,0.4);
        font-size: 12px;
    }

</style>