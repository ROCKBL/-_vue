<template>
    <div class="changepassword">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm" size="mini">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="登录账号" prop="account" required>
                        <el-input v-model="ruleForm.account"></el-input>
                    </el-form-item>
                </el-col>

            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="旧密码" prop="oldPassWord" required>
                        <!-- <el-input v-model="ruleForm.sort"></el-input> -->
                        <el-input placeholder="请输入旧密码" v-model="ruleForm.oldPassWord" show-password></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            
            <el-row>
                <el-col :span="12">
                    <el-form-item label="新密码" prop="newPassWord" required>
                        <!-- <el-input v-model="ruleForm.sort"></el-input> -->
                        <el-input placeholder="请输入新密码" v-model="ruleForm.newPassWord" show-password></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" >保存修改</el-button>
                <!-- <el-button @click="goback">返回</el-button> -->
            </el-form-item>


        </el-form>


    </div>
</template>

<script>
    // import ue from "@/components/ue/ue";
    // import { upload } from '@/api/upload'

    import { uupdatePassWord } from '@/api/user'



export default {
    data() {
        return {

            ruleForm: {
                account:"",
                newPassWord:"",
                oldPassWord:""

                // name:"",//项目分类名称
                // upId:"",//所属分类
                // sort:"",//排序
                // showIs:true,//是否显示
                // images:"",//分类图标
            },
            rules: {
                // account: [
                //     { required: true, message: '请输入项目分类名称', trigger: 'blur' },
                //     // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                // ],

                
            },

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
            if(this.ruleForm.newPassWord==""){
                this.$message.error('新的密码不能为空');
                return
            }
            uupdatePassWord(this.ruleForm).then(function(response){
                // console.log(response)
                if(response.code!=1){
                    // that.$message.error('请输入正确的账号和密码');
                }else{
                    that.$message({
                      message: '修改密码成功',
                      type: 'success'
                    });
                    that.ruleForm.account=""
                    that.ruleForm.newPassWord=""
                    that.ruleForm.oldPassWord=""
                }

            }).catch(function(response){
                that.$message.error('请输入正确的账号和密码');
            })

        },

        goback(){
            this.$router.go(-1)
        },
        init(){
            var that=this;

            sortlist().then(function(response){
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

    },
    mounted(){
       
    }
}
</script>

<style>
    .changepassword{
        padding: 20px 10%;
    }

    .changepassword .picUploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .changepassword .picUploader .el-upload:hover {
        border-color: #409EFF;
    }
    .changepassword .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .changepassword .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .changepassword .servesContentWords{
        color: rgba(0,0,0,0.4);
        font-size: 12px;
    }

</style>