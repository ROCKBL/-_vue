<template>
    <div class="goodForm">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
            <el-form-item label="商品分类" prop="sort">
                <el-select v-model="ruleForm.sort" placeholder="请选择商品分类">
                    <el-option v-for="sort in sorts" :label="sort.name" :value="sort.name"></el-option>
                    <!-- <el-option label="区域一" value="shanghai"></el-option> -->
                    <!-- <el-option label="区域二" value="beijing"></el-option> -->
                </el-select>
            </el-form-item>
            <el-form-item label="商品名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="单位" prop="unit">
                <el-input v-model="ruleForm.unit"></el-input>
            </el-form-item>
            <el-form-item label="商品排序" prop="orderby">
                <el-input v-model="ruleForm.orderby"></el-input>
            </el-form-item>
            <el-form-item label="虚拟销量" prop="sellNum">
                <el-input v-model="ruleForm.sellNum"></el-input>
            </el-form-item>
            <el-form-item label="重量" prop="weight">
                <el-input v-model="ruleForm.weight"></el-input>
            </el-form-item>

            <el-form-item label="商品缩略图" prop="shortPic">
                <el-upload class="picUploader" :action="uploadSrc" :show-file-list="true" list-type="picture-card" :on-success="shortUpLoaded" :before-upload="beforeUpload" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                    <!-- <img v-if="ruleForm.shortPic" :src="ruleForm.shortPic" class="avatar"> -->
                    <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->

                    <!-- <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
                        <span class="el-upload-list__item-actions">
                            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)" >
                                <i class="el-icon-zoom-in"></i>
                            </span>
                            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)" >
                                <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div> -->
                </el-upload>
            </el-form-item>

            <el-form-item label="商品主图" prop="mainPic" >
                <el-upload class="picUploader" :action="uploadSrc" :show-file-list="false"  :on-success="mainUpLoaded" :before-upload="beforeUpload">
                    <img v-if="ruleForm.mainPic" :src="ruleForm.mainPic" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>

            <el-form-item label="售价" prop="sellPrice">
                <el-input v-model="ruleForm.sellPrice">
                    <template slot="append">元</template>
                </el-input>
            </el-form-item>
            <el-form-item label="原价" prop="oldPrice">
                <el-input v-model="ruleForm.oldPrice">
                    <template slot="append">元</template>
                </el-input>
            </el-form-item>

            <el-form-item label="服务内容" prop="serviceContent">
                <el-input v-model="ruleForm.serviceContent">
                </el-input>
                <div class="servesContentWords">如什么什么</div>
            </el-form-item>
            <el-form-item label="运费设置" prop="shippingSettings">
                <el-select v-model="ruleForm.shippingSettings" placeholder="请选择以下运费设置">
                    <el-option v-for="setting in shippingSettings" :label="setting.name" :value="setting.name" :key="setting.key"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="单品满件包邮" prop="freeNum">
                <el-input v-model="ruleForm.freeNum">
                    <template slot="append">件</template>
                </el-input>
            </el-form-item>
            <el-form-item label="单品满额包邮" prop="freeMoney">
                <el-input v-model="ruleForm.freeMoney">
                    <template slot="append">元</template>
                </el-input>
            </el-form-item>

            <el-form-item label="商品库存" prop="stock">
                <el-input v-model="ruleForm.stock">
                    <template slot="append">件</template>
                </el-input>
            </el-form-item>
        <!--     <el-form-item label="是否使用规格" prop="useSpecifications">
                <el-switch v-model="ruleForm.useSpecifications"></el-switch>
            </el-form-item>

            <el-form-item v-if="ruleForm.useSpecifications" label="规格组和规格值" prop="stock">
                <el-input v-model="ruleForm.stock">
                    <template slot="append">件</template>
                </el-input>
            </el-form-item>
            <el-form-item v-if="ruleForm.useSpecifications" label="价格和库存" prop="stock">
                <el-input v-model="ruleForm.stock">
                    <template slot="append">件</template>
                </el-input>
            </el-form-item> -->
            

            <el-form-item label="开启单独分销设置" prop="distribution">
                <el-radio-group v-model="ruleForm.distribution">
                    <el-radio :label="false">不开启</el-radio>
                    <el-radio :label="true">开启</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="ruleForm.distribution" label="分销佣金类型" prop="distributionType">
                <el-radio-group v-model="ruleForm.distributionType">
                    <el-radio :label="false">百分比</el-radio>
                    <el-radio :label="true">固定金额</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="ruleForm.distribution" label="单独分销设置" prop="distributionTypeLevel">
                <el-input placeholder="" v-model="ruleForm.distributionTypeLevel.first" class="">
                    <template slot="prepend" >一级佣金</template>
                    <template v-if="!ruleForm.distributionType" slot="append" >%</template>
                    <template v-else slot="append" >元</template>
                </el-input>
                <el-input placeholder="" v-model="ruleForm.distributionTypeLevel.second" class="">
                    <template slot="prepend" >二级佣金</template>
                    <template v-if="!ruleForm.distributionType" slot="append" >%</template>
                    <template v-else slot="append" >元</template>
                </el-input>
                <el-input placeholder="" v-model="ruleForm.distributionTypeLevel.third" class="">
                    <template slot="prepend" >三级佣金</template>
                    <template v-if="!ruleForm.distributionType" slot="append" >%</template>
                    <template v-else slot="append" >元</template>
                </el-input>
            </el-form-item>


            <el-form-item label="商品详情" required>
                <div style="width:100%;">
                    <ue @onEditorChange="onEditorChange" v-model="ruleForm.details" @fileChange="hasImgAndUpload"
                />
              </div>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>


    </div>
</template>

<script>
    import ue from "@/components/ue/ue";
export default {
    data() {
        return {
            // uploadSrc:"https://jsonplaceholder.typicode.com/posts/", //图片上传地址
            uploadSrc:"http://127.0.0.1:12345/upLoad", //图片上传地址

            dialogImageUrl: '',//预览图片地址
            dialogVisible: false,//预览图片开关

            ruleForm: {
                sort:"",//商品种类
                name:"",//商品名称
                unit:"",//单位
                orderby:"",//排序
                sellNum:"",
                weight:"",//商品重量
                shortPic:"",//商品缩略图地址
                mainPic:"",//商品主图地址
                sellPrice:"",//售价
                oldPrice:"",//原价
                serviceContent:"",//服务内容
                freeNum:"",//单品满件包邮
                freeMoney:"",//单品满额包邮
                stock:"",//商品库存
                useSpecifications:false,//是否使用规格
                
                distribution:false,//单独分销设置 默认不开启
                distributionType:false,//分销佣金类型  false:百分比,true:固定金额
                distributionTypeLevel:{
                    //分销级别佣金
                    first:"",
                    second:"",
                    third:""
                },
                
                details:"",//富文本编辑器内容
            },
            rules: {
                name: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                sort: [
                    { required: true, message: '请选择商品分类', trigger: 'change' }
                ],
                
            },
            sorts:[
                {name:"分类1"},
                {name:"分类2"},
            ],//商品分类
            shippingSettings:[
                {name:"默认模板",key:1},
                {name:"默认规则",key:2},
            ],//运费设置种类

        }
    },
    components: {
        ue,
    },
    computed:{
        
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
        shortUpLoaded(response, file, fileList){
            // 商品缩略图上传后函数

            // this.imageUrl = URL.createObjectURL(file.raw);
            console.log(response)
            console.log(file)
            console.log(fileList)
        },
        mainUpLoaded(response, file, fileList){
            // 商品主图上传后函数

            // this.imageUrl = URL.createObjectURL(file.raw);
            console.log(response)
            console.log(file)
            console.log(fileList)
            this.ruleForm.mainPic=response.path
        },

        submitForm(formName) {
            // 表单提交
            console.log(this.ruleForm)
            // this.$refs[formName].validate((valid) => {
            //     if (valid) {
            //         alert('submit!');
            //     } else {
            //         console.log('error submit!!');
            //         return false;
            //     }
            // });
        },
        resetForm(formName) {
            // 表单重置
            this.$refs[formName].resetFields();
        },

        handleRemove(file, fileList){
            // 商品缩略图移除
        },
        handlePictureCardPreview(file){
            // 商品缩略图预览
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },

        hasImgAndUpload(e, editor){
            // 富文本编辑器上传图片
        },
        onEditorChange(val){
            // 富文本编辑器内容改变
            this.ruleForm.details=val
        }

    },
    created(){
        // 修改编辑页有值
        console.log(this.$route.query)
    },
    mounted(){
        // 获取商品分类
        // this.sorts
        // 获取运费设置种类
        // this.shippingSettings
    }
}
</script>

<style>
    .goodForm{
        padding: 20px;
    }

    .goodForm .picUploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .goodForm .picUploader .el-upload:hover {
        border-color: #409EFF;
    }
    .goodForm .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .goodForm .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .goodForm .servesContentWords{
        color: rgba(0,0,0,0.4);
        font-size: 12px;
    }
</style>