<template>
  <div class="table-wrapper">
    <el-table :data="users" highlight-current-row @current-change="handleCurrentChange"
              @selection-change="handleSelectionChange" style="width: 100%;" stripe border>
      <el-table-column type="selection" width="55">
      </el-table-column>
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
      <el-table-column label="操作" width="150">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getUserListPage} from '../../api/api';
  export default {
    data() {
      return {
        filters: {
          name: ''
        },
        users: [],
        total: 0,
        page: 1,
        currentRow: null,
        selection: []
      };
    },
    methods: {
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      handleSelectionChange(selection) {
        this.selection = selection;
      },
      formatSex(row, column) {
        return row.sex === 1 ? '男' : row.sex === 0 ? '女' : '未知';
      }
    },
    mounted() {
      let params = {
        page: this.page,
        name: this.filters.name
      };
      getUserListPage(params).then(response => {
        this.total = response.data.total;
        this.users = response.data.users;
      });
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">


</style>
