<template>
    <div class="goodList">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
            <el-tab-pane label="会员等级设置" name="first">
                <el-form :model="settingForm" :rules="settingRules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="等级" prop="level">
                        <el-input v-model="settingForm.level"></el-input>
                    </el-form-item>
                    <el-form-item label="等级名称" prop="name">
                        <el-input v-model="settingForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="升级条件" prop="condition">
                        <el-input v-model="settingForm.condition">
                            <template slot="prepend">累计完成订单金额满</template>
                            <template slot="append">元</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="折扣" prop="discount">
                        <el-input v-model="settingForm.discount">
                            <template slot="append">折</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="状态" prop="status">
                        <el-radio-group v-model="settingForm.status">
                            <el-radio label="1">启用</el-radio>
                            <el-radio label="2">禁用</el-radio>
                        </el-radio-group>
                    </el-form-item>


                    <el-form-item>
                        <el-button type="primary" @click="saveSetting">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="会员等级说明" name="second" >
                <el-form :model="descriptionForm" :rules="descriptionRules" ref="ruleForm1" label-width="120px" class="demo-ruleForm">
                    <el-form-item label="会员等级说明" prop="desc" required>
                        <el-input type="textarea" v-model="descriptionForm.description" :autosize="{ minRows: 8, maxRows: 20}"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="saveDescription">保存</el-button>
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>

        
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeName: 'first',
            settingForm:{
                level:"",
                name:"",
                condition:"",
                discount:"",
                status:"2"
            },
            settingRules:{},
            descriptionForm:{
                description:""
            },
            descriptionRules:{}

        }
    },
    computed:{},
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        saveDescription(){

        },
        saveSetting(){}

    },
    created(){},
    mounted(){
        // 获取会员分类数据
    }
}
</script>

<style >
    .goodList{
        padding: 20px;
    }
    
    
</style>