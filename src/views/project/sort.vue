<template>
    <div class="projectSortList">
        <div class="sortBtns">
            <el-button type="primary" @click="addProjectSort" size="small">添加项目分类</el-button>
            <!-- <el-button type="danger" size="small" @click="batchDelete">批量删除</el-button> -->

            <el-input size="small" placeholder="请输入分类名称" v-model="searchInput" class="input-with-select" @keyup.enter.native="searchSort">
                <el-button size="small" slot="append" icon="el-icon-search" @click="searchSort"></el-button>
            </el-input>
        </div>

        <div class="sortTable">
            <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" :cell-style="tableStyle" :header-cell-style="tableStyle">
                <!-- <el-table-column type="selection" width="40"></el-table-column> -->
                <!-- <el-table-column prop="id" label="ID" width="60" show-overflow-tooltip></el-table-column> -->
                <el-table-column prop="name" label="分类名称" show-overflow-tooltip width="100"></el-table-column>
                
                <!-- <el-table-column prop="upId" label="所属父类id" show-overflow-tooltip width="150"></el-table-column> -->
                <el-table-column prop="upName" label="所属父类名称" show-overflow-tooltip width="150"></el-table-column>
                <el-table-column prop="sort" label="排序" show-overflow-tooltip width="150"></el-table-column>
                <el-table-column prop="showflag" label="是否显示" show-overflow-tooltip width="150">
                    <template slot-scope="scope">
                        <span v-if="scope.row.showIs">是</span>
                        <span v-else>否</span>
                    </template>
                </el-table-column>

                <el-table-column label="分类图标"  width="100">
                    <template slot-scope="scope">
                        <el-image style="width: 100%" :src="scope.row.images" fit="contain"></el-image>
                    </template>
                </el-table-column>

                
                <el-table-column label="操作" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="editeSort(scope.$index, scope.row)">修改</el-button>
                        <el-button size="mini" type="danger" @click="deleteSort(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>


            </el-table>

            <el-pagination layout="prev, pager, next" :total="total" :page-size="limit" class="pagination" hide-on-single-page @current-change="refresh" :current-page.sync="currentpage1" ></el-pagination>
        </div>
    </div>
</template>
    
<script>

    import { sortpage,sortlist,sortdelete } from '@/api/project'

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
        addProjectSort(){
             // 跳转添加医院页
            this.$router.push("/project/addSort")
        },

        editeSort(index,row){
            // 跳转编辑单个商品
            console.log(index)
            console.log(row)

            this.$router.push({
                name:"修改项目分类",
                query: {
                    index:index,
                    row:JSON.stringify(row)
                }
            })
        },
        deleteSort(index,row){
            // 删除单个商品
            // console.log(index)
            // console.log(row)
             var data={
                id:row.id
            }
            var that=this

            this.$confirm('确认删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                sortdelete(data).then(function(res){
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
                data.name=this.searchInput
            }

            var that=this;
            sortpage(data).then(function(res){
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
    .projectSortList{
        padding: 20px;
    }
    .projectSortList .sortBtns{
        display: flex;
        align-items: center;
    }


    .projectSortList .input-with-select{
        width: 200px;
        margin-left: auto;
    }
    .projectSortList .sortTable{
        margin-top: 20px;
    }
    
    .projectSortList .pagination{
        display: flex;
        justify-content: center;
        margin:20px 0px;
    }
</style>

