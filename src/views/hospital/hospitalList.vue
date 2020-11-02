<template>
    <div class="hospitalList">
        <div class="hospitalBtns">
            <el-button type="primary" @click="addHospital" size="small">添加医院</el-button>
            <!-- <el-button type="danger" size="small" @click="batchDelete">批量删除</el-button> -->

            <el-input size="small" placeholder="请输入医院名称" v-model="searchInput" class="input-with-select" @keyup.enter.native="searchHospital">
                <el-button size="small" slot="append" icon="el-icon-search" @click="searchHospital"></el-button>
            </el-input>
        </div>

        <div class="hospitalTable">
            <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" :cell-style="tableStyle" :header-cell-style="tableStyle">
                <!-- <el-table-column type="selection" width="40"></el-table-column> -->
                <!-- <el-table-column prop="id" label="ID" width="60" show-overflow-tooltip></el-table-column> -->
                <el-table-column prop="name" label="医院名称" show-overflow-tooltip width="100"></el-table-column>
                
                <el-table-column prop="phone" label="电话" show-overflow-tooltip width="150"></el-table-column>
                <el-table-column prop="address" label="地址" show-overflow-tooltip width="150"></el-table-column>
                <!-- <el-table-column prop="longitude" label="地址经度" show-overflow-tooltip width="100"></el-table-column> -->
                <!-- <el-table-column prop="latitude" label="地址纬度" show-overflow-tooltip width="100"></el-table-column> -->
                <el-table-column prop="type" label="医院类型" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="characteristic" label="医院特色" show-overflow-tooltip width="100"></el-table-column>
                <!-- <el-table-column prop="introduction" label="医院简介" show-overflow-tooltip width="200"></el-table-column> -->
                <el-table-column label="医院logo"  width="100">
                    <template slot-scope="scope">
                        <el-image style="width: 100%" :src="scope.row.logo" fit="contain"></el-image>
                    </template>
                </el-table-column>

                <el-table-column label="医院照片"  width="100">
                    <template slot-scope="scope">
                        <el-image style="width: 100%" :src="scope.row.images" fit="contain"></el-image>
                    </template>
                </el-table-column>
                
                <el-table-column label="操作" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="editeHospital(scope.$index, scope.row)">修改</el-button>
                        <el-button size="mini" type="danger" @click="deleteHospital(scope.$index, scope.row)">删除</el-button>
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

    import { page,list,hospitaldelete } from '@/api/hospital'

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
        addHospital(){
             // 跳转添加医院页
            this.$router.push("/hospital/addHospital")
        },

        editeHospital(index,row){
            // 跳转编辑单个商品
            console.log(index)
            console.log(row)

            this.$router.push({
                name:"修改医院",
                query: {
                    index:index,
                    row:JSON.stringify(row)
                }
            })
        },
        deleteHospital(index,row){
            // 删除单个商品
            console.log(index)
            console.log(row)

            var data={
                id:row.id
            }
            var that=this
            hospitaldelete(data).then(function(res){
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
        searchHospital(){
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
            page(data).then(function(res){
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
    .hospitalList{
        padding: 20px;
    }
    .hospitalBtns{
        display: flex;
        align-items: center;
    }


    .input-with-select{
        width: 200px;
        margin-left: auto;
    }
    .hospitalTable{
        margin-top: 20px;
    }
    
    .pagination{
        display: flex;
        justify-content: center;
        margin:20px 0px;
    }
</style>

