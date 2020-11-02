<template>
    <div class="goodForm">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
            <el-row>
                <el-col :span="12">
                    <el-form-item label="商品分类" prop="categoryId">
                        <el-select v-model="ruleForm.categoryId" placeholder="请选择商品分类" @change="categoryIdChange" :disabled="attrConfirm">
                            <el-option v-for="sort in sorts" :label="sort.name" :value="sort.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="商品名称" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="单位" prop="unit" required>
                        <el-input v-model="ruleForm.unit"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="商品积分" prop="integral" required>
                        <el-input v-model="ruleForm.integral">
                            <template slot="append">分</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="虚拟销量" prop="virtualSales" required>
                        <el-input v-model.number="ruleForm.virtualSales"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="商品排序" prop="sort" required>
                        <el-input v-model="ruleForm.sort"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>


            <el-row>
                <el-col :span="12">
                    <el-form-item label="商品价格" prop="price" required>
                        <el-input v-model.number="ruleForm.price">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="商品优惠价" prop="couponPrice" required>
                        <el-input v-model="ruleForm.couponPrice">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>


            <el-row>
                <el-col :span="12">
                    <el-form-item label="商品上架" prop="sale">
                        <el-switch v-model="ruleForm.sale" ></el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="特色商品" prop="specialtyIs">
                        <el-switch v-model="ruleForm.specialtyIs" ></el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="精品推荐" prop="recommendIs">
                        <el-switch v-model="ruleForm.recommendIs" ></el-switch>
                    </el-form-item>
                </el-col>
            </el-row>

            <!-- <el-row>
                <el-col :span="12"></el-col>
                <el-col :span="12"></el-col>
            </el-row> -->

            <el-form-item label="商品参数" prop="" required>
                <div class="paramItem" v-for="(param,index) in ruleForm.params">
                    <div>参数名称：</div>
                    <el-select style="margin-left: 10px;" v-model="param.goodsParamId" placeholder="请选择商品参数">
                        <el-option v-for="p in paramList" :label="p.name" :value="p.id"></el-option>
                    </el-select>
                    <div style="margin-left: 20px;">参数值：</div>
                    <el-input style="width: 200px;margin-left: 10px;" v-model="param.value" placeholder="请输入相应的参数值"></el-input>
                    <el-button type="danger" style="margin-left: 10px;" icon="el-icon-delete" circle @click="deleteParams(index)" size="small"></el-button>
                </div>
                <el-button type="primary" @click="addParams" size="small">添加商品参数</el-button>
            </el-form-item>

            <!-- 添加商品规格 -->
            <el-form-item v-if="!attrConfirm" label="商品规格" prop="" required>
                <div class="attrItem" v-for="(attr,index) in attrAdded">
                    <div>规格名称：</div>
                    <el-select style="margin-left: 10px;" v-model="attr.id" placeholder="请选择商品规格">
                        <el-option v-for="a in attrList" :label="a.name" :value="a.id"></el-option>
                    </el-select>

                    <el-button type="danger" style="margin-left: 10px;" icon="el-icon-delete" circle @click="deleteAttr(index)" size="small"></el-button>
                    
                </div>

                <el-button type="primary" @click="addAttr" size="small">添加商品规格</el-button>
                <el-button type="primary" v-if="attrAdded.length>0" @click="confirmAdd" size="small">确认添加</el-button>
            </el-form-item>


            <!-- 添加商品库存 -->
            <el-form-item v-if="attrConfirm" label="商品库存" prop="" required>
                <el-button type="primary" @click="addSku" size="small">添加商品库存</el-button>

                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="image" label="图片" width="100">
                        <template slot-scope="scope">
                            <el-image style="width: 100%" :src="scope.row.image" fit="contain"></el-image>
                        </template>
                    </el-table-column>
                    <el-table-column prop="couponPrice" label="优惠价" width="100"></el-table-column>
                    <el-table-column prop="price" label="价格" width="100"></el-table-column>
                    <el-table-column prop="num" label="库存" width="100"></el-table-column>
                    <el-table-column prop="weight" label="重量" width="100"></el-table-column>

                    <el-table-column v-for="attr in attrAdded" :prop="String(attr.id)" :label="attr.name">
                        <template slot-scope="scope">
                            <div>{{ getAttrValue(String(attr.id),scope.row[String(attr.id)]) }}</div>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" show-overflow-tooltip width="160">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="editeSku(scope.$index, scope.row)">修改</el-button>
                            <el-button size="mini" type="danger" @click="deleteSku(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </el-form-item>


            <el-form-item label="商品主图" prop="firstImage" required>
                <el-upload class="picUploader" :action="uploadSrc" :show-file-list="false" :headers="xhrHead" :on-success="mainUpLoaded" :before-upload="beforeUpload">
                    <img v-if="ruleForm.firstImage" :src="ruleForm.firstImage" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            
            <el-form-item label="商品轮播图" prop="shortPic" required>
                <el-upload class="picUploader" :file-list="imagesList" :action="uploadSrc" :show-file-list="true" :headers="xhrHead" list-type="picture-card" :on-success="shortUpLoaded" :before-upload="beforeUpload" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>

            
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>

 


            <el-form-item label="商品详情" required>
                <div style="width:100%;">
                    <!-- <ue @onEditorChange="onEditorChange" v-model="ruleForm.detail" @fileChange="hasImgAndUpload" /> -->
                    <wang v-model="ruleForm.detail" :upload="upLoadFunc" ref="wangEditor"></wang>
              </div>
            </el-form-item>

            <el-form-item>
                <!-- <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button> -->
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->

                <el-button type="primary" @click="submitForm('ruleForm')" v-if="type!='edite'" >立即创建</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')" v-else >保存修改</el-button>
                <el-button @click="goback">返回</el-button>
            </el-form-item>
        </el-form>



        <el-dialog title="编辑库存" :visible.sync="dialogFormVisible">
          <el-form :model="skuObj" label-width="100px">

            <el-row>
                <el-col :span="12">
                    <el-form-item label="优惠价" prop="couponPrice" required>
                        <el-input v-model="skuObj.couponPrice">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="价格" prop="price" required>
                        <el-input v-model="skuObj.price">
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="库存" prop="num" required>
                        <el-input v-model="skuObj.num"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="重量" prop="weight" required>
                        <el-input v-model="skuObj.weight">
                            <template slot="append">克</template>
                        </el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <!-- <el-row>
                <el-col :span="12"></el-col>
                <el-col :span="12"></el-col>
            </el-row> -->
            
            
            
            
            <!-- <el-col :span="12" v-for="attr in attrAdded">
                <el-form-item :label="attr.name" prop="">
                    <el-select v-model="skuObj[attr.id]" :placeholder="'请选择'+attr.name" >
                        <el-option v-for="value in attr.values" :label="value.value" :value="value.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-col> -->


            <el-form-item v-for="attr in attrAdded" :label="attr.name" prop="" required>
                <el-select v-model="skuObj[attr.id]" :placeholder="'请选择'+attr.name" >
                    <el-option v-for="value in attr.values" :label="value.value" :value="value.id"></el-option>
                </el-select>
            </el-form-item>



            <el-form-item label="图片" prop="firstImage" required>
                <el-upload class="picUploader" :action="uploadSrc" :show-file-list="false" :headers="xhrHead" :on-success="skuUpLoaded" :before-upload="beforeUpload">
                    <img v-if="skuObj.image" :src="skuObj.image" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>

          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogConfirm">确 定</el-button>
          </div>
        </el-dialog>

    </div>
</template>

<script>

    // import ue from "@/components/ue/ue";

    import wang from "@/components/wangEditor";

    import { gdetail,gpublish,goodsuploadUrl,gupload,gmodify,gsortlist,gplist,galist,gallist } from '@/api/goods'


    import { getToken } from '@/utils/auth'


export default {
    data() {
        return {
            // uploadSrc:"https://jsonplaceholder.typicode.com/posts/", //图片上传地址
            // uploadSrc:"http://127.0.0.1:12345/upLoad", //图片上传地址


            uploadSrc:this.baseUrl+goodsuploadUrl,
            upLoadFunc:gupload,


            dialogImageUrl: '',//预览图片地址
            dialogVisible: false,//预览图片开关

            imagesList:[],//ruleForm.images数组形式

            ruleForm: {
                categoryId:null,//商品种类
                firstImage:"",//商品主图
                images:"",//商品轮播图
                integral:0,//商品积分
                name:"",//商品名称

                params:[
                    // {goodsParamId:0,value:""}
                ],//商品参数列表
                sale:false,//上下架
                salesVolume:0,
                sort:"",//排序
                specs:[
                    // {couponPrice:"",image:"",num:"",price:"",skus:{},weight:""}
                ],//商品规格列表

                unit:"",//单位
                
                virtualSales:"",//虚拟销量

                detail:"",//商品详情，富文本编辑器内容

                price:"",//价格
                couponPrice:"",//优惠价

                specialtyIs:false,//特色商品
                recommendIs:false,//精品推荐

            },
            rules: {
                name: [
                    { required: true, message: '请输入商品名称', trigger: 'blur' },
                    // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                categoryId: [
                    { required: true, message: '请选择商品分类', trigger: 'change' }
                ],
                
            },
            sorts:[
                // {name:"分类1"},
                // {name:"分类2"},
            ],//商品分类

            paramList:[],//商品参数列表
            attrList:[],//商品规格列表

            attrAdded:[],//已经添加商品规格


            type:"",//新建或编辑模式
            attrConfirm:false,//商品和规格是否已关联


            tableData:[],//商品库存表格

            skuIndex:null,//tableData数据的索引，据此判断是编辑还是新增
            skuObj:{
                image:null,
                couponPrice:null,
                price:null,
                num:null,
                weight:null,
            },//单个SKU

            dialogFormVisible:false,


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
        },

        // leftAttrList(){
        //     var rtn=[]
        //     var that=this;
        //     for(var i=0;i<this.attrList.length;i++){
        //         var index=this.attrAdded.findIndex(function(o){
        //             return o.aid===that.attrList[i].id
        //         })
        //         if(index==-1){
        //             rtn.push(that.attrList[i])
        //         }
        //     }
        //     return rtn;
        // }
    },
    methods: {
        editeSku(index,row){
            this.skuObj=row
            this.skuIndex=index
            this.dialogFormVisible=true
        },
        deleteSku(index,row){
            this.tableData.splice(index,1)
        },

        getAttrValue(attrId,attrValueId){
            // console.log(attrId)
            // console.log(attrValueId)
            console.log(attrId,",",attrValueId)
            console.log(this.attrAdded)
            var obj=this.attrAdded.find(function(o){
                return o.id==attrId
            })

            var obj1=obj.values.find(function(o){
                return o.id==attrValueId
            })

            return obj1.value
        },
        dialogConfirm(){
            // 添加或者修改
            if(this.skuIndex==null){
                this.tableData.push(this.skuObj)
            }
            this.dialogFormVisible=false
        },

        skuUpLoaded(response, file, fileList){
            if(response.msg=="success"){
                this.skuObj.image=this.picBaseUrl+response.result.url
            }
        },

        filterData(ar,key){
            // 过滤数据
            var rtn=[]
            var checkobj={}
            for(var i=0;i<ar.length;i++){
                if(ar[i][key]!=null && !checkobj[ar[i][key]] ){
                    checkobj[ar[i][key]]=true
                    rtn.push(ar[i])
                }
            }
            return rtn
        },
        completeAttrAdded(){
            // 完善AttrAdded
            // console.log(this.attrList)
            var that=this;
            this.attrAdded=this.attrAdded.map(function(o){
                var obj=that.attrList.find(function(xo){
                    return xo.id==o.id
                })
                o.name=obj.name
                return o
            })

            var ajaxar=[]

            for(var i=0;i<this.attrAdded.length;i++){
                (function(i){
                    var ajaxobj=gallist({
                        goodAttrId:that.attrAdded[i].id
                    }).then(function(response){
                        // console.log(response)
                        // console.log(that.attrAdded[i])
                        that.attrAdded[i].values=response.result
                    })

                    ajaxar.push(ajaxobj)
                })(i)
                
            }
            return this.axios.all(ajaxar)
        },
        addSku(){
            // 添加单个sku
            var obj={
                image:null,
                couponPrice:null,
                price:null,
                num:null,
                weight:null,
            }
            this.skuObj=obj
            this.skuIndex=null
            this.dialogFormVisible=true

        },

        addAttr(){
            // 添加商品规格
            if(this.ruleForm.categoryId==null){
                this.$message.error('请先选择商品分类！');
            }else{
                this.attrAdded.push({
                    id:null,
                    name:null
                })
            }
        },
        deleteAttr(index){
            this.attrAdded.splice(index,1)
        },

        confirmAdd(){
            // 绑定商品和商品规格
            

            this.attrAdded=this.filterData(this.attrAdded,"id")
            if(this.attrAdded.length==0){
                this.$message.error('请先添加规格');
                return
            }
            this.attrConfirm=true
            this.completeAttrAdded()

            console.log(this.attrAdded)
        },



        categoryIdChange(id){
            console.log(id)
            // 初始化
            this.initList()
            this.initRuleForm()
        },
        initRuleForm(){
            // 初始化initRuleForm中的params和specs
            this.ruleForm.params.length=0
            this.ruleForm.specs.length=0

            this.attrAdded.length=0
        },

        addParams(){
            // 添加商品参数
            if(this.ruleForm.categoryId==null){
                this.$message.error('请先选择商品分类！');
            }else{
                this.ruleForm.params.push({
                    goodsParamId:null,
                    value:null
                })
            }
        },
        deleteParams(index){
            // 删除商品参数
            this.ruleForm.params.splice(index,1)
        },

        goback(){
            this.$router.go(-1)
        },
        beforeUpload(file){
            // 商品主图和缩略图上传前检查图片函数

            // const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 10;

            // if (!isJPG) {
            //   this.$message.error('上传头像图片只能是 JPG 格式!');
            // }
            if (!isLt2M) {
              this.$message.error('上传图片大小不能超过 10MB!');
            }
            // return isJPG && isLt2M;
            return  isLt2M;
        },
        shortUpLoaded(response, file, fileList){
            // 商品缩略图上传后函数

            // this.imageUrl = URL.createObjectURL(file.raw);
            // console.log(response)
            // console.log(file)
            // console.log(fileList)
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
        mainUpLoaded(response, file, fileList){
            // 商品主图上传后函数

            // this.imageUrl = URL.createObjectURL(file.raw);
            // console.log(response)
            // console.log(file)
            // console.log(fileList)
            // this.ruleForm.mainPic=response.path
            if(response.msg=="success"){
                this.ruleForm.firstImage=this.picBaseUrl+response.result.url
            }
        },


        tableDataToSpecs(){
            // 表格数据转规格数据
            var ar=[]
            for(var i =0;i<this.tableData.length;i++){
                var obj={
                    image:this.tableData[i].image,
                    couponPrice:this.tableData[i].couponPrice,
                    price:this.tableData[i].price,
                    num:this.tableData[i].num,
                    weight:this.tableData[i].weight,
                    skus:{}
                }
                if(this.tableData[i].id){
                    obj.id=this.tableData[i].id
                }
                for(var j=0;j<this.attrAdded.length;j++){
                    obj.skus[String(this.attrAdded[j].id)]=this.tableData[i][this.attrAdded[j].id]
                }
                ar.push(obj)
            }
            return ar;
        },

        specsToTableData(){
            // 规格数据转表格数据
            var ar=[];
            console.log(this.ruleForm.specs)
            for(var i=0;i<this.ruleForm.specs.length;i++){
                var obj={
                    image:this.ruleForm.specs[i].image,
                    couponPrice:this.ruleForm.specs[i].couponPrice,
                    price:this.ruleForm.specs[i].price,
                    num:this.ruleForm.specs[i].num,
                    weight:this.ruleForm.specs[i].weight,
                }
                if(this.ruleForm.specs[i].id){
                    obj.id=this.ruleForm.specs[i].id
                }
                for(var p in this.ruleForm.specs[i].skus){
                    obj[p]=this.ruleForm.specs[i].skus[p]
                }
                ar.push(obj)
            }

            return ar;
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


            // 判断商品参数是否完整
            var paramsFlag=false
            for(var i=0;i<this.ruleForm.params;i++){
                // goodsParamId:null,
                    // value:null
                if(this.ruleForm.params[i].goodsParamId==null||this.ruleForm.params[i].value==null||this.ruleForm.params[i].value==""){
                    paramsFlag=true
                }
            }
            
            if(paramsFlag){
                this.$message.error('商品参数信息不完整，请完善');
                return
            }


            // 处理tableData生成ruleForm.specs
            var that=this;
            this.ruleForm.detail=this.$refs.wangEditor.getWords()
            this.ruleForm.specs=this.tableDataToSpecs()

            if(this.type=="edite"){
                gmodify(this.ruleForm).then(function(response){
                    if(response.msg=="success"){
                        that.$router.go(-1)
                    }
                })
                return
            }
            gpublish(this.ruleForm).then(function(response){
                // console.log(response)
                if(response.msg=="success"){
                    that.$router.go(-1)
                }
            })
            
        },
        resetForm(formName) {
            // 表单重置
            this.$refs[formName].resetFields();
        },

        handleRemove(file, fileList){
            // 商品缩略图移除
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
        },
        init(){
            // 初始化商品分类列表
            var that=this;
            gsortlist({
                allIs:true
            }).then(function(response){
                // console.log(response)
                that.sorts=response.result
            })
        },
        initList(){
            var that=this;
            that.paramList=[]
            that.attrList=[]
            // 初始化商品参数列表，商品规格列表
            var obj=this.sorts.find(function(o){return o.id==that.ruleForm.categoryId})
            var goodCategoryId=this.ruleForm.categoryId
            if(obj.upId!=null){
                goodCategoryId=obj.upId
            }

            var a1=gplist({
                goodCategoryId:goodCategoryId
            }).then(function(response){
                that.paramList=response.result

                // console.log("a1")
            })
            var a2=galist({
                goodCategoryId:goodCategoryId
            }).then(function(response){
                that.attrList=response.result

                // console.log("a2")
            })

            return this.axios.all([a1,a2])
            // return Promise.all([a1,a2])
            // return a2
        },
        initAttrAdded(){
            for(var a in this.ruleForm.specs[0].skus){
                this.attrAdded.push({
                    id:a
                })
            }
        },



    },
    created(){
        // 修改编辑页有值
        console.log(this.$route.query)

        this.init()

        if(this.$route.query.id){
            // 编辑模式
            this.type="edite"
            this.attrConfirm=true

            var that=this;
            gdetail({
                id:this.$route.query.id
            }).then(function(response){
                // console.log(response)
                that.ruleForm=response.result

                for(var i=0;i<that.ruleForm.specs.length;i++){
                    var obj={}
                    // console.log(that.ruleForm.specs)
                    for(var j=0;j<that.ruleForm.specs[i].skus.length;j++){
                        var ar=that.ruleForm.specs[i].skus[j].split(",")

                        // console.log(ar)
                        obj[Number(ar[0])]=Number(ar[1])
                    }
                    that.ruleForm.specs[i].skus=obj
                }


                // 处理图片
                var imgar=that.ruleForm.images.split(",")
                that.imagesList=[];
                for(var i =0;i<imgar.length;i++){
                    that.imagesList.push({
                        name:i,
                        url:imgar[i]
                    })
                }
                // 处理富文本
                that.$refs.wangEditor.setWords(that.ruleForm.detail)


                // 初始化attrAdded
                that.initList().then(function(){
                    that.initAttrAdded()
                    // console.log(that.attrAdded)
                    // console.log(that.ruleForm)
                    // console.log(that.attrList)
                    that.completeAttrAdded().then(function(){
                        that.tableData=that.specsToTableData()

                        console.log(that.ruleForm)
                    })
                    
                })
                
            })


 
            


            // this.ruleForm.price=row.price
            // this.ruleForm.couponPrice=row.couponPrice

            // this.ruleForm.subsPrice=row.subsPrice
            // this.ruleForm.content=row.content
            // this.ruleForm.stock=row.stock
            // this.ruleForm.salesVolume=row.salesVolume
            // this.ruleForm.sale=row.sale
            // this.ruleForm.type=row.type

        }
        

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


    .goodForm .paramItem{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        border:1px solid rgba(0,0,0,0.1);
        border-radius: 5px;
        padding: 10px 20px;
        box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
        width: fit-content;
    }

    .attrItem{
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        border:1px solid rgba(0,0,0,0.1);
        border-radius: 5px;
        padding: 10px 20px;
        box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
        width: fit-content;
    }
</style>