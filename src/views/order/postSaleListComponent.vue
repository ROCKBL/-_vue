<template>
    <div class="ordersTable">
        <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" :cell-style="tableStyle" :header-cell-style="tableStyle">
            
            <el-table-column type="expand" label="商品信息" width="100">
                <template slot-scope="props">
                    <div v-for="item in props.row.cart">
                        <div>{{ item.name }}</div>
                        <div>{{ item.quantity }}</div>
                        <div>{{ item.money }}</div>
                        <div>{{ item.specifications }}</div>
                        <div>{{ item.pic }}</div>
                    </div>
                </template>
            </el-table-column>


         

            <el-table-column label="订单状态" show-overflow-tooltip width="100">
                <template slot-scope="scope">
                    <el-tag :type="getOrderStatus(scope.row.status)">{{ scope.row.status }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="delivery(scope.$index, scope.row)">发货</el-button>
                    <el-button size="mini" type="danger" @click="orderInfo(scope.$index, scope.row)">详情</el-button>
                </template>
            </el-table-column>
            
        </el-table>

    </div>
</template>

<script>
export default {
    data() {
        return {
            tableStyle:{
                textAlign:"center"
            },
            tableData:[],
            pageNum:null,//表格当前分页
            totalPageNum:null,//表格总页数
            totalNum:null,//总表格数据量

            testData:[
                {orderId:"20200814181658232657",name:"Mr.Pan",date:"2020-08-14 18:16:58",totalMoney:"458.00",deliveryFee:"0.00",conponFee:"10.00",pay:"448.00",status:"已付款",cart:[{name:"大烤墨鱼",quantity:"1",money:100,specifications:"套餐 :7包",pic:"http://www.wjhxhz.com/addons/zjhj_mall/core/web/uploads/image/47/478e5b8704cd9896b44de12e717506df.jpg"},{name:"糖醋熏马鲛鱼",quantity:"2",money:80,specifications:"实惠价 :5袋",pic:"http://www.wjhxhz.com/addons/zjhj_mall/core/web/uploads/image/31/31e80cd1c59b42a14bc0dfa0bde36358.jpg"}]}
            ]
        }
    },
    props:["tableType","initOption","searchInput","dateAr","activeName"],
    computed:{},
    watch:{
        activeName:function(newv,oldv){
            
            if(this.tableType.name==newv){
                
            }
        }
    },
    methods: {
        getOrderStatus(status){
            var defaultValue=""
            switch(status){
                case "已付款":
                    defaultValue="success";
                    break;
            }
            return defaultValue
        },
        orderInfo(index,row){
            // 跳转查看订单详情
            console.log(index)
            console.log(row)

            this.$router.push({
                name:"订单详情",
                query: {
                    index:index,
                    row:row
                }
            })
        },
        delivery(index,row){
            // 发货
        },
        initData(){
            //初始化表格数据
            console.log(this.tableType.label)
            console.log(this.initOption)
            console.log(this.searchInput)
            console.log(this.dateAr)


        },
        getData(){
            // 根据页面和条件获取表格数据回填tableData

        }

    },
    created(){},
    mounted(){
        // console.log(this.tableType)
        this.tableData=this.testData
    }
}
</script>
<style >


</style>