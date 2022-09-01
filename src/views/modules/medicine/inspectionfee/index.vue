<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="添加用户id" prop="mid">
        <el-input
          v-model="queryParams.mid"
          placeholder="请输入添加用户id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="医院id" prop="hid">
        <el-input
          v-model="queryParams.hid"
          placeholder="请输入医院id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="项目名称" prop="inspectionName">
        <el-input
          v-model="queryParams.inspectionName"
          placeholder="请输入项目名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="项目类别" prop="class">
        <el-input
          v-model="queryParams.class"
          placeholder="请输入项目类别"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="项目单价" prop="unitPrice">
        <el-input
          v-model="queryParams.unitPrice"
          placeholder="请输入项目单价"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="项目成本" prop="cost">
        <el-input
          v-model="queryParams.cost"
          placeholder="请输入项目成本"
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
      <el-form-item label="类别id" prop="classId">
        <el-input
          v-model="queryParams.classId"
          placeholder="请输入类别id"
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
          v-hasPermi="['basic:inspectionfee:add']"
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
          v-hasPermi="['basic:inspectionfee:edit']"
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
          v-hasPermi="['basic:inspectionfee:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['basic:inspectionfee:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="inspectionfeeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="${comment}" align="center" prop="insId" />
      <el-table-column label="添加用户id" align="center" prop="mid" />
      <el-table-column label="医院id" align="center" prop="hid" />
      <el-table-column label="项目名称" align="center" prop="inspectionName" />
      <el-table-column label="项目类别" align="center" prop="class" />
      <el-table-column label="项目单价" align="center" prop="unitPrice" />
      <el-table-column label="项目成本" align="center" prop="cost" />
      <el-table-column label="单位" align="center" prop="unit" />
      <el-table-column label="类别id" align="center" prop="classId" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:inspectionfee:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:inspectionfee:remove']"
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

    <!-- 添加或修改检查项目费用对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="添加用户id" prop="mid">
          <el-input v-model="form.mid" placeholder="请输入添加用户id" />
        </el-form-item>
        <el-form-item label="医院id" prop="hid">
          <el-input v-model="form.hid" placeholder="请输入医院id" />
        </el-form-item>
        <el-form-item label="项目名称" prop="inspectionName">
          <el-input v-model="form.inspectionName" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="项目类别" prop="class">
          <el-input v-model="form.class" placeholder="请输入项目类别" />
        </el-form-item>
        <el-form-item label="项目单价" prop="unitPrice">
          <el-input v-model="form.unitPrice" placeholder="请输入项目单价" />
        </el-form-item>
        <el-form-item label="项目成本" prop="cost">
          <el-input v-model="form.cost" placeholder="请输入项目成本" />
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="form.unit" placeholder="请输入单位" />
        </el-form-item>
        <el-form-item label="类别id" prop="classId">
          <el-input v-model="form.classId" placeholder="请输入类别id" />
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
import { listInspectionfee, getInspectionfee, delInspectionfee, addInspectionfee, updateInspectionfee } from "@/api/basic/inspectionfee";

export default {
  name: "Inspectionfee",
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
      // 检查项目费用表格数据
      inspectionfeeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        mid: null,
        hid: null,
        inspectionName: null,
        class: null,
        unitPrice: null,
        cost: null,
        unit: null,
        classId: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        mid: [
          { required: true, message: "添加用户id不能为空", trigger: "blur" }
        ],
        hid: [
          { required: true, message: "医院id不能为空", trigger: "blur" }
        ],
        inspectionName: [
          { required: true, message: "项目名称不能为空", trigger: "blur" }
        ],
        class: [
          { required: true, message: "项目类别不能为空", trigger: "blur" }
        ],
        unitPrice: [
          { required: true, message: "项目单价不能为空", trigger: "blur" }
        ],
        cost: [
          { required: true, message: "项目成本不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "修改时间不能为空", trigger: "blur" }
        ],
        unit: [
          { required: true, message: "单位不能为空", trigger: "blur" }
        ],
        classId: [
          { required: true, message: "类别id不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询检查项目费用列表 */
    getList() {
      this.loading = true;
      listInspectionfee(this.queryParams).then(response => {
        this.inspectionfeeList = response.rows;
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
        insId: null,
        mid: null,
        hid: null,
        inspectionName: null,
        class: null,
        unitPrice: null,
        cost: null,
        createTime: null,
        updateTime: null,
        unit: null,
        classId: null
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
      this.ids = selection.map(item => item.insId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加检查项目费用";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const insId = row.insId || this.ids
      getInspectionfee(insId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改检查项目费用";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.insId != null) {
            updateInspectionfee(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addInspectionfee(this.form).then(response => {
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
      const insIds = row.insId || this.ids;
      this.$modal.confirm('是否确认删除检查项目费用编号为"' + insIds + '"的数据项？').then(function() {
        return delInspectionfee(insIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('basic/inspectionfee/export', {
        ...this.queryParams
      }, `inspectionfee_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
