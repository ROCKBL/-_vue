<template>
    <div class="diaryList">
        <div class="sortBtns">
            <!-- <el-button type="primary" @click="addProjectSort" size="small">添加日志分类</el-button> -->
            <!-- <el-button type="danger" size="small" @click="batchDelete">批量删除</el-button> -->

            <el-input size="small" placeholder="请输入用户名称" v-model="searchInput" class="input-with-select" @keyup.enter.native="searchSort">
                <el-button size="small" slot="append" icon="el-icon-search" @click="searchSort"></el-button>
            </el-input>
        </div>

        <div class="sortTable">
            <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" :cell-style="tableStyle" :header-cell-style="tableStyle">
                <el-table-column type="expand" label="详情" width="60">
                    <template slot-scope="props">
                        <div>
                            <span>日志详情：</span>
                            <span>{{ props.row.detail }}</span>
                        </div>
                        <div style="margin-top: 10px;display: flex;align-items: flex-start;">
                            <div>日志图片：</div>
                            <el-image v-for="url in props.row.images.split(',')" style="height: 100px;width: 100px;" :src="url" fit="contain"></el-image>
                        </div>
                    </template>
                </el-table-column>

                <!-- <el-table-column type="selection" width="40"></el-table-column> -->
                <el-table-column prop="id" label="ID" width="60" show-overflow-tooltip></el-table-column>

                <el-table-column prop="diaryCategoryName" label="日志分类" show-overflow-tooltip width="120"></el-table-column>
                <!-- <el-table-column prop="title" label="标题" show-overflow-tooltip width="180"></el-table-column> -->
                <el-table-column prop="hotNum" label="人气" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="likeNum" label="点赞数" show-overflow-tooltip width="100"></el-table-column>

                <el-table-column prop="consumerName" label="用户名称" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip width="180">
                    <template slot-scope="scope">
                        <span>{{ new Date(scope.row.createTime).Format("yyyy-MM-dd hh:mm:ss") }}</span>
                    </template>
                </el-table-column>
             <!--    <el-table-column prop="indexIs" label="是否首页" show-overflow-tooltip width="100">
                    <template slot-scope="scope">
                        <div v-if="scope.row.indexIs">是</div>
                        <div v-else>否</div>
                    </template>
                </el-table-column> -->
                <el-table-column prop="approve" label="审核状态" show-overflow-tooltip width="100">
                    <template slot-scope="scope">
                        <div v-if="scope.row.approve==0"><el-tag>待审核</el-tag></div>
                        <div v-if="scope.row.approve==1"><el-tag type="success">审核成功</el-tag></div>
                        <div v-if="scope.row.approve==2"><el-tag type="danger">审核失败</el-tag></div>
                    </template>
                </el-table-column>

                <el-table-column prop="images" label="日记图片" show-overflow-tooltip width="100">
                    <template slot-scope="scope">
                        <el-image style="width: 100%;max-height: 50px;" :src="scope.row.images.split(',')[0]" fit="contain"></el-image>
                    </template>
                </el-table-column>
                
                
                <el-table-column label="操作" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary"  :disabled="scope.row.approve!=0" @click="approveSuccess(scope.$index, scope.row)">审核成功</el-button>
                        <el-button size="mini" type="primary"  :disabled="scope.row.approve!=0" @click="approveFail(scope.$index, scope.row)">审核失败</el-button>
                        <!-- <el-button size="mini" type="danger"  @click="deleteDiary(scope.$index, scope.row)">删除</el-button> -->
                    </template>
                </el-table-column>


            </el-table>

            <el-pagination layout="prev, pager, next" :total="total" :page-size="limit" class="pagination" hide-on-single-page @current-change="refresh" :current-page.sync="currentpage1" ></el-pagination>
        </div>
    </div>
</template>
    
<script>

    import { dpage,dapprove } from '@/api/diary'

export default {
    data() {
        return {
            tableStyle:{
                textAlign:"center"
            },

            searchInput:"",
            tableData:[

                // {id:1,name:"xxa",upId:"sss",sort:1,showIs:false,images:"https://img.yzcdn.cn/vant/cat.jpeg"},
                
            ],

            multipleSelection:[],

            total:0,
            limit:10,
            currentpage1:1,

        }
    },
    computed:{},
    methods: {
        // addProjectSort(){
        //      // 跳转添加医院页
        //     this.$router.push("/diary/addSort")
        // },

        editeSort(index,row){
            // 跳转编辑单个商品
            console.log(index)
            console.log(row)

            this.$router.push({
                name:"编辑日志分类",
                query: {
                    index:index,
                    row:JSON.stringify(row)
                }
            })
        },

        approveSuccess(index,row){
            var that=this;
            dapprove({
                approve:false,
                id:row.id
            }).then(function(res){
                console.log(res)
                that.getData(that.currentpage1)
            })
        },
        approveFail(index,row){
            var that=this;
            dapprove({
                approve:true,
                id:row.id
            }).then(function(res){
                console.log(res)
                that.getData(that.currentpage1)
            })
        },

        // deleteSort(index,row){
        //     // 删除单个商品
        //     // console.log(index)
        //     // console.log(row)

        //     var data={
        //         id:row.id
        //     }
        //     var that=this
        //     dcdelete(data).then(function(res){
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
        searchSort(){
            // 根据关键字搜索商品
            // console.log("aaa")
            this.currentpage1=1
            this.getData()
        },


        getData(pageNum){
            var data={
                start:pageNum||1,
                limit:this.limit
            }
            if(this.searchInput){
                data.consumerName=this.searchInput
            }

            var that=this;
            dpage(data).then(function(res){
                // console.log(res)
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

<style scoped>
    .diaryList{
        padding: 20px;
    }
    .diaryList .sortBtns{
        display: flex;
        align-items: center;
    }


    .diaryList .input-with-select{
        width: 200px;
        margin-left: auto;
    }
    .diaryList .sortTable{
        margin-top: 20px;
    }
    
    .diaryList .pagination{
        display: flex;
        justify-content: center;
        margin:20px 0px;
    }
</style>

