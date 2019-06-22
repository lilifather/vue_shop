<template>
  <div>
    <el-card class="box-card">
      <!-- 用户表格搜索框 -->
      <el-row :gutter="20" style=" margin-bottom: 20px;">
        <el-col :span="10">
          <el-input
            placeholder="请输入想搜索的用户名"
            v-model="searchKey"
            @keyup.enter.native="queryInfo.query=searchKey"
          >
            <el-button slot="append" icon="el-icon-search" @click="queryInfo.query=searchKey"></el-button>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户表格添加用户按钮 -->

      <!-- 用户表格主体 -->
      <el-table :data="userList" border style="width: 100%">
        <el-table-column prop="id" label="用户id" width="180"></el-table-column>
        <el-table-column prop="username" label="用户名" width="180"></el-table-column>
        <el-table-column prop="role_name" label="角色" width="180"></el-table-column>
        <el-table-column prop="mobile" label="电话号码"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="data">
            <!-- element UI 内置事件 -->
            <el-switch
              @change="stateChange($event,data.row)"
              v-model="data.row.mg_state"
              active-color="rbg(64, 158, 255)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <!-- 上方提示信息 -->
          <el-tooltip class="item" effect="dark" content="修改用户" placement="top" :enterable="false">
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
          </el-tooltip>
          <!-- 上方提示信息 -->
          <el-tooltip class="item" effect="dark" content="删除用户" placement="top" :enterable="false">
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
          </el-tooltip>
          <!-- 上方提示信息 -->
          <el-tooltip class="item" effect="dark" content="权限分配" placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-setting" circle></el-button>
          </el-tooltip>
        </el-table-column>
      </el-table>
      <!-- 分页内容 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[2, 5, 10, 20]"
          :page-size="2"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 弹出添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogVisible">
      <el-form v-model="addUserForm" :rules="addUserRules">
    <el-form-item prop="userName" label="用户名" label-width="80px">
      <el-input  v-model="addUserForm.userName" ></el-input>
    </el-form-item>
    <el-form-item prop="password" label="密码" label-width="80px" >
      <el-input type="password"  v-model="addUserForm.password" ></el-input>
    </el-form-item>
    <el-form-item prop="email" label="邮箱" label-width="80px">
      <el-input  v-model="addUserForm.email" ></el-input>
    </el-form-item>
    <el-form-item prop="mobile" label="电话号码" label-width="80px">
      <el-input  v-model="addUserForm.mobile" ></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
  </div>
    </el-dialog>
  </div>
</template>

<script>
import User from './User.js'
export default {
  // 通过mixins技术将js代码分离
  mixins: [User]
}
</script>
<style>
</style>
