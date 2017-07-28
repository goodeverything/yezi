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
        <el-button type="danger" @click="batchRemove" :disabled="selectedRows.length===0">批量删除</el-button>
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total"
                       style="float:right;">
        </el-pagination>
      </el-col>
    </el-row>

    <el-dialog title="编辑" :visible.sync="editFormVisible" close-on-click-modal=false>
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="editForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="editForm.sex">
            <el-radio class="radio" :label="1">男</el-radio>
            <el-radio class="radio" :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄">
          <el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
        </el-form-item>
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="editForm.addr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getUserListPage, editUser, removeUser, batchRemoveUser} from '../../api/api';
  export default {
    data() {
      return {
        filters: {
          name: ''
        },
        users: [],
        total: 0,
        page: 1,
        selectedRows: [],

        editFormVisible: false,
        editLoading: false,
        editFormRules: {
          name: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ]
        },

        editForm: {
          id: 0,
          name: '',
          sex: -1,
          age: 0,
          birth: '',
          addr: ''
        }
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
        this.selectedRows = selection;
      },
      formatSex(row, column) {
        return row.sex === 1 ? '男' : row.sex === 0 ? '女' : '未知';
      },

      handleEdit(index, row) {
        this.editFormVisible = true;
        this.editForm = Object.assign({}, row);
      },
      // 编辑
      editSubmit() {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true;
              let para = Object.assign({}, this.editForm);
              para.birth = (!para.birth || para.birth === '') ? '' : new Date(para.birth);
              editUser(para).then((res) => {
                this.editLoading = false;
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
                this.$refs['editForm'].resetFields();
                this.editFormVisible = false;
                this.getUsers();
              });
            });
          }
        });
      },
      handleDel(index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          let para = {id: row.id};
          removeUser(para).then((res) => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          });
          this.users.splice(index, 1);
        });
      },
      batchRemove() {
        var ids = this.selectedRows.map(item => item.id).toString();
        console.log(ids);
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          let para = {ids: ids};
          batchRemoveUser(para).then((res) => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
          });
          this.getUsers();
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
