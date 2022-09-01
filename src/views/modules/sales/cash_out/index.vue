<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="所属医院id" prop="hospitalId">
        <el-input
          v-model="queryParams.hospitalId"
          placeholder="请输入所属医院id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="微信appid" prop="appid">
        <el-input
          v-model="queryParams.appid"
          placeholder="请输入微信appid"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申请人id" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入申请人id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="提现人openid" prop="openid">
        <el-input
          v-model="queryParams.openid"
          placeholder="请输入提现人openid"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="提现金额" prop="amount">
        <el-input
          v-model="queryParams.amount"
          placeholder="请输入提现金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申请时间" prop="addtime">
        <el-input
          v-model="queryParams.addtime"
          placeholder="请输入申请时间"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申请ip" prop="ip">
        <el-input
          v-model="queryParams.ip"
          placeholder="请输入申请ip"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="提现接收方式：0微信，1支付宝，2银行，3现金" prop="typeId">
        <el-input
          v-model="queryParams.typeId"
          placeholder="请输入提现接收方式：0微信，1支付宝，2银行，3现金"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="如果不是微信，则填写自己的收款方式" prop="typeFix">
        <el-input
          v-model="queryParams.typeFix"
          placeholder="请输入如果不是微信，则填写自己的收款方式"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="处理人id" prop="admUid">
        <el-input
          v-model="queryParams.admUid"
          placeholder="请输入处理人id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="处理人ip" prop="admIp">
        <el-input
          v-model="queryParams.admIp"
          placeholder="请输入处理人ip"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="处理人意见" prop="admMemo">
        <el-input
          v-model="queryParams.admMemo"
          placeholder="请输入处理人意见"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="处理时间" prop="admTime">
        <el-input
          v-model="queryParams.admTime"
          placeholder="请输入处理时间"
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
          v-hasPermi="['basic:cash_out:add']"
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
          v-hasPermi="['basic:cash_out:edit']"
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
          v-hasPermi="['basic:cash_out:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['basic:cash_out:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="cash_outList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="${comment}" align="center" prop="id" />
      <el-table-column label="所属医院id" align="center" prop="hospitalId" />
      <el-table-column label="微信appid" align="center" prop="appid" />
      <el-table-column label="申请人id" align="center" prop="userId" />
      <el-table-column label="提现人openid" align="center" prop="openid" />
      <el-table-column label="提现金额" align="center" prop="amount" />
      <el-table-column label="申请时间" align="center" prop="addtime" />
      <el-table-column label="申请状态：0待审核，1已通过，2已驳回" align="center" prop="status" />
      <el-table-column label="申请ip" align="center" prop="ip" />
      <el-table-column label="提现接收方式：0微信，1支付宝，2银行，3现金" align="center" prop="typeId" />
      <el-table-column label="如果不是微信，则填写自己的收款方式" align="center" prop="typeFix" />
      <el-table-column label="处理人id" align="center" prop="admUid" />
      <el-table-column label="处理人ip" align="center" prop="admIp" />
      <el-table-column label="处理人意见" align="center" prop="admMemo" />
      <el-table-column label="处理时间" align="center" prop="admTime" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:cash_out:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:cash_out:remove']"
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

    <!-- 添加或修改用户提现申请对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="所属医院id" prop="hospitalId">
          <el-input v-model="form.hospitalId" placeholder="请输入所属医院id" />
        </el-form-item>
        <el-form-item label="微信appid" prop="appid">
          <el-input v-model="form.appid" placeholder="请输入微信appid" />
        </el-form-item>
        <el-form-item label="申请人id" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入申请人id" />
        </el-form-item>
        <el-form-item label="提现人openid" prop="openid">
          <el-input v-model="form.openid" placeholder="请输入提现人openid" />
        </el-form-item>
        <el-form-item label="提现金额" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入提现金额" />
        </el-form-item>
        <el-form-item label="申请时间" prop="addtime">
          <el-input v-model="form.addtime" placeholder="请输入申请时间" />
        </el-form-item>
        <el-form-item label="申请ip" prop="ip">
          <el-input v-model="form.ip" placeholder="请输入申请ip" />
        </el-form-item>
        <el-form-item label="提现接收方式：0微信，1支付宝，2银行，3现金" prop="typeId">
          <el-input v-model="form.typeId" placeholder="请输入提现接收方式：0微信，1支付宝，2银行，3现金" />
        </el-form-item>
        <el-form-item label="如果不是微信，则填写自己的收款方式" prop="typeFix">
          <el-input v-model="form.typeFix" placeholder="请输入如果不是微信，则填写自己的收款方式" />
        </el-form-item>
        <el-form-item label="处理人id" prop="admUid">
          <el-input v-model="form.admUid" placeholder="请输入处理人id" />
        </el-form-item>
        <el-form-item label="处理人ip" prop="admIp">
          <el-input v-model="form.admIp" placeholder="请输入处理人ip" />
        </el-form-item>
        <el-form-item label="处理人意见" prop="admMemo">
          <el-input v-model="form.admMemo" placeholder="请输入处理人意见" />
        </el-form-item>
        <el-form-item label="处理时间" prop="admTime">
          <el-input v-model="form.admTime" placeholder="请输入处理时间" />
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
import { listCash_out, getCash_out, delCash_out, addCash_out, updateCash_out } from "@/api/basic/cash_out";

export default {
  name: "Cash_out",
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
      // 用户提现申请表格数据
      cash_outList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        hospitalId: null,
        appid: null,
        userId: null,
        openid: null,
        amount: null,
        addtime: null,
        status: null,
        ip: null,
        typeId: null,
        typeFix: null,
        admUid: null,
        admIp: null,
        admMemo: null,
        admTime: null
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
    /** 查询用户提现申请列表 */
    getList() {
      this.loading = true;
      listCash_out(this.queryParams).then(response => {
        this.cash_outList = response.rows;
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
        hospitalId: null,
        appid: null,
        userId: null,
        openid: null,
        amount: null,
        addtime: null,
        status: 0,
        ip: null,
        typeId: null,
        typeFix: null,
        admUid: null,
        admIp: null,
        admMemo: null,
        admTime: null
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
      this.title = "添加用户提现申请";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCash_out(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改用户提现申请";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCash_out(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCash_out(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除用户提现申请编号为"' + ids + '"的数据项？').then(function() {
        return delCash_out(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('basic/cash_out/export', {
        ...this.queryParams
      }, `cash_out_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
