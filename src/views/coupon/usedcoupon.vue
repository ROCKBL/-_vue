<template>
    <div class="usedcoupon">
        <div class="projectBtns">
            <!-- <el-button type="primary" @click="addProject" size="small">添加优惠券</el-button> -->
            <!-- <el-button type="danger" size="small" @click="batchDelete">批量删除</el-button> -->

            <el-input size="small" placeholder="请输入优惠券名称" v-model="searchInput" class="input-with-select" @keyup.enter.native="searchProject">
                <el-button size="small" slot="append" icon="el-icon-search" @click="searchProject"></el-button>
            </el-input>
        </div>

        <div class="hospitalTable">
            <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" :cell-style="tableStyle" :header-cell-style="tableStyle">
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column prop="id" label="ID" width="60" show-overflow-tooltip></el-table-column>
                <!-- <el-table-column prop="couponId" label="优惠券ID" width="60" show-overflow-tooltip></el-table-column> -->
                <el-table-column prop="couponName" label="优惠券名称" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip width="180"></el-table-column>
                <el-table-column prop="expirationTime" label="开始时间" show-overflow-tooltip width="180"></el-table-column>
                <el-table-column prop="orderNo" label="订单号" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="state" label="状态" show-overflow-tooltip width="100">
                    <template slot-scope="scope">
                        <div>{{ scope.row.state }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="useTime" label="使用时间" show-overflow-tooltip width="180"></el-table-column>
                <!-- <el-table-column prop="userId" label="用户Id" show-overflow-tooltip width="100"></el-table-column> -->
                <el-table-column prop="userName" label="用户名称" show-overflow-tooltip width="100"></el-table-column>
                
                <el-table-column label="操作" show-overflow-tooltip >
                    <template slot-scope="scope">
                        <!-- <el-button size="mini" type="primary" @click="editeProject(scope.$index, scope.row)">修改</el-button> -->
                        <el-button size="mini" type="danger" @click="deleteProject(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>

                
            </el-table>

            <el-pagination layout="prev, pager, next" :total="total" :page-size="limit" class="pagination" hide-on-single-page @current-change="refresh" :current-page.sync="currentpage" ></el-pagination>
        </div>
    </div>
</template>

<script>

    import { cudelete,cupage } from '@/api/coupon'

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
            currentpage:1,

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
        deleteProject(index,row){
            // 删除单个商品
            // console.log(index)
            // console.log(row)
            var data={
                id:row.id
            }
            var that=this
            cudelete(data).then(function(res){
                that.getData()
                that.currentpage=1
            })
        },   



        handleSelectionChange(val){
            // 表格多选改变
            this.multipleSelection = val;
        },


        batchDelete(){
            // 批量删除医院
        },
        searchProject(){
            // 根据关键字搜索商品

            this.getData()
        },

        getData(pageNum){
            var data={
                start:pageNum||1,
                limit:this.limit
            }
            if(this.searchInput){
                data.name=this.searchInput
            }

            var that=this;
            cupage(data).then(function(res){
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
    .usedcoupon{
        padding: 20px;
    }
    .usedcoupon .projectBtns{
        display: flex;
        align-items: center;
    }


    .usedcoupon .input-with-select{
        width: 200px;
        margin-left: auto;
    }
    .usedcoupon .hospitalTable{
        margin-top: 20px;
    }
    
    .usedcoupon .pagination{
        display: flex;
        justify-content: center;
        margin:20px 0px;
    }


</style>

