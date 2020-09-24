<template>
    <div class="goodList">
        <div class="goodsBtns">
            <el-select size="small" v-model="initOption" placeholder="请选择" @change="selectChange" class="selectType">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>

            <el-input size="small" placeholder="微信昵称" v-model="searchInput" class="input-with-select">
                <el-button size="small" slot="append" icon="el-icon-search" @click="searchGoods"></el-button>
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
                <el-table-column prop="userLever" label="等级" show-overflow-tooltip width="100"></el-table-column>


                
                <el-table-column prop="ztdl" label="直推代理" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="ztzdl" label="直推总代理" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="orderPrice" label="订单总额" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="commission" label="总佣金" show-overflow-tooltip width="100"></el-table-column>

                <el-table-column prop="cash" label="可提现佣金" show-overflow-tooltip width="100"></el-table-column>

                <el-table-column prop="joinTime" label="加入时间"  width="100" class-name="xxx"></el-table-column>

                <el-table-column prop="orderNum" label="订单数" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column label="操作"  class-name="xxx">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="checkDirectPush(scope.$index, scope.row)">查看直推</el-button>
                        <el-button size="mini" type="success" @click="checkIndirectPush (scope.$index, scope.row)">查看间推</el-button>
                        <el-button size="mini" type="danger" @click="editeUser(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="mini" type="warning" @click="checkPerformance(scope.$index, scope.row)">查看业绩</el-button>
                    </template>
                </el-table-column>

                <!-- <el-table-column label="日期" width="120">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="120"></el-table-column>
                <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column> -->
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
            initOption:"",
            options:[],//会员分类
            searchInput:"",
            tableData:[
                {id:1,userLever:"手作海鲜",name:"纯手工鱼丸",pic:"http://www.wjhxhz.com/addons/zjhj_mall/core/web/uploads/image/3a/3ae597ae8c0748235aa37f623ae12c56.jpg",joinTime:"2020-08-14 01:14:34",orderNum:"0",commission:"0",cash:"0",orderPrice:"0",ztdl:"0",ztzdl:"0"}
            ],

        }
    },
    computed:{},
    methods: {
        checkDirectPush(index,row){},
        checkIndirectPush(index,row){},
        editeUser(index,row){
            // 编辑用户等级
           
        },
        checkPerformance(index,row){
            // 删除单个商品
            console.log(index)
            console.log(row)
        },   


        selectChange(){
            // 更加会员类别获取用户分类数据
        },
        searchGoods(){
            // 根据关键字搜索客户
        }

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
        /*white-space: pre-wrap!important;*/
    }
    .xxx button{
        margin:5px!important;
    }
    td.xxx{
        padding:5px 0px;
    }

</style>