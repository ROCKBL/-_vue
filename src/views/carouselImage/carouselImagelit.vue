<template>
    <div class="carouselImagelit">
        <div class="projectBtns">
            <el-button type="primary" @click="addProject" size="small">添加轮播图</el-button>
            <!-- <el-button type="danger" size="small" @click="batchDelete">批量删除</el-button> -->

            <!-- <el-input size="small" placeholder="请输入用户名" v-model="searchInput" class="input-with-select" @keyup.enter.native="searchProject">
                <el-button size="small" slot="append" icon="el-icon-search" @click="searchProject"></el-button>
            </el-input> -->
        </div>

        <div class="hospitalTable">
            <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" :cell-style="tableStyle" :header-cell-style="tableStyle">
                <el-table-column type="selection" width="40"></el-table-column>
                <!-- <el-table-column prop="id" label="ID" width="60" show-overflow-tooltip></el-table-column> -->

                <el-table-column prop="images" label="轮播图图片" show-overflow-tooltip width="100">
                    <template slot-scope="scope">
                        <el-image style="width: 100%" :src="scope.row.images" fit="contain"></el-image>
                    </template>
                </el-table-column>

                <el-table-column prop="sort" label="排序" show-overflow-tooltip width="100"></el-table-column>
                
                <el-table-column prop="type" label="类型" show-overflow-tooltip width="140">
                    <template slot-scope="scope">
                        <div v-if="scope.row.type">项目</div>
                        <div v-else>商城</div>
                    </template>
                </el-table-column>

                <el-table-column label="操作" show-overflow-tooltip >
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="editeProject(scope.$index, scope.row)">修改</el-button>
                        <el-button size="mini" type="danger" @click="deleteProject(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>

                


            </el-table>

            <el-pagination layout="prev, pager, next" :total="total" :page-size="limit" class="pagination" hide-on-single-page @current-change="refresh" :current-page.sync="currentpage" ></el-pagination>
        </div>
    </div>
</template>

<script>

    import { cipage,cidelete } from '@/api/carouselImage'

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
        addProject(){
             // 跳转添加医院页
            this.$router.push("/carouselImage/addcarouselImage")
        },

        editeProject(index,row){
            // 跳转编辑单个商品
            console.log(index)
            console.log(row)

            this.$router.push({
                name:"编辑轮播图",
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
            // cidelete(data).then(function(res){
            //     that.getData()
            //     that.currentpage=1
            // })

            this.$confirm('确认删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                cidelete(data).then(function(res){
                    that.getData()
                    that.currentpage=1
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
            cipage(data).then(function(res){
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
    .carouselImagelit{
        padding: 20px;
    }
    .carouselImagelit .projectBtns{
        display: flex;
        align-items: center;
    }


    .carouselImagelit .input-with-select{
        width: 200px;
        margin-left: auto;
    }
    .carouselImagelit .hospitalTable{
        margin-top: 20px;
    }
    
    .carouselImagelit .pagination{
        display: flex;
        justify-content: center;
        margin:20px 0px;
    }


</style>

