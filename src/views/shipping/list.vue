<template>
    <div class="shippingList">
        <div class="shippingBtns">
            <el-button type="primary" @click="addshipping" size="small">添加运费模板</el-button>

        </div>

        <div class="shippingTable">
            <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" :cell-style="tableStyle" :header-cell-style="tableStyle">
                <!-- <el-table-column type="selection" width="40"></el-table-column> -->
                <!-- <el-table-column prop="id" label="ID" width="60" show-overflow-tooltip></el-table-column> -->
                <el-table-column prop="name" label="运费模板名称" show-overflow-tooltip width="200"></el-table-column>
                <el-table-column prop="tpye" label="计费方式" show-overflow-tooltip width="100">
                	<template slot-scope="scope">
                		<el-tag v-if="scope.row.tpye==0">按重计费</el-tag>
                		<el-tag type="warning" v-if="scope.row.tpye==1">按件计费</el-tag>
                	</template>
                </el-table-column>
                <el-table-column label="启用状态"  width="100">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.defaultIs">已启用</el-tag>
                        <el-tag type="danger" v-else>未启用</el-tag>
                    </template>
                </el-table-column>
                
                <el-table-column label="操作" show-overflow-tooltip >
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="editeshipping(scope.$index, scope.row)">修改</el-button>
                        <el-button size="mini" type="danger" @click="deleteshipping(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>

            <el-pagination layout="prev, pager, next" :total="total" :page-size="limit" class="pagination" hide-on-single-page @current-change="refresh" :current-page.sync="currentpage1" ></el-pagination>
        </div>
    </div>
</template>

<script>

    import { fdelete,fpage,fsave } from '@/api/shipping'

export default {
    data() {
        return {
            tableStyle:{
                textAlign:"center"
            },

            searchInput:"",
            tableData:[
                

                // {id:1,name:"测试医院",introduction:"医院简介",phone:"13312345678",address:"地址1",longitude:"120.811213",latitude:"27.932747",characteristic:"特色",logo:"https://img.yzcdn.cn/vant/cat.jpeg",images:"https://img.yzcdn.cn/vant/cat.jpeg"},
            ],

            multipleSelection:[],
            total:0,
            limit:10,
            currentpage1:1,


        }
    },
    computed:{},
    methods: {
        addshipping(){
             // 跳转添加医院页
            this.$router.push("/shipping/edit")
        },

        editeshipping(index,row){
            // 跳转编辑单个商品
            console.log(index)
            console.log(row)

            this.$router.push({
                name:"修改运费规则",
                query: {
                    index:index,
                    row:JSON.stringify(row)
                }
            })
        },
        deleteshipping(index,row){
            // 删除单个商品
            console.log(index)
            console.log(row)

            var data={
                id:row.id
            }
            var that=this
            fdelete(data).then(function(res){
                that.getData()
                that.currentpage1=1
            })

        },   

        handleSelectionChange(val){
            // 表格多选改变
            this.multipleSelection = val;
        },


        batchDelete(){
            // 批量删除医院
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
            fpage(data).then(function(res){
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
    .shippingList{
        padding: 20px;
    }
    .shippingBtns{
        display: flex;
        align-items: center;
    }


    .input-with-select{
        width: 200px;
        margin-left: auto;
    }
    .shippingTable{
        margin-top: 20px;
    }
    
    .pagination{
        display: flex;
        justify-content: center;
        margin:20px 0px;
    }
</style>

