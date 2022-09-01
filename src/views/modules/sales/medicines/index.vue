<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="药品编号" prop="medicinesNumber">
        <el-input
          v-model="queryParams.medicinesNumber"
          placeholder="请输入药品编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="药品名称" prop="medicinesName">
        <el-input
          v-model="queryParams.medicinesName"
          placeholder="请输入药品名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="药品分类 " prop="medicinesClass">
        <el-input
          v-model="queryParams.medicinesClass"
          placeholder="请输入药品分类 "
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单位" prop="unit">
        <el-input
          v-model="queryParams.unit"
          placeholder="请输入单位"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="换算量" prop="conversion">
        <el-input
          v-model="queryParams.conversion"
          placeholder="请输入换算量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="关键字" prop="keywords">
        <el-input
          v-model="queryParams.keywords"
          placeholder="请输入关键字"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="生产厂家" prop="producter">
        <el-input
          v-model="queryParams.producter"
          placeholder="请输入生产厂家"
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
          v-hasPermi="['basic:medicines:add']"
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
          v-hasPermi="['basic:medicines:edit']"
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
          v-hasPermi="['basic:medicines:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['basic:medicines:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="medicinesList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="${comment}" align="center" prop="medicinesId" />
      <el-table-column label="药品编号" align="center" prop="medicinesNumber" />
      <el-table-column label="药品名称" align="center" prop="medicinesName" />
      <el-table-column label="药品分类 " align="center" prop="medicinesClass" />
      <el-table-column label="处方类型" align="center" prop="prescriptionType" />
      <el-table-column label="单位" align="center" prop="unit" />
      <el-table-column label="换算量" align="center" prop="conversion" />
      <el-table-column label="关键字" align="center" prop="keywords" />
      <el-table-column label="生产厂家" align="center" prop="producter" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:medicines:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:medicines:remove']"
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

    <!-- 添加或修改药品信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="药品编号" prop="medicinesNumber">
          <el-input v-model="form.medicinesNumber" placeholder="请输入药品编号" />
        </el-form-item>
        <el-form-item label="药品名称" prop="medicinesName">
          <el-input v-model="form.medicinesName" placeholder="请输入药品名称" />
        </el-form-item>
        <el-form-item label="药品分类 " prop="medicinesClass">
          <el-input v-model="form.medicinesClass" placeholder="请输入药品分类 " />
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="form.unit" placeholder="请输入单位" />
        </el-form-item>
        <el-form-item label="换算量" prop="conversion">
          <el-input v-model="form.conversion" placeholder="请输入换算量" />
        </el-form-item>
        <el-form-item label="关键字" prop="keywords">
          <el-input v-model="form.keywords" placeholder="请输入关键字" />
        </el-form-item>
        <el-form-item label="生产厂家" prop="producter">
          <el-input v-model="form.producter" placeholder="请输入生产厂家" />
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
import { listMedicines, getMedicines, delMedicines, addMedicines, updateMedicines } from "@/api/basic/medicines";

export default {
  name: "Medicines",
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
      // 药品信息表格数据
      medicinesList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        medicinesNumber: null,
        medicinesName: null,
        medicinesClass: null,
        prescriptionType: null,
        unit: null,
        conversion: null,
        keywords: null,
        producter: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        medicinesNumber: [
          { required: true, message: "药品编号不能为空", trigger: "blur" }
        ],
        medicinesName: [
          { required: true, message: "药品名称不能为空", trigger: "blur" }
        ],
        medicinesClass: [
          { required: true, message: "药品分类 不能为空", trigger: "blur" }
        ],
        prescriptionType: [
          { required: true, message: "处方类型不能为空", trigger: "change" }
        ],
        unit: [
          { required: true, message: "单位不能为空", trigger: "blur" }
        ],
        conversion: [
          { required: true, message: "换算量不能为空", trigger: "blur" }
        ],
        keywords: [
          { required: true, message: "关键字不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "修改时间不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询药品信息列表 */
    getList() {
      this.loading = true;
      listMedicines(this.queryParams).then(response => {
        this.medicinesList = response.rows;
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
        medicinesId: null,
        medicinesNumber: null,
        medicinesName: null,
        medicinesClass: null,
        prescriptionType: null,
        unit: null,
        conversion: null,
        keywords: null,
        createTime: null,
        updateTime: null,
        producter: null
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
      this.ids = selection.map(item => item.medicinesId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加药品信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const medicinesId = row.medicinesId || this.ids
      getMedicines(medicinesId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改药品信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.medicinesId != null) {
            updateMedicines(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMedicines(this.form).then(response => {
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
      const medicinesIds = row.medicinesId || this.ids;
      this.$modal.confirm('是否确认删除药品信息编号为"' + medicinesIds + '"的数据项？').then(function() {
        return delMedicines(medicinesIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('basic/medicines/export', {
        ...this.queryParams
      }, `medicines_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
