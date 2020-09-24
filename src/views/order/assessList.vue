<template>
    <div class="goodList">
 
        <div class="goodsTable">
            <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"  :cell-style="tableStyle" :header-cell-style="tableStyle">

                <el-table-column prop="id" label="ID" width="60" show-overflow-tooltip></el-table-column>
                <el-table-column prop="name" label="昵称" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="productName" label="商品名称" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="rate" label="评分" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="info" label="详情" show-overflow-tooltip width="100"></el-table-column>
   
                <el-table-column label="操作"  class-name="xxx">
                    <template slot-scope="scope">

                        <el-button size="mini" type="danger" @click="edite(scope.$index, scope.row)">编辑</el-button>

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
            
            tableData:[
                {id:1,userLever:"手作海鲜",name:"纯手工鱼丸",pic:"http://www.wjhxhz.com/addons/zjhj_mall/core/web/uploads/image/3a/3ae597ae8c0748235aa37f623ae12c56.jpg",joinTime:"2020-08-14 01:14:34",orderNum:"0",commission:"0",cash:"0",orderPrice:"0",ztdl:"0",ztzdl:"0"}
            ],

        }
    },
    computed:{},
    methods: {
        edite(index,row){
            // 编辑用户等级
           
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
        /*white-space: pre-wrap!important;*/
    }
    .xxx button{
        margin:5px!important;
    }
    td.xxx{
        padding:5px 0px;
    }

</style>