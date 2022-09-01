<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="医生姓名" prop="truename">
        <el-input
          v-model="queryParams.truename"
          placeholder="请输入医生姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="医生职称" prop="dtitle">
        <el-input
          v-model="queryParams.dtitle"
          placeholder="请输入医生职称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="address">
        <el-input
          v-model="queryParams.address"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="医院姓名" prop="hospitalName">
        <el-input
          v-model="queryParams.hospitalName"
          placeholder="请输入医院姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="面诊费用价格" prop="pricea">
        <el-input
          v-model="queryParams.pricea"
          placeholder="请输入面诊费用价格"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="电话问诊费用价格" prop="priceb">
        <el-input
          v-model="queryParams.priceb"
          placeholder="请输入电话问诊费用价格"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="擅长" prop="hasfix">
        <el-input
          v-model="queryParams.hasfix"
          placeholder="请输入擅长"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="简介" prop="case">
        <el-input
          v-model="queryParams.case"
          placeholder="请输入简介"
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
          v-hasPermi="['basic:demo_doctor:add']"
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
          v-hasPermi="['basic:demo_doctor:edit']"
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
          v-hasPermi="['basic:demo_doctor:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['basic:demo_doctor:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="demo_doctorList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="${comment}" align="center" prop="id" />
      <el-table-column label="医生姓名" align="center" prop="truename" />
      <el-table-column label="医生职称" align="center" prop="dtitle" />
      <el-table-column label="性别" align="center" prop="sex" />
      <el-table-column label="${comment}" align="center" prop="address" />
      <el-table-column label="医院姓名" align="center" prop="hospitalName" />
      <el-table-column label="面诊费用价格" align="center" prop="pricea" />
      <el-table-column label="电话问诊费用价格" align="center" prop="priceb" />
      <el-table-column label="擅长" align="center" prop="hasfix" />
      <el-table-column label="关于" align="center" prop="about" />
      <el-table-column label="简介" align="center" prop="case" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:demo_doctor:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:demo_doctor:remove']"
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

    <!-- 添加或修改公示信息--医生对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="医生姓名" prop="truename">
          <el-input v-model="form.truename" placeholder="请输入医生姓名" />
        </el-form-item>
        <el-form-item label="医生职称" prop="dtitle">
          <el-input v-model="form.dtitle" placeholder="请输入医生职称" />
        </el-form-item>
        <el-form-item label="${comment}" prop="address">
          <el-input v-model="form.address" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="医院姓名" prop="hospitalName">
          <el-input v-model="form.hospitalName" placeholder="请输入医院姓名" />
        </el-form-item>
        <el-form-item label="面诊费用价格" prop="pricea">
          <el-input v-model="form.pricea" placeholder="请输入面诊费用价格" />
        </el-form-item>
        <el-form-item label="电话问诊费用价格" prop="priceb">
          <el-input v-model="form.priceb" placeholder="请输入电话问诊费用价格" />
        </el-form-item>
        <el-form-item label="擅长" prop="hasfix">
          <el-input v-model="form.hasfix" placeholder="请输入擅长" />
        </el-form-item>
        <el-form-item label="关于" prop="about">
          <el-input v-model="form.about" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="简介" prop="case">
          <el-input v-model="form.case" placeholder="请输入简介" />
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
import { listDemo_doctor, getDemo_doctor, delDemo_doctor, addDemo_doctor, updateDemo_doctor } from "@/api/basic/demo_doctor";

export default {
  name: "Demo_doctor",
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
      // 公示信息--医生表格数据
      demo_doctorList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        truename: null,
        dtitle: null,
        sex: null,
        address: null,
        hospitalName: null,
        pricea: null,
        priceb: null,
        hasfix: null,
        about: null,
        case: null
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
    /** 查询公示信息--医生列表 */
    getList() {
      this.loading = true;
      listDemo_doctor(this.queryParams).then(response => {
        this.demo_doctorList = response.rows;
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
        truename: null,
        dtitle: null,
        sex: null,
        address: null,
        hospitalName: null,
        pricea: null,
        priceb: null,
        hasfix: null,
        about: null,
        case: null
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
      this.title = "添加公示信息--医生";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getDemo_doctor(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改公示信息--医生";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateDemo_doctor(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDemo_doctor(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除公示信息--医生编号为"' + ids + '"的数据项？').then(function() {
        return delDemo_doctor(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('basic/demo_doctor/export', {
        ...this.queryParams
      }, `demo_doctor_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
