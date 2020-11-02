<template>
    <div class="commissionlist">
        <!-- <div class="projectBtns">
            <el-button type="primary" @click="addProject" size="small">添加优惠券</el-button>
            <el-button type="danger" size="small" @click="batchDelete">批量删除</el-button>

            <el-input size="small" placeholder="请输入优惠券名称" v-model="searchInput" class="input-with-select" @keyup.enter.native="searchProject">
                <el-button size="small" slot="append" icon="el-icon-search" @click="searchProject"></el-button>
            </el-input>
        </div> -->

        <div class="hospitalTable">
            <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" :cell-style="tableStyle" :header-cell-style="tableStyle">
                <!-- <el-table-column type="selection" width="40"></el-table-column> -->
                <!-- <el-table-column prop="id" label="ID" width="60" show-overflow-tooltip></el-table-column> -->


                <el-table-column prop="consumerName" label="购买用户" show-overflow-tooltip ></el-table-column>
                <el-table-column prop="createTime" label="购买时间" show-overflow-tooltip width="180">
                    <!-- <template slot-scope="scope">
                        <div>{{ new Date(scope.row.startTime).Format("yyyy-MM-dd hh:mm:ss") }}</div>
                    </template> -->
                </el-table-column>
                <el-table-column prop="orderCountMoney" label="订单总金额" show-overflow-tooltip width="180">
                    <template slot-scope="scope">
                        <div>{{ scope.row.orderCountMoney }}元</div>
                    </template>
                </el-table-column>
                <el-table-column prop="payMoney" label="实付金额" show-overflow-tooltip width="120">
                    <template slot-scope="scope">
                        <div>{{ scope.row.payMoney }}元</div>
                    </template>
                </el-table-column>

                <el-table-column prop="oneLevelConsumerName" label="一级分佣昵称" show-overflow-tooltip ></el-table-column>
                <el-table-column prop="oneLevelConsumerMoney" label="一级分佣佣金" show-overflow-tooltip width="120">
                    <template slot-scope="scope">
                        <div v-if="scope.row.oneLevelConsumerMoney">{{ scope.row.oneLevelConsumerMoney }}元</div>
                    </template>
                </el-table-column>
                <el-table-column prop="twoLevelConsumerName" label="二级分佣昵称" show-overflow-tooltip ></el-table-column>
                <el-table-column prop="twoLevelConsumerMoney" label="二级分佣佣金" show-overflow-tooltip width="120">
                    <template slot-scope="scope">
                        <div v-if="scope.row.twoLevelConsumerMoney">{{ scope.row.twoLevelConsumerMoney }}元</div>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="consumerMoney" label="平台剩余金额" show-overflow-tooltip width="100">
                    <template slot-scope="scope">
                        <div>{{ scope.row.consumerMoney }}元</div>
                    </template>
                </el-table-column> -->

                
                <!-- <el-table-column label="操作" show-overflow-tooltip >
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="editeProject(scope.$index, scope.row)">修改</el-button>
                        <el-button size="mini" type="danger" @click="deleteProject(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column> -->

                
            </el-table>

            <el-pagination layout="prev, pager, next" :total="total" :page-size="limit" class="pagination" hide-on-single-page @current-change="refresh" :current-page.sync="currentpage1" ></el-pagination>
        </div>
    </div>
</template>

<script>

    import { cpage } from '@/api/commission'

export default {
    data() {
        return {
            tableStyle:{
                textAlign:"center"
            },

            searchInput:"",
            tableData:[

            ],

            multipleSelection:[],

            total:0,
            limit:10,
            currentpage1:1,

        }
    },
    computed:{},
    methods: {
        // addProject(){
        //      // 跳转添加医院页
        //     this.$router.push("/coupon/adCoupon")
        // },

        // editeProject(index,row){
        //     // 跳转编辑单个商品
        //     console.log(index)
        //     console.log(row)

        //     this.$router.push({
        //         name:"编辑优惠券",
        //         query: {
        //             index:index,
        //             row:JSON.stringify(row)
        //         }
        //     })
        // },
        // deleteProject(index,row){
        //     // 删除单个商品
        //     // console.log(index)
        //     // console.log(row)
        //     var data={
        //         id:row.id
        //     }
        //     var that=this
        //     cdelete(data).then(function(res){
        //         that.getData()
        //         that.currentpage1=1
        //     })
        // },   



        handleSelectionChange(val){
            // 表格多选改变
            this.multipleSelection = val;
        },


        batchDelete(){
            // 批量删除医院
        },
        // searchProject(){
        //     // 根据关键字搜索商品
        //     this.currentpage1=1
        //     this.getData()
        // },

        getData(pageNum){
            var data={
                start:pageNum||1,
                limit:this.limit
            }
            // if(this.searchInput){
            //     data.name=this.searchInput
            // }

            var that=this;
            cpage(data).then(function(res){
                console.log(res)
                that.tableData=res.result.items
                that.total=res.result.total
            })
        },
        refresh(currentPage){
            // console.log(this.currentpage)
            this.getData(currentPage)
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

<style >
    .commissionlist{
        padding: 20px;
    }
    .commissionlist .projectBtns{
        display: flex;
        align-items: center;
    }


    .commissionlist .input-with-select{
        width: 200px;
        margin-left: auto;
    }
    .commissionlist .hospitalTable{
        margin-top: 20px;
    }
    
    .commissionlist .pagination{
        display: flex;
        justify-content: center;
        margin:20px 0px;
    }


</style>

