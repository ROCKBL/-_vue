<template>
    <div class="goodList">
        <div class="goodsBtns">
            <el-button type="primary" @click="addGoods" size="small">添加商品</el-button>
            <!-- <el-button size="small" @click="batchGrounding">批量上架</el-button> -->
            <!-- <el-button type="warning" size="small" @click="batchOffShelves">批量下架</el-button> -->
            <!-- <el-button type="danger" size="small" @click="batchDelete">批量删除</el-button> -->
            <!-- <el-select size="small" v-model="initOption" placeholder="请选择商品分类" @change="selectChange" class="selectType">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select> -->

            <el-input size="small" placeholder="请输入商品名称" v-model="searchInput" class="input-with-select">
                <el-button size="small" slot="append" icon="el-icon-search" @click="searchGoods"></el-button>
            </el-input>
        </div>

        <div class="goodsTable">
            <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" :cell-style="tableStyle" :header-cell-style="tableStyle">
                <!-- <el-table-column type="selection" width="40"></el-table-column> -->
                <!-- <el-table-column prop="id" label="ID" width="60" show-overflow-tooltip></el-table-column> -->
                <el-table-column prop="categoryName" label="商品分类" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="name" label="商品名称" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column label="商品主图" show-overflow-tooltip width="100">
                    <template slot-scope="scope">
                        <el-image style="width: 100%" :src="scope.row.firstImage" fit="contain"></el-image>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="price" label="售价" show-overflow-tooltip width="100"></el-table-column> -->
                <!-- <el-table-column prop="stock" label="库存" show-overflow-tooltip width="100"></el-table-column> -->
                <el-table-column prop="sale" label="上架状态" show-overflow-tooltip width="100">
                    <template slot-scope="scope">
                        <div v-if="scope.row.sale">上架</div>
                        <div v-else>下架</div>
                    </template>
                </el-table-column>
                <el-table-column prop="couponPrice" label="优惠价" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="price" label="价格" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="salesVolume" label="实际销量" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="virtualSales" label="虚拟销量" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="unit" label="商品单位" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="integral" label="商品积分" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="sort" label="排序" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column label="操作" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="editeGoods(scope.$index, scope.row)">修改</el-button>
                        <el-button size="mini" type="danger" @click="deleteGoods(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>

                <!-- <el-table-column label="日期" width="120">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120"></el-table-column>
                <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column> -->
            </el-table>

            <el-pagination layout="prev, pager, next" :total="total" :page-size="limit" class="pagination" hide-on-single-page @current-change="refresh" :current-page.sync="currentpage1" ></el-pagination>
        </div>
    </div>
</template>

<script>
    import { gdelete,gpage } from '@/api/goods'

export default {
    data() {
        return {
            tableStyle:{
                textAlign:"center"
            },
            initOption:"",
            options:[],
            searchInput:"",
            tableData:[
                // {id:1,type:"手作海鲜",name:"纯手工鱼丸",pic:"http://www.wjhxhz.com/addons/zjhj_mall/core/web/uploads/image/3a/3ae597ae8c0748235aa37f623ae12c56.jpg",price:"100.00",stock:123,status:21,sellNumber:32,orderby:99}
            ],

            multipleSelection:[],

            total:0,
            limit:10,
            currentpage1:1,

        }
    },
    computed:{},
    methods: {
        addGoods(){
            // 跳转添加商品页
            this.$router.push("/goods/addGoods")
        },
        editeGoods(index,row){
            // 跳转编辑单个商品
            // console.log(index)
            // console.log(row)

            this.$router.push({
                name:"修改商品",
                query: {
                    index:index,
                    // row:row
                    id:row.id
                }
            })
        },
        deleteGoods(index,row){
            // 删除单个商品
            // console.log(index)
            // console.log(row)

            var data={
                id:row.id
            }
            var that=this
            // gdelete(data).then(function(res){
            //     that.getData()
            //     that.currentpage1=1
            // })

            this.$confirm('确认删除?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
                gdelete(data).then(function(res){
                    that.getData()
                    that.currentpage1=1
                })
            }).catch(() => {
              

            });
            
        },   


        selectChange(){
            // 获取商品分类数据
        },
        handleSelectionChange(val){
            // 表格多选改变
            this.multipleSelection = val;
        },
        batchGrounding(){
            // 批量上架
        },
        batchOffShelves(){
            // 批量下架
        },
        batchDelete(){
            // 批量删除
        },
        searchGoods(){
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
            gpage(data).then(function(res){
                console.log(res)
                that.tableData=res.result.items
                that.total=res.result.total
            })
        },

        refresh(currentPage){
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
    .goodList{
        padding: 20px;
    }
    .goodsBtns{
        display: flex;
        align-items: center;
    }

    .selectType{
        margin-left: 10px;
    }
    .input-with-select{
        width: 200px;
        margin-left: auto;
    }
    .goodsTable{
        margin-top: 20px;
    }
    
    .pagination{
        display: flex;
        justify-content: center;
        margin:20px 0px;
    }
</style>

