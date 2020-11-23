<template>
    <div class="levelList">

        <div class="shippingTable">
            <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" :cell-style="tableStyle" :header-cell-style="tableStyle">

                <el-table-column prop="name" label="会员等级名称" show-overflow-tooltip width="200"></el-table-column>
                <el-table-column prop="discount" label="会员折扣" show-overflow-tooltip width="100">
                	<template slot-scope="scope">
                        <div>{{ scope.row.discount }}</div>
                	</template>
                </el-table-column>
                <el-table-column label="价格"  width="100">
                    <template slot-scope="scope">
                        <div v-if="scope.row.money==null">升级获得</div>
                        <div v-else>{{ scope.row.money }}元</div>
                    </template>
                </el-table-column>
                
                <el-table-column label="操作" show-overflow-tooltip >
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="editDiscount(scope.$index, scope.row)">修改折扣</el-button>
                        <el-button size="mini" type="success" v-if="scope.row.id==1||scope.row.id==3" @click="editMoney(scope.$index, scope.row)">修改价格</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog title="修改折扣" :visible.sync="discountFormVisible">
            <el-form :model="discountForm">
                <el-form-item label="折扣" :label-width="formLabelWidth">
                    <el-input v-model="discountForm.discount" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="discountConfirm">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="修改价格" :visible.sync="moneyFormVisible">
            <el-form :model="moneyForm">
                <el-form-item label="价格" :label-width="formLabelWidth">
                    <el-input v-model="moneyForm.money" autocomplete="off">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="moneyConfirm">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>

    import { llist,lupdate,lupdateMoney } from '@/api/level'

export default {
    data() {
        return {
            tableStyle:{
                textAlign:"center"
            },

            tableData:[
                // {id:1,name:"测试医院",introduction:"医院简介",phone:"13312345678",address:"地址1",longitude:"120.811213",latitude:"27.932747",characteristic:"特色",logo:"https://img.yzcdn.cn/vant/cat.jpeg",images:"https://img.yzcdn.cn/vant/cat.jpeg"},
            ],

            discountForm:{},
            discountFormVisible:false,
            moneyForm:{},
            moneyFormVisible:false,

            formLabelWidth:'100px'
        }
    },
    computed:{},
    methods: {

        // editeshipping(index,row){
        //     // 跳转编辑单个商品
        //     console.log(index)
        //     console.log(row)

        //     this.$router.push({
        //         name:"修改运费规则",
        //         query: {
        //             index:index,
        //             row:JSON.stringify(row)
        //         }
        //     })
        // },
        // deleteshipping(index,row){
        //     // 删除单个商品
        //     console.log(index)
        //     console.log(row)

        //     var data={
        //         id:row.id
        //     }
        //     var that=this
        //     fdelete(data).then(function(res){
        //         that.getData()
        //         that.currentpage1=1
        //     })
        // },   

        editDiscount(index,row){
            var obj=JSON.parse(JSON.stringify(row))
            this.discountForm=obj
            this.discountFormVisible=true
        },
        discountConfirm(){
            var that=this;
            lupdate({
                id:this.discountForm.id,
                discount:this.discountForm.discount
            }).then(function(res){
                console.log(res)
                that.getData()
            })
            this.discountFormVisible=false
        },
        editMoney(index,row){
            var obj=JSON.parse(JSON.stringify(row))
            this.moneyForm=obj
            this.moneyFormVisible=true
        },
        moneyConfirm(){
            var that=this;
            lupdateMoney({
                id:this.moneyForm.id,
                money:this.moneyForm.money
            }).then(function(res){
                console.log(res)
                that.getData()
            })
            this.moneyFormVisible=false
        },

        getData(){
            var that=this;
            llist().then(function(res){
                console.log(res)
                that.tableData=res.result

            })
        },

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
    .levelList{
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