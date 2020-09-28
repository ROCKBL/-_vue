<template>
    <div class="goodsorderlist">
        <div class="goodsBtns">
            
            <el-input size="small" placeholder="请输入内容" v-model="searchInput" class="input-with-select">
                <el-button size="small" slot="append" icon="el-icon-search" @click="searchProject"></el-button>
            </el-input>
        </div>


        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="orderTabs">
            <el-tab-pane :label="tab.label" :name="tab.name" v-for="tab in orderTabs"></el-tab-pane>
        </el-tabs>

        <div class="goodsTable">
            <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" :cell-style="tableStyle" :header-cell-style="tableStyle">
                <!-- <el-table-column type="selection" width="40"></el-table-column> -->
                 <el-table-column type="expand" label="订单信息" width="100">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-row :gutter="20">
                        <el-col :span="6">
                          <el-form-item label="发货方式：" label-width="100px">
                            <span>{{ props.row.alias }}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="发货状态：" label-width="100px">
                            <span>{{ props.row.appointment }}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="快递单号：" label-width="100px">
                            <span>{{ props.row.phone }}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="快递公司：" label-width="100px">
                            <span>{{ props.row.gender }}</span>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row :gutter="20">
                        <el-col :span="6">
                          <el-form-item label="收货人信息：" label-width="100px">
                            <span>{{ props.row.userName }}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="优惠券金额：" label-width="100px">
                            <span>{{ props.row.industry }}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="运费：" label-width="100px">
                            <span>{{ props.row.cost }}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="使用积分：" label-width="100px">
                            <span>{{ props.row.history }}</span>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      
                      <el-row :gutter="20">
                        <el-col :span="24">
                          <el-form-item label="备注：" label-width="100px">
                            <span>{{ props.row.area }}</span>
                          </el-form-item>
                        </el-col>
                      </el-row>


                      <el-row :gutter="20">
                          <el-col :span="24">
                          <el-form-item label="商品列表：" label-width="100px">
                            <!-- <div></div> -->
                          </el-form-item>
                        </el-col>
                      </el-row>
                      
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column prop="id" label="ID" width="60" show-overflow-tooltip></el-table-column>
                <el-table-column prop="num" label="订单号" show-overflow-tooltip ></el-table-column>
                <el-table-column prop="date" label="订单时间" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="user" label="用户" show-overflow-tooltip width="180"></el-table-column>
                <el-table-column prop="money" label="金额" show-overflow-tooltip width="100">
                  <template slot-scope="scope">
                        <span >{{ scope.row.money }}元</span>
                    </template>
                </el-table-column>
                <el-table-column prop="sfmoney" label="实付金额" show-overflow-tooltip width="100">
                  <template slot-scope="scope">
                        <span >{{ scope.row.sfmoney }}元</span>
                    </template>
                </el-table-column>
                <el-table-column prop="payway" label="支付方式" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="paystatus" label="支付状态" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="status" label="订单状态" show-overflow-tooltip width="100">
                  <template slot-scope="scope">
                    <el-tag >{{ scope.row.status }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="delivergoods(scope.$index, scope.row)">发货</el-button>
                        <!-- <el-button size="mini" type="danger" @click="deleteGoods(scope.$index, scope.row)">删除</el-button> -->
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
                {id:1,num:"123sda",date:"2020-10-10",name:"大飒飒",user:"菲菲",money:"111.11",sfmoney:"22.22",payway:"微信支付",paystatus:"已支付",status:"未配送",alias:"大劫案",appointment:"2020-10-14",phone:"13312345678",gender:"女",userName:"张菲菲",industry:"金融",cost:"1万",history:"无",area:"温州",other:"没有",isexperience:"是"}
            ],

            multipleSelection:[],

            orderTabs:[
                {label:"全部",name:"all"},
                {label:"未付款",name:"nonPayment"},
                {label:"待发货",name:"unDelivery"},
                {label:"待收货",name:"unReceiving"},
                {label:"已完成",name:"finished"},
                {label:"已取消",name:"canceled"},
            ],
            activeName: null,
            dateAr:null,//时间数组


            total:0,
            limit:10,
            currentpage:1,
        }
    },
    computed:{},
    methods: {
        handleSelectionChange(val){
            // 表格多选改变
            this.multipleSelection = val;
        },
        searchGoods(){
            // 根据关键字搜索商品
        },

        handleClick(tab, event) {
            // 清空条件
            this.searchInput=""
            this.dateAr=null
            //表格获取数据
            this.getData()

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
                // that.tableData=res.result.items
                // that.total=res.result.total
            })
        },
        refresh(currentPage){
            // console.log(this.currentpage)
            this.getData(currentPage)
        },
        delivergoods(index,row){
            // 发货
        }


    },
    created(){
      this.activeName=this.orderTabs[0].name
      this.getData()
    },
    mounted(){
        // 获取列表数据
    }
}
</script>

<style scoped>
    .goodsorderlist{
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

<style type="text/css">
  .goodsorderlist .el-form-item{
    margin-bottom: 0px;
  }

  .goodsorderlist .el-form--label-left .el-form-item__label{
    text-align: right;
  }
</style>
