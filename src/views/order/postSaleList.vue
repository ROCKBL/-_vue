<template>
    <div class="goodList" v-loading="loading">
        <div class="goodsBtns">
            <el-input placeholder="请输入内容" v-model="searchInput" class="inputWithSelect">
                <el-select slot="prepend"  v-model="initOption" placeholder="请选择"  class="selectType">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-input>
            
            <div class="orderDateUnit">
                <div class="">下单时间：</div>
                <el-date-picker v-model="dateAr" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
            </div>
            
            <el-button size="small" type="primary" @click="searchOrders" style="margin-left: auto;">筛选</el-button>
            <el-button size="small" @click="download">批量导出</el-button>
        </div>

        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="orderTabs">
            <el-tab-pane :label="tab.label" :name="tab.name" v-for="tab in orderTabs">
                <orderListView :ref="tab.name" :activeName="activeName" :tableType="tab" :initOption="initOption" :searchInput="searchInput" :dateAr="dateAr"></orderListView>
            </el-tab-pane>

        </el-tabs>

    </div>
</template>

<script>
    import orderListView from "./postSaleListComponent";
export default {
    components: {
        orderListView,
    },
    data() {
        return {
            loading:false,
            tableStyle:{
                textAlign:"center"
            },
            initOption:"订单号",//下拉框选中值
            options:[
                { label:"订单号",value:"订单号"},
                { label:"用户",value:"用户"},
                { label:"收货人",value:"收货人"},
            ],
            searchInput:"",//输入框

            dateAr:null,//时间数组

            pickerOptions:{
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },

            activeName: null,

            orderTabs:[
                {label:"全部",name:"all"},
                {label:"待处理",name:"unhandle"},
                {label:"已处理",name:"handled"},
            ],

        }
    },
    computed:{},
    methods: {
        searchOrders(){
            // 根据多个条件搜索订单
            this.$refs[this.activeName][0].initData()

        },
        download(){
            // 批量导出功能
        },

        handleClick(tab, event) {
            // 清空条件
            this.initCondition()
            //表格获取数据
            this.$refs[tab.name][0].initData()

        },
        initCondition(){
            this.activeName=this.orderTabs[0].name;
            this.searchInput=""
            this.dateAr=null
        },
        initTable(){
            this.$refs[this.orderTabs[0].name][0].initData()
        }

    },
    created(){
        // console.log(this.$router.currentRoute)
        // 判断页面类型
        if(this.$router.currentRoute.name=="订单列表"){
            console.log("订单列表")
        }
        if(this.$router.currentRoute.name=="自提订单"){
            console.log("自提订单")
        }
        

    },
    mounted(){
        this.initCondition()
        this.initTable()
        // 获取orderTabs[0]列表数据
        // this.loading=true
        // var that=this;
        // setTimeout(function(){
        //     that.loading=false
        // },5000)
    }
}
</script>

<style >
    .goodList{
        padding: 20px;
    }
    .goodsBtns{
        display: flex;
        align-items: center;
    }

    .orderDateUnit{
        display: flex;
        align-items: center;
        margin-left: 20px;
    }

    .selectType{
        width: 100px;
    }
    .inputWithSelect>.el-input__inner{
        width: 200px;
    }

    .goodsTable{
        margin-top: 20px;
    }
    
    .goodsBtns .el-input-group{
        width: inherit;
    }
    .orderTabs{
        margin-top: 20px;
    }
</style>