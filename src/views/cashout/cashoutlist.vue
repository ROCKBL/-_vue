<template>
    <div class="cashoutlist">
        <div class="projectBtns">
            <!-- <el-button type="primary" @click="addProject" size="small">添加优惠券</el-button> -->
            <!-- <el-button type="danger" size="small" @click="batchDelete">批量删除</el-button> -->

            <el-input size="small" placeholder="请输入用户名" v-model="searchInput" class="input-with-select" @keyup.enter.native="searchProject">
                <el-button size="small" slot="append" icon="el-icon-search" @click="searchProject"></el-button>
            </el-input>
        </div>

        <div class="hospitalTable">
            <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" :cell-style="tableStyle" :header-cell-style="tableStyle">
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column prop="id" label="ID" width="60" show-overflow-tooltip></el-table-column>

                <el-table-column prop="consumerName" label="用户名" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="name" label="开户名" show-overflow-tooltip width="100"></el-table-column>

                
                <el-table-column prop="phone" label="开户银行" show-overflow-tooltip width="140"></el-table-column>
                
                <el-table-column prop="province" label="银行账号" show-overflow-tooltip ></el-table-column>
                <el-table-column prop="city" label="提现金额" show-overflow-tooltip width="100"></el-table-column>

                <el-table-column prop="city" label="申请时间" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="city" label="状态" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="city" label="转账截图" show-overflow-tooltip width="100"></el-table-column>
                                

                
                <el-table-column label="操作" show-overflow-tooltip >
                    <template slot-scope="scope">

                        <el-button size="mini" type="danger" >上传截图</el-button>
                    </template>
                </el-table-column>

                


            </el-table>

            <el-pagination layout="prev, pager, next" :total="total" :page-size="limit" class="pagination" hide-on-single-page @current-change="refresh" :current-page.sync="currentpage" ></el-pagination>
        </div>
    </div>
</template>

<script>

    import { apage } from '@/api/cashout'

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
        // deleteProject(index,row){
        //     // 删除单个商品
        //     // console.log(index)
        //     // console.log(row)
        //     var data={
        //         id:row.id
        //     }
        //     var that=this
        //     cudelete(data).then(function(res){
        //         that.getData()
        //         that.currentpage=1
        //     })
        // },   



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
            apage(data).then(function(res){
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
    .cashoutlist{
        padding: 20px;
    }
    .cashoutlist .projectBtns{
        display: flex;
        align-items: center;
    }


    .cashoutlist .input-with-select{
        width: 200px;
        margin-left: auto;
    }
    .cashoutlist .hospitalTable{
        margin-top: 20px;
    }
    
    .cashoutlist .pagination{
        display: flex;
        justify-content: center;
        margin:20px 0px;
    }


</style>

