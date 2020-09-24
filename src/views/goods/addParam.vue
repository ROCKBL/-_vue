<template>
    <div class="addparam">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm" size="mini">

            <el-row>
                <el-col :span="12">
                    <el-form-item label="商品参数名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所属商品分类" prop="goodCategoryId">
                        <!-- <el-input v-model="ruleForm.upId"></el-input> -->
                        <el-select v-model="ruleForm.goodCategoryId" placeholder="请选择所属分类">
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

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" v-if="type!='edite'" >立即创建</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')" v-else >保存修改</el-button>
                <el-button @click="goback">返回</el-button>
            </el-form-item>


        </el-form>


    </div>
</template>

<script>
    // import ue from "@/components/ue/ue";
    // import { upload } from '@/api/upload'

    import { gppublish,gpmodify,gsortlist } from '@/api/goods'

    import { getToken } from '@/utils/auth'

export default {
    data() {
        return {


            ruleForm: {
                
                name:"",//项目分类名称
                goodCategoryId:"",//所属分类

            },
            rules: {
                name: [
                    { required: true, message: '请输入参数名称', trigger: 'blur' },
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

    },
    methods: {
        submitForm(formName) {

            var that=this;
            if(this.type=="edite"){
                this.ruleForm.id=this.id
                gpmodify(this.ruleForm).then(function(response){
                    that.$router.go(-1)
                })
                return
            }

            gppublish(this.ruleForm).then(function(response){
                that.$router.go(-1)
            })
        },

        goback(){
            this.$router.go(-1)
        },
        init(){
            var that=this;

            gsortlist().then(function(response){
                that.projectSortOption=response.result
                console.log(response)
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
            this.ruleForm.goodCategoryId=row.goodCategoryId

            this.id=row.id
        }
        this.init()


    },
    mounted(){
       
    }
}
</script>

<style>
    .addparam{
        padding: 20px 10%;
    }

    .addparam .picUploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .addparam .picUploader .el-upload:hover {
        border-color: #409EFF;
    }
    .addparam .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .addparam .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .addparam .servesContentWords{
        color: rgba(0,0,0,0.4);
        font-size: 12px;
    }

</style>