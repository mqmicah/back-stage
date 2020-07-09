<template>
  <div>
    <div @click='rarClick' class='toggleIcon'>
        <i class='el-icon-s-unfold' v-if="isCollapse"></i>
        <i class='el-icon-s-fold' v-else></i>
    </div>
    <el-menu
      default-active="2"
      background-color="#333"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      :collapse="isCollapse"
      :collapse-transition='false'
      router
    >
      <el-submenu :index="val.id + ''" v-for="val in mults" :key="val.id">
        <template slot="title">
          <i :class="iconObj[val.id]"></i>
          <span>{{val.authName}}</span>
        </template>
        <el-menu-item :index="'/'+item.path + ''" v-for="item in val.children" :key="item.id">
          <i class="el-icon-menu"></i>
          {{item.authName}}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      mults: [],
      iconObj: {
        "125": "el-icon-s-custom",
        "103": "el-icon-s-check",
        "101": "el-icon-shopping-bag-1",
        "102": "el-icon-message",
        "145": "el-icon-s-data"
      },
      isCollapse: false
    };
  },
  methods: {
    async getAsides() {
      const { data: res } = await this.$http.get("menus");
      if (res.meta.status != 200) {
        return this.$messages.error(data.meta.msg);
      } else {
        this.mults = res.data;
      }
    },
    rarClick() {
        this.isCollapse=!this.isCollapse
        this.$emit('rarClick',this.isCollapse)
    }
  },
  created() {
    this.getAsides();
  }
};
</script>

<style lang="less" scoped>
.toggleIcon {
    text-align: center;
    cursor: pointer;
    padding: 5px;
    i {
        font-size: 25px;
        color: #fff;
    }
}
.el-menu {
  border-right: none;
  .el-radio-button {
    width: 100%;
    /deep/ span {
      width: 100%;
      background-color: #333;
      border: none;
    }
  }
}
</style>