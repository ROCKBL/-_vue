<template>
    <div class="userList">
        <div class="goodsBtns">
            <!-- <el-select size="small" v-model="initOption" placeholder="请选择" @change="selectChange" class="selectType">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select> -->

            <el-input size="small" placeholder="微信昵称" v-model="searchInput" class="input-with-select" @keyup.enter.native="searchGoods">
                <el-button size="small" slot="append" icon="el-icon-search" @click="searchGoods"></el-button>
            </el-input>
        </div>

        <div class="goodsTable">
            <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"  :cell-style="tableStyle" :header-cell-style="tableStyle">

                <!-- <el-table-column prop="id" label="ID" width="60" show-overflow-tooltip></el-table-column> -->
                <el-table-column label="头像" show-overflow-tooltip width="100">
                    <template slot-scope="scope">
                        <el-image style="width: 100%" :src="scope.row.avatar" fit="contain"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="昵称" show-overflow-tooltip width="140"></el-table-column>
                <el-table-column prop="role" label="会员等级" show-overflow-tooltip width="100">
                    <template slot-scope="scope">
                        <div >{{ getUserLever(scope.row.role) }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="money" label="余额" show-overflow-tooltip width="100">
                    <template slot-scope="scope">
                        <div >{{ scope.row.money }}元</div>
                    </template>
                </el-table-column>

                <el-table-column prop="province" label="省份" show-overflow-tooltip width="100">
                    <template slot-scope="scope">
                        <div v-if="scope.row.province">{{ scope.row.province }}</div>
                        <div v-else>未设置</div>
                    </template>
                </el-table-column>
                <el-table-column prop="city" label="城市" show-overflow-tooltip width="100">
                    <template slot-scope="scope">
                        <div v-if="scope.row.city">{{ scope.row.city }}</div>
                        <div v-else>未设置</div>
                    </template>
                </el-table-column>
                <el-table-column prop="area" label="区县" show-overflow-tooltip width="100">
                    <template slot-scope="scope">
                        <div v-if="scope.row.area">{{ scope.row.area }}</div>
                        <div v-else>未设置</div>
                    </template>
                </el-table-column>
                <el-table-column prop="sex" label="性别" show-overflow-tooltip width="60">
                    <template slot-scope="scope">
                        <div v-if="scope.row.sex=='1'">男</div>
                        <div v-if="scope.row.sex=='2'">女</div>
                    </template>
                </el-table-column>
                <el-table-column prop="sign" label="个性签名" show-overflow-tooltip width="240">
                    <template slot-scope="scope">
                        <div v-if="scope.row.sign">{{ scope.row.sign }}</div>
                        <div v-else>未设置</div>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="ztdl" label="直推代理" show-overflow-tooltip width="100"></el-table-column> -->
                <!-- <el-table-column prop="ztzdl" label="直推总代理" show-overflow-tooltip width="100"></el-table-column> -->
                <!-- <el-table-column prop="orderPrice" label="订单总额" show-overflow-tooltip width="100"></el-table-column> -->
                <!-- <el-table-column prop="commission" label="总佣金" show-overflow-tooltip width="100"></el-table-column> -->

                <!-- <el-table-column prop="cash" label="可提现佣金" show-overflow-tooltip width="100"></el-table-column> -->

                <!-- <el-table-column prop="joinTime" label="加入时间"  width="100" class-name="xxx"></el-table-column> -->

                <!-- <el-table-column prop="orderNum" label="订单数" show-overflow-tooltip width="100"></el-table-column> -->
                <el-table-column label="操作"  class-name="xxx">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="checkDirectPush(scope.$index, scope.row)">查看直推</el-button>
                        <el-button size="mini" type="success" @click="checkIndirectPush (scope.$index, scope.row)">查看间推</el-button>
                        <!-- <el-button size="mini" type="danger" @click="editeUser(scope.$index, scope.row)">编辑</el-button> -->
                        <!-- <el-button size="mini" type="warning" @click="checkPerformance(scope.$index, scope.row)">查看业绩</el-button> -->
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

        <el-dialog :title="dialogTitle" :visible.sync="dialogTableVisible" width="30%">
            <el-table :data="gridData">
                <el-table-column property="name" label="昵称" ></el-table-column>
                <el-table-column prop="role" label="会员等级" show-overflow-tooltip width="100">
                    <template slot-scope="scope">
                        <div >{{ getUserLever(scope.row.role) }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="money" label="余额" show-overflow-tooltip width="100">
                    <template slot-scope="scope">
                        <div >{{ scope.row.money }}元</div>
                    </template>
                </el-table-column>
                <el-table-column prop="sex" label="性别" show-overflow-tooltip width="60">
                    <template slot-scope="scope">
                        <div v-if="scope.row.sex=='1'">男</div>
                        <div v-if="scope.row.sex=='2'">女</div>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>

    import { ugetConsumerList } from '@/api/user'

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
                // {id:1,userLever:"手作海鲜",name:"纯手工鱼丸",pic:"http://www.wjhxhz.com/addons/zjhj_mall/core/web/uploads/image/3a/3ae597ae8c0748235aa37f623ae12c56.jpg",joinTime:"2020-08-14 01:14:34",orderNum:"0",commission:"0",cash:"0",orderPrice:"0",ztdl:"0",ztzdl:"0"}
            ],

            multipleSelection:[],
            total:0,
            limit:10,
            currentpage1:1,

            dialogTitle:null,
            dialogTableVisible:false,
            gridData:[]
        }
    },
    computed:{},
    methods: {
        checkDirectPush(index,row){
            var that=this;
            this.dialogTitle="查看直推"
            ugetConsumerList({
                start:1,
                limit:999,
                getDirect:row.id
            }).then(function(res){
                that.dialogTableVisible=true
                that.gridData=res.result.items
            })
        },
        checkIndirectPush(index,row){
            var that=this;
            this.dialogTitle="查看间推"
            ugetConsumerList({
                start:1,
                limit:999,
                getIndirect:row.id
            }).then(function(res){
                that.dialogTableVisible=true
                that.gridData=res.result.items
            })
        },
        editeUser(index,row){
            // 编辑用户等级
           
        },
        checkPerformance(index,row){
            // 删除单个商品
            console.log(index)
            console.log(row)
        },   


        // selectChange(){
        //     // 更加会员类别获取用户分类数据
        // },
        searchGoods(){
            // 根据关键字搜索客户
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
            ugetConsumerList(data).then(function(res){
                // console.log(res)
                that.tableData=res.result.items
                that.total=res.result.total
            })
        },

        refresh(currentPage){
            // console.log(this.currentpage)
            this.getData(currentPage)
        },
        getUserLever(s){
            var name=""
            switch(s){
                case "MEMBER":
                    name="普通会员"
                    break;
                case "VIP_MEMBER":
                    name="VIP会员"
                    break;
                case "VIP_MAJORDOMO":
                    name="VIP 总监"
                    break;
                case "DIAMOND_MEMBER":
                    name="钻石会员"
                    break;
                case "BOARD_MEMBER":
                    name="董事会员"
                    break;
            }
            return name
        },

    },
    created(){
        this.getData()
    },
    mounted(){
        // 获取会员分类数据
    }
}
</script>

<style >
    .userList{
        padding: 20px;
    }
    .userList .goodsBtns{
        display: flex;
        align-items: center;
    }

    .userList .selectType{
        margin-left: 10px;
    }
    .userList .input-with-select{
        width: 200px;
        margin-left: auto;
    }
    .userList .goodsTable{
        margin-top: 20px;
    }

    .userList .xxx .cell{
        display: flex;
        flex-wrap: wrap;
        /*white-space: pre-wrap!important;*/
    }
    .userList .xxx button{
        margin:5px!important;
    }
    .userList td.xxx{
        padding:5px 0px;
    }

</style>