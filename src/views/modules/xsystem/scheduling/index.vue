<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="医生ID" prop="physicianid">
        <el-input
          v-model="queryParams.physicianid"
          placeholder="请输入医生ID"
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
      <el-form-item label="诊所ID" prop="companyId">
        <el-input
          v-model="queryParams.companyId"
          placeholder="请输入诊所ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="本周开始时间" prop="startTimeThisWeek">
        <el-input
          v-model="queryParams.startTimeThisWeek"
          placeholder="请输入本周开始时间"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="本周结束时间" prop="endTimeThisWeek">
        <el-input
          v-model="queryParams.endTimeThisWeek"
          placeholder="请输入本周结束时间"
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
          v-hasPermi="['basic:scheduling:add']"
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
          v-hasPermi="['basic:scheduling:edit']"
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
          v-hasPermi="['basic:scheduling:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['basic:scheduling:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="schedulingList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="${comment}" align="center" prop="schedulingId" />
      <el-table-column label="医生ID" align="center" prop="physicianid" />
      <el-table-column label="科室ID" align="center" prop="departmentId" />
      <el-table-column label="诊所ID" align="center" prop="companyId" />
      <el-table-column label="本周开始时间" align="center" prop="startTimeThisWeek" />
      <el-table-column label="本周结束时间" align="center" prop="endTimeThisWeek" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:scheduling:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:scheduling:remove']"
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

    <!-- 添加或修改我的排班对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="医生ID" prop="physicianid">
          <el-input v-model="form.physicianid" placeholder="请输入医生ID" />
        </el-form-item>
        <el-form-item label="科室ID" prop="departmentId">
          <el-input v-model="form.departmentId" placeholder="请输入科室ID" />
        </el-form-item>
        <el-form-item label="诊所ID" prop="companyId">
          <el-input v-model="form.companyId" placeholder="请输入诊所ID" />
        </el-form-item>
        <el-form-item label="本周开始时间" prop="startTimeThisWeek">
          <el-input v-model="form.startTimeThisWeek" placeholder="请输入本周开始时间" />
        </el-form-item>
        <el-form-item label="本周结束时间" prop="endTimeThisWeek">
          <el-input v-model="form.endTimeThisWeek" placeholder="请输入本周结束时间" />
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
import { listScheduling, getScheduling, delScheduling, addScheduling, updateScheduling } from "@/api/basic/scheduling";

export default {
  name: "Scheduling",
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
      // 我的排班表格数据
      schedulingList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        physicianid: null,
        departmentId: null,
        companyId: null,
        startTimeThisWeek: null,
        endTimeThisWeek: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        physicianid: [
          { required: true, message: "医生ID不能为空", trigger: "blur" }
        ],
        departmentId: [
          { required: true, message: "科室ID不能为空", trigger: "blur" }
        ],
        companyId: [
          { required: true, message: "诊所ID不能为空", trigger: "blur" }
        ],
        startTimeThisWeek: [
          { required: true, message: "本周开始时间不能为空", trigger: "blur" }
        ],
        endTimeThisWeek: [
          { required: true, message: "本周结束时间不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
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
    /** 查询我的排班列表 */
    getList() {
      this.loading = true;
      listScheduling(this.queryParams).then(response => {
        this.schedulingList = response.rows;
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
        schedulingId: null,
        physicianid: null,
        departmentId: null,
        companyId: null,
        startTimeThisWeek: null,
        endTimeThisWeek: null,
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
      this.ids = selection.map(item => item.schedulingId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加我的排班";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const schedulingId = row.schedulingId || this.ids
      getScheduling(schedulingId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改我的排班";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.schedulingId != null) {
            updateScheduling(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addScheduling(this.form).then(response => {
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
      const schedulingIds = row.schedulingId || this.ids;
      this.$modal.confirm('是否确认删除我的排班编号为"' + schedulingIds + '"的数据项？').then(function() {
        return delScheduling(schedulingIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('basic/scheduling/export', {
        ...this.queryParams
      }, `scheduling_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
