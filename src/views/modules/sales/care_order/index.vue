<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="医院id" prop="hospitalId">
        <el-input
          v-model="queryParams.hospitalId"
          placeholder="请输入医院id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="医生id" prop="doctorId">
        <el-input
          v-model="queryParams.doctorId"
          placeholder="请输入医生id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="患者id" prop="patientId">
        <el-input
          v-model="queryParams.patientId"
          placeholder="请输入患者id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="关联病历id" prop="careHistoryId">
        <el-input
          v-model="queryParams.careHistoryId"
          placeholder="请输入关联病历id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收费总表care_pkg.id" prop="pkgId">
        <el-input
          v-model="queryParams.pkgId"
          placeholder="请输入收费总表care_pkg.id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="处方名" prop="label">
        <el-input
          v-model="queryParams.label"
          placeholder="请输入处方名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="每set_num_a天,set_num_b剂，服用set_num_c天，共set_num_d剂" prop="numA">
        <el-input
          v-model="queryParams.numA"
          placeholder="请输入每set_num_a天,set_num_b剂，服用set_num_c天，共set_num_d剂"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="每set_num_a天,set_num_b剂，服用set_num_c天，共set_num_d剂" prop="numB">
        <el-input
          v-model="queryParams.numB"
          placeholder="请输入每set_num_a天,set_num_b剂，服用set_num_c天，共set_num_d剂"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="每set_num_a天,set_num_b剂，服用set_num_c天，共set_num_d剂" prop="numC">
        <el-input
          v-model="queryParams.numC"
          placeholder="请输入每set_num_a天,set_num_b剂，服用set_num_c天，共set_num_d剂"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="每num_a天,num_b剂，服用num_c天，共num_d剂" prop="numD">
        <el-input
          v-model="queryParams.numD"
          placeholder="请输入每num_a天,num_b剂，服用num_c天，共num_d剂"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单处方金额" prop="amount">
        <el-input
          v-model="queryParams.amount"
          placeholder="请输入单处方金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="处方全额" prop="allAmount">
        <el-input
          v-model="queryParams.allAmount"
          placeholder="请输入处方全额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="插入时间，php时间戳" prop="addtime">
        <el-input
          v-model="queryParams.addtime"
          placeholder="请输入插入时间，php时间戳"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="诊断编号" prop="caseCode">
        <el-input
          v-model="queryParams.caseCode"
          placeholder="请输入诊断编号"
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
          v-hasPermi="['basic:care_order:add']"
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
          v-hasPermi="['basic:care_order:edit']"
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
          v-hasPermi="['basic:care_order:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['basic:care_order:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="care_orderList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="${comment}" align="center" prop="id" />
      <el-table-column label="医院id" align="center" prop="hospitalId" />
      <el-table-column label="医生id" align="center" prop="doctorId" />
      <el-table-column label="患者id" align="center" prop="patientId" />
      <el-table-column label="关联病历id" align="center" prop="careHistoryId" />
      <el-table-column label="收费总表care_pkg.id" align="center" prop="pkgId" />
      <el-table-column label="状态，0未支付，1已支付，2确认收款，3申请退款，4已退款" align="center" prop="status" />
      <el-table-column label="处方名" align="center" prop="label" />
      <el-table-column label="每set_num_a天,set_num_b剂，服用set_num_c天，共set_num_d剂" align="center" prop="numA" />
      <el-table-column label="每set_num_a天,set_num_b剂，服用set_num_c天，共set_num_d剂" align="center" prop="numB" />
      <el-table-column label="每set_num_a天,set_num_b剂，服用set_num_c天，共set_num_d剂" align="center" prop="numC" />
      <el-table-column label="每num_a天,num_b剂，服用num_c天，共num_d剂" align="center" prop="numD" />
      <el-table-column label="单处方金额" align="center" prop="amount" />
      <el-table-column label="处方全额" align="center" prop="allAmount" />
      <el-table-column label="插入时间，php时间戳" align="center" prop="addtime" />
      <el-table-column label="诊断编号" align="center" prop="caseCode" />
      <el-table-column label="服药要求" align="center" prop="useTips" />
      <el-table-column label="备注" align="center" prop="memo" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:care_order:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:care_order:remove']"
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

    <!-- 添加或修改处方列对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="医院id" prop="hospitalId">
          <el-input v-model="form.hospitalId" placeholder="请输入医院id" />
        </el-form-item>
        <el-form-item label="医生id" prop="doctorId">
          <el-input v-model="form.doctorId" placeholder="请输入医生id" />
        </el-form-item>
        <el-form-item label="患者id" prop="patientId">
          <el-input v-model="form.patientId" placeholder="请输入患者id" />
        </el-form-item>
        <el-form-item label="关联病历id" prop="careHistoryId">
          <el-input v-model="form.careHistoryId" placeholder="请输入关联病历id" />
        </el-form-item>
        <el-form-item label="收费总表care_pkg.id" prop="pkgId">
          <el-input v-model="form.pkgId" placeholder="请输入收费总表care_pkg.id" />
        </el-form-item>
        <el-form-item label="处方名" prop="label">
          <el-input v-model="form.label" placeholder="请输入处方名" />
        </el-form-item>
        <el-form-item label="每set_num_a天,set_num_b剂，服用set_num_c天，共set_num_d剂" prop="numA">
          <el-input v-model="form.numA" placeholder="请输入每set_num_a天,set_num_b剂，服用set_num_c天，共set_num_d剂" />
        </el-form-item>
        <el-form-item label="每set_num_a天,set_num_b剂，服用set_num_c天，共set_num_d剂" prop="numB">
          <el-input v-model="form.numB" placeholder="请输入每set_num_a天,set_num_b剂，服用set_num_c天，共set_num_d剂" />
        </el-form-item>
        <el-form-item label="每set_num_a天,set_num_b剂，服用set_num_c天，共set_num_d剂" prop="numC">
          <el-input v-model="form.numC" placeholder="请输入每set_num_a天,set_num_b剂，服用set_num_c天，共set_num_d剂" />
        </el-form-item>
        <el-form-item label="每num_a天,num_b剂，服用num_c天，共num_d剂" prop="numD">
          <el-input v-model="form.numD" placeholder="请输入每num_a天,num_b剂，服用num_c天，共num_d剂" />
        </el-form-item>
        <el-form-item label="单处方金额" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入单处方金额" />
        </el-form-item>
        <el-form-item label="处方全额" prop="allAmount">
          <el-input v-model="form.allAmount" placeholder="请输入处方全额" />
        </el-form-item>
        <el-form-item label="插入时间，php时间戳" prop="addtime">
          <el-input v-model="form.addtime" placeholder="请输入插入时间，php时间戳" />
        </el-form-item>
        <el-form-item label="诊断编号" prop="caseCode">
          <el-input v-model="form.caseCode" placeholder="请输入诊断编号" />
        </el-form-item>
        <el-form-item label="服药要求" prop="useTips">
          <el-input v-model="form.useTips" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="备注" prop="memo">
          <el-input v-model="form.memo" type="textarea" placeholder="请输入内容" />
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
import { listCare_order, getCare_order, delCare_order, addCare_order, updateCare_order } from "@/api/basic/care_order";

export default {
  name: "Care_order",
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
      // 处方列表格数据
      care_orderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        hospitalId: null,
        doctorId: null,
        patientId: null,
        careHistoryId: null,
        pkgId: null,
        status: null,
        label: null,
        numA: null,
        numB: null,
        numC: null,
        numD: null,
        amount: null,
        allAmount: null,
        addtime: null,
        caseCode: null,
        useTips: null,
        memo: null
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
    /** 查询处方列列表 */
    getList() {
      this.loading = true;
      listCare_order(this.queryParams).then(response => {
        this.care_orderList = response.rows;
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
        doctorId: null,
        patientId: null,
        careHistoryId: null,
        pkgId: null,
        status: 0,
        label: null,
        numA: null,
        numB: null,
        numC: null,
        numD: null,
        amount: null,
        allAmount: null,
        addtime: null,
        caseCode: null,
        useTips: null,
        memo: null
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
      this.title = "添加处方列";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCare_order(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改处方列";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCare_order(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCare_order(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除处方列编号为"' + ids + '"的数据项？').then(function() {
        return delCare_order(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('basic/care_order/export', {
        ...this.queryParams
      }, `care_order_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
