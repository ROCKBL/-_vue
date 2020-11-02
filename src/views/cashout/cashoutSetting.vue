<template>
    <div class="cashoutSetting">
        <el-form ref="form" :model="form" label-width="180px">
        	<el-row :gutter="20">
			  	<el-col :span="12">
			  		<el-form-item label="每日提现上限">
				    	<el-input v-model.number="form.limitAccount" :disabled="!editeModeFlag" type="number">
				    		<template slot="append">元</template>
				    	</el-input>
				  	</el-form-item>
			  	</el-col>
			  	<el-col :span="12">
			  		<el-form-item label="最小提成金额">
				    	<el-input v-model.number="form.minWithdrawDeposit" :disabled="!editeModeFlag" type="number">
				    		<template slot="append">元</template>
				    	</el-input>
				  	</el-form-item>
			  	</el-col>
			</el-row>

			<el-row :gutter="20">
			  	<el-col :span="12">
			  		<el-form-item label="一级分佣比例">
				    	<el-input v-model.number="form.oneCent" :disabled="!editeModeFlag" @input="loadNumber($event)" type="number">
				    		<template slot="append">%</template>
				    	</el-input>
				  	</el-form-item>
			  	</el-col>
			  	<el-col :span="12">
			  		<el-form-item label="二级分佣比例">
				    	<el-input v-model.number="form.twoCent" :disabled="!editeModeFlag" @input="loadNumber($event)" type="number">
				    		<template slot="append">%</template>
				    	</el-input>
				  	</el-form-item>
			  	</el-col>
			</el-row>
		  	
		  	<el-row :gutter="20">
			  	<el-col :span="12">
			  		<el-form-item label="升级为董事会员的直推数量">
				    	<el-input v-model.number="form.boardMemberNum" :disabled="!editeModeFlag" type="number">
				    		<template slot="append">名</template>
				    	</el-input>
				  	</el-form-item>
			  	</el-col>
			  	<el-col :span="12">
			  		<el-form-item label="升级为总监会员的直推数量">
				    	<el-input v-model.number="form.majordomoNum" :disabled="!editeModeFlag" type="number">
				    		<template slot="append">名</template>
				    	</el-input>
				  	</el-form-item>
			  	</el-col>
			</el-row>
		  	
		  	<el-row :gutter="20">
			  	<el-col :span="12">
			  		<el-form-item label="每分积分兑换人民币比例">
				    	<el-input v-model.number="form.integralPercent" :disabled="!editeModeFlag" type="number">
				    		<template slot="append">元</template>
				    	</el-input>
				  	</el-form-item>
			  	</el-col>
			  	<el-col :span="12">
			  		<el-form-item label="每个订单积分可抵上限">
				    	<el-input v-model.number="form.integralSupperLimit" :disabled="!editeModeFlag" type="number">
				    		<template slot="append">分</template>
				    	</el-input>
				  	</el-form-item>
			  	</el-col>
			</el-row>

		  	<el-form-item label="客服电话">
		    	<el-input v-model.number="form.phone" :disabled="!editeModeFlag" type="number">
		    	</el-input>
		  	</el-form-item>

		  	<el-form-item label="用户须知" >
                <div style="width:100%;" v-if="editeModeFlag">
                    <wang v-model="form.contract" :upload="upLoadFunc" ref="wangEditor"></wang>
                </div>
                <div v-else v-html="form.contract" style="background-color: #F5F7FA;border-radius: 4px;border: 1px solid #DCDFE6;border-color: #E4E7ED;color: #C0C4CC;cursor: not-allowed;"></div>
            </el-form-item>

		  	<el-form-item v-if="editeModeFlag">
		    	<el-button type="primary" @click="onSubmit">保存</el-button>
		    	<el-button @click="cancel">取消</el-button>
		  	</el-form-item>
		  	<el-form-item v-else>
		  		<el-button type="primary" @click="goEditMode">编辑</el-button>
		  	</el-form-item>
		</el-form>
    </div>
</template>

<script>

	import wang from "@/components/wangEditor";
	import { projectupload } from '@/api/project'


    import { sinfo,smodify } from '@/api/cashout'

export default {
    data() {
        return {
        	upLoadFunc:projectupload,

            form: {
	          
	        },
	        editeModeFlag:false
        }
    },
    components: {
        wang,
    },
    computed:{},
    methods: {
    	loadNumber(){
    		if(this.form.oneCent>100){
    			this.form.oneCent=100
    		}
    		if(this.form.twoCent>100){
    			this.form.twoCent=100
    		}
    		if(this.form.oneCent<0){
    			this.form.oneCent=0
    		}
    		if(this.form.twoCent<0){
    			this.form.twoCent=0
    		}
    	},

    	testPhone(phone){
            if(!(/^1[3456789]\d{9}$/.test(phone))){
                this.$message.error("请输入正确的手机号码")
                return false; 
            } 
            return true
        },


        onSubmit(){
        	if(!this.testPhone(this.form.phone)){
                return
            }
        	
	        var that=this;
	        this.form.contract=this.$refs.wangEditor.getWords()

	        smodify(this.form).then(function(res){
	        	console.log(res)
	        	that.editeModeFlag=false
	        })
	    },
	    cancel(){
	    	this.editeModeFlag=false
	    	this.getData()
	    },
	    goEditMode(){
	    	this.editeModeFlag=true
	    },
	    getData(){
	    	var that=this;
	    	sinfo().then(function(res){
	    		console.log(res)
	    		that.form=res.result||{}
	    	})
	    }
    },
    created(){
    	this.getData()
    },
    mounted(){
        // 获取列表数据
    }
}
</script>

<style scoped>
    .cashoutSetting{
        padding: 20px;
    }
    
</style>

