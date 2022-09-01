<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="诊所ID" prop="companyId">
        <el-input
          v-model="queryParams.companyId"
          placeholder="请输入诊所ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="采购信息ID" prop="purchaseId">
        <el-input
          v-model="queryParams.purchaseId"
          placeholder="请输入采购信息ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="批次库存编号" prop="batchesOfInventoryNumber">
        <el-input
          v-model="queryParams.batchesOfInventoryNumber"
          placeholder="请输入批次库存编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="药品ID" prop="medicinesId">
        <el-input
          v-model="queryParams.medicinesId"
          placeholder="请输入药品ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="修改人ID" prop="modifierId">
        <el-input
          v-model="queryParams.modifierId"
          placeholder="请输入修改人ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="newQuantity">
        <el-input
          v-model="queryParams.newQuantity"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="新批发价" prop="newTradePrice">
        <el-input
          v-model="queryParams.newTradePrice"
          placeholder="请输入新批发价"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="新处方价" prop="newPrescriptionPrice">
        <el-input
          v-model="queryParams.newPrescriptionPrice"
          placeholder="请输入新处方价"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="原数量" prop="oldQuantity">
        <el-input
          v-model="queryParams.oldQuantity"
          placeholder="请输入原数量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="原批发价" prop="oldTradePrice">
        <el-input
          v-model="queryParams.oldTradePrice"
          placeholder="请输入原批发价"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="原处方价" prop="oldPrescriptionPrice">
        <el-input
          v-model="queryParams.oldPrescriptionPrice"
          placeholder="请输入原处方价"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="操作模块；采购：1，审核：2" prop="operationModule">
        <el-input
          v-model="queryParams.operationModule"
          placeholder="请输入操作模块；采购：1，审核：2"
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
          v-hasPermi="['basic:storage_log:add']"
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
          v-hasPermi="['basic:storage_log:edit']"
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
          v-hasPermi="['basic:storage_log:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['basic:storage_log:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="storage_logList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="更改价格表" align="center" prop="logId" />
      <el-table-column label="诊所ID" align="center" prop="companyId" />
      <el-table-column label="采购信息ID" align="center" prop="purchaseId" />
      <el-table-column label="批次库存编号" align="center" prop="batchesOfInventoryNumber" />
      <el-table-column label="药品ID" align="center" prop="medicinesId" />
      <el-table-column label="修改人ID" align="center" prop="modifierId" />
      <el-table-column label="${comment}" align="center" prop="newQuantity" />
      <el-table-column label="新批发价" align="center" prop="newTradePrice" />
      <el-table-column label="新处方价" align="center" prop="newPrescriptionPrice" />
      <el-table-column label="原数量" align="center" prop="oldQuantity" />
      <el-table-column label="原批发价" align="center" prop="oldTradePrice" />
      <el-table-column label="原处方价" align="center" prop="oldPrescriptionPrice" />
      <el-table-column label="操作模块；采购：1，审核：2" align="center" prop="operationModule" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:storage_log:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:storage_log:remove']"
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

    <!-- 添加或修改入库操作log日志对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="诊所ID" prop="companyId">
          <el-input v-model="form.companyId" placeholder="请输入诊所ID" />
        </el-form-item>
        <el-form-item label="采购信息ID" prop="purchaseId">
          <el-input v-model="form.purchaseId" placeholder="请输入采购信息ID" />
        </el-form-item>
        <el-form-item label="批次库存编号" prop="batchesOfInventoryNumber">
          <el-input v-model="form.batchesOfInventoryNumber" placeholder="请输入批次库存编号" />
        </el-form-item>
        <el-form-item label="药品ID" prop="medicinesId">
          <el-input v-model="form.medicinesId" placeholder="请输入药品ID" />
        </el-form-item>
        <el-form-item label="修改人ID" prop="modifierId">
          <el-input v-model="form.modifierId" placeholder="请输入修改人ID" />
        </el-form-item>
        <el-form-item label="${comment}" prop="newQuantity">
          <el-input v-model="form.newQuantity" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="新批发价" prop="newTradePrice">
          <el-input v-model="form.newTradePrice" placeholder="请输入新批发价" />
        </el-form-item>
        <el-form-item label="新处方价" prop="newPrescriptionPrice">
          <el-input v-model="form.newPrescriptionPrice" placeholder="请输入新处方价" />
        </el-form-item>
        <el-form-item label="原数量" prop="oldQuantity">
          <el-input v-model="form.oldQuantity" placeholder="请输入原数量" />
        </el-form-item>
        <el-form-item label="原批发价" prop="oldTradePrice">
          <el-input v-model="form.oldTradePrice" placeholder="请输入原批发价" />
        </el-form-item>
        <el-form-item label="原处方价" prop="oldPrescriptionPrice">
          <el-input v-model="form.oldPrescriptionPrice" placeholder="请输入原处方价" />
        </el-form-item>
        <el-form-item label="操作模块；采购：1，审核：2" prop="operationModule">
          <el-input v-model="form.operationModule" placeholder="请输入操作模块；采购：1，审核：2" />
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
import { listStorage_log, getStorage_log, delStorage_log, addStorage_log, updateStorage_log } from "@/api/basic/storage_log";

export default {
  name: "Storage_log",
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
      // 入库操作log日志表格数据
      storage_logList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        companyId: null,
        purchaseId: null,
        batchesOfInventoryNumber: null,
        medicinesId: null,
        modifierId: null,
        newQuantity: null,
        newTradePrice: null,
        newPrescriptionPrice: null,
        oldQuantity: null,
        oldTradePrice: null,
        oldPrescriptionPrice: null,
        operationModule: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        companyId: [
          { required: true, message: "诊所ID不能为空", trigger: "blur" }
        ],
        purchaseId: [
          { required: true, message: "采购信息ID不能为空", trigger: "blur" }
        ],
        batchesOfInventoryNumber: [
          { required: true, message: "批次库存编号不能为空", trigger: "blur" }
        ],
        medicinesId: [
          { required: true, message: "药品ID不能为空", trigger: "blur" }
        ],
        modifierId: [
          { required: true, message: "修改人ID不能为空", trigger: "blur" }
        ],
        newQuantity: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
        newTradePrice: [
          { required: true, message: "新批发价不能为空", trigger: "blur" }
        ],
        newPrescriptionPrice: [
          { required: true, message: "新处方价不能为空", trigger: "blur" }
        ],
        oldQuantity: [
          { required: true, message: "原数量不能为空", trigger: "blur" }
        ],
        oldTradePrice: [
          { required: true, message: "原批发价不能为空", trigger: "blur" }
        ],
        oldPrescriptionPrice: [
          { required: true, message: "原处方价不能为空", trigger: "blur" }
        ],
        operationModule: [
          { required: true, message: "操作模块；采购：1，审核：2不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询入库操作log日志列表 */
    getList() {
      this.loading = true;
      listStorage_log(this.queryParams).then(response => {
        this.storage_logList = response.rows;
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
        logId: null,
        companyId: null,
        purchaseId: null,
        batchesOfInventoryNumber: null,
        medicinesId: null,
        modifierId: null,
        newQuantity: null,
        newTradePrice: null,
        newPrescriptionPrice: null,
        oldQuantity: null,
        oldTradePrice: null,
        oldPrescriptionPrice: null,
        operationModule: null,
        createTime: null
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
      this.ids = selection.map(item => item.logId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加入库操作log日志";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const logId = row.logId || this.ids
      getStorage_log(logId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改入库操作log日志";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.logId != null) {
            updateStorage_log(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addStorage_log(this.form).then(response => {
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
      const logIds = row.logId || this.ids;
      this.$modal.confirm('是否确认删除入库操作log日志编号为"' + logIds + '"的数据项？').then(function() {
        return delStorage_log(logIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('basic/storage_log/export', {
        ...this.queryParams
      }, `storage_log_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
