<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="所属医院、诊所" prop="hospitalId">
        <el-input
          v-model="queryParams.hospitalId"
          placeholder="请输入所属医院、诊所"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="微信openid" prop="openid">
        <el-input
          v-model="queryParams.openid"
          placeholder="请输入微信openid"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="患者电话" prop="mobile">
        <el-input
          v-model="queryParams.mobile"
          placeholder="请输入患者电话"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label=" 登录密码" prop="password">
        <el-input
          v-model="queryParams.password"
          placeholder="请输入 登录密码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="birthday">
        <el-input
          v-model="queryParams.birthday"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="idCard">
        <el-input
          v-model="queryParams.idCard"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="mobile1">
        <el-input
          v-model="queryParams.mobile1"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否完善信息，0否1已完善" prop="isFinal">
        <el-input
          v-model="queryParams.isFinal"
          placeholder="请输入是否完善信息，0否1已完善"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="最后登录ip" prop="lastLoginIp">
        <el-input
          v-model="queryParams.lastLoginIp"
          placeholder="请输入最后登录ip"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="最后登录时间" prop="lastLoginTime">
        <el-input
          v-model="queryParams.lastLoginTime"
          placeholder="请输入最后登录时间"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="地址信息" prop="address">
        <el-input
          v-model="queryParams.address"
          placeholder="请输入地址信息"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="省区id" prop="provinceId">
        <el-input
          v-model="queryParams.provinceId"
          placeholder="请输入省区id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="市区id" prop="cityId">
        <el-input
          v-model="queryParams.cityId"
          placeholder="请输入市区id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="县区id" prop="districtId">
        <el-input
          v-model="queryParams.districtId"
          placeholder="请输入县区id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="过敏信息" prop="allergyInfo">
        <el-input
          v-model="queryParams.allergyInfo"
          placeholder="请输入过敏信息"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否移除 0：正常 1：删除" prop="isDel">
        <el-input
          v-model="queryParams.isDel"
          placeholder="请输入是否移除 0：正常 1：删除"
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
          v-hasPermi="['basic:patient:add']"
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
          v-hasPermi="['basic:patient:edit']"
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
          v-hasPermi="['basic:patient:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['basic:patient:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="patientList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="patientId" />
      <el-table-column label="所属医院、诊所" align="center" prop="hospitalId" />
      <el-table-column label="${comment}" align="center" prop="name" />
      <el-table-column label="微信openid" align="center" prop="openid" />
      <el-table-column label="患者电话" align="center" prop="mobile" />
      <el-table-column label=" 登录密码" align="center" prop="password" />
      <el-table-column label="患者性别1男2女" align="center" prop="sex" />
      <el-table-column label="${comment}" align="center" prop="birthday" />
      <el-table-column label="${comment}" align="center" prop="idCard" />
      <el-table-column label="${comment}" align="center" prop="mobile1" />
      <el-table-column label="是否完善信息，0否1已完善" align="center" prop="isFinal" />
      <el-table-column label="最后登录ip" align="center" prop="lastLoginIp" />
      <el-table-column label="最后登录时间" align="center" prop="lastLoginTime" />
      <el-table-column label="地址信息" align="center" prop="address" />
      <el-table-column label="省区id" align="center" prop="provinceId" />
      <el-table-column label="市区id" align="center" prop="cityId" />
      <el-table-column label="县区id" align="center" prop="districtId" />
      <el-table-column label="过敏信息" align="center" prop="allergyInfo" />
      <el-table-column label="是否移除 0：正常 1：删除" align="center" prop="isDel" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:patient:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:patient:remove']"
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

    <!-- 添加或修改患者用户对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="所属医院、诊所" prop="hospitalId">
          <el-input v-model="form.hospitalId" placeholder="请输入所属医院、诊所" />
        </el-form-item>
        <el-form-item label="${comment}" prop="name">
          <el-input v-model="form.name" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="微信openid" prop="openid">
          <el-input v-model="form.openid" placeholder="请输入微信openid" />
        </el-form-item>
        <el-form-item label="患者电话" prop="mobile">
          <el-input v-model="form.mobile" placeholder="请输入患者电话" />
        </el-form-item>
        <el-form-item label=" 登录密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入 登录密码" />
        </el-form-item>
        <el-form-item label="${comment}" prop="birthday">
          <el-input v-model="form.birthday" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="idCard">
          <el-input v-model="form.idCard" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="mobile1">
          <el-input v-model="form.mobile1" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="是否完善信息，0否1已完善" prop="isFinal">
          <el-input v-model="form.isFinal" placeholder="请输入是否完善信息，0否1已完善" />
        </el-form-item>
        <el-form-item label="最后登录ip" prop="lastLoginIp">
          <el-input v-model="form.lastLoginIp" placeholder="请输入最后登录ip" />
        </el-form-item>
        <el-form-item label="最后登录时间" prop="lastLoginTime">
          <el-input v-model="form.lastLoginTime" placeholder="请输入最后登录时间" />
        </el-form-item>
        <el-form-item label="地址信息" prop="address">
          <el-input v-model="form.address" placeholder="请输入地址信息" />
        </el-form-item>
        <el-form-item label="省区id" prop="provinceId">
          <el-input v-model="form.provinceId" placeholder="请输入省区id" />
        </el-form-item>
        <el-form-item label="市区id" prop="cityId">
          <el-input v-model="form.cityId" placeholder="请输入市区id" />
        </el-form-item>
        <el-form-item label="县区id" prop="districtId">
          <el-input v-model="form.districtId" placeholder="请输入县区id" />
        </el-form-item>
        <el-form-item label="过敏信息" prop="allergyInfo">
          <el-input v-model="form.allergyInfo" placeholder="请输入过敏信息" />
        </el-form-item>
        <el-form-item label="是否移除 0：正常 1：删除" prop="isDel">
          <el-input v-model="form.isDel" placeholder="请输入是否移除 0：正常 1：删除" />
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
import { listPatient, getPatient, delPatient, addPatient, updatePatient } from "@/api/basic/patient";

export default {
  name: "Patient",
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
      // 患者用户表格数据
      patientList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        hospitalId: null,
        name: null,
        openid: null,
        mobile: null,
        password: null,
        sex: null,
        birthday: null,
        idCard: null,
        mobile1: null,
        isFinal: null,
        lastLoginIp: null,
        lastLoginTime: null,
        address: null,
        provinceId: null,
        cityId: null,
        districtId: null,
        allergyInfo: null,
        isDel: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: "$comment不能为空", trigger: "blur" }
        ],
        mobile: [
          { required: true, message: "患者电话不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "修改时间不能为空", trigger: "blur" }
        ],
        createTime: [
          { required: true, message: "注册时间不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询患者用户列表 */
    getList() {
      this.loading = true;
      listPatient(this.queryParams).then(response => {
        this.patientList = response.rows;
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
        patientId: null,
        hospitalId: null,
        name: null,
        openid: null,
        mobile: null,
        updateTime: null,
        password: null,
        sex: null,
        birthday: null,
        idCard: null,
        mobile1: null,
        isFinal: null,
        lastLoginIp: null,
        lastLoginTime: null,
        address: null,
        createTime: null,
        provinceId: null,
        cityId: null,
        districtId: null,
        allergyInfo: null,
        isDel: null
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
      this.ids = selection.map(item => item.patientId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加患者用户";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const patientId = row.patientId || this.ids
      getPatient(patientId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改患者用户";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.patientId != null) {
            updatePatient(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPatient(this.form).then(response => {
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
      const patientIds = row.patientId || this.ids;
      this.$modal.confirm('是否确认删除患者用户编号为"' + patientIds + '"的数据项？').then(function() {
        return delPatient(patientIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('basic/patient/export', {
        ...this.queryParams
      }, `patient_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
