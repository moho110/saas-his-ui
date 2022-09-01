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
      <el-form-item label="科室id" prop="departmentId">
        <el-input
          v-model="queryParams.departmentId"
          placeholder="请输入科室id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="医生id" prop="physicianid">
        <el-input
          v-model="queryParams.physicianid"
          placeholder="请输入医生id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="职称" prop="titleLevel">
        <el-input
          v-model="queryParams.titleLevel"
          placeholder="请输入职称"
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
          v-hasPermi="['basic:hospital_doctor_relation:add']"
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
          v-hasPermi="['basic:hospital_doctor_relation:edit']"
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
          v-hasPermi="['basic:hospital_doctor_relation:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['basic:hospital_doctor_relation:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="hospital_doctor_relationList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="rid" />
      <el-table-column label="医院id" align="center" prop="hospitalId" />
      <el-table-column label="科室id" align="center" prop="departmentId" />
      <el-table-column label="医生id" align="center" prop="physicianid" />
      <el-table-column label="权限" align="center" prop="rightList" />
      <el-table-column label="职称" align="center" prop="titleLevel" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:hospital_doctor_relation:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:hospital_doctor_relation:remove']"
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

    <!-- 添加或修改医生与医院关联对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="医院id" prop="hospitalId">
          <el-input v-model="form.hospitalId" placeholder="请输入医院id" />
        </el-form-item>
        <el-form-item label="科室id" prop="departmentId">
          <el-input v-model="form.departmentId" placeholder="请输入科室id" />
        </el-form-item>
        <el-form-item label="医生id" prop="physicianid">
          <el-input v-model="form.physicianid" placeholder="请输入医生id" />
        </el-form-item>
        <el-form-item label="权限" prop="rightList">
          <el-input v-model="form.rightList" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="职称" prop="titleLevel">
          <el-input v-model="form.titleLevel" placeholder="请输入职称" />
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
import { listHospital_doctor_relation, getHospital_doctor_relation, delHospital_doctor_relation, addHospital_doctor_relation, updateHospital_doctor_relation } from "@/api/basic/hospital_doctor_relation";

export default {
  name: "Hospital_doctor_relation",
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
      // 医生与医院关联表格数据
      hospital_doctor_relationList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        hospitalId: null,
        departmentId: null,
        physicianid: null,
        rightList: null,
        titleLevel: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "更新时间不能为空", trigger: "blur" }
        ],
        hospitalId: [
          { required: true, message: "医院id不能为空", trigger: "blur" }
        ],
        departmentId: [
          { required: true, message: "科室id不能为空", trigger: "blur" }
        ],
        physicianid: [
          { required: true, message: "医生id不能为空", trigger: "blur" }
        ],
        rightList: [
          { required: true, message: "权限不能为空", trigger: "blur" }
        ],
        titleLevel: [
          { required: true, message: "职称不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询医生与医院关联列表 */
    getList() {
      this.loading = true;
      listHospital_doctor_relation(this.queryParams).then(response => {
        this.hospital_doctor_relationList = response.rows;
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
        rid: null,
        createTime: null,
        updateTime: null,
        hospitalId: null,
        departmentId: null,
        physicianid: null,
        rightList: null,
        titleLevel: null
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
      this.ids = selection.map(item => item.rid)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加医生与医院关联";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const rid = row.rid || this.ids
      getHospital_doctor_relation(rid).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改医生与医院关联";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.rid != null) {
            updateHospital_doctor_relation(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addHospital_doctor_relation(this.form).then(response => {
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
      const rids = row.rid || this.ids;
      this.$modal.confirm('是否确认删除医生与医院关联编号为"' + rids + '"的数据项？').then(function() {
        return delHospital_doctor_relation(rids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('basic/hospital_doctor_relation/export', {
        ...this.queryParams
      }, `hospital_doctor_relation_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
