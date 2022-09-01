<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="患者ID" prop="patientId">
        <el-input
          v-model="queryParams.patientId"
          placeholder="请输入患者ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="医生ID" prop="physicianId">
        <el-input
          v-model="queryParams.physicianId"
          placeholder="请输入医生ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="操作员ID" prop="operatorId">
        <el-input
          v-model="queryParams.operatorId"
          placeholder="请输入操作员ID"
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
      <el-form-item label="科室ID" prop="departmentId">
        <el-input
          v-model="queryParams.departmentId"
          placeholder="请输入科室ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="挂号费用ID" prop="registeredfeeId">
        <el-input
          v-model="queryParams.registeredfeeId"
          placeholder="请输入挂号费用ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="挂号总金额" prop="registrationAmount">
        <el-input
          v-model="queryParams.registrationAmount"
          placeholder="请输入挂号总金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="挂号编号" prop="registrationNumber">
        <el-input
          v-model="queryParams.registrationNumber"
          placeholder="请输入挂号编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="排班主表ID" prop="schedulingId">
        <el-input
          v-model="queryParams.schedulingId"
          placeholder="请输入排班主表ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="排班时段表ID" prop="schedulingSubsectionId">
        <el-input
          v-model="queryParams.schedulingSubsectionId"
          placeholder="请输入排班时段表ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="排班星期表ID" prop="schedulingWeekId">
        <el-input
          v-model="queryParams.schedulingWeekId"
          placeholder="请输入排班星期表ID"
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
          v-hasPermi="['basic:registration:add']"
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
          v-hasPermi="['basic:registration:edit']"
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
          v-hasPermi="['basic:registration:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['basic:registration:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="registrationList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="${comment}" align="center" prop="registrationId" />
      <el-table-column label="患者ID" align="center" prop="patientId" />
      <el-table-column label="医生ID" align="center" prop="physicianId" />
      <el-table-column label="操作员ID" align="center" prop="operatorId" />
      <el-table-column label="诊所ID" align="center" prop="companyId" />
      <el-table-column label="科室ID" align="center" prop="departmentId" />
      <el-table-column label="挂号费用ID" align="center" prop="registeredfeeId" />
      <el-table-column label="挂号总金额" align="center" prop="registrationAmount" />
      <el-table-column label="挂号编号" align="center" prop="registrationNumber" />
      <el-table-column label="挂号状态,1为待就诊，3为已退号，2为已就诊,4为作废，5,为未付款,6，为部分支付" align="center" prop="registrationStatus" />
      <el-table-column label="排班主表ID" align="center" prop="schedulingId" />
      <el-table-column label="排班时段表ID" align="center" prop="schedulingSubsectionId" />
      <el-table-column label="排班星期表ID" align="center" prop="schedulingWeekId" />
      <el-table-column label="收费总表care_pkg.id" align="center" prop="pkgId" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:registration:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:registration:remove']"
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

    <!-- 添加或修改门诊挂号对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="患者ID" prop="patientId">
          <el-input v-model="form.patientId" placeholder="请输入患者ID" />
        </el-form-item>
        <el-form-item label="医生ID" prop="physicianId">
          <el-input v-model="form.physicianId" placeholder="请输入医生ID" />
        </el-form-item>
        <el-form-item label="操作员ID" prop="operatorId">
          <el-input v-model="form.operatorId" placeholder="请输入操作员ID" />
        </el-form-item>
        <el-form-item label="诊所ID" prop="companyId">
          <el-input v-model="form.companyId" placeholder="请输入诊所ID" />
        </el-form-item>
        <el-form-item label="科室ID" prop="departmentId">
          <el-input v-model="form.departmentId" placeholder="请输入科室ID" />
        </el-form-item>
        <el-form-item label="挂号费用ID" prop="registeredfeeId">
          <el-input v-model="form.registeredfeeId" placeholder="请输入挂号费用ID" />
        </el-form-item>
        <el-form-item label="挂号总金额" prop="registrationAmount">
          <el-input v-model="form.registrationAmount" placeholder="请输入挂号总金额" />
        </el-form-item>
        <el-form-item label="挂号编号" prop="registrationNumber">
          <el-input v-model="form.registrationNumber" placeholder="请输入挂号编号" />
        </el-form-item>
        <el-form-item label="排班主表ID" prop="schedulingId">
          <el-input v-model="form.schedulingId" placeholder="请输入排班主表ID" />
        </el-form-item>
        <el-form-item label="排班时段表ID" prop="schedulingSubsectionId">
          <el-input v-model="form.schedulingSubsectionId" placeholder="请输入排班时段表ID" />
        </el-form-item>
        <el-form-item label="排班星期表ID" prop="schedulingWeekId">
          <el-input v-model="form.schedulingWeekId" placeholder="请输入排班星期表ID" />
        </el-form-item>
        <el-form-item label="收费总表care_pkg.id" prop="pkgId">
          <el-input v-model="form.pkgId" placeholder="请输入收费总表care_pkg.id" />
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
import { listRegistration, getRegistration, delRegistration, addRegistration, updateRegistration } from "@/api/basic/registration";

export default {
  name: "Registration",
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
      // 门诊挂号表格数据
      registrationList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        patientId: null,
        physicianId: null,
        operatorId: null,
        companyId: null,
        departmentId: null,
        registeredfeeId: null,
        registrationAmount: null,
        registrationNumber: null,
        registrationStatus: null,
        schedulingId: null,
        schedulingSubsectionId: null,
        schedulingWeekId: null,
        pkgId: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        patientId: [
          { required: true, message: "患者ID不能为空", trigger: "blur" }
        ],
        physicianId: [
          { required: true, message: "医生ID不能为空", trigger: "blur" }
        ],
        operatorId: [
          { required: true, message: "操作员ID不能为空", trigger: "blur" }
        ],
        companyId: [
          { required: true, message: "诊所ID不能为空", trigger: "blur" }
        ],
        departmentId: [
          { required: true, message: "科室ID不能为空", trigger: "blur" }
        ],
        registeredfeeId: [
          { required: true, message: "挂号费用ID不能为空", trigger: "blur" }
        ],
        registrationAmount: [
          { required: true, message: "挂号总金额不能为空", trigger: "blur" }
        ],
        registrationNumber: [
          { required: true, message: "挂号编号不能为空", trigger: "blur" }
        ],
        registrationStatus: [
          { required: true, message: "挂号状态,1为待就诊，3为已退号，2为已就诊,4为作废，5,为未付款,6，为部分支付不能为空", trigger: "blur" }
        ],
        schedulingId: [
          { required: true, message: "排班主表ID不能为空", trigger: "blur" }
        ],
        schedulingSubsectionId: [
          { required: true, message: "排班时段表ID不能为空", trigger: "blur" }
        ],
        schedulingWeekId: [
          { required: true, message: "排班星期表ID不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "更新时间不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询门诊挂号列表 */
    getList() {
      this.loading = true;
      listRegistration(this.queryParams).then(response => {
        this.registrationList = response.rows;
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
        registrationId: null,
        patientId: null,
        physicianId: null,
        operatorId: null,
        companyId: null,
        departmentId: null,
        registeredfeeId: null,
        registrationAmount: null,
        registrationNumber: null,
        registrationStatus: 0,
        schedulingId: null,
        schedulingSubsectionId: null,
        schedulingWeekId: null,
        createTime: null,
        updateTime: null,
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
      this.ids = selection.map(item => item.registrationId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加门诊挂号";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const registrationId = row.registrationId || this.ids
      getRegistration(registrationId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改门诊挂号";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.registrationId != null) {
            updateRegistration(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRegistration(this.form).then(response => {
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
      const registrationIds = row.registrationId || this.ids;
      this.$modal.confirm('是否确认删除门诊挂号编号为"' + registrationIds + '"的数据项？').then(function() {
        return delRegistration(registrationIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('basic/registration/export', {
        ...this.queryParams
      }, `registration_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
