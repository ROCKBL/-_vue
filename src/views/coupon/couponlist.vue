<template>
    <div class="couponList">
        <div class="projectBtns">
            <el-button type="primary" @click="addProject" size="small">添加优惠券</el-button>
            <!-- <el-button type="danger" size="small" @click="batchDelete">批量删除</el-button> -->

            <el-input size="small" placeholder="请输入优惠券名称" v-model="searchInput" class="input-with-select" @keyup.enter.native="searchProject">
                <el-button size="small" slot="append" icon="el-icon-search" @click="searchProject"></el-button>
            </el-input>
        </div>

        <div class="hospitalTable">
            <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" :cell-style="tableStyle" :header-cell-style="tableStyle">
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column prop="id" label="ID" width="60" show-overflow-tooltip></el-table-column>


                <el-table-column prop="name" label="名称" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="startTime" label="开始时间" show-overflow-tooltip width="180">
                    <template slot-scope="scope">
                        <div>{{ new Date(scope.row.startTime).Format("yyyy-MM-dd hh:mm:ss") }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="endTime" label="结束时间" show-overflow-tooltip width="180">
                    <template slot-scope="scope">
                        <div>{{ new Date(scope.row.endTime).Format("yyyy-MM-dd hh:mm:ss") }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="validityDay" label="有效天数" show-overflow-tooltip width="100"></el-table-column>

                <el-table-column prop="maxNum" label="最大领取数量" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="sendSum" label="发行总数" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="monetQuota" label="最小起用金额" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="money" label="优惠金额" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="description" label="描述" show-overflow-tooltip width="100"></el-table-column>

                
                <el-table-column label="操作" show-overflow-tooltip >
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="editeProject(scope.$index, scope.row)">修改</el-button>
                        <el-button size="mini" type="danger" @click="deleteProject(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>

                
            </el-table>

            <el-pagination layout="prev, pager, next" :total="total" :page-size="limit" class="pagination" hide-on-single-page @current-change="refresh" :current-page.sync="currentpage1" ></el-pagination>
        </div>
    </div>
</template>

<script>

    import { cpage,cdelete } from '@/api/coupon'

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
        addProject(){
             // 跳转添加医院页
            this.$router.push("/coupon/adCoupon")
        },

        editeProject(index,row){
            // 跳转编辑单个商品
            console.log(index)
            console.log(row)

            this.$router.push({
                name:"编辑优惠券",
                query: {
                    index:index,
                    row:JSON.stringify(row)
                }
            })
        },
        deleteProject(index,row){
            // 删除单个商品
            // console.log(index)
            // console.log(row)
            var data={
                id:row.id
            }
            var that=this
            // cdelete(data).then(function(res){
            //     that.getData()
            //     that.currentpage1=1
            // })

            this.$confirm('确认删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                cdelete(data).then(function(res){
                    that.getData()
                    that.currentpage1=1
                })
            }).catch(() => {
              

            });
            
            
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
            this.currentpage1=1
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
    .couponList{
        padding: 20px;
    }
    .couponList .projectBtns{
        display: flex;
        align-items: center;
    }


    .couponList .input-with-select{
        width: 200px;
        margin-left: auto;
    }
    .couponList .hospitalTable{
        margin-top: 20px;
    }
    
    .couponList .pagination{
        display: flex;
        justify-content: center;
        margin:20px 0px;
    }


</style>

