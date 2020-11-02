<template>
    <div class="addCoupon">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm" size="mini">

            <el-row>
                <el-col :span="12">
                    <el-form-item label="名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="有效天数" prop="validityDay" required>
                        <el-input v-model="ruleForm.validityDay">
                            <template slot="append">天</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="开始时间" prop="startTime" required>
                        <el-date-picker
                          v-model="ruleForm.startTime"
                          type="date"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择开始时间">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="结束时间" prop="endTime" required>
                        <el-date-picker
                          v-model="ruleForm.endTime"
                          type="date"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="选择结束时间">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="最小起用金额" prop="monetQuota" required>
                        <el-input v-model="ruleForm.monetQuota">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="优惠金额" prop="money" required>
                        <el-input v-model="ruleForm.money">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="最大领取数量" prop="maxNum" required>
                        <el-input v-model="ruleForm.maxNum">
                            <template slot="append">张</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="发行总数" prop="sendSum" required>
                        <el-input v-model="ruleForm.sendSum">
                            <template slot="append">张</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>


            <el-row>
                <el-col :span="24">
                    <el-form-item label="描述" prop="description" required>
                        <el-input
                          type="textarea"
                          :rows="4"
                          placeholder="请输入描述内容"
                          v-model="ruleForm.description">
                        </el-input>
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

    import { cmodify,cpublish } from '@/api/coupon'



export default {
    data() {
        return {
            // uploadSrc:"https://jsonplaceholder.typicode.com/posts/", //图片上传地址
            // uploadSrc:"http://127.0.0.1:12345/upLoad", //图片上传地址

            // uploadSrc:this.baseUrl+sortuploadUrl,

            ruleForm: {
                
                name:"",//名称
                validityDay:"",//有效天数
                startTime:"",//开始时间
                endTime:"",//结束时间
                
                monetQuota:"",//最小起用金额
                money:"",//优惠金额

                maxNum:"",//最大领取数量
                sendSum:"",//发行总数

                description:"",//描述
            },
            rules: {
                name: [
                    { required: true, message: '请输入优惠券名称', trigger: 'blur' },
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
                // this.ruleForm.id=this.id
                cmodify(this.ruleForm).then(function(response){
                    that.$router.go(-1)
                })
                return
            }

            cpublish(this.ruleForm).then(function(response){
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
            
            // this.ruleForm.name=row.name
            // this.ruleForm.validityDay=row.validityDay
            // this.ruleForm.startTime=row.startTime
            // this.ruleForm.endTime=row.endTime
            // this.ruleForm.monetQuota=row.monetQuota
            // this.ruleForm.money=row.money
            // this.ruleForm.maxNum=row.maxNum
            // this.ruleForm.sendSum=row.sendSum
            // this.ruleForm.description=row.description

            // this.id=row.id

            this.ruleForm=row
        }
    },
    mounted(){
       
    }
}
</script>

<style>
    .addCoupon{
        padding: 20px 10%;
    }

    .addCoupon .picUploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .addCoupon .picUploader .el-upload:hover {
        border-color: #409EFF;
    }
    .addCoupon .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .addCoupon .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .addCoupon .servesContentWords{
        color: rgba(0,0,0,0.4);
        font-size: 12px;
    }

</style>