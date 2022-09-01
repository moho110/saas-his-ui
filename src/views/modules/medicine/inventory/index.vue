<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="药品ID" prop="hmrId">
        <el-input
          v-model="queryParams.hmrId"
          placeholder="请输入药品ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="诊所ID" prop="companyId">
        <el-input
          v-model="queryParams.companyId"
          placeholder="请输入诊所ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="库存数量" prop="inventoryNum">
        <el-input
          v-model="queryParams.inventoryNum"
          placeholder="请输入库存数量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单位" prop="inventoryUnit">
        <el-input
          v-model="queryParams.inventoryUnit"
          placeholder="请输入单位"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="批发价" prop="inventoryTradePrice">
        <el-input
          v-model="queryParams.inventoryTradePrice"
          placeholder="请输入批发价"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="处方价" prop="inventoryPrescriptionPrice">
        <el-input
          v-model="queryParams.inventoryPrescriptionPrice"
          placeholder="请输入处方价"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="批发额" prop="inventoryTradeTotalAmount">
        <el-input
          v-model="queryParams.inventoryTradeTotalAmount"
          placeholder="请输入批发额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="处方额" prop="inventoryPrescriptionTotalAmount">
        <el-input
          v-model="queryParams.inventoryPrescriptionTotalAmount"
          placeholder="请输入处方额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="库存预警" prop="earlyWarning">
        <el-input
          v-model="queryParams.earlyWarning"
          placeholder="请输入库存预警"
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
          v-hasPermi="['basic:inventory:add']"
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
          v-hasPermi="['basic:inventory:edit']"
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
          v-hasPermi="['basic:inventory:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['basic:inventory:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="inventoryList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="库存ID" align="center" prop="inventoryId" />
      <el-table-column label="药品ID" align="center" prop="hmrId" />
      <el-table-column label="诊所ID" align="center" prop="companyId" />
      <el-table-column label="库存数量" align="center" prop="inventoryNum" />
      <el-table-column label="单位" align="center" prop="inventoryUnit" />
      <el-table-column label="批发价" align="center" prop="inventoryTradePrice" />
      <el-table-column label="处方价" align="center" prop="inventoryPrescriptionPrice" />
      <el-table-column label="批发额" align="center" prop="inventoryTradeTotalAmount" />
      <el-table-column label="处方额" align="center" prop="inventoryPrescriptionTotalAmount" />
      <el-table-column label="库存预警" align="center" prop="earlyWarning" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:inventory:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:inventory:remove']"
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

    <!-- 添加或修改库存对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="药品ID" prop="hmrId">
          <el-input v-model="form.hmrId" placeholder="请输入药品ID" />
        </el-form-item>
        <el-form-item label="诊所ID" prop="companyId">
          <el-input v-model="form.companyId" placeholder="请输入诊所ID" />
        </el-form-item>
        <el-form-item label="库存数量" prop="inventoryNum">
          <el-input v-model="form.inventoryNum" placeholder="请输入库存数量" />
        </el-form-item>
        <el-form-item label="单位" prop="inventoryUnit">
          <el-input v-model="form.inventoryUnit" placeholder="请输入单位" />
        </el-form-item>
        <el-form-item label="批发价" prop="inventoryTradePrice">
          <el-input v-model="form.inventoryTradePrice" placeholder="请输入批发价" />
        </el-form-item>
        <el-form-item label="处方价" prop="inventoryPrescriptionPrice">
          <el-input v-model="form.inventoryPrescriptionPrice" placeholder="请输入处方价" />
        </el-form-item>
        <el-form-item label="批发额" prop="inventoryTradeTotalAmount">
          <el-input v-model="form.inventoryTradeTotalAmount" placeholder="请输入批发额" />
        </el-form-item>
        <el-form-item label="处方额" prop="inventoryPrescriptionTotalAmount">
          <el-input v-model="form.inventoryPrescriptionTotalAmount" placeholder="请输入处方额" />
        </el-form-item>
        <el-form-item label="库存预警" prop="earlyWarning">
          <el-input v-model="form.earlyWarning" placeholder="请输入库存预警" />
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
import { listInventory, getInventory, delInventory, addInventory, updateInventory } from "@/api/basic/inventory";

export default {
  name: "Inventory",
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
      // 库存表格数据
      inventoryList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        hmrId: null,
        companyId: null,
        inventoryNum: null,
        inventoryUnit: null,
        inventoryTradePrice: null,
        inventoryPrescriptionPrice: null,
        inventoryTradeTotalAmount: null,
        inventoryPrescriptionTotalAmount: null,
        earlyWarning: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        hmrId: [
          { required: true, message: "药品ID不能为空", trigger: "blur" }
        ],
        companyId: [
          { required: true, message: "诊所ID不能为空", trigger: "blur" }
        ],
        inventoryNum: [
          { required: true, message: "库存数量不能为空", trigger: "blur" }
        ],
        inventoryUnit: [
          { required: true, message: "单位不能为空", trigger: "blur" }
        ],
        inventoryTradePrice: [
          { required: true, message: "批发价不能为空", trigger: "blur" }
        ],
        inventoryPrescriptionPrice: [
          { required: true, message: "处方价不能为空", trigger: "blur" }
        ],
        inventoryTradeTotalAmount: [
          { required: true, message: "批发额不能为空", trigger: "blur" }
        ],
        inventoryPrescriptionTotalAmount: [
          { required: true, message: "处方额不能为空", trigger: "blur" }
        ],
        earlyWarning: [
          { required: true, message: "库存预警不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "更新时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询库存列表 */
    getList() {
      this.loading = true;
      listInventory(this.queryParams).then(response => {
        this.inventoryList = response.rows;
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
        inventoryId: null,
        hmrId: null,
        companyId: null,
        inventoryNum: null,
        inventoryUnit: null,
        inventoryTradePrice: null,
        inventoryPrescriptionPrice: null,
        inventoryTradeTotalAmount: null,
        inventoryPrescriptionTotalAmount: null,
        earlyWarning: null,
        updateTime: null
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
      this.ids = selection.map(item => item.inventoryId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加库存";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const inventoryId = row.inventoryId || this.ids
      getInventory(inventoryId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改库存";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.inventoryId != null) {
            updateInventory(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addInventory(this.form).then(response => {
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
      const inventoryIds = row.inventoryId || this.ids;
      this.$modal.confirm('是否确认删除库存编号为"' + inventoryIds + '"的数据项？').then(function() {
        return delInventory(inventoryIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('basic/inventory/export', {
        ...this.queryParams
      }, `inventory_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
