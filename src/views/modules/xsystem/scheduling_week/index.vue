<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="时间" prop="date">
        <el-input
          v-model="queryParams.date"
          placeholder="请输入时间"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="星期一：1；星期二：2；星期三：3；星期四：4；星期五：5；星期六：6；星期日：0" prop="week">
        <el-input
          v-model="queryParams.week"
          placeholder="请输入星期一：1；星期二：2；星期三：3；星期四：4；星期五：5；星期六：6；星期日：0"
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
      <el-form-item label="排班分段ID" prop="schedulingSubsectionId">
        <el-input
          v-model="queryParams.schedulingSubsectionId"
          placeholder="请输入排班分段ID"
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
          v-hasPermi="['basic:scheduling_week:add']"
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
          v-hasPermi="['basic:scheduling_week:edit']"
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
          v-hasPermi="['basic:scheduling_week:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['basic:scheduling_week:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="scheduling_weekList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="${comment}" align="center" prop="schedulingWeekId" />
      <el-table-column label="时间" align="center" prop="date" />
      <el-table-column label="星期一：1；星期二：2；星期三：3；星期四：4；星期五：5；星期六：6；星期日：0" align="center" prop="week" />
      <el-table-column label="挂号费用ID" align="center" prop="registeredfeeId" />
      <el-table-column label="排班分段ID" align="center" prop="schedulingSubsectionId" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:scheduling_week:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:scheduling_week:remove']"
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

    <!-- 添加或修改排班星期对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="时间" prop="date">
          <el-input v-model="form.date" placeholder="请输入时间" />
        </el-form-item>
        <el-form-item label="星期一：1；星期二：2；星期三：3；星期四：4；星期五：5；星期六：6；星期日：0" prop="week">
          <el-input v-model="form.week" placeholder="请输入星期一：1；星期二：2；星期三：3；星期四：4；星期五：5；星期六：6；星期日：0" />
        </el-form-item>
        <el-form-item label="挂号费用ID" prop="registeredfeeId">
          <el-input v-model="form.registeredfeeId" placeholder="请输入挂号费用ID" />
        </el-form-item>
        <el-form-item label="排班分段ID" prop="schedulingSubsectionId">
          <el-input v-model="form.schedulingSubsectionId" placeholder="请输入排班分段ID" />
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
import { listScheduling_week, getScheduling_week, delScheduling_week, addScheduling_week, updateScheduling_week } from "@/api/basic/scheduling_week";

export default {
  name: "Scheduling_week",
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
      // 排班星期表格数据
      scheduling_weekList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        date: null,
        week: null,
        registeredfeeId: null,
        schedulingSubsectionId: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        date: [
          { required: true, message: "时间不能为空", trigger: "blur" }
        ],
        week: [
          { required: true, message: "星期一：1；星期二：2；星期三：3；星期四：4；星期五：5；星期六：6；星期日：0不能为空", trigger: "blur" }
        ],
        schedulingSubsectionId: [
          { required: true, message: "排班分段ID不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询排班星期列表 */
    getList() {
      this.loading = true;
      listScheduling_week(this.queryParams).then(response => {
        this.scheduling_weekList = response.rows;
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
        schedulingWeekId: null,
        date: null,
        week: null,
        registeredfeeId: null,
        schedulingSubsectionId: null
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
      this.ids = selection.map(item => item.schedulingWeekId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加排班星期";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const schedulingWeekId = row.schedulingWeekId || this.ids
      getScheduling_week(schedulingWeekId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改排班星期";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.schedulingWeekId != null) {
            updateScheduling_week(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addScheduling_week(this.form).then(response => {
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
      const schedulingWeekIds = row.schedulingWeekId || this.ids;
      this.$modal.confirm('是否确认删除排班星期编号为"' + schedulingWeekIds + '"的数据项？').then(function() {
        return delScheduling_week(schedulingWeekIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('basic/scheduling_week/export', {
        ...this.queryParams
      }, `scheduling_week_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
