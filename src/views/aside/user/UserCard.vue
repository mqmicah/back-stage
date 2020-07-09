<template>
  <el-card>
    <el-row :gutter="20">
      <el-col :span="10">
        <el-input placeholder="请输入搜索内容" v-model="getData.query" clearable @clear='getListData'>
          <el-button slot="append" icon="el-icon-search" @click='getListData'></el-button>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click='addUser'>添加用户</el-button>
      </el-col>
      <add-user title="添加用户"></add-user>
    </el-row>
    <user-table v-bind="$attrs"></user-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="getData.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="getData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="fatotal">
    </el-pagination>
  </el-card>
</template>

<script>
import UserTable from './UserTable'
import AddUser from './AddUser'
export default {
  props:{
    fatotal:{
      type:Number,
      default:0
    },
    getData:{
      type:Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      dialogVisible:true
    };
  },
  methods:{
     handleSizeChange(val) {
       this.$emit('handleSize',val)
      },
      handleCurrentChange(val) {
        this.$emit('handleCurrent',val)
      },
      getListData() {
        this.$emit('getListData')
      },
      addUser() {
        this.$bus.$emit('change',this.dialogVisible)
      }
  },
  components:{
      UserTable,
      AddUser
  }
};
</script>

<style lang="less" scoped>
</style>