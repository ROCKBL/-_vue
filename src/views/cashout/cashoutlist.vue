<template>
    <div class="cashoutlist">
        <div class="projectBtns">
            <!-- <el-button type="primary" @click="addProject" size="small">添加优惠券</el-button> -->
            <!-- <el-button type="danger" size="small" @click="batchDelete">批量删除</el-button> -->

            <el-input size="small" placeholder="请输入开户名" v-model="searchInput" class="input-with-select" @keyup.enter.native="searchProject">
                <el-button size="small" slot="append" icon="el-icon-search" @click="searchProject"></el-button>
            </el-input>
        </div>


        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="orderTabs">
            <el-tab-pane :label="tab.label" :name="tab.name" v-for="tab in orderTabs"></el-tab-pane>
        </el-tabs>


        <div class="hospitalTable">
            <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" :cell-style="tableStyle" :header-cell-style="tableStyle">
                <el-table-column type="selection" width="40"></el-table-column>
                <el-table-column prop="id" label="ID" width="60" show-overflow-tooltip></el-table-column>

                <el-table-column prop="consumerName" label="用户名" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="name" label="开户名" show-overflow-tooltip width="100"></el-table-column>

                
                <el-table-column prop="type" label="开户银行" show-overflow-tooltip width="140"></el-table-column>
                
                <el-table-column prop="cardNo" label="银行账号" show-overflow-tooltip ></el-table-column>
                <el-table-column prop="money" label="提现金额" show-overflow-tooltip width="100">
                    <template slot-scope="scope">
                        <div>{{ scope.row.money }}元</div>
                    </template>
                </el-table-column>

                <el-table-column prop="createTime" label="申请时间" show-overflow-tooltip width="180"></el-table-column>
                <el-table-column prop="state" label="状态" show-overflow-tooltip width="100">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.state==0">待处理</el-tag>
                        <el-tag type="success" v-if="scope.row.state==1">已完成</el-tag>
                        <el-tag type="danger" v-if="scope.row.state==2">已拒绝</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="reason" label="原因" show-overflow-tooltip width="100"></el-table-column>
                                

                
                <el-table-column label="操作" show-overflow-tooltip >
                    <template slot-scope="scope">
                        <el-button size="mini" type="success" :disabled="scope.row.state!=0" @click="submitAction(scope.row,'yes')">完成提现</el-button>
                        <el-button size="mini" type="danger" :disabled="scope.row.state!=0" @click="submitAction(scope.row,'no')">拒绝提现</el-button>
                        <!-- <el-button size="mini" type="danger" >上传截图</el-button> -->
                    </template>
                </el-table-column>
                
            </el-table>

            <el-pagination layout="prev, pager, next" v-if="showpagination" :total="total" :page-size="limit" class="pagination" hide-on-single-page  @current-change="refresh"
              :current-page.sync="currentpage1"
            ></el-pagination>
        </div>

        <el-dialog title="操作原因" :visible.sync="dialogVisible" width="30%">
            <div class="" style="display: flex;align-items: center;">
                <div style="flex-basis: 60px;">原因：</div>
                <el-input v-model="dialogObj.reason" placeholder="请输入原因"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

    import { bwpage,bwapprove } from '@/api/cashout'

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

            dialogVisible:false,
            dialogObj:{},

            orderTabs:[
                {label:"全部",name:"all"},
                {label:"待处理",name:"onhand"},
                {label:"已完成",name:"finished"},
                {label:"已拒绝",name:"deny"},
            ],
            activeName: "all",

            showpagination:true,
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
        dialogConfirm(){
            var that=this;
            bwapprove(this.dialogObj).then(function(res){
                that.dialogVisible=false
                that.getData()
            })
        },
        submitAction(row,type){
            this.dialogVisible=true
            this.dialogObj={
                id:row.id,
                withdraw:type=='yes'?true:false,
                reason:""
            }
            
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

        handleClick(tab, event) {

            this.currentpage1=1

            // this.showpagination=false
            

            // this.$nextTick(() => {
            //     this.showpagination=true
            // })

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

            switch(this.activeName){
                case "all":
                    break;
                case "onhand":
                    data.state=0
                    break;
                case "finished":
                    data.state=1
                    break;
                case "deny":
                    data.state=2
                    break;
            }

            var that=this;
            bwpage(data).then(function(res){
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

