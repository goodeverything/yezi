<template>
  <div class="table-wrapper">
    <el-table :data="users" highlight-current-row
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
    <el-row>
      <!--工具条-->
      <el-col :span="24" class="toolbar">
        <el-button type="danger" @click="batchRemove" :disabled="this.selection.length===0">批量删除</el-button>
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total"
                       style="float:right;">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getUserListPage, batchRemoveUser} from '../../api/api';
  export default {
    data() {
      return {
        filters: {
          name: ''
        },
        users: [],
        total: 0,
        page: 1,
        selection: []
      };
    },
    methods: {
      getUsers() {
        let params = {
          page: this.page,
          name: this.filters.name
        };
        getUserListPage(params).then(response => {
          this.total = response.data.total;
          this.users = response.data.users;
        });
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getUsers();
      },
      handleSelectionChange(selection) {
        this.selection = selection;
      },
      formatSex(row, column) {
        return row.sex === 1 ? '男' : row.sex === 0 ? '女' : '未知';
      },
      batchRemove() {
        var ids = this.selection.map(item => item.id).toString();
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          let para = {ids: ids};
          batchRemoveUser(para).then((res) => {
            this.listLoading = false;
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getUsers();
          });
        });
      }
    },

    mounted() {
      this.getUsers();
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">


</style>
