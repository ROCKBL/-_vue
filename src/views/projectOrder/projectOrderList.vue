<template>
    <div class="projectOrderList">
        <div class="goodsBtns">
            

            <el-input size="small" placeholder="请输入内容" v-model="searchInput" class="input-with-select">
                <el-button size="small" slot="append" icon="el-icon-search" @click="searchGoods"></el-button>
            </el-input>
        </div>

        <div class="goodsTable">
            <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" :cell-style="tableStyle" :header-cell-style="tableStyle">
                <!-- <el-table-column type="selection" width="40"></el-table-column> -->
                 <el-table-column type="expand">
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
                </el-table-column>
                <el-table-column prop="id" label="ID" width="60" show-overflow-tooltip></el-table-column>
                <el-table-column prop="num" label="订单号" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="date" label="订单时间" show-overflow-tooltip width="100"></el-table-column>
               <!--  <el-table-column label="商品图片" show-overflow-tooltip width="100">
                    <template slot-scope="scope">
                        <el-image style="width: 100%" :src="scope.row.pic" fit="contain"></el-image>
                    </template>
                </el-table-column> -->
                <el-table-column prop="name" label="项目名称" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="user" label="用户" show-overflow-tooltip width="100"></el-table-column>
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
                <el-table-column prop="status" label="订单状态" show-overflow-tooltip width="100"></el-table-column>
                <!-- <el-table-column label="操作" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="editeGoods(scope.$index, scope.row)">修改</el-button>
                        <el-button size="mini" type="danger" @click="deleteGoods(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column> -->

            </el-table>

            <el-pagination layout="prev, pager, next" :total="24" :page-size="10" class="pagination" hide-on-single-page  ></el-pagination>
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
                {id:1,num:"123sda",date:"2020-10-10",name:"大飒飒",user:"菲菲",money:"111.11",sfmoney:"22.22",payway:"微信支付",paystatus:"已支付",status:"未配送",alias:"大劫案",appointment:"2020-10-14",phone:"13312345678",gender:"女",userName:"张菲菲",industry:"金融",cost:"1万",history:"无",area:"温州",other:"没有",isexperience:"是"}
            ],

            multipleSelection:[]

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
        }

    },
    created(){},
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
