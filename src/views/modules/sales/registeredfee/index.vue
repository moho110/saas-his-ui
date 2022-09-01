<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户id" prop="mid">
        <el-input
          v-model="queryParams.mid"
          placeholder="请输入用户id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公司ID" prop="companyId">
        <el-input
          v-model="queryParams.companyId"
          placeholder="请输入公司ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="挂号费用名称" prop="registeredfeeName">
        <el-input
          v-model="queryParams.registeredfeeName"
          placeholder="请输入挂号费用名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="金额" prop="registeredfeeFee">
        <el-input
          v-model="queryParams.registeredfeeFee"
          placeholder="请输入金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="子费用总数" prop="registeredfeeSubFee">
        <el-input
          v-model="queryParams.registeredfeeSubFee"
          placeholder="请输入子费用总数"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="挂号费用总金额" prop="registeredfeeAggregateAmount">
        <el-input
          v-model="queryParams.registeredfeeAggregateAmount"
          placeholder="请输入挂号费用总金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="子费用数量" prop="numberofsub">
        <el-input
          v-model="queryParams.numberofsub"
          placeholder="请输入子费用数量"
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
          v-hasPermi="['basic:registeredfee:add']"
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
          v-hasPermi="['basic:registeredfee:edit']"
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
          v-hasPermi="['basic:registeredfee:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['basic:registeredfee:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="registeredfeeList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="${comment}" align="center" prop="regId" />
      <el-table-column label="用户id" align="center" prop="mid" />
      <el-table-column label="公司ID" align="center" prop="companyId" />
      <el-table-column label="挂号费用名称" align="center" prop="registeredfeeName" />
      <el-table-column label="金额" align="center" prop="registeredfeeFee" />
      <el-table-column label="子费用总数" align="center" prop="registeredfeeSubFee" />
      <el-table-column label="挂号费用总金额" align="center" prop="registeredfeeAggregateAmount" />
      <el-table-column label="子费用数量" align="center" prop="numberofsub" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:registeredfee:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:registeredfee:remove']"
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

    <!-- 添加或修改挂号费用对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户id" prop="mid">
          <el-input v-model="form.mid" placeholder="请输入用户id" />
        </el-form-item>
        <el-form-item label="公司ID" prop="companyId">
          <el-input v-model="form.companyId" placeholder="请输入公司ID" />
        </el-form-item>
        <el-form-item label="挂号费用名称" prop="registeredfeeName">
          <el-input v-model="form.registeredfeeName" placeholder="请输入挂号费用名称" />
        </el-form-item>
        <el-form-item label="金额" prop="registeredfeeFee">
          <el-input v-model="form.registeredfeeFee" placeholder="请输入金额" />
        </el-form-item>
        <el-form-item label="子费用总数" prop="registeredfeeSubFee">
          <el-input v-model="form.registeredfeeSubFee" placeholder="请输入子费用总数" />
        </el-form-item>
        <el-form-item label="挂号费用总金额" prop="registeredfeeAggregateAmount">
          <el-input v-model="form.registeredfeeAggregateAmount" placeholder="请输入挂号费用总金额" />
        </el-form-item>
        <el-form-item label="子费用数量" prop="numberofsub">
          <el-input v-model="form.numberofsub" placeholder="请输入子费用数量" />
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
import { listRegisteredfee, getRegisteredfee, delRegisteredfee, addRegisteredfee, updateRegisteredfee } from "@/api/basic/registeredfee";

export default {
  name: "Registeredfee",
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
      // 挂号费用表格数据
      registeredfeeList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        mid: null,
        companyId: null,
        registeredfeeName: null,
        registeredfeeFee: null,
        registeredfeeSubFee: null,
        registeredfeeAggregateAmount: null,
        numberofsub: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        mid: [
          { required: true, message: "用户id不能为空", trigger: "blur" }
        ],
        companyId: [
          { required: true, message: "公司ID不能为空", trigger: "blur" }
        ],
        registeredfeeName: [
          { required: true, message: "挂号费用名称不能为空", trigger: "blur" }
        ],
        registeredfeeFee: [
          { required: true, message: "金额不能为空", trigger: "blur" }
        ],
        registeredfeeSubFee: [
          { required: true, message: "子费用总数不能为空", trigger: "blur" }
        ],
        registeredfeeAggregateAmount: [
          { required: true, message: "挂号费用总金额不能为空", trigger: "blur" }
        ],
        numberofsub: [
          { required: true, message: "子费用数量不能为空", trigger: "blur" }
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
    /** 查询挂号费用列表 */
    getList() {
      this.loading = true;
      listRegisteredfee(this.queryParams).then(response => {
        this.registeredfeeList = response.rows;
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
        regId: null,
        mid: null,
        companyId: null,
        registeredfeeName: null,
        registeredfeeFee: null,
        registeredfeeSubFee: null,
        registeredfeeAggregateAmount: null,
        numberofsub: null,
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
      this.ids = selection.map(item => item.regId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加挂号费用";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const regId = row.regId || this.ids
      getRegisteredfee(regId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改挂号费用";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.regId != null) {
            updateRegisteredfee(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addRegisteredfee(this.form).then(response => {
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
      const regIds = row.regId || this.ids;
      this.$modal.confirm('是否确认删除挂号费用编号为"' + regIds + '"的数据项？').then(function() {
        return delRegisteredfee(regIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('basic/registeredfee/export', {
        ...this.queryParams
      }, `registeredfee_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
