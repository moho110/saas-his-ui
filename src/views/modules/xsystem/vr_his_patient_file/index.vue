<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="患者id" prop="patientId">
        <el-input
          v-model="queryParams.patientId"
          placeholder="请输入患者id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="紧急联系人" prop="emergencyContactName">
        <el-input
          v-model="queryParams.emergencyContactName"
          placeholder="请输入紧急联系人"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="紧急联系人电话" prop="emergencyContactMobile">
        <el-input
          v-model="queryParams.emergencyContactMobile"
          placeholder="请输入紧急联系人电话"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="紧急联系人关系 1：爸爸  2：妈妈  3：儿子  4：女儿  5：亲戚  6：朋友" prop="emergencyContactRelation">
        <el-input
          v-model="queryParams.emergencyContactRelation"
          placeholder="请输入紧急联系人关系 1：爸爸  2：妈妈  3：儿子  4：女儿  5：亲戚  6：朋友"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="左耳听力 1：正常  2：耳聋" prop="leftEarHearing">
        <el-input
          v-model="queryParams.leftEarHearing"
          placeholder="请输入左耳听力 1：正常  2：耳聋"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="右耳听力 1：正常  2：耳聋" prop="rightEarHearing">
        <el-input
          v-model="queryParams.rightEarHearing"
          placeholder="请输入右耳听力 1：正常  2：耳聋"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="左眼视力" prop="leftVision">
        <el-input
          v-model="queryParams.leftVision"
          placeholder="请输入左眼视力"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="右眼视力" prop="rightVision">
        <el-input
          v-model="queryParams.rightVision"
          placeholder="请输入右眼视力"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="身高" prop="height">
        <el-input
          v-model="queryParams.height"
          placeholder="请输入身高"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="体重" prop="weight">
        <el-input
          v-model="queryParams.weight"
          placeholder="请输入体重"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="个人史" prop="personalInfo">
        <el-input
          v-model="queryParams.personalInfo"
          placeholder="请输入个人史"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="家族史" prop="familyInfo">
        <el-input
          v-model="queryParams.familyInfo"
          placeholder="请输入家族史"
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
          v-hasPermi="['basic:vr_his_patient_file:add']"
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
          v-hasPermi="['basic:vr_his_patient_file:edit']"
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
          v-hasPermi="['basic:vr_his_patient_file:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['basic:vr_his_patient_file:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="vr_his_patient_fileList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="fileId" />
      <el-table-column label="患者id" align="center" prop="patientId" />
      <el-table-column label="紧急联系人" align="center" prop="emergencyContactName" />
      <el-table-column label="紧急联系人电话" align="center" prop="emergencyContactMobile" />
      <el-table-column label="紧急联系人关系 1：爸爸  2：妈妈  3：儿子  4：女儿  5：亲戚  6：朋友" align="center" prop="emergencyContactRelation" />
      <el-table-column label="左耳听力 1：正常  2：耳聋" align="center" prop="leftEarHearing" />
      <el-table-column label="右耳听力 1：正常  2：耳聋" align="center" prop="rightEarHearing" />
      <el-table-column label="左眼视力" align="center" prop="leftVision" />
      <el-table-column label="右眼视力" align="center" prop="rightVision" />
      <el-table-column label="身高" align="center" prop="height" />
      <el-table-column label="体重" align="center" prop="weight" />
      <el-table-column label="血型 1:A 2:B 3:AB 4:O    Rh血型 1:阴性 2:阳性" align="center" prop="bloodType" />
      <el-table-column label="个人史" align="center" prop="personalInfo" />
      <el-table-column label="家族史" align="center" prop="familyInfo" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:vr_his_patient_file:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:vr_his_patient_file:remove']"
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

    <!-- 添加或修改患者用户档案对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="患者id" prop="patientId">
          <el-input v-model="form.patientId" placeholder="请输入患者id" />
        </el-form-item>
        <el-form-item label="紧急联系人" prop="emergencyContactName">
          <el-input v-model="form.emergencyContactName" placeholder="请输入紧急联系人" />
        </el-form-item>
        <el-form-item label="紧急联系人电话" prop="emergencyContactMobile">
          <el-input v-model="form.emergencyContactMobile" placeholder="请输入紧急联系人电话" />
        </el-form-item>
        <el-form-item label="紧急联系人关系 1：爸爸  2：妈妈  3：儿子  4：女儿  5：亲戚  6：朋友" prop="emergencyContactRelation">
          <el-input v-model="form.emergencyContactRelation" placeholder="请输入紧急联系人关系 1：爸爸  2：妈妈  3：儿子  4：女儿  5：亲戚  6：朋友" />
        </el-form-item>
        <el-form-item label="左耳听力 1：正常  2：耳聋" prop="leftEarHearing">
          <el-input v-model="form.leftEarHearing" placeholder="请输入左耳听力 1：正常  2：耳聋" />
        </el-form-item>
        <el-form-item label="右耳听力 1：正常  2：耳聋" prop="rightEarHearing">
          <el-input v-model="form.rightEarHearing" placeholder="请输入右耳听力 1：正常  2：耳聋" />
        </el-form-item>
        <el-form-item label="左眼视力" prop="leftVision">
          <el-input v-model="form.leftVision" placeholder="请输入左眼视力" />
        </el-form-item>
        <el-form-item label="右眼视力" prop="rightVision">
          <el-input v-model="form.rightVision" placeholder="请输入右眼视力" />
        </el-form-item>
        <el-form-item label="身高" prop="height">
          <el-input v-model="form.height" placeholder="请输入身高" />
        </el-form-item>
        <el-form-item label="体重" prop="weight">
          <el-input v-model="form.weight" placeholder="请输入体重" />
        </el-form-item>
        <el-form-item label="个人史" prop="personalInfo">
          <el-input v-model="form.personalInfo" placeholder="请输入个人史" />
        </el-form-item>
        <el-form-item label="家族史" prop="familyInfo">
          <el-input v-model="form.familyInfo" placeholder="请输入家族史" />
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
import { listVr_his_patient_file, getVr_his_patient_file, delVr_his_patient_file, addVr_his_patient_file, updateVr_his_patient_file } from "@/api/basic/vr_his_patient_file";

export default {
  name: "Vr_his_patient_file",
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
      // 患者用户档案表格数据
      vr_his_patient_fileList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        patientId: null,
        emergencyContactName: null,
        emergencyContactMobile: null,
        emergencyContactRelation: null,
        leftEarHearing: null,
        rightEarHearing: null,
        leftVision: null,
        rightVision: null,
        height: null,
        weight: null,
        bloodType: null,
        personalInfo: null,
        familyInfo: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        patientId: [
          { required: true, message: "患者id不能为空", trigger: "blur" }
        ],
        emergencyContactName: [
          { required: true, message: "紧急联系人不能为空", trigger: "blur" }
        ],
        emergencyContactMobile: [
          { required: true, message: "紧急联系人电话不能为空", trigger: "blur" }
        ],
        emergencyContactRelation: [
          { required: true, message: "紧急联系人关系 1：爸爸  2：妈妈  3：儿子  4：女儿  5：亲戚  6：朋友不能为空", trigger: "blur" }
        ],
        leftEarHearing: [
          { required: true, message: "左耳听力 1：正常  2：耳聋不能为空", trigger: "blur" }
        ],
        rightEarHearing: [
          { required: true, message: "右耳听力 1：正常  2：耳聋不能为空", trigger: "blur" }
        ],
        leftVision: [
          { required: true, message: "左眼视力不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "修改时间不能为空", trigger: "blur" }
        ],
        rightVision: [
          { required: true, message: "右眼视力不能为空", trigger: "blur" }
        ],
        height: [
          { required: true, message: "身高不能为空", trigger: "blur" }
        ],
        weight: [
          { required: true, message: "体重不能为空", trigger: "blur" }
        ],
        bloodType: [
          { required: true, message: "血型 1:A 2:B 3:AB 4:O    Rh血型 1:阴性 2:阳性不能为空", trigger: "change" }
        ],
        createTime: [
          { required: true, message: "创建时间不能为空", trigger: "blur" }
        ],
        personalInfo: [
          { required: true, message: "个人史不能为空", trigger: "blur" }
        ],
        familyInfo: [
          { required: true, message: "家族史不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询患者用户档案列表 */
    getList() {
      this.loading = true;
      listVr_his_patient_file(this.queryParams).then(response => {
        this.vr_his_patient_fileList = response.rows;
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
        fileId: null,
        patientId: null,
        emergencyContactName: null,
        emergencyContactMobile: null,
        emergencyContactRelation: null,
        leftEarHearing: null,
        rightEarHearing: null,
        leftVision: null,
        updateTime: null,
        rightVision: null,
        height: null,
        weight: null,
        bloodType: null,
        createTime: null,
        personalInfo: null,
        familyInfo: null
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
      this.ids = selection.map(item => item.fileId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加患者用户档案";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const fileId = row.fileId || this.ids
      getVr_his_patient_file(fileId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改患者用户档案";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.fileId != null) {
            updateVr_his_patient_file(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addVr_his_patient_file(this.form).then(response => {
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
      const fileIds = row.fileId || this.ids;
      this.$modal.confirm('是否确认删除患者用户档案编号为"' + fileIds + '"的数据项？').then(function() {
        return delVr_his_patient_file(fileIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('basic/vr_his_patient_file/export', {
        ...this.queryParams
      }, `vr_his_patient_file_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
