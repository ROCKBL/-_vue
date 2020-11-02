<template>
    <div class="goodsorderInfo">

        <el-card class="box-card">
            <div slot="header" class="box-head" :style="headColor">
                <div ><i class="el-icon-info"></i>当前订单状态：{{ headColor.name }}</div>
            </div>
            
            <div class="box-body">
                <!-- 基本信息 -->
                <div class="box-body-item">
                    <div class="box-body-item-head"><i class="el-icon-s-order"></i>基本信息</div>
                    <div class="box-body-item-content" >
                        <el-row>
                            <el-col :span="8"><div class="grid-content">订单编号</div></el-col>
                            <el-col :span="8"><div class="grid-content">下单用户</div></el-col>
                            <!-- <el-col :span="6"><div class="grid-content">手机号码</div></el-col> -->
                            <el-col :span="8"><div class="grid-content">创建时间</div></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8"><div class="grid-content-value">{{ goodsorderInfo.orderNo }}</div></el-col>
                            <el-col :span="8"><div class="grid-content-value">{{ goodsorderInfo.consumerName }}</div></el-col>
                            <!-- <el-col :span="6"><div class="grid-content-value">{{ goodsorderInfo.addressPhone }}</div></el-col> -->
                            <el-col :span="8"><div class="grid-content-value">{{ new Date(goodsorderInfo.createTime).Format("yyyy-MM-dd hh:mm:ss") }}</div></el-col>
                        </el-row>
                    </div>
                </div>

                <!-- 备注 -->
                <div class="box-body-item">
                    <div class="box-body-item-head"><i class="el-icon-s-order"></i>备注：<span v-if="goodsorderInfo.remake">{{ goodsorderInfo.remake }}</span><span v-else>无</span></div>
                </div>

                <!-- 快递信息 -->
                <div class="box-body-item">
                    <div class="box-body-item-head"><i class="el-icon-s-order"></i>快递信息</div>
                    <div class="box-body-item-content" >
                        <el-row>
                            <el-col :span="4"><div class="grid-content">收货人</div></el-col>
                            <el-col :span="8"><div class="grid-content">收货地址</div></el-col>
                            <el-col :span="6"><div class="grid-content">手机号码</div></el-col>
                            <el-col :span="6"><div class="grid-content">快递单号</div></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="4"><div class="grid-content-value">{{ goodsorderInfo.addressName }}</div></el-col>
                            <el-col :span="8"><div class="grid-content-value">{{ goodsorderInfo.addressDetail }}</div></el-col>
                            <el-col :span="6"><div class="grid-content-value">{{ goodsorderInfo.addressPhone }}</div></el-col>
                            <el-col :span="6"><div class="grid-content-value">{{ goodsorderInfo.expressNumber?goodsorderInfo.expressNumber:"暂无" }}</div></el-col>
                        </el-row>
                    </div>
                </div>

                <!-- 商品信息 -->
                <div class="box-body-item">
                    <div class="box-body-item-head"><i class="el-icon-s-order"></i>商品信息</div>
                    <div class="box-body-item-content" >
                        <el-row>
                            <el-col :span="4"><div class="grid-content">商品图片</div></el-col>
                            <el-col :span="4"><div class="grid-content">商品名称</div></el-col>
                            <el-col :span="6"><div class="grid-content">商品规格</div></el-col>
                            <el-col :span="2"><div class="grid-content">商品单价</div></el-col>
                            <el-col :span="2"><div class="grid-content">商品折后单价</div></el-col>
                            <el-col :span="2"><div class="grid-content">商品数量</div></el-col>
                            <el-col :span="4"><div class="grid-content">小计</div></el-col>
                        </el-row>
                        <el-row v-for="item in goodsorderInfo.lines" style="display: flex;">
                            <el-col :span="4"><div class="grid-content-value"><el-image style="width: 60px; height: 60px" :src="item.goodsImages" fit="contain"></el-image></div></el-col>
                            <el-col :span="4"><div class="grid-content-value grid-content-value-unique"  >{{ item.goodsName }}</div></el-col>
                            <el-col :span="6"><div class="grid-content-value grid-content-value-unique" >{{ item.goodsSkuName }}</div></el-col>
                            <el-col :span="2"><div class="grid-content-value grid-content-value-unique" >{{ item.goodsPrice }}元</div></el-col>
                            <el-col :span="2"><div class="grid-content-value grid-content-value-unique" >{{ (item.goodsPrice*goodsorderInfo.discount).toFixed(2) }}元</div></el-col>
                            <el-col :span="2"><div class="grid-content-value grid-content-value-unique" >{{ item.num }}件</div></el-col>
                            <el-col :span="4"><div class="grid-content-value grid-content-value-unique" >{{ (item.goodsPrice*item.num*goodsorderInfo.discount).toFixed(2) }}元</div></el-col>
                        </el-row>
                    </div>
                </div>

                <!-- 费用信息 -->
                <div class="box-body-item">
                    <div class="box-body-item-head"><i class="el-icon-s-order"></i>费用信息</div>
                    <div class="box-body-item-content" >
                        <el-row>
                            <el-col :span="4"><div class="grid-content">商品金额</div></el-col>
                            <el-col :span="4"><div class="grid-content">运费</div></el-col>
                            <el-col :span="4"><div class="grid-content">优惠券优惠</div></el-col>
                            <el-col :span="4"><div class="grid-content">积分抵扣</div></el-col>
                            <el-col :span="4"><div class="grid-content">积分使用</div></el-col>
                            <el-col :span="4"><div class="grid-content">总金额</div></el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="4"><div class="grid-content-value">{{ (goodsorderInfo.money*goodsorderInfo.discount).toFixed(2) }}元</div></el-col>
                            <el-col :span="4"><div class="grid-content-value">{{ goodsorderInfo.freight }}元</div></el-col>
                            <el-col :span="4"><div class="grid-content-value">{{ goodsorderInfo.couponPrice?goodsorderInfo.couponPrice:0 }}元</div></el-col>
                            <el-col :span="4"><div class="grid-content-value">{{ goodsorderInfo.integralMoney?goodsorderInfo.integralMoney:0 }}元</div></el-col>
                            <el-col :span="4"><div class="grid-content-value">{{ goodsorderInfo.integral }}分</div></el-col>
                            <el-col :span="4"><div class="grid-content-value">{{ (goodsorderInfo.money*goodsorderInfo.discount+goodsorderInfo.freight-goodsorderInfo.couponPrice-goodsorderInfo.integralMoney).toFixed(2) }}元</div></el-col>
                        </el-row>
                    </div>
                </div>
            </div>

        </el-card>

    </div>
</template>

<script>

    import { godetail } from '@/api/goods'

export default {
    data() {
        return {
            tableStyle:{
                textAlign:"center"
            },
            goodsorderInfo:{

            },
            
            order:{}
        }
    },
    computed:{
        headColor(){
            var styleObj={
                color:"black"
            }
            switch(this.goodsorderInfo.orderState){
                case 0:
                    styleObj.color="#409EFF"
                    styleObj.name="未付款"
                    break;
                case 1:
                    styleObj.color="#67C23A"
                    styleObj.name="待发货"
                    break;
                case 2:
                    styleObj.color="#E6A23C"
                    styleObj.name="待收货"
                    break;
                case 3:
                    styleObj.color="#909399"
                    styleObj.name="已完成"
                    break;
            }
            return styleObj
        },
        
    },
    methods: {
        getData(){
            var that=this;
            godetail({
                orderNo:this.order.orderNo
            }).then(function(res){
                console.log(res)
                that.goodsorderInfo=res.result

            })
        }
    },
    created(){
        // 根据传递的订单信息去服务器获取订单详情
        console.log(this.$route.query)
        // console.log(this.$router.currentRoute)
        this.order=JSON.parse(this.$route.query.order)
        this.getData()
    },
    mounted(){
        // 获取会员分类数据
    }
}
</script>

<style >
    .goodsorderInfo{
        padding: 20px;
    }
    
    .box-head{
        color: red;
        display: flex;
        align-items: center;
    }
    .box-card>.el-card__header{
        background: rgb(242, 246, 252);
    }
    .box-head i{
        margin-right: 10px;
    }
    
    .box-body{}
    .box-body-item{}
    .box-body-item-head{
        margin:10px 0px;
    }
    .box-body-item-head>i{
        margin-right: 10px;
    }
    .box-body-item-content{
        border-top: 1px solid rgba(0,0,0,0.1);
        border-left: 1px solid rgba(0,0,0,0.1);
        text-align: center;
    }

    .goodsorderInfo .grid-content{
        color: rgb(48, 49, 51);
        background: rgb(242, 246, 252);
        padding: 10px;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        border-right: 1px solid rgba(0,0,0,0.1);
    }
    .goodsorderInfo .grid-content-value{
        font-size: 14px;
        padding: 10px;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        border-right: 1px solid rgba(0,0,0,0.1);
        box-sizing: border-box;
    }

    .goodsorderInfo .grid-content-value-unique{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>