<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="挂号费用ID" prop="regId">
        <el-input
          v-model="queryParams.regId"
          placeholder="请输入挂号费用ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="挂号费用子名称" prop="subRegisteredfeeName">
        <el-input
          v-model="queryParams.subRegisteredfeeName"
          placeholder="请输入挂号费用子名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="子费用 " prop="subRegisteredfeeFee">
        <el-input
          v-model="queryParams.subRegisteredfeeFee"
          placeholder="请输入子费用 "
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
          v-hasPermi="['basic:registeredfee_sub:add']"
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
          v-hasPermi="['basic:registeredfee_sub:edit']"
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
          v-hasPermi="['basic:registeredfee_sub:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['basic:registeredfee_sub:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="registeredfee_subList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="${comment}" align="center" prop="regSubId" />
      <el-table-column label="挂号费用ID" align="center" prop="regId" />
      <el-table-column label="挂号费用子名称" align="center" prop="subRegisteredfeeName" />
      <el-table-column label="子费用 " align="center" prop="subRegisteredfeeFee" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:registeredfee_sub:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:registeredfee_sub:remove']"
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

    <!-- 添加或修改挂号费用子对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="挂号费用ID" prop="regId">
          <el-input v-model="form.regId" placeholder="请输入挂号费用ID" />
        </el-form-item>
        <el-form-item label="挂号费用子名称" prop="subRegisteredfeeName">
          <el-input v-model="form.subRegisteredfeeName" placeholder="请输入挂号费用子名称" />
        </el-form-item>
        <el-form-item label="子费用 " prop="subRegisteredfeeFee">
          <el-input v-model="form.subRegisteredfeeFee" placeholder="请输入子费用 " />
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
import { listRegisteredfee_sub, getRegisteredfee_sub, delRegisteredfee_sub, addRegisteredfee_sub, updateRegisteredfee_sub } from "@/api/basic/registeredfee_sub";

export default {
  name: "Registeredfee_sub",
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
      // 挂号费用子表格数据
      registeredfee_subList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        regId: null,
        subRegisteredfeeName: null,
        subRegisteredfeeFee: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        regId: [
          { required: true, message: "挂号费用ID不能为空", trigger: "blur" }
        ],
        subRegisteredfeeName: [
          { required: true, message: "挂号费用子名称不能为空", trigger: "blur" }
        ],
        subRegisteredfeeFee: [
          { required: true, message: "子费用 不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询挂号费用子列表 */
    getList() {
      this.loading = true;
      listRegisteredfee_sub(this.queryParams).then(response => {
        this.registeredfee_subList = response.rows;
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
        regSubId: null,
        regId: null,
        subRegisteredfeeName: null,
        subRegisteredfeeFee: null
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
      this.ids = selection.map(item => item.regSubId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加挂号费用子";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const regSubId = row.regSubId || this.ids
      getRegisteredfee_sub(regSubId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改挂号费用子";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.regSubId != null) {
            updateRegisteredfee_sub(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRegisteredfee_sub(this.form).then(response => {
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
      const regSubIds = row.regSubId || this.ids;
      this.$modal.confirm('是否确认删除挂号费用子编号为"' + regSubIds + '"的数据项？').then(function() {
        return delRegisteredfee_sub(regSubIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('basic/registeredfee_sub/export', {
        ...this.queryParams
      }, `registeredfee_sub_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
