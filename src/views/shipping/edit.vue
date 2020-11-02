<template>
    <div class="editShipping">
        <el-form ref="form" :model="form" :rules="rules" label-width="120px">
            <el-form-item label="运费模板名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="计费方式">
                <el-radio-group v-model="form.tpye">
                    <el-radio :label="0">按重计费</el-radio>
                    <el-radio :label="1">按件计费</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="设置为默认">
                <el-switch v-model="form.defaultIs"></el-switch>
            </el-form-item>

            <el-form-item label="运费规则">
                <div class="ruleUnit" v-if="form.lines&&form.lines.length>0" v-for="(item,index) in form.lines">
                    <div class="ruleUnitRow">
                        <div class="ruleUnitRowItem">首重运费：{{ item.firstFreight }}</div>
                        <div class="ruleUnitRowItem">首重单位（克/件）：{{ item.firstUnit }}</div>
                        <div class="ruleUnitRowItem">续重运费：{{ item.freight }}</div>
                        <div class="ruleUnitRowItem">续重单位（克/件）：{{ item.unit }}</div>
                        <el-button size="mini" round @click="editlines(item)" class="" style="margin-left: auto;">编辑条目</el-button>
                        <el-button size="mini" round @click="deletelines(index,item)">删除条目</el-button>
                    </div>
                    <div class="ruleUnitRow">
                        <div>省份：</div>
                        <div>{{ codeToLabel(item.provinceList) }}</div>
                    </div>
                </div>
                
                <div v-if="form.lines.length==0">暂无规则</div>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="addlines" >新增运费规则条目</el-button>
                <el-button type="primary" @click="save">保存</el-button>
                <el-button @click="goback">取消</el-button>
              </el-form-item>
        </el-form>


        <el-dialog title="运费规则条目" :visible.sync="dialogFormVisible">
            <el-form :model="dialogForm" label-width="120px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="首重运费(元)" required>
                            <el-input v-model="dialogForm.firstFreight" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="首重单位(克/件)" required>
                            <el-input v-model="dialogForm.firstUnit" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12">
                        <el-form-item label="续重运费(元)" required>
                            <el-input v-model="dialogForm.freight" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="续重单位(克/件)" required>
                            <el-input v-model="dialogForm.unit" autocomplete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="24">
                        <el-form-item label="省份" >
                            <el-checkbox-group v-model="checkedProvinces" @change="handleCheckedChange">
                                <el-checkbox v-for="province in leftProvinces" :label="province.code" :key="province.code">{{ province.label }}</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addlinesConfirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>


    import { fdetails,fsave } from '@/api/shipping'
    import area from '@/area/area'


export default {
    data() {
        return {
            form:{
                defaultIs:false,
                lines:[],
                name:"",
                tpye:0
            },
            rules:{
                name:[
                    { required: true, message: '请输入运费模板名称', trigger: 'change' },
                ]
            },
            dialogForm:{
                firstFreight:0,
                firstUnit:0,
                freight:0,
                unit:0,
                provinceList:"",
            },
            dialogFormVisible: false,
            dialogMode:"add", //add：添加   edit:编辑

            type:"add",//判断是编辑还是添加模式

            id:"",

            checkedProvinces:[],
            provinces:[],
            
        }
    },
    components: {

    },
    computed:{
        leftProvinces(){
            var that=this;
            var allChecedProvinces=[]
            var left=[]
            for(var i=0;i<this.form.lines.length;i++){
                if(this.form.lines[i].provinceList!=""){
                    allChecedProvinces=allChecedProvinces.concat(this.form.lines[i].provinceList.split(","))
                }
            }
            for(var i=0;i<this.provinces.length;i++){
                var find=allChecedProvinces.find(function(s){
                    return s==that.provinces[i].code
                })
                if(!find){
                    left.push(that.provinces[i])
                }
            }

            if(this.dialogForm.provinceList!=""){
                var ar=this.dialogForm.provinceList.split(",")
                for(var i=0;i<ar.length;i++){
                    left.push({
                        code:ar[i],
                        label:area.province_list[ar[i]]
                    })
                }
            }
            // console.log(left)
            return left
        }
    },
    methods: {
        save(formName) {
            // 表单提交
            if(this.form.name==""){

                return
            }
            // console.log(this.ruleForm)
            var that=this;
            fsave(this.form).then(function(res){
                that.$router.go(-1)
            })
        },
        codeToLabel(s){
            var ar=s.split(",")
            var labelAr=[]
            for(var i=0;i<ar.length;i++){
                labelAr.push(area.province_list[ar[i]])
            }
            return labelAr.join("，")
        },
        addlines(){
            this.dialogMode="add"

            this.dialogForm={
                firstFreight:0,
                firstUnit:0,
                freight:0,
                unit:0,
                provinceList:"",
            }
            this.dialogFormVisible=true
            this.checkedProvinces.length=0

        },
        deletelines(index,o){
            this.form.lines.splice(index,1)
        },
        editlines(o){
            this.dialogMode="edit"

            this.dialogForm=o
            this.dialogFormVisible=true
            // this.checkedProvinces.length=0;
            if(this.dialogForm.provinceList!=""){

                this.checkedProvinces=this.dialogForm.provinceList.split(",")
            }
            
        },
        addlinesConfirm(){
            // console.log(this.checkedProvinces)

            this.dialogForm.provinceList=this.checkedProvinces.join(",")

            if(this.dialogMode=="add"){
                this.form.lines.push(this.dialogForm)
            }
            
            this.dialogFormVisible=false
        },

        getData(){
            var that=this;
            fdetails({
                id:this.id
            }).then(function(res){
                // console.log(res)
                that.form=res.result
            })
        },
        goback(){
            this.$router.go(-1)
        },
        handleCheckedChange(val){
            console.log(val)
        },
        initProvinces(){
            for(var code in area.province_list){
                var obj={
                    code:code,
                    label:area.province_list[code]
                }
                if(Number(code)<700000){
                    this.provinces.push(obj)
                }
            }
        }

    },
    created(){
        
        this.initProvinces()

        console.log(this.provinces)
        // 修改编辑页有值
        console.log(this.$route.query)

        if(this.$route.query.row){
            // 编辑模式
            this.type="edit"

            var row=JSON.parse(this.$route.query.row)
            this.id=row.id
            this.getData()
        }
    },
    mounted(){
       // console.log(this.uploadSrc)
    }
}
</script>

<style>
    .editShipping{
        padding: 20px 10%;

    }

    .editShipping .ruleUnit{
        border-radius: 5px;
        box-shadow: 0px 0px 5px rgba(0,0,0,0.2);
        padding: 10px;
        margin-bottom: 10px;
    }
    .ruleUnitRow{
        display: flex;
    }
    .ruleUnitRowItem{
        margin-right: 20px;
    }
</style>