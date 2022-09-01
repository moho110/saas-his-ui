<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="${comment}" prop="operatorId">
        <el-input
          v-model="queryParams.operatorId"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="医院id" prop="hospitalId">
        <el-input
          v-model="queryParams.hospitalId"
          placeholder="请输入医院id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户ID" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收支类型：0进，1出" prop="typeId">
        <el-input
          v-model="queryParams.typeId"
          placeholder="请输入收支类型：0进，1出"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="交易金额" prop="amount">
        <el-input
          v-model="queryParams.amount"
          placeholder="请输入交易金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="余额" prop="moneyBalance">
        <el-input
          v-model="queryParams.moneyBalance"
          placeholder="请输入余额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="冻结中金额" prop="moneyLock">
        <el-input
          v-model="queryParams.moneyLock"
          placeholder="请输入冻结中金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="交易时间" prop="addtime">
        <el-input
          v-model="queryParams.addtime"
          placeholder="请输入交易时间"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="交易IP" prop="ip">
        <el-input
          v-model="queryParams.ip"
          placeholder="请输入交易IP"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="事由" prop="memo">
        <el-input
          v-model="queryParams.memo"
          placeholder="请输入事由"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="相关订单id" prop="pkgId">
        <el-input
          v-model="queryParams.pkgId"
          placeholder="请输入相关订单id"
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
          v-hasPermi="['basic:transaction_record:add']"
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
          v-hasPermi="['basic:transaction_record:edit']"
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
          v-hasPermi="['basic:transaction_record:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['basic:transaction_record:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="transaction_recordList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="${comment}" align="center" prop="id" />
      <el-table-column label="${comment}" align="center" prop="operatorId" />
      <el-table-column label="医院id" align="center" prop="hospitalId" />
      <el-table-column label="用户ID" align="center" prop="userId" />
      <el-table-column label="收支类型：0进，1出" align="center" prop="typeId" />
      <el-table-column label="交易金额" align="center" prop="amount" />
      <el-table-column label="余额" align="center" prop="moneyBalance" />
      <el-table-column label="冻结中金额" align="center" prop="moneyLock" />
      <el-table-column label="交易时间" align="center" prop="addtime" />
      <el-table-column label="交易IP" align="center" prop="ip" />
      <el-table-column label="事由" align="center" prop="memo" />
      <el-table-column label="相关订单id" align="center" prop="pkgId" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:transaction_record:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:transaction_record:remove']"
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

    <!-- 添加或修改用户收支记录对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="${comment}" prop="operatorId">
          <el-input v-model="form.operatorId" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="医院id" prop="hospitalId">
          <el-input v-model="form.hospitalId" placeholder="请输入医院id" />
        </el-form-item>
        <el-form-item label="用户ID" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="收支类型：0进，1出" prop="typeId">
          <el-input v-model="form.typeId" placeholder="请输入收支类型：0进，1出" />
        </el-form-item>
        <el-form-item label="交易金额" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入交易金额" />
        </el-form-item>
        <el-form-item label="余额" prop="moneyBalance">
          <el-input v-model="form.moneyBalance" placeholder="请输入余额" />
        </el-form-item>
        <el-form-item label="冻结中金额" prop="moneyLock">
          <el-input v-model="form.moneyLock" placeholder="请输入冻结中金额" />
        </el-form-item>
        <el-form-item label="交易时间" prop="addtime">
          <el-input v-model="form.addtime" placeholder="请输入交易时间" />
        </el-form-item>
        <el-form-item label="交易IP" prop="ip">
          <el-input v-model="form.ip" placeholder="请输入交易IP" />
        </el-form-item>
        <el-form-item label="事由" prop="memo">
          <el-input v-model="form.memo" placeholder="请输入事由" />
        </el-form-item>
        <el-form-item label="相关订单id" prop="pkgId">
          <el-input v-model="form.pkgId" placeholder="请输入相关订单id" />
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
import { listTransaction_record, getTransaction_record, delTransaction_record, addTransaction_record, updateTransaction_record } from "@/api/basic/transaction_record";

export default {
  name: "Transaction_record",
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
      // 用户收支记录表格数据
      transaction_recordList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        operatorId: null,
        hospitalId: null,
        userId: null,
        typeId: null,
        amount: null,
        moneyBalance: null,
        moneyLock: null,
        addtime: null,
        ip: null,
        memo: null,
        pkgId: null
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
    /** 查询用户收支记录列表 */
    getList() {
      this.loading = true;
      listTransaction_record(this.queryParams).then(response => {
        this.transaction_recordList = response.rows;
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
        operatorId: null,
        hospitalId: null,
        userId: null,
        typeId: null,
        amount: null,
        moneyBalance: null,
        moneyLock: null,
        addtime: null,
        ip: null,
        memo: null,
        pkgId: null
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
      this.title = "添加用户收支记录";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getTransaction_record(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改用户收支记录";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateTransaction_record(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addTransaction_record(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除用户收支记录编号为"' + ids + '"的数据项？').then(function() {
        return delTransaction_record(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('basic/transaction_record/export', {
        ...this.queryParams
      }, `transaction_record_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
