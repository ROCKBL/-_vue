<template>
    <div class="goodList">
        <el-card class="box-card">
            <div slot="header" class="box-head" :style="headColor">
                <div ><i class="el-icon-info"></i>当前订单状态：{{orderInfo.status}}</div>
            </div>
            
            <div class="box-body">
                <div class="box-body-item">
                    <div class="box-body-item-head"><i class="el-icon-s-order"></i>基本信息</div>
                    <div class="box-body-item-content">
                        <el-row>
                            <el-col :span="12"><div class="grid-content">aa</div></el-col>
                            <el-col :span="12"><div class="grid-content">bb</div></el-col>
                        </el-row>
                    </div>
                </div>
            </div>

        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableStyle:{
                textAlign:"center"
            },
            orderInfo:{
                status:'已完成'
            }
            
        }
    },
    computed:{
        headColor(){
            var styleObj={
                color:"black"
            }
            switch(this.orderInfo.status){
                case "已完成":
                    styleObj.color="rgb(103, 194, 58)"
                    break;
            }
            return styleObj
        }
    },
    methods: {

    },
    created(){
        // 根据传递的订单信息去服务器获取订单详情
        console.log(this.$route.query)
    },
    mounted(){
        // 获取会员分类数据
    }
}
</script>

<style >
    .goodList{
        padding: 20px;
    }
    
    .box-head{
        color: red;
        display: flex;
        align-items: center;
    }
    .box-card>.el-card__header{
        background: rgb(242, 246, 252);
    }
    .box-head i{
        margin-right: 10px;
    }
    
    .box-body{}
    .box-body-item{}
    .box-body-item-head{
        margin:10px 0px;
    }
    .box-body-item-head>i{
        margin-right: 10px;
    }
    .box-body-item-content{}

    .grid-content{
        color: rgb(48, 49, 51);
        background: rgb(242, 246, 252);
    }
</style>