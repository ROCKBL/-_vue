<template>
    <div class="projectList">
        <div class="projectBtns">
            <el-button type="primary" @click="addProject" size="small">添加项目</el-button>
            <!-- <el-button type="danger" size="small" @click="batchDelete">批量删除</el-button> -->

            <el-input size="small" placeholder="请输入项目名称" v-model="searchInput" class="input-with-select" @keyup.enter.native="searchProject">
                <el-button size="small" slot="append" icon="el-icon-search" @click="searchProject"></el-button>
            </el-input>
        </div>

        <div class="hospitalTable">
            <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" :cell-style="tableStyle" :header-cell-style="tableStyle">
                <!-- <el-table-column type="selection" width="40"></el-table-column> -->
                <!-- <el-table-column prop="id" label="ID" width="60" show-overflow-tooltip></el-table-column> -->

                <el-table-column type="expand" label="项目详情" width="60">
                    <template slot-scope="props">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-row :gutter="20">
                                <!-- <el-col :span="6">
                                    <el-form-item label="所属分类：" label-width="100px">
                                        <span>{{ props.row.categoryName }}</span>
                                    </el-form-item>
                                </el-col> -->
                                <el-col :span="6">
                                    <el-form-item label="所属医院：" label-width="100px">
                                        <span>{{ props.row.hospitalName }}</span>
                                    </el-form-item>
                                </el-col>
                                
                                <el-col :span="6">
                                    <el-form-item label="虚拟销量：" label-width="100px">
                                        <span>{{ props.row.virtualSales }}</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="6">
                                    <el-form-item label="排序：" label-width="100px">
                                        <span>{{ props.row.sort }}</span>
                                    </el-form-item>
                                </el-col>
                                
                            </el-row>
                        </el-form>
                    </template>
                </el-table-column>

                <el-table-column prop="name" label="项目名称" show-overflow-tooltip ></el-table-column>
                <el-table-column prop="categoryName" label="所属分类" show-overflow-tooltip width="80"></el-table-column>
                <!-- <el-table-column prop="hospitalName" label="所属医院" show-overflow-tooltip width="150"></el-table-column> -->
                <!-- <el-table-column prop="sort" label="排序" show-overflow-tooltip width="100"></el-table-column> -->

                <!-- <el-table-column prop="virtualSales" label="虚拟销量" show-overflow-tooltip width="100"></el-table-column> -->
                <el-table-column prop="price" label="原价" show-overflow-tooltip width="100">
                    <template slot-scope="scope">
                        <span v-if="isNaN(parseFloat(scope.row.price))">数值错误</span>
                        <span v-else>{{ parseFloat(scope.row.price).toFixed(2) }}元</span>
                    </template>
                </el-table-column>
                <el-table-column prop="couponPrice" label="优惠价" show-overflow-tooltip width="100">
                    <template slot-scope="scope">
                        <span v-if="isNaN(parseFloat(scope.row.couponPrice))">数值错误</span>
                        <span v-else>{{ parseFloat(scope.row.couponPrice).toFixed(2) }}元</span>
                    </template>
                </el-table-column>
                <el-table-column prop="subsPrice" label="预约价" show-overflow-tooltip width="100">
                    <template slot-scope="scope">
                        <span v-if="isNaN(parseFloat(scope.row.subsPrice))">数值错误</span>
                        <span v-else>{{ parseFloat(scope.row.subsPrice).toFixed(2) }}元</span>
                    </template>
                </el-table-column>
                <el-table-column prop="stock" label="剩余数量" show-overflow-tooltip width="80"></el-table-column>
                <el-table-column prop="salesVolume" label="已预约数量" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="sale" label="是否上架" show-overflow-tooltip width="80">
                    <template slot-scope="scope">
                        <span v-if="scope.row.sale">已上架</span>
                        <span v-else>未上架</span>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="所属分区" show-overflow-tooltip width="80">
                    <template slot-scope="scope">
                        <span>{{ getTpye(scope.row.type) }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="项目缩略图"  width="100">
                    <template slot-scope="scope">
                        <el-image style="width: 100%" :src="scope.row.firstImage" fit="contain"></el-image>
                    </template>
                </el-table-column>

                
                <el-table-column label="操作" show-overflow-tooltip  width="160">
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

    import { projectpage,projectdelete } from '@/api/project'

export default {
    data() {
        return {
            tableStyle:{
                textAlign:"center"
            },

            searchInput:"",
            tableData:[
                // {
                //     id:1,
                //     name:"项目1", //项目名称
                //     // sort:"眼睛", //所属分类
                //     categoryId:"眼睛", //所属分类
                //     // hospital:"什么医院", //所属医院
                //     hospitalId:"什么医院", //所属医院
                //     // orderby:1, //排序
                //     sort:1, //排序
                //     // fakeSell:100, //虚拟销量
                //     virtualSales:100, //虚拟销量
                //     // logo:"https://img.yzcdn.cn/vant/cat.jpeg", //项目缩略图
                //     firstImage:"https://img.yzcdn.cn/vant/cat.jpeg", //项目缩略图
                //     // picList:["https://img.yzcdn.cn/vant/cat.jpeg","https://img.yzcdn.cn/vant/cat.jpeg"], //轮播图
                //     images:["https://img.yzcdn.cn/vant/cat.jpeg","https://img.yzcdn.cn/vant/cat.jpeg"], //轮播图
                //     // oldPrice:1903.00, //原价
                //     price:1903.00, //原价
                //     // specialPrice:324.00, //优惠价
                //     couponPrice:324.00, //优惠价
                //     // orderPrice:10.00, //预约价
                //     subsPrice:10.00, //预约价
                //     // info:"项目详情", //详情
                //     content:"项目详情", //详情
                //     // leftNum:88, //剩余数量
                //     stock:88, //剩余数量
                //     // orderNum:902, //已预约数量
                //     salesVolume:902, //已预约数量
                //     // isgrounding:true, //是否上架
                //     sale:true, //是否上架
                //     // belongBlock:"普通区", //所属分区（普通区、特价区、VIP区、钻石区）
                //     type:1, //所属分区（0:普通区、1:特价区、2:VIP区、3:钻石区）
                // },
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
            this.$router.push("/project/addProject")
        },
        getTpye(num){
            var label="";
            switch(num){
                case 0:
                    label="普通区";
                    break;
                case 1:
                    label="特价区";
                    break;
                case 2:
                    label="VIP区";
                    break;
                case 3:
                    label="钻石区";
                    break;
            }
            return label;
        },
        editeProject(index,row){
            // 跳转编辑单个商品
            console.log(index)
            console.log(row)

            this.$router.push({
                name:"修改项目",
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
            // projectdelete(data).then(function(res){
            //     that.getData()
            //     that.currentpage1=1
            // })

            this.$confirm('确认删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                projectdelete(data).then(function(res){
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
            projectpage(data).then(function(res){
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
    .projectList{
        padding: 20px;
    }
    .projectList .projectBtns{
        display: flex;
        align-items: center;
    }


    .projectList .input-with-select{
        width: 200px;
        margin-left: auto;
    }
    .projectList .hospitalTable{
        margin-top: 20px;
    }
    
    .projectList .pagination{
        display: flex;
        justify-content: center;
        margin:20px 0px;
    }


</style>

