<template>
    <div class="projectOrderList">
        <!-- <div class="goodsBtns">
            
            <el-input size="small" placeholder="请输入内容" v-model="searchInput" class="input-with-select">
                <el-button size="small" slot="append" icon="el-icon-search" @click="searchProject"></el-button>
            </el-input>
        </div> -->


        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="orderTabs">
            <el-tab-pane :label="tab.label" :name="tab.name" v-for="tab in orderTabs"></el-tab-pane>
        </el-tabs>

        <div class="goodsTable">
            <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" :cell-style="tableStyle" :header-cell-style="tableStyle">
                <!-- <el-table-column type="selection" width="40"></el-table-column> -->
                <!-- <el-table-column type="expand" label="订单信息" width="100">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-row :gutter="20">
                        <el-col :span="6">
                          <el-form-item label="昵称：" label-width="100px">
                            <span>{{ props.row.alias }}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="预约时间：" label-width="100px">
                            <span>{{ props.row.appointment }}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="手机号码：" label-width="100px">
                            <span>{{ props.row.phone }}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="性别：" label-width="100px">
                            <span>{{ props.row.gender }}</span>
                          </el-form-item>
                        </el-col>
                      </el-row>

                      <el-row :gutter="20">
                        <el-col :span="6">
                          <el-form-item label="姓名：" label-width="100px">
                            <span>{{ props.row.userName }}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="从事行业：" label-width="100px">
                            <span>{{ props.row.industry }}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="消费预算：" label-width="100px">
                            <span>{{ props.row.cost }}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="整形历史：" label-width="100px">
                            <span>{{ props.row.history }}</span>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      
                      <el-row :gutter="20">
                        <el-col :span="6">
                          <el-form-item label="所在区域：" label-width="100px">
                            <span>{{ props.row.area }}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="其它：" label-width="100px">
                            <span>{{ props.row.other }}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="是否体检：" label-width="100px">
                            <span>{{ props.row.isexperience }}</span>
                          </el-form-item>
                        </el-col>

                      </el-row>
                      
                    </el-form>
                  </template>
                </el-table-column> -->
                <!-- <el-table-column prop="id" label="ID" width="60" show-overflow-tooltip></el-table-column> -->
                <el-table-column prop="orderNo" label="订单号" show-overflow-tooltip width="180" ></el-table-column>
                <el-table-column prop="createTime" label="订单时间" show-overflow-tooltip width="150">
                    <template slot-scope="scope">
                        <div>{{ new Date(scope.row.createTime).Format("yyyy-MM-dd hh:mm:ss") }}</div>
                    </template>
                </el-table-column>
               <!--  <el-table-column label="商品图片" show-overflow-tooltip width="100">
                    <template slot-scope="scope">
                        <el-image style="width: 100%" :src="scope.row.pic" fit="contain"></el-image>
                    </template>
                </el-table-column> -->
                <el-table-column prop="projectName" label="项目名称" show-overflow-tooltip width="150"></el-table-column>
                <el-table-column label="项目缩略图"  width="100">
                    <template slot-scope="scope">
                        <el-image style="width: 100%" :src="scope.row.firstImage" fit="contain"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="hospitalName" label="医院" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="consumerName" label="用户" show-overflow-tooltip width="100"></el-table-column>

                <el-table-column prop="money" label="项目金额" show-overflow-tooltip width="100">
                  <template slot-scope="scope">
                        <span >{{ scope.row.money }}元</span>
                    </template>
                </el-table-column>
                <el-table-column prop="realityMoney" label="实付金额" show-overflow-tooltip width="100">
                  <template slot-scope="scope">
                        <span v-if="scope.row.realityMoney">{{ scope.row.realityMoney }}元</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="payway" label="支付方式" show-overflow-tooltip width="100"></el-table-column> -->
                <!-- <el-table-column prop="paystatus" label="支付状态" show-overflow-tooltip width="100"></el-table-column> -->
                <el-table-column prop="orderState" label="订单状态" show-overflow-tooltip width="100">
                  <template slot-scope="scope">
                    <el-tag >{{ getSatusString(scope.row.orderState) }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div >
                            <el-button size="mini" type="primary" @click="seeDetail(scope.$index, scope.row)">查看详情</el-button>
                            
                        </div>
                        <div style="margin-top: 10px;" v-if="scope.row.orderState==4">
                            <el-button size="mini" type="warning" @click="agree(scope.$index, scope.row)">同意退款</el-button>
                            <el-button size="mini" type="danger" @click="reject(scope.$index, scope.row)">拒绝退款</el-button>
                        </div>
                    </template>
                </el-table-column>

            </el-table>

            <el-dialog title="订单详情" :visible.sync="dialogVisible" width="60%" :before-close="handleClose">
                <el-form :model="{}">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="昵称：" label-width="100px">
                                <span>{{ dialogDetail.nickname }}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="预约时间：" label-width="100px">
                                <span>{{ new Date(dialogDetail.appointmentTime).Format("yyyy-MM-dd") }}</span>
                            </el-form-item>
                        </el-col>                        
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="手机号码：" label-width="100px">
                                <span>{{ dialogDetail.phone }}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="性别：" label-width="100px">
                                <span v-if="dialogDetail.sex">男</span>
                                <span v-else>女</span>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="姓名：" label-width="100px">
                                <span>{{ dialogDetail.name }}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="从事行业：" label-width="100px">
                                <span>{{ dialogDetail.industry }}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item label="消费预算：" label-width="100px">
                                <span>{{ dialogDetail.budgetMoney }}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="整形历史：" label-width="100px">
                                <span v-if="dialogDetail.history">是</span>
                                <span v-else>否</span>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    
                    <el-row :gutter="20">
                        
                        <el-col :span="12">
                            <el-form-item label="其它：" label-width="100px">
                                <span>{{ dialogDetail.other }}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="是否体验：" label-width="100px">
                                <span v-if="dialogDetail.experience">是</span>
                                <span v-else>否</span>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-form-item label="所在区域：" label-width="100px">
                                <span>{{ dialogDetail.area }}</span>
                            </el-form-item>
                        </el-col>
                        
                    </el-row>
                </el-form>
            </el-dialog>

            <el-pagination layout="prev, pager, next" :total="total" :page-size="limit" class="pagination" hide-on-single-page @current-change="refresh" :current-page.sync="currentpage1" ></el-pagination>
        </div>
    </div>
</template>

<script>
  import { podetail,pomodifyState,popage } from '@/api/project'

export default {
    data() {
        return {
            tableStyle:{
                textAlign:"center"
            },

            searchInput:"",
            tableData:[
                // {id:1,num:"123sda",date:"2020-10-10",name:"大飒飒",user:"菲菲",money:"111.11",sfmoney:"22.22",payway:"微信支付",paystatus:"已支付",status:"未配送",alias:"大劫案",appointment:"2020-10-14",phone:"13312345678",gender:"女",userName:"张菲菲",industry:"金融",cost:"1万",history:"无",area:"温州",other:"没有",isexperience:"是"}
            ],

            multipleSelection:[],

            orderTabs:[
                {label:"全部",name:"all"},
                {label:"待付款",name:"nonPayment"},
                {label:"预约中",name:"dateing"},
                {label:"已实施",name:"carryOut"},
                {label:"已完成",name:"finished"},
                // {label:"申请退款",name:"applyRefund"},
                // {label:"退款成功",name:"refundSuccess"},
                // {label:"退款拒绝",name:"refundDeney"},
            ],
            activeName: null,
            dateAr:null,//时间数组


            total:0,
            limit:10,
            currentpage1:1,

            // 弹出框
            dialogVisible: false,
            dialogDetail:{}
        }
    },
    computed:{},
    methods: {
        handleSelectionChange(val){
            // 表格多选改变
            this.multipleSelection = val;
        },
        handleClose(done) {
            // this.dialogVisible=false
            done();
        },
        seeDetail(index,row){
            var that=this;
            podetail({
                id:row.id
            }).then(function(res){
                that.dialogDetail=res.result
                that.dialogVisible=true
            })
        },
        agree(index,row){
            var that=this
            this.$confirm('确认同意退款？').then(_ => {
                pomodifyState({
                    id:row.id,
                    state:5
                }).then(function(res){
                    that.getData(that.currentpage1)
                })
            }).catch(_ => {

            });
            
        },
        reject(index,row){
            var that=this
            this.$confirm('确认拒绝退款？').then(_ => {
                pomodifyState({
                    id:row.id,
                    state:6
                }).then(function(res){
                    that.getData(that.currentpage1)
                })
            }).catch(_ => {

            });
            
        },
        getSatusString(state){
            switch(state){
                case 0:
                    return "待付款"
                    break;
                case 1:
                    return "预约中"
                    break;
                case 2:
                    return "已实施"
                    break;
                case 3:
                    return "已完成"
                    break;
                case 4:
                    return "申请退款"
                    break;
                case 5:
                    return "退款成功"
                    break;
                case 6:
                    return "退款拒绝"
                    break;
            }
        },
        handleClick(tab, event) {
            // 清空条件
            // this.searchInput=""
            // this.dateAr=null
            //表格获取数据
            this.currentpage1=1
            this.getData()

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
            switch(this.activeName){
                case "all":
                    break;
                case "nonPayment":
                    data.state=0
                    break;
                case "dateing":
                    data.state=1
                    break;
                case "carryOut":
                    data.state=2
                    break;
                case "finished":
                    data.state=3
                    break;
                case "applyRefund":
                    data.state=4
                    break;
                case "refundSuccess":
                    data.state=5
                    break;
                case "refundDeney":
                    data.state=6
                    break;
            }

            var that=this;
            popage(data).then(function(res){
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
      this.activeName=this.orderTabs[0].name
      this.getData()
    },
    mounted(){
        // 获取列表数据
    }
}
</script>

<style scoped>
    .projectOrderList{
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
  .projectOrderList .el-form-item{
    margin-bottom: 0px;
  }

  .projectOrderList .el-form--label-left .el-form-item__label{
    text-align: right;
  }
</style>
