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
      <el-form-item label="处方附加费名称" prop="extrachargesName">
        <el-input
          v-model="queryParams.extrachargesName"
          placeholder="请输入处方附加费名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="金额" prop="fee">
        <el-input
          v-model="queryParams.fee"
          placeholder="请输入金额"
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
          v-hasPermi="['basic:prescription_extracharges:add']"
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
          v-hasPermi="['basic:prescription_extracharges:edit']"
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
          v-hasPermi="['basic:prescription_extracharges:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['basic:prescription_extracharges:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="prescription_extrachargesList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="${comment}" align="center" prop="preId" />
      <el-table-column label="添加用户id" align="center" prop="mid" />
      <el-table-column label="医院id" align="center" prop="hid" />
      <el-table-column label="处方附加费名称" align="center" prop="extrachargesName" />
      <el-table-column label="金额" align="center" prop="fee" />
      <el-table-column label="处方类型  0:中药处方  1:西药处方" align="center" prop="type" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:prescription_extracharges:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:prescription_extracharges:remove']"
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

    <!-- 添加或修改处方附加费用对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="添加用户id" prop="mid">
          <el-input v-model="form.mid" placeholder="请输入添加用户id" />
        </el-form-item>
        <el-form-item label="医院id" prop="hid">
          <el-input v-model="form.hid" placeholder="请输入医院id" />
        </el-form-item>
        <el-form-item label="处方附加费名称" prop="extrachargesName">
          <el-input v-model="form.extrachargesName" placeholder="请输入处方附加费名称" />
        </el-form-item>
        <el-form-item label="金额" prop="fee">
          <el-input v-model="form.fee" placeholder="请输入金额" />
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
import { listPrescription_extracharges, getPrescription_extracharges, delPrescription_extracharges, addPrescription_extracharges, updatePrescription_extracharges } from "@/api/basic/prescription_extracharges";

export default {
  name: "Prescription_extracharges",
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
      // 处方附加费用表格数据
      prescription_extrachargesList: [],
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
        extrachargesName: null,
        fee: null,
        type: null,
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
        extrachargesName: [
          { required: true, message: "处方附加费名称不能为空", trigger: "blur" }
        ],
        fee: [
          { required: true, message: "金额不能为空", trigger: "blur" }
        ],
        type: [
          { required: true, message: "处方类型  0:中药处方  1:西药处方不能为空", trigger: "change" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "修改时间不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询处方附加费用列表 */
    getList() {
      this.loading = true;
      listPrescription_extracharges(this.queryParams).then(response => {
        this.prescription_extrachargesList = response.rows;
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
        preId: null,
        mid: null,
        hid: null,
        extrachargesName: null,
        fee: null,
        type: null,
        createTime: null,
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
      this.ids = selection.map(item => item.preId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加处方附加费用";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const preId = row.preId || this.ids
      getPrescription_extracharges(preId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改处方附加费用";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.preId != null) {
            updatePrescription_extracharges(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPrescription_extracharges(this.form).then(response => {
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
      const preIds = row.preId || this.ids;
      this.$modal.confirm('是否确认删除处方附加费用编号为"' + preIds + '"的数据项？').then(function() {
        return delPrescription_extracharges(preIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('basic/prescription_extracharges/export', {
        ...this.queryParams
      }, `prescription_extracharges_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
