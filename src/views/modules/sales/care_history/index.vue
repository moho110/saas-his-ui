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
      <el-form-item label="科室id" prop="departmentId">
        <el-input
          v-model="queryParams.departmentId"
          placeholder="请输入科室id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="接诊类型：0初诊，1复诊，2急诊" prop="typeId">
        <el-input
          v-model="queryParams.typeId"
          placeholder="请输入接诊类型：0初诊，1复诊，2急诊"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否传染，0否，1是" prop="isContagious">
        <el-input
          v-model="queryParams.isContagious"
          placeholder="请输入是否传染，0否，1是"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发病日期" prop="caseDate">
        <el-date-picker clearable
          v-model="queryParams.caseDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择发病日期">
        </el-date-picker>
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
      <el-form-item label="主诉" prop="caseTitle">
        <el-input
          v-model="queryParams.caseTitle"
          placeholder="请输入主诉"
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
          v-hasPermi="['basic:care_history:add']"
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
          v-hasPermi="['basic:care_history:edit']"
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
          v-hasPermi="['basic:care_history:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['basic:care_history:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="care_historyList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="${comment}" align="center" prop="id" />
      <el-table-column label="医院id" align="center" prop="hospitalId" />
      <el-table-column label="医生id" align="center" prop="doctorId" />
      <el-table-column label="患者id" align="center" prop="patientId" />
      <el-table-column label="科室id" align="center" prop="departmentId" />
      <el-table-column label="接诊类型：0初诊，1复诊，2急诊" align="center" prop="typeId" />
      <el-table-column label="是否传染，0否，1是" align="center" prop="isContagious" />
      <el-table-column label="发病日期" align="center" prop="caseDate" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.caseDate, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="插入时间，php时间戳" align="center" prop="addtime" />
      <el-table-column label="诊断编号" align="center" prop="caseCode" />
      <el-table-column label="主诉" align="center" prop="caseTitle" />
      <el-table-column label="诊断信息" align="center" prop="caseResult" />
      <el-table-column label="医生建议" align="center" prop="doctorTips" />
      <el-table-column label="备注" align="center" prop="memo" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:care_history:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:care_history:remove']"
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

    <!-- 添加或修改历史病历对话框 -->
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
        <el-form-item label="科室id" prop="departmentId">
          <el-input v-model="form.departmentId" placeholder="请输入科室id" />
        </el-form-item>
        <el-form-item label="接诊类型：0初诊，1复诊，2急诊" prop="typeId">
          <el-input v-model="form.typeId" placeholder="请输入接诊类型：0初诊，1复诊，2急诊" />
        </el-form-item>
        <el-form-item label="是否传染，0否，1是" prop="isContagious">
          <el-input v-model="form.isContagious" placeholder="请输入是否传染，0否，1是" />
        </el-form-item>
        <el-form-item label="发病日期" prop="caseDate">
          <el-date-picker clearable
            v-model="form.caseDate"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择发病日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="插入时间，php时间戳" prop="addtime">
          <el-input v-model="form.addtime" placeholder="请输入插入时间，php时间戳" />
        </el-form-item>
        <el-form-item label="诊断编号" prop="caseCode">
          <el-input v-model="form.caseCode" placeholder="请输入诊断编号" />
        </el-form-item>
        <el-form-item label="主诉" prop="caseTitle">
          <el-input v-model="form.caseTitle" placeholder="请输入主诉" />
        </el-form-item>
        <el-form-item label="诊断信息" prop="caseResult">
          <el-input v-model="form.caseResult" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="医生建议" prop="doctorTips">
          <el-input v-model="form.doctorTips" type="textarea" placeholder="请输入内容" />
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
import { listCare_history, getCare_history, delCare_history, addCare_history, updateCare_history } from "@/api/basic/care_history";

export default {
  name: "Care_history",
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
      // 历史病历表格数据
      care_historyList: [],
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
        departmentId: null,
        typeId: null,
        isContagious: null,
        caseDate: null,
        addtime: null,
        caseCode: null,
        caseTitle: null,
        caseResult: null,
        doctorTips: null,
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
    /** 查询历史病历列表 */
    getList() {
      this.loading = true;
      listCare_history(this.queryParams).then(response => {
        this.care_historyList = response.rows;
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
        departmentId: null,
        typeId: null,
        isContagious: null,
        caseDate: null,
        addtime: null,
        caseCode: null,
        caseTitle: null,
        caseResult: null,
        doctorTips: null,
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
      this.title = "添加历史病历";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCare_history(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改历史病历";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCare_history(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCare_history(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除历史病历编号为"' + ids + '"的数据项？').then(function() {
        return delCare_history(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('basic/care_history/export', {
        ...this.queryParams
      }, `care_history_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
