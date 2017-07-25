<template>
  <div>
    <el-table :data="users" highlight-current-row v-loading="loading" style="width: 100%;">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120" sortable>
      </el-table-column>
      <el-table-column prop="sex" label="性别" width="100" :formatter="formatSex" sortable>
      </el-table-column>
      <el-table-column prop="age" label="年龄" width="100" sortable>
      </el-table-column>
      <el-table-column prop="birth" label="生日" width="120" sortable>
      </el-table-column>
      <el-table-column prop="addr" label="地址" min-width="180" sortable>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getUserList} from '../../api/api';
  export default {
    data() {
      return {
        filters: {
          name: ''
        },
        loading: false,
        users: []
      };
    },
    methods: {
      formatSex: function (row, column) {
        return row.sex === 1 ? '男' : row.sex === 0 ? '女' : '未知';
      },
      getUser: function () {
        let para = {
          name: this.filters.name
        };
        this.loading = true;
        getUserList(para).then((res) => {
          this.users = res.data.users;
          this.loading = false;
        });
      }
    },
    mounted() {
      this.getUser();
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
