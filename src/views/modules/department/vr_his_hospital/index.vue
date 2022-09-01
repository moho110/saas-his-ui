<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="医院名称" prop="hospitalName">
        <el-input
          v-model="queryParams.hospitalName"
          placeholder="请输入医院名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="头像" prop="picture">
        <el-input
          v-model="queryParams.picture"
          placeholder="请输入头像"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="医院编号" prop="hospitalNumber">
        <el-input
          v-model="queryParams.hospitalNumber"
          placeholder="请输入医院编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户表userid" prop="hid">
        <el-input
          v-model="queryParams.hid"
          placeholder="请输入用户表userid"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="医院地址" prop="address">
        <el-input
          v-model="queryParams.address"
          placeholder="请输入医院地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所有者姓名" prop="ownerName">
        <el-input
          v-model="queryParams.ownerName"
          placeholder="请输入所有者姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所有者手机号" prop="ownerMobile">
        <el-input
          v-model="queryParams.ownerMobile"
          placeholder="请输入所有者手机号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属者职务" prop="ownerPost">
        <el-input
          v-model="queryParams.ownerPost"
          placeholder="请输入所属者职务"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="专业方向" prop="majorField">
        <el-input
          v-model="queryParams.majorField"
          placeholder="请输入专业方向"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="诊所简介" prop="introduction">
        <el-input
          v-model="queryParams.introduction"
          placeholder="请输入诊所简介"
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
          v-hasPermi="['basic:vr_his_hospital:add']"
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
          v-hasPermi="['basic:vr_his_hospital:edit']"
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
          v-hasPermi="['basic:vr_his_hospital:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['basic:vr_his_hospital:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="vr_his_hospitalList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="用户id" align="center" prop="id" />
      <el-table-column label="医院名称" align="center" prop="hospitalName" />
      <el-table-column label="头像" align="center" prop="picture" />
      <el-table-column label="医院编号" align="center" prop="hospitalNumber" />
      <el-table-column label="用户表userid" align="center" prop="hid" />
      <el-table-column label="医院地址" align="center" prop="address" />
      <el-table-column label="所有者姓名" align="center" prop="ownerName" />
      <el-table-column label="所有者手机号" align="center" prop="ownerMobile" />
      <el-table-column label="所属者职务" align="center" prop="ownerPost" />
      <el-table-column label="专业方向" align="center" prop="majorField" />
      <el-table-column label="诊所简介" align="center" prop="introduction" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:vr_his_hospital:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:vr_his_hospital:remove']"
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

    <!-- 添加或修改HIS医院基本信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="医院名称" prop="hospitalName">
          <el-input v-model="form.hospitalName" placeholder="请输入医院名称" />
        </el-form-item>
        <el-form-item label="头像" prop="picture">
          <el-input v-model="form.picture" placeholder="请输入头像" />
        </el-form-item>
        <el-form-item label="医院编号" prop="hospitalNumber">
          <el-input v-model="form.hospitalNumber" placeholder="请输入医院编号" />
        </el-form-item>
        <el-form-item label="用户表userid" prop="hid">
          <el-input v-model="form.hid" placeholder="请输入用户表userid" />
        </el-form-item>
        <el-form-item label="医院地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入医院地址" />
        </el-form-item>
        <el-form-item label="所有者姓名" prop="ownerName">
          <el-input v-model="form.ownerName" placeholder="请输入所有者姓名" />
        </el-form-item>
        <el-form-item label="所有者手机号" prop="ownerMobile">
          <el-input v-model="form.ownerMobile" placeholder="请输入所有者手机号" />
        </el-form-item>
        <el-form-item label="所属者职务" prop="ownerPost">
          <el-input v-model="form.ownerPost" placeholder="请输入所属者职务" />
        </el-form-item>
        <el-form-item label="专业方向" prop="majorField">
          <el-input v-model="form.majorField" placeholder="请输入专业方向" />
        </el-form-item>
        <el-form-item label="诊所简介" prop="introduction">
          <el-input v-model="form.introduction" placeholder="请输入诊所简介" />
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
import { listVr_his_hospital, getVr_his_hospital, delVr_his_hospital, addVr_his_hospital, updateVr_his_hospital } from "@/api/basic/vr_his_hospital";

export default {
  name: "Vr_his_hospital",
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
      // HIS医院基本信息表格数据
      vr_his_hospitalList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        hospitalName: null,
        picture: null,
        hospitalNumber: null,
        hid: null,
        address: null,
        ownerName: null,
        ownerMobile: null,
        ownerPost: null,
        majorField: null,
        introduction: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        hospitalName: [
          { required: true, message: "医院名称不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "注册时间不能为空", trigger: "blur" }
        ],
        hospitalNumber: [
          { required: true, message: "医院编号不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "修改时间不能为空", trigger: "blur" }
        ],
        hid: [
          { required: true, message: "用户表userid不能为空", trigger: "blur" }
        ],
        address: [
          { required: true, message: "医院地址不能为空", trigger: "blur" }
        ],
        ownerName: [
          { required: true, message: "所有者姓名不能为空", trigger: "blur" }
        ],
        ownerMobile: [
          { required: true, message: "所有者手机号不能为空", trigger: "blur" }
        ],
        ownerPost: [
          { required: true, message: "所属者职务不能为空", trigger: "blur" }
        ],
        majorField: [
          { required: true, message: "专业方向不能为空", trigger: "blur" }
        ],
        introduction: [
          { required: true, message: "诊所简介不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询HIS医院基本信息列表 */
    getList() {
      this.loading = true;
      listVr_his_hospital(this.queryParams).then(response => {
        this.vr_his_hospitalList = response.rows;
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
        hospitalName: null,
        picture: null,
        createTime: null,
        hospitalNumber: null,
        updateTime: null,
        hid: null,
        address: null,
        ownerName: null,
        ownerMobile: null,
        ownerPost: null,
        majorField: null,
        introduction: null
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
      this.title = "添加HIS医院基本信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getVr_his_hospital(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改HIS医院基本信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateVr_his_hospital(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addVr_his_hospital(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除HIS医院基本信息编号为"' + ids + '"的数据项？').then(function() {
        return delVr_his_hospital(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('basic/vr_his_hospital/export', {
        ...this.queryParams
      }, `vr_his_hospital_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
