<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="${comment}" prop="hospitalId">
        <el-input
          v-model="queryParams.hospitalId"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="doctorId">
        <el-input
          v-model="queryParams.doctorId"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="patientId">
        <el-input
          v-model="queryParams.patientId"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="careHistoryId">
        <el-input
          v-model="queryParams.careHistoryId"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="挂号ID" prop="registrationId">
        <el-input
          v-model="queryParams.registrationId"
          placeholder="请输入挂号ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商户订单号" prop="orderCode">
        <el-input
          v-model="queryParams.orderCode"
          placeholder="请输入商户订单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="应付金额" prop="amount">
        <el-input
          v-model="queryParams.amount"
          placeholder="请输入应付金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="在线支付部分" prop="olPayPart">
        <el-input
          v-model="queryParams.olPayPart"
          placeholder="请输入在线支付部分"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收费类型：0就诊处，1挂号处，2问答，3..." prop="typeId">
        <el-input
          v-model="queryParams.typeId"
          placeholder="请输入收费类型：0就诊处，1挂号处，2问答，3..."
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="插入时间" prop="addtime">
        <el-input
          v-model="queryParams.addtime"
          placeholder="请输入插入时间"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="操作地点：1售药，2查检项目，3附加费用，4挂号，，，，" prop="opPlace">
        <el-input
          v-model="queryParams.opPlace"
          placeholder="请输入操作地点：1售药，2查检项目，3附加费用，4挂号，，，，"
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
          v-hasPermi="['basic:vr_his_care_pkg:add']"
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
          v-hasPermi="['basic:vr_his_care_pkg:edit']"
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
          v-hasPermi="['basic:vr_his_care_pkg:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['basic:vr_his_care_pkg:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="vr_his_care_pkgList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="${comment}" align="center" prop="id" />
      <el-table-column label="${comment}" align="center" prop="hospitalId" />
      <el-table-column label="${comment}" align="center" prop="doctorId" />
      <el-table-column label="${comment}" align="center" prop="patientId" />
      <el-table-column label="${comment}" align="center" prop="careHistoryId" />
      <el-table-column label="挂号ID" align="center" prop="registrationId" />
      <el-table-column label="商户订单号" align="center" prop="orderCode" />
      <el-table-column label="应付金额" align="center" prop="amount" />
      <el-table-column label="在线支付部分" align="center" prop="olPayPart" />
      <el-table-column label="收费类型：0就诊处，1挂号处，2问答，3..." align="center" prop="typeId" />
      <el-table-column label="状态:0未支付，1已支付，2确认收款，3申请退款，4已退款,5部分支付,6完成交易" align="center" prop="status" />
      <el-table-column label="插入时间" align="center" prop="addtime" />
      <el-table-column label="操作地点：1售药，2查检项目，3附加费用，4挂号，，，，" align="center" prop="opPlace" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:vr_his_care_pkg:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:vr_his_care_pkg:remove']"
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

    <!-- 添加或修改收费总对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="${comment}" prop="hospitalId">
          <el-input v-model="form.hospitalId" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="doctorId">
          <el-input v-model="form.doctorId" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="patientId">
          <el-input v-model="form.patientId" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="careHistoryId">
          <el-input v-model="form.careHistoryId" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="挂号ID" prop="registrationId">
          <el-input v-model="form.registrationId" placeholder="请输入挂号ID" />
        </el-form-item>
        <el-form-item label="商户订单号" prop="orderCode">
          <el-input v-model="form.orderCode" placeholder="请输入商户订单号" />
        </el-form-item>
        <el-form-item label="应付金额" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入应付金额" />
        </el-form-item>
        <el-form-item label="在线支付部分" prop="olPayPart">
          <el-input v-model="form.olPayPart" placeholder="请输入在线支付部分" />
        </el-form-item>
        <el-form-item label="收费类型：0就诊处，1挂号处，2问答，3..." prop="typeId">
          <el-input v-model="form.typeId" placeholder="请输入收费类型：0就诊处，1挂号处，2问答，3..." />
        </el-form-item>
        <el-form-item label="插入时间" prop="addtime">
          <el-input v-model="form.addtime" placeholder="请输入插入时间" />
        </el-form-item>
        <el-form-item label="操作地点：1售药，2查检项目，3附加费用，4挂号，，，，" prop="opPlace">
          <el-input v-model="form.opPlace" placeholder="请输入操作地点：1售药，2查检项目，3附加费用，4挂号，，，，" />
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
import { listVr_his_care_pkg, getVr_his_care_pkg, delVr_his_care_pkg, addVr_his_care_pkg, updateVr_his_care_pkg } from "@/api/basic/vr_his_care_pkg";

export default {
  name: "Vr_his_care_pkg",
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
      // 收费总表格数据
      vr_his_care_pkgList: [],
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
        registrationId: null,
        orderCode: null,
        amount: null,
        olPayPart: null,
        typeId: null,
        status: null,
        addtime: null,
        opPlace: null
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
    /** 查询收费总列表 */
    getList() {
      this.loading = true;
      listVr_his_care_pkg(this.queryParams).then(response => {
        this.vr_his_care_pkgList = response.rows;
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
        registrationId: null,
        orderCode: null,
        amount: null,
        olPayPart: null,
        typeId: null,
        status: 0,
        addtime: null,
        opPlace: null
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
      this.title = "添加收费总";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getVr_his_care_pkg(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改收费总";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateVr_his_care_pkg(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addVr_his_care_pkg(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除收费总编号为"' + ids + '"的数据项？').then(function() {
        return delVr_his_care_pkg(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('basic/vr_his_care_pkg/export', {
        ...this.queryParams
      }, `vr_his_care_pkg_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
