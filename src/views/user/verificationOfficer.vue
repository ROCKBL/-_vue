<template>
    <div class="goodList">
        <div class="goodsBtns">
            <el-button type="primary" @click="addOfficer" size="small">添加核销员</el-button>

            <el-input size="small" placeholder="微信昵称" v-model="searchInput" class="input-with-select">
                <el-button size="small" slot="append" icon="el-icon-search" @click="searchOfficer"></el-button>
            </el-input>
        </div>

        <div class="goodsTable">
            <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"  :cell-style="tableStyle" :header-cell-style="tableStyle">
                <el-table-column prop="id" label="ID" width="60" show-overflow-tooltip></el-table-column>
                <el-table-column label="头像" show-overflow-tooltip width="100">
                    <template slot-scope="scope">
                        <el-image style="width: 100%" :src="scope.row.pic" fit="contain"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="昵称" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="shop" label="所属门店" show-overflow-tooltip width="100"></el-table-column>

                <el-table-column prop="joinTime" label="加入时间"  width="100" class-name="xxx"></el-table-column>
                <el-table-column prop="identity" label="身份" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="verificationOrderNum" label="核销订单数" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="verificationVouchersNum" label="核销卡券数" show-overflow-tooltip width="100"></el-table-column>

                
                <el-table-column label="操作" show-overflow-tooltip class-name="xxx">
                    <template slot-scope="scope">
                        <el-button size="mini" type="danger" @click="deleteOfficer(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableStyle:{
                textAlign:"center"
            },


            searchInput:"",
            tableData:[

                {id:1,shop:"手作海鲜",name:"纯手工鱼丸",pic:"http://www.wjhxhz.com/addons/zjhj_mall/core/web/uploads/image/3a/3ae597ae8c0748235aa37f623ae12c56.jpg",joinTime:"2020-08-14 01:14:34",identity:"0",verificationOrderNum:"0",verificationVouchersNum:"0"}
            ],

        }
    },
    computed:{},
    methods: {        

        deleteOfficer(index,row){
            // 删除会员等级
            console.log(index)
            console.log(row)
        },
        addOfficer(){
        	// 添加核销员
        },
        searchOfficer(){
            // 根据关键字搜索核销员
        },


    },
    created(){},
    mounted(){
        // 获取会员分类数据
    }
}
</script>

<style >
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

    .xxx .cell{
        display: flex;
        flex-wrap: wrap;
        white-space: pre-wrap!important;
    }
    .xxx button{
        margin:5px!important;
    }
    td.xxx{
        padding:5px 0px;
    }

</style>