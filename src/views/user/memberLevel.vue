<template>
    <div class="goodList">
        <div class="goodsBtns">
            <el-button type="primary" @click="memberLevelSetting" size="small">会员设置</el-button>

            <el-input size="small" placeholder="会员等级" v-model="searchInput" class="input-with-select">
                <el-button size="small" slot="append" icon="el-icon-search" @click="searchMemberLevel"></el-button>
            </el-input>
        </div>

        <div class="goodsTable">
            <el-table border ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"  :cell-style="tableStyle" :header-cell-style="tableStyle">
                <el-table-column prop="level" label="等级" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="name" label="等级名称" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="discount" label="折扣" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="condition" label="升级条件" show-overflow-tooltip width="100"></el-table-column>
                <el-table-column prop="status" label="状态" show-overflow-tooltip width="100"></el-table-column>

                
                <el-table-column label="操作" show-overflow-tooltip class-name="xxx">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="editeMemberLevel(scope.$index, scope.row)">修改</el-button>
                        <el-button size="mini" type="danger" @click="deleteMemberLevel(scope.$index, scope.row)">删除</el-button>
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
                {id:1,level:"1",name:"代理",discount:"9.3",condition:"50000.00",status:"0"}
            ],

        }
    },
    computed:{},
    methods: {        
        editeMemberLevel(index,row){
            // 编辑会员等级，跳转会员设置页
            this.$router.push({
                name:"会员设置",
                query: {
                    index:index,
                    row:row
                }
            })
           
        },
        deleteMemberLevel(index,row){
            // 删除会员等级
            console.log(index)
            console.log(row)
        },

        memberLevelSetting(){
            // 添加会员等级
            this.$router.push("/users/memberLevelSetting")
        },
        searchMemberLevel(){
            // 根据关键字搜索会员等级
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