<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户个人资料真实姓名" prop="trueName">
        <el-input
          v-model="queryParams.trueName"
          placeholder="请输入用户个人资料真实姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input
          v-model="queryParams.age"
          placeholder="请输入年龄"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="头像" prop="picture">
        <el-input
          v-model="queryParams.picture"
          placeholder="请输入头像"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="学历 1：专科  2：本科  3：研究生  4：博士  5：博士后" prop="background">
        <el-input
          v-model="queryParams.background"
          placeholder="请输入学历 1：专科  2：本科  3：研究生  4：博士  5：博士后"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model="queryParams.phone"
          placeholder="请输入手机号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="邮箱" prop="mailbox">
        <el-input
          v-model="queryParams.mailbox"
          placeholder="请输入邮箱"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="擅长" prop="strong">
        <el-input
          v-model="queryParams.strong"
          placeholder="请输入擅长"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="荣誉" prop="honor">
        <el-input
          v-model="queryParams.honor"
          placeholder="请输入荣誉"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户表userid" prop="uid">
        <el-input
          v-model="queryParams.uid"
          placeholder="请输入用户表userid"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="咨询价格" prop="askPrice">
        <el-input
          v-model="queryParams.askPrice"
          placeholder="请输入咨询价格"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['basic:doctor:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['basic:doctor:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['basic:doctor:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['basic:doctor:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="doctorList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="用户id" align="center" prop="id" />
      <el-table-column label="用户个人资料真实姓名" align="center" prop="trueName" />
      <el-table-column label="年龄" align="center" prop="age" />
      <el-table-column label="头像" align="center" prop="picture" />
      <el-table-column label="性别 0,空1:男  2:女" align="center" prop="sex" />
      <el-table-column label="学历 1：专科  2：本科  3：研究生  4：博士  5：博士后" align="center" prop="background" />
      <el-table-column label="手机号" align="center" prop="phone" />
      <el-table-column label="邮箱" align="center" prop="mailbox" />
      <el-table-column label="擅长" align="center" prop="strong" />
      <el-table-column label="荣誉" align="center" prop="honor" />
      <el-table-column label="简介" align="center" prop="introduction" />
      <el-table-column label="用户表userid" align="center" prop="uid" />
      <el-table-column label="咨询价格" align="center" prop="askPrice" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:doctor:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:doctor:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改医生基本信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户个人资料真实姓名" prop="trueName">
          <el-input v-model="form.trueName" placeholder="请输入用户个人资料真实姓名" />
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" placeholder="请输入年龄" />
        </el-form-item>
        <el-form-item label="头像" prop="picture">
          <el-input v-model="form.picture" placeholder="请输入头像" />
        </el-form-item>
        <el-form-item label="学历 1：专科  2：本科  3：研究生  4：博士  5：博士后" prop="background">
          <el-input v-model="form.background" placeholder="请输入学历 1：专科  2：本科  3：研究生  4：博士  5：博士后" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="邮箱" prop="mailbox">
          <el-input v-model="form.mailbox" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="擅长" prop="strong">
          <el-input v-model="form.strong" placeholder="请输入擅长" />
        </el-form-item>
        <el-form-item label="荣誉" prop="honor">
          <el-input v-model="form.honor" placeholder="请输入荣誉" />
        </el-form-item>
        <el-form-item label="简介" prop="introduction">
          <el-input v-model="form.introduction" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="用户表userid" prop="uid">
          <el-input v-model="form.uid" placeholder="请输入用户表userid" />
        </el-form-item>
        <el-form-item label="咨询价格" prop="askPrice">
          <el-input v-model="form.askPrice" placeholder="请输入咨询价格" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listDoctor, getDoctor, delDoctor, addDoctor, updateDoctor } from "@/api/basic/doctor";

export default {
  name: "Doctor",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 医生基本信息表格数据
      doctorList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        trueName: null,
        age: null,
        picture: null,
        sex: null,
        background: null,
        phone: null,
        mailbox: null,
        strong: null,
        honor: null,
        introduction: null,
        uid: null,
        askPrice: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        trueName: [
          { required: true, message: "用户个人资料真实姓名不能为空", trigger: "blur" }
        ],
        sex: [
          { required: true, message: "性别 0,空1:男  2:女不能为空", trigger: "change" }
        ],
        background: [
          { required: true, message: "学历 1：专科  2：本科  3：研究生  4：博士  5：博士后不能为空", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "手机号不能为空", trigger: "blur" }
        ],
        mailbox: [
          { required: true, message: "邮箱不能为空", trigger: "blur" }
        ],
        strong: [
          { required: true, message: "擅长不能为空", trigger: "blur" }
        ],
        honor: [
          { required: true, message: "荣誉不能为空", trigger: "blur" }
        ],
        introduction: [
          { required: true, message: "简介不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "注册时间不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "修改时间不能为空", trigger: "blur" }
        ],
        uid: [
          { required: true, message: "用户表userid不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询医生基本信息列表 */
    getList() {
      this.loading = true;
      listDoctor(this.queryParams).then(response => {
        this.doctorList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        trueName: null,
        age: null,
        picture: null,
        sex: null,
        background: null,
        phone: null,
        mailbox: null,
        strong: null,
        honor: null,
        introduction: null,
        createTime: null,
        updateTime: null,
        uid: null,
        askPrice: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加医生基本信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getDoctor(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改医生基本信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateDoctor(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDoctor(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除医生基本信息编号为"' + ids + '"的数据项？').then(function() {
        return delDoctor(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('basic/doctor/export', {
        ...this.queryParams
      }, `doctor_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
