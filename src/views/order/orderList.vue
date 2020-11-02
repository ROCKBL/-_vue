<template>
    <div class="orderList" v-loading="loading">
        <div class="goodsBtns">
           <!--  <el-input placeholder="请输入内容" v-model="searchInput" class="inputWithSelect">
                <el-select slot="prepend"  v-model="initOption" placeholder="请选择"  class="selectType">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-input> -->
            
           <!--  <div class="orderDateUnit">
                <div class="">下单时间：</div>
                <el-date-picker v-model="dateAr" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions"></el-date-picker>
            </div> -->
            
            <!-- <el-button size="small" type="primary" @click="searchOrders" style="margin-left: auto;">筛选</el-button> -->
            <!-- <el-button size="small" @click="download">批量导出</el-button> -->
        </div>

        <!-- <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="orderTabs">
            <el-tab-pane :label="tab.label" :name="tab.name" v-for="tab in orderTabs">
                <orderListView :ref="tab.name" :activeName="activeName" :tableType="tab" :initOption="initOption" :searchInput="searchInput" :dateAr="dateAr"></orderListView>
            </el-tab-pane>
        </el-tabs> -->

        <el-tabs v-model="activeName" type="card" @tab-click="handleClick" class="orderTabs">
            <el-tab-pane :label="tab.label" :name="tab.name" v-for="tab in orderTabs"></el-tab-pane>
        </el-tabs>

        <div class="goodsTable">
            <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" :cell-style="tableStyle" :header-cell-style="tableStyle">
                <!-- <el-table-column type="selection" width="40"></el-table-column> -->
                <el-table-column type="expand" label="订单信息" width="60">
                  <template slot-scope="props">
                    <!-- <el-form label-position="left" inline class="demo-table-expand">
                      <el-row :gutter="20">
                        <el-col :span="8">
                          <el-form-item label="收货人：" label-width="100px">
                            <span>{{ props.row.addressName }}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="收货号码：" label-width="100px">
                            <span>{{ props.row.addressPhone }}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="快递单号：" label-width="100px">
                            <span v-if="props.row.expressNumber">{{ props.row.expressNumber }}</span>
                            <span v-else>暂无</span>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                          <el-col :span="8">
                              <el-form-item label="收货地址：" label-width="100px">
                                <span>{{ props.row.addressDetail }}</span>
                              </el-form-item>
                          </el-col>
                          <el-col :span="16">
                              <el-form-item label="备注：" label-width="100px">
                                <span>{{ props.row.remake }}</span>
                              </el-form-item>
                          </el-col>
                          
                      </el-row>
                    </el-form> -->

                    <div v-for="item in props.row.lines" class="goodsItem" >
                        <!-- <van-image width="60px" height="60px" fit="contain" :src="item.goodsImages" /> -->
                        <el-image class="goodsItemImg" :src="item.goodsImages" fit="contain"></el-image>
                        <div class="goodsItemInfo" > 
                            <div class="goodsItemInfoName" >{{ item.goodsName }}</div>
                            <div class="goodsItemInfoSkuName" >{{ item.goodsSkuName }}</div>
                            <div class="goodsItemInfoRow" >
                                <div>单价</div>
                                <div style="margin-left: auto;">{{ item.goodsPrice }}元</div>
                            </div>
                            <div class="goodsItemInfoRow" >
                                <div>数量</div>
                                <div style="margin-left: auto;">x{{ item.num }}</div>
                            </div>
                        </div>
                    </div>

                  </template>
                </el-table-column>
                <!-- <el-table-column prop="id" label="ID" width="60" show-overflow-tooltip></el-table-column> -->
                <el-table-column prop="orderNo" label="订单编号" show-overflow-tooltip width="180" ></el-table-column>
                <el-table-column prop="consumerName" label="用户昵称" show-overflow-tooltip width="100"></el-table-column>

                <el-table-column prop="createTime" label="订单创建时间" show-overflow-tooltip width="150">
                    <template slot-scope="scope">
                        <div>{{ new Date(scope.row.createTime).Format("yyyy-MM-dd hh:mm:ss") }}</div>
                    </template>
                </el-table-column>

                <el-table-column label="商品金额" show-overflow-tooltip width="100">
                    <template slot-scope="scope">
                        <div>{{ scope.row.money*scope.row.discount }}元</div>
                    </template>
                </el-table-column>

                <el-table-column label="运费" show-overflow-tooltip width="60">
                    <template slot-scope="scope">
                        <div>{{ scope.row.freight }}元</div>
                    </template>
                </el-table-column>

                <el-table-column label="优惠券优惠" show-overflow-tooltip width="100">
                    <template slot-scope="scope">
                        <div>{{ scope.row.couponPrice }}元</div>
                    </template>
                </el-table-column>
                <el-table-column label="积分抵扣" show-overflow-tooltip width="80">
                    <template slot-scope="scope">
                        <div>{{ scope.row.integralMoney }}元</div>
                    </template>
                </el-table-column>
                <el-table-column label="总金额" show-overflow-tooltip width="100">
                    <template slot-scope="scope">
                        <div>{{ scope.row.money*scope.row.discount+scope.row.freight-scope.row.couponPrice-scope.row.integralMoney }}元</div>
                    </template>
                </el-table-column>

                <!-- <el-table-column label="金额" show-overflow-tooltip width="200">
                    <template slot-scope="scope">
                        <div>总金额:{{ scope.row.money+scope.row.freight-scope.row.couponPrice-scope.row.integralMoney }}元（含运费）</div>
                        <div>商品金额:{{ scope.row.money }}元</div>
                        <div>运费:{{ scope.row.freight }}元</div>
                        <div>优惠券优惠:{{ scope.row.couponPrice }}元</div>
                        <div>积分抵扣:{{ scope.row.integralMoney }}元</div>
                    </template>
                </el-table-column> -->

               <!--  <el-table-column label="商品图片" show-overflow-tooltip width="100">
                    <template slot-scope="scope">
                        <el-image style="width: 100%" :src="scope.row.pic" fit="contain"></el-image>
                    </template>
                </el-table-column> -->
                <!-- <el-table-column prop="projectName" label="项目名称" show-overflow-tooltip width="150"></el-table-column> -->

                <!-- <el-table-column label="项目缩略图"  width="100">
                    <template slot-scope="scope">
                        <el-image style="width: 100%" :src="scope.row.firstImage" fit="contain"></el-image>
                    </template>
                </el-table-column> -->
                <!-- <el-table-column prop="hospitalName" label="医院" show-overflow-tooltip width="100"></el-table-column> -->
                

                <!-- <el-table-column prop="money" label="项目金额" show-overflow-tooltip width="100">
                  <template slot-scope="scope">
                        <span >{{ scope.row.money }}元</span>
                    </template>
                </el-table-column> -->
                <el-table-column prop="realityMoney" label="实付金额" show-overflow-tooltip width="100">
                  <template slot-scope="scope">
                        <span v-if="scope.row.actualMoney">{{ scope.row.actualMoney }}元</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column prop="payway" label="支付方式" show-overflow-tooltip width="100"></el-table-column> -->
                <!-- <el-table-column prop="paystatus" label="支付状态" show-overflow-tooltip width="100"></el-table-column> -->
                <el-table-column prop="orderState" label="订单状态" show-overflow-tooltip width="100">
                  <template slot-scope="scope">
                    <el-tag  v-if="scope.row.orderState==0">{{ getSatusString(scope.row.orderState) }}</el-tag>
                    <el-tag type="success" v-if="scope.row.orderState==1">{{ getSatusString(scope.row.orderState) }}</el-tag>
                    <el-tag type="warning" v-if="scope.row.orderState==2">{{ getSatusString(scope.row.orderState) }}</el-tag>
                    <el-tag type="info" v-if="scope.row.orderState==3">{{ getSatusString(scope.row.orderState) }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="操作" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="seeDetail(scope.$index, scope.row)" >查看详情</el-button>
                        <el-button size="mini" type="warning" @click="delivery(scope.$index, scope.row)" v-if="scope.row.orderState==1">发货</el-button>
                        <!-- <div >
                            <el-button size="mini" type="primary" @click="seeDetail(scope.$index, scope.row)">查看详情</el-button>
                            
                        </div>
                        <div style="margin-top: 10px;" v-if="scope.row.orderState==4">
                            <el-button size="mini" type="warning" @click="agree(scope.$index, scope.row)">同意退款</el-button>
                            <el-button size="mini" type="danger" @click="reject(scope.$index, scope.row)">拒绝退款</el-button>
                        </div> -->
                    </template>
                </el-table-column>

            </el-table>

            <!-- <el-dialog title="订单详情" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
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
            </el-dialog> -->

            <el-pagination layout="prev, pager, next" :total="total" :page-size="limit" class="pagination" hide-on-single-page @current-change="refresh" :current-page.sync="currentpage1" ></el-pagination>
        </div>

        <el-dialog title="输入快递单号" :visible.sync="dialogVisible" width="30%">
            快递单号：<el-input v-model="expressNumber" placeholder="快递单号"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="deliveryConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import orderListView from "./orderListComponent";

    import { godetail,gomodifyState,gopage } from '@/api/goods'

export default {
    components: {
        orderListView,
    },
    data() {
        return {
            loading:false,
            tableStyle:{
                textAlign:"center"
            },
            // initOption:"订单号",//下拉框选中值
            // options:[
            //     { label:"订单号",value:"订单号"},
            //     { label:"用户",value:"用户"},
            //     { label:"收货人",value:"收货人"},
            // ],
            // searchInput:"",//输入框

            // dateAr:null,//时间数组

            // pickerOptions:{
            //     shortcuts: [{
            //         text: '最近一周',
            //         onClick(picker) {
            //             const end = new Date();
            //             const start = new Date();
            //             start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            //             picker.$emit('pick', [start, end]);
            //         }
            //     }, {
            //         text: '最近一个月',
            //         onClick(picker) {
            //             const end = new Date();
            //             const start = new Date();
            //             start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            //             picker.$emit('pick', [start, end]);
            //         }
            //     }, {
            //         text: '最近三个月',
            //         onClick(picker) {
            //             const end = new Date();
            //             const start = new Date();
            //             start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            //             picker.$emit('pick', [start, end]);
            //         }
            //     }]
            // },

            activeName: null,

            orderTabs:[
                {label:"全部",name:"all"},
                {label:"未付款",name:"nonPayment"},
                {label:"待发货",name:"unDelivery"},
                {label:"待收货",name:"unReceiving"},
                {label:"已完成",name:"finished"},
                // {label:"已取消",name:"canceled"},
            ],

            tableData:[],
            total:0,
            limit:10,
            currentpage1:1,

            deliveryObj:{},
            expressNumber:null,
            dialogVisible:false,
        }
    },
    computed:{},
    methods: {
        handleSelectionChange(val){
            // 表格多选改变
            this.multipleSelection = val;
        },
        searchOrders(){
            // 根据多个条件搜索订单
            this.$refs[this.activeName][0].initData()

        },
        download(){
            // 批量导出功能
        },
        getSatusString(state){
            switch(state){
                case 0:
                    return "未付款"
                    break;
                case 1:
                    return "待发货"
                    break;
                case 2:
                    return "待收货"
                    break;
                case 3:
                    return "已完成"
                    break;
                // case 4:
                //     return "已取消"
                //     break;

            }
        },
        handleClick(tab, event) {
            // 清空条件
            // this.initCondition()
            //表格获取数据
            // this.$refs[tab.name][0].initData()
            this.currentpage1=1;
            this.getData()

        },
        // initCondition(){
        //     this.activeName=this.orderTabs[0].name;
        //     this.searchInput=""
        //     this.dateAr=null
        // },
        // initTable(){
        //     this.$refs[this.orderTabs[0].name][0].initData()
        // },
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
                    data.orderState=0
                    break;
                case "unDelivery":
                    data.orderState=1
                    break;
                case "unReceiving":
                    data.orderState=2
                    break;
                case "finished":
                    data.orderState=3
                    break;
                case "canceled":
                    data.orderState=4
                    break;
            }

            var that=this;
            gopage(data).then(function(res){
                console.log(res)
                that.tableData=res.result.items
                that.total=res.result.total
            })
        },
        refresh(currentPage){
            // console.log(this.currentpage)
            this.getData(currentPage)
        },
        delivery(index,row){
            this.deliveryObj=row
            this.dialogVisible=true
        },
        deliveryConfirm(){
            var that=this;
            if(!this.expressNumber){
                this.$message({
                  message: '请输入快递单号',
                  type: 'warning'
                });
                return
            }
            gomodifyState({
                expressNumber:this.expressNumber,
                orderNo:this.deliveryObj.orderNo,
                state:2
            }).then(function(res){
                console.log(res)
                that.expressNumber=null
                that.deliveryObj={}
                that.getData()
                that.dialogVisible=false
            })
        },
        seeDetail(index,row){
            this.$router.push({ 
                name: '订单详情', 
                query: { order: JSON.stringify(row) }
            })
        }

    },
    created(){
        // console.log(this.$router.currentRoute)
        // 判断页面类型
        // if(this.$router.currentRoute.name=="订单列表"){
        //     console.log("订单列表")
        // }
        // if(this.$router.currentRoute.name=="自提订单"){
        //     console.log("自提订单")
        // }
        this.activeName=this.orderTabs[0].name
        this.getData()

    },
    mounted(){
        // this.initCondition()
        // this.initTable()
        // 获取orderTabs[0]列表数据
        // this.loading=true
        // var that=this;
        // setTimeout(function(){
        //     that.loading=false
        // },5000)
    }
}
</script>

<style >
    .orderList{
        padding: 20px;
    }
    .goodsBtns{
        display: flex;
        align-items: center;
    }

    .orderDateUnit{
        display: flex;
        align-items: center;
        margin-left: 20px;
    }

    .selectType{
        width: 100px;
    }
    .inputWithSelect>.el-input__inner{
        width: 200px;
    }

    .goodsTable{
        margin-top: 20px;
    }
    
    .goodsBtns .el-input-group{
        width: inherit;
    }
    .orderTabs{
        margin-top: 20px;
    }

    .orderList .el-form-item{
        margin-bottom: 0px;
    }


    .orderList .goodsItem{
        display: flex;
        align-items: center;
        width: calc(20% - 20px);
        margin: 5px;
        padding: 5px;
        border-radius: 10px;
        box-sizing: border-box;
        box-shadow: 0px 0px 5px rgba(0,0,0,0.1);
    }
    .orderList .goodsItemImg{
        width: 80px; 
        height: 80px;
    }
    .orderList .goodsItemInfo{
        margin-left: 10px;
        flex-grow: 1;
    }
    .orderList .goodsItemInfoName{
        font-size: 16px;
        margin-bottom: 2px;
    }

    .orderList .goodsItemInfoSkuName{
        font-size: 12px;
        color: #999;
    }
    .orderList .goodsItemInfoRow{
        display: flex;
        align-items: center; 
        line-height: 20px;
        font-size: 14px;
    }
</style>