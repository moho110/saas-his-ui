<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="关联表名" prop="tabName">
        <el-input
          v-model="queryParams.tabName"
          placeholder="请输入关联表名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="操作相关id" prop="relId">
        <el-input
          v-model="queryParams.relId"
          placeholder="请输入操作相关id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="操作说明" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入操作说明"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="操作时间" prop="addtime">
        <el-date-picker clearable
          v-model="queryParams.addtime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择操作时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="操作者session" prop="session">
        <el-input
          v-model="queryParams.session"
          placeholder="请输入操作者session"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="操作者cookie" prop="cookie">
        <el-input
          v-model="queryParams.cookie"
          placeholder="请输入操作者cookie"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="操作IP" prop="ip">
        <el-input
          v-model="queryParams.ip"
          placeholder="请输入操作IP"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="开发信息" prop="devInfo">
        <el-input
          v-model="queryParams.devInfo"
          placeholder="请输入开发信息"
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
          v-hasPermi="['basic:work_log:add']"
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
          v-hasPermi="['basic:work_log:edit']"
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
          v-hasPermi="['basic:work_log:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['basic:work_log:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="work_logList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="${comment}" align="center" prop="id" />
      <el-table-column label="关联表名" align="center" prop="tabName" />
      <el-table-column label="操作相关id" align="center" prop="relId" />
      <el-table-column label="操作说明" align="center" prop="title" />
      <el-table-column label="操作时间" align="center" prop="addtime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.addtime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作者session" align="center" prop="session" />
      <el-table-column label="操作者cookie" align="center" prop="cookie" />
      <el-table-column label="操作IP" align="center" prop="ip" />
      <el-table-column label="开发信息" align="center" prop="devInfo" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:work_log:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:work_log:remove']"
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

    <!-- 添加或修改重要操作记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="关联表名" prop="tabName">
          <el-input v-model="form.tabName" placeholder="请输入关联表名" />
        </el-form-item>
        <el-form-item label="操作相关id" prop="relId">
          <el-input v-model="form.relId" placeholder="请输入操作相关id" />
        </el-form-item>
        <el-form-item label="操作说明" prop="title">
          <el-input v-model="form.title" placeholder="请输入操作说明" />
        </el-form-item>
        <el-form-item label="操作时间" prop="addtime">
          <el-date-picker clearable
            v-model="form.addtime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择操作时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="操作者session" prop="session">
          <el-input v-model="form.session" placeholder="请输入操作者session" />
        </el-form-item>
        <el-form-item label="操作者cookie" prop="cookie">
          <el-input v-model="form.cookie" placeholder="请输入操作者cookie" />
        </el-form-item>
        <el-form-item label="操作IP" prop="ip">
          <el-input v-model="form.ip" placeholder="请输入操作IP" />
        </el-form-item>
        <el-form-item label="开发信息" prop="devInfo">
          <el-input v-model="form.devInfo" placeholder="请输入开发信息" />
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
import { listWork_log, getWork_log, delWork_log, addWork_log, updateWork_log } from "@/api/basic/work_log";

export default {
  name: "Work_log",
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
      // 重要操作记录表格数据
      work_logList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        tabName: null,
        relId: null,
        title: null,
        addtime: null,
        session: null,
        cookie: null,
        ip: null,
        devInfo: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询重要操作记录列表 */
    getList() {
      this.loading = true;
      listWork_log(this.queryParams).then(response => {
        this.work_logList = response.rows;
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
        tabName: null,
        relId: null,
        title: null,
        addtime: null,
        session: null,
        cookie: null,
        ip: null,
        devInfo: null
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
      this.title = "添加重要操作记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getWork_log(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改重要操作记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateWork_log(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addWork_log(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除重要操作记录编号为"' + ids + '"的数据项？').then(function() {
        return delWork_log(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('basic/work_log/export', {
        ...this.queryParams
      }, `work_log_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
