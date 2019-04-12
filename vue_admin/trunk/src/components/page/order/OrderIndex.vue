<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-goodsfill"></i> 订单列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-date-picker
                        v-model="selectTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy-MM-dd">
                </el-date-picker>
                <el-input v-model="select_id" placeholder="订单ID" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search()">搜索</el-button>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" name="all">
                    <el-table :data="data" border class="table" ref="multipleTable">
1111
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="待付款" name="unpaid">待付款</el-tab-pane>
                <el-tab-pane label="待发货" name="paid">待发货</el-tab-pane>
                <el-tab-pane label="已发货" name="shipped">已发货</el-tab-pane>
                <el-tab-pane label="已收货" name="received_goods">已收货</el-tab-pane>
                <el-tab-pane label="已完成" name="completed">已完成</el-tab-pane>
                <el-tab-pane label="已关闭" name="closed">已关闭</el-tab-pane>
                <el-tab-pane label="退款中" name="refunding_money">退款中</el-tab-pane>
                <el-tab-pane label="退货中" name="returning_goods">退货中</el-tab-pane>
                <el-tab-pane label="待裁定中" name="pending_ruling">待裁定中</el-tab-pane>
            </el-tabs>
            <div class="pagination">
                <el-pagination background  layout="total,prev, pager, next" >
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import OrderBllayer from '../../../store/bllayer/OrderBllayer'
    import vUploadFile from '../../common/UploadFile.vue'

    export default {
        data: function(){
            return {
                activeName: 'all',
                selectTime:'',
                select_id:'',
                data:[]
            }
        },
        methods: {
            handleClick(tab, event) {

            },
            search(){
                console.log(this.selectTime)
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .table{
        width: 100%;
        font-size: 14px;
    }
    .red{
        color: #ff0000;
    }
    .mr10{
        margin-right: 10px;
    }
</style>
