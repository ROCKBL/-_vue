<template>
    <div class="addAttr">
        <div class="attrNameRow">
            <el-row >
                <el-col :span="10" class="attrNameCol">
                    <div class="attrNameRowLabel">规格名称：</div>
                    <el-input class="attrNameRowInput" placeholder="请输入规格名称" v-model="attrname" :disabled="attrId!=null"></el-input>
                </el-col>
                <el-col :span="10" class="attrNameCol">
                    <div class="attrNameRowLabel">规格所属商品分类：</div>
                    <el-select v-model="goodCategoryId" placeholder="请选择所属分类" :disabled="attrId!=null">
                        <el-option
                          v-for="item in projectSortOption"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                    </el-select>
                </el-col>

                <el-col :span="4" class="attrNameCol">
                    <el-button @click="addAttrName" v-if="attrId==null" class="attrNameRowBtn" type="primary">确认</el-button>
                </el-col>
            </el-row>
            
        </div>

        <!-- 规格属性值编辑 -->
        <div class="attrValue" v-if="attrId!=null" >
            <div class="attrValueLabel">规格值：</div>
            <div class="attrValueCol">
                <el-tag class="attrValueTag"
                  :key="tag.id"
                  v-for="tag in dynamicTags"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                  @click="editTag(tag)">
                  {{ tag.value }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput" icon="el-icon-plus">添加规格值</el-button>
            </div>
            
        </div>


        <el-dialog
          :visible.sync="dialogVisible"
          width="30%">
          <div class="">
              <div class="">规格值:</div>
              <el-input v-model="dialogObj.value" ></el-input>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="confirm">确定修改</el-button>
          </span>
        </el-dialog>

    </div>
</template>

<script>
    // import ue from "@/components/ue/ue";
    // import { upload } from '@/api/upload'

    import { gamodify,gapublish,galdelete,galmodify,galpublish,galpage,gsortlist } from '@/api/goods'

    import { getToken } from '@/utils/auth'

export default {
    data() {
        return {
            goodCategoryId:null,//规格所属商品分类ID
            attrname:"",//规格名称
            attrId:null,//规格id
            projectSortOption:[],
            type:"",//判断是编辑还是添加模式

            dynamicTags: [],
            inputVisible: false,
            inputValue: '',


            dialogVisible:false,
            dialogObj:{},


        }
    },
    components: {

    },
    computed:{

    },
    methods: {
        addAttrName(){
            var data={
                name:this.attrname,
                goodCategoryId:this.goodCategoryId
            }
            var that=this;
            gapublish(data).then(function(response){
                console.log(response)
                if(response.code==1){
                    that.attrId=response.result
                }
                

            })
        },

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
        },


        handleClose(tag) {
            var that=this;

            galdelete({
                id:tag.id
            }).then(function(response){
                that.refreshTag()
            })

        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
              this.$refs.saveTagInput.$refs.input.focus();
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
              // this.dynamicTags.push(inputValue);
              // 上传刷新
              var that=this;
              galpublish({
                value:inputValue,
                goodAttrId:this.attrId,
              }).then(function(response){
                that.refreshTag()
              })

            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        editTag(tag){
            this.dialogVisible=true
            this.dialogObj=tag
        },

        confirm(){
            var that=this;
            galmodify({
                goodAttrId:this.attrId,
                id:this.dialogObj.id,
                value:this.dialogObj.value,

            }).then(function(response){
                that.refreshTag()
                that.dialogVisible=false

            })
        },

        refreshTag(){
            var that=this;
            galpage({
                limit:999,
                start:1,
                goodAttrId:this.attrId,

            }).then(function(response){
                that.dynamicTags=response.result.items
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
            
            this.attrId=row.id
            this.goodCategoryId=row.goodCategoryId
            this.attrname=row.name

            this.refreshTag()

        }
        this.init()
        

    },
    mounted(){
       
    }
}
</script>

<style>
    .addAttr{
        padding: 20px 10%;
    }

    .addAttr .picUploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .addAttr .picUploader .el-upload:hover {
        border-color: #409EFF;
    }
    .addAttr .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .addAttr .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    .addAttr .servesContentWords{
        color: rgba(0,0,0,0.4);
        font-size: 12px;
    }


    .addAttr .attrNameCol{
        display: flex;
        align-items: center;
    }
    
    .addAttr .attrNameRowLabel{
        font-size: 14px;
        color: #606266;
    }
    .addAttr .attrNameRowBtn{
        margin-left: 10px;
    }
    .addAttr .attrNameRowInput{
        width: 200px;
    }




    .addAttr .el-tag + .el-tag {
        margin-left: 10px;
    }
    .addAttr .button-new-tag {
        margin-left: 10px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .addAttr .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }

    .addAttr .attrValue{
        display: flex;
        align-items: center;
        margin-top: 20px;
    }
    .addAttr .attrValueLabel{
        font-size: 14px;
        color: #606266;
        align-items: baseline;
        flex-basis: 70px;
        text-align: right;
        width: 70px;
        min-width: 70px;
    }
    .addAttr .attrValueCol{
        display: flex;
        flex-wrap: wrap;
    }

    .addAttr .attrValueTag{
        margin-bottom: 10px;
    }
</style>