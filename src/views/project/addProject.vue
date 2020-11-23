<template>
    <div class="addHospital">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm" size="mini">

            <el-row>
                <el-col :span="12">
                    <el-form-item label="项目名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="排序" prop="sort">
                        <el-input v-model="ruleForm.sort"></el-input>
                    </el-form-item>
                </el-col>
                
            </el-row>

            
            <el-row>
                <el-col :span="12">
                    <el-form-item label="所属医院" prop="hospitalId">
                        <!-- <el-input v-model="ruleForm.hospitalId"></el-input> -->
                        <el-select v-model="ruleForm.hospitalId" placeholder="请选择所属医院">
                            <el-option
                              v-for="item in hospitalOption"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="所属分类" prop="categoryId">
                        <!-- <el-input v-model="ruleForm.categoryId"></el-input> -->
                        <el-select v-model="ruleForm.categoryId" placeholder="请选择所属分类">
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
                    <el-form-item label="虚拟销量" prop="virtualSales">
                        <el-input v-model="ruleForm.virtualSales" placeholder=""></el-input>
                    </el-form-item>

                </el-col>
                <el-col :span="12">
                    <el-form-item label="原价" prop="price">
                        <el-input v-model="ruleForm.price" placeholder="">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="优惠价" prop="couponPrice">
                        <el-input v-model="ruleForm.couponPrice" placeholder="">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>

                </el-col>
                <el-col :span="12">
                    <el-form-item label="预约价" prop="subsPrice">
                        <el-input v-model="ruleForm.subsPrice" placeholder="">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="剩余数量" prop="stock">
                        <el-input v-model="ruleForm.stock" placeholder=""></el-input>
                    </el-form-item>

                </el-col>
              <!--   <el-col :span="12">
                    <el-form-item label="已预约数量" prop="salesVolume">
                        <el-input v-model="ruleForm.salesVolume" placeholder=""></el-input>
                    </el-form-item>
                </el-col> -->
            </el-row>
            
            <el-row>
                <el-col :span="12">
                    <el-form-item label="所属分区" prop="type">
                        <!-- <el-input v-model="ruleForm.belongBlock" placeholder=""></el-input> -->

                        <el-select v-model="ruleForm.type" placeholder="请选择所属分区">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.name"
                              :value="item.value">
                            </el-option>
                        </el-select>

                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="商品上架" prop="sale">
                        <!-- <el-input v-model="ruleForm.isgrounding" placeholder=""></el-input> -->
                        <el-switch v-model="ruleForm.sale" ></el-switch>
                    </el-form-item>

                </el-col>
                
            </el-row>


            <el-form-item label="项目缩略图" prop="firstImage" required>
                <el-upload class="picUploader" :action="uploadSrc" :show-file-list="false" :headers="xhrHead" :on-success="logoUpLoaded" :before-upload="beforeUpload">
                    <img v-if="ruleForm.firstImage" :src="ruleForm.firstImage" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            
            <el-form-item label="轮播图" prop="images" required>
                <el-upload :limit="20" :on-exceed="overLimit" class="picUploader" :file-list="imagesList" :action="uploadSrc" :show-file-list="true" list-type="picture-card" :headers="xhrHead" :on-success="shortUpLoaded" :before-upload="beforeUpload" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>


            <el-form-item label="详情" required>
                <div style="width:100%;">
                    <wang v-model="ruleForm.content" :upload="upLoadFunc" ref="wangEditor"></wang>
                </div>
            </el-form-item>

            <el-form-item>
                <!-- <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button> -->
                <el-button type="primary" @click="submitForm('ruleForm')" v-if="type!='edite'" >立即创建</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')" v-else >保存修改</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
                <el-button @click="goback">返回</el-button>
            </el-form-item>


        </el-form>

        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>

<script>
    // import ue from "@/components/ue/ue";
    // import { upload } from '@/api/upload'
    import wang from "@/components/wangEditor";

    import { projectpublish,projectuploadUrl,projectupload,projectmodify,sortlist,sortpage } from '@/api/project'
    import { list } from '@/api/hospital'

    import { getToken } from '@/utils/auth'

export default {
    data() {
        return {
            // uploadSrc:"https://jsonplaceholder.typicode.com/posts/", //图片上传地址
            // uploadSrc:"http://127.0.0.1:12345/upLoad", //图片上传地址
            uploadSrc:this.baseUrl+projectuploadUrl,
            upLoadFunc:projectupload,

            dialogImageUrl: '',//预览图片地址
            dialogVisible: false,//预览图片开关

            imagesList:[],//ruleForm.images数组形式
            ruleForm: {
                name:"", //项目名称
                // sort:"", //所属分类
                categoryId:"", //所属分类
                // hospital:"", //所属医院
                hospitalId:"", //所属医院
                // orderby:null, //排序
                sort:null, //排序
                // fakeSell:null, //虚拟销量
                virtualSales:null, //虚拟销量
                // logo:"", //项目缩略图
                firstImage:"", //项目缩略图
                // picList:[], //轮播图
                images:"", //轮播图
                // oldPrice:null, //原价
                price:null, //原价
                // specialPrice:null, //优惠价
                couponPrice:null, //优惠价
                // orderPrice:null, //预约价
                subsPrice:null, //预约价
                // info:"", //详情
                content:"", //详情
                // leftNum:null, //剩余数量
                stock:0, //剩余数量
                // orderNum:null, //已预约数量
                // salesVolume:0, //已预约数量
                // isgrounding:false, //是否上架
                sale:false, //是否上架
                // belongBlock:"", //所属分区（普通区、特价区、VIP区、钻石区）
                type:0, //所属分区（0:普通区、1:特价区、2:VIP区、3:钻石区）
            },
            rules: {
                name: [
                    { required: true, message: '请输入项目名称', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                hospitalId:[
                    { required: true, message: '请输入医院id', trigger: 'blur' },
                ],
                sort:[
                    { required: true, message: '请输入排序', trigger: 'blur' },
                ],
                virtualSales:[
                    { required: true, message: '请输入虚拟销量', trigger: 'blur' },
                ],
                couponPrice:[
                    { required: true, message: '请输入优惠价格', trigger: 'blur' },
                ],
                subsPrice:[
                    { required: true, message: '请输入预约价格', trigger: 'blur' },
                ],
                categoryId:[
                    { required: true, message: '请输入项目分类id', trigger: 'blur' },
                ],
                price:[
                    { required: true, message: '请输入原价', trigger: 'blur' },
                ],
                stock:[
                    { required: true, message: '请输入剩余数量', trigger: 'blur' },
                ],
                // salesVolume:[
                //     { required: true, message: '请输入已预约数量', trigger: 'blur' },
                // ],
            },

            options:[
                {value:0,name:"普通区"},
                {value:1,name:"特价区"},
                {value:2,name:"VIP区"},
                {value:3,name:"钻石区"},
            ],//所属分区

            hospitalOption:[],
            projectSortOption:[],

            type:"",//判断是编辑还是添加模式
            id:"",
        }
    },
    components: {
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
        overLimit(files, fileList){
            console.log(files)
            console.log(fileList)
            this.$message.error('超出上传上限！');
        },
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
                this.ruleForm.firstImage=this.picBaseUrl+response.result.url
            }
        },



        shortUpLoaded(response, file, fileList){
            // 商品缩略图上传后函数

            // this.imageUrl = URL.createObjectURL(file.raw);
            console.log(response)
            console.log(file)
            console.log(fileList)
            // if(response.msg=="success"){
            //     this.ruleForm.firstImage=this.picBaseUrl+response.result.url
            // }

            this.imagesList.push({
                name:response.result.url,
                url:this.picBaseUrl+response.result.url
            })
            var ar=[]
            for(var i=0;i<this.imagesList.length;i++){
                ar.push(this.imagesList[i].url)
            }
            this.ruleForm.images=ar.join(",")

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

            this.ruleForm.content=this.$refs.wangEditor.getWords()


            if(this.type=="edite"){
                this.ruleForm.id=this.id
                projectmodify(this.ruleForm).then(function(response){
                    that.$router.go(-1)
                })
                return
            }

            projectpublish(this.ruleForm).then(function(response){
                that.$router.go(-1)
            })

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
        //     projectupload(formData).then(function(res){
        //         editor.editor.insertEmbed(
        //             editor.editor.getSelection().index,
        //             "image",
        //             res.path
        //         );

        //     })
        //     // window.a=editor
        // },

        handlePictureCardPreview(file){
            // 商品缩略图预览
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        handleRemove(file, fileList){
            // 商品缩略图移除

            console.log(file)
            console.log(fileList)

            var index=this.imagesList.findIndex(function(obj){
                return obj.url==file.url
            })

            if(index>-1){
                this.imagesList.splice(index,1)
            }
            var ar=[]
            for(var i=0;i<this.imagesList.length;i++){
                ar.push(this.imagesList[i].url)
            }
            this.ruleForm.images=ar.join(",")

        },

        goback(){
            this.$router.go(-1)
        },
        init(){
            var that=this;

            sortlist({
                allIs:true
            }).then(function(response){
                that.projectSortOption=response.result
                // console.log(response)
            })
            list().then(function(response){
                // console.log(response)
                that.hospitalOption=response.result
            })

        }


    },
    created(){
        // 修改编辑页有值
        // console.log(this.$route.query)

        // this.$route.query.row={
        //             id:1,
        //             name:"项目1", //项目名称
        //             // sort:"眼睛", //所属分类
        //             categoryId:"眼睛", //所属分类
        //             // hospital:"什么医院", //所属医院
        //             hospitalId:"什么医院", //所属医院
        //             // orderby:1, //排序
        //             sort:1, //排序
        //             // fakeSell:100, //虚拟销量
        //             virtualSales:100, //虚拟销量
        //             // logo:"https://img.yzcdn.cn/vant/cat.jpeg", //项目缩略图
        //             firstImage:"https://img.yzcdn.cn/vant/cat.jpeg", //项目缩略图
        //             // picList:["https://img.yzcdn.cn/vant/cat.jpeg","https://img.yzcdn.cn/vant/cat.jpeg"], //轮播图
        //             images:"https://img.yzcdn.cn/vant/cat.jpeg,https://img.yzcdn.cn/vant/cat.jpeg", //轮播图
        //             // oldPrice:1903.00, //原价
        //             price:1903.00, //原价
        //             // specialPrice:324.00, //优惠价
        //             couponPrice:324.00, //优惠价
        //             // orderPrice:10.00, //预约价
        //             subsPrice:10.00, //预约价
        //             // info:"项目详情", //详情
        //             content:"项目详情", //详情
        //             // leftNum:88, //剩余数量
        //             stock:88, //剩余数量
        //             // orderNum:902, //已预约数量
        //             salesVolume:902, //已预约数量
        //             // isgrounding:true, //是否上架
        //             sale:true, //是否上架
        //             // belongBlock:"普通区", //所属分区（普通区、特价区、VIP区、钻石区）
        //             type:1, //所属分区（0:普通区、1:特价区、2:VIP区、3:钻石区）
        //         }

        this.init()

        if(this.$route.query.row){
            // 编辑模式
            this.type="edite"

            var row=JSON.parse(this.$route.query.row)
            // var row=this.$route.query.row
            this.ruleForm.name=row.name
            this.ruleForm.categoryId=row.categoryId
            this.ruleForm.hospitalId=row.hospitalId
            this.ruleForm.sort=row.sort
            this.ruleForm.virtualSales=row.virtualSales
            this.ruleForm.firstImage=row.firstImage
            this.ruleForm.images=row.images

            var ar=row.images.split(",")
            this.imagesList=[];
            for(var i =0;i<ar.length;i++){
                this.imagesList.push({
                    name:i,
                    url:ar[i]
                })
            }


            this.ruleForm.price=row.price
            this.ruleForm.couponPrice=row.couponPrice

            this.ruleForm.subsPrice=row.subsPrice
            this.ruleForm.content=row.content
            this.ruleForm.stock=row.stock
            // this.ruleForm.salesVolume=row.salesVolume
            this.ruleForm.sale=row.sale
            this.ruleForm.type=row.type

            this.id=row.id

        }


    },
    mounted(){
       
    }
}
</script>

<style >
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