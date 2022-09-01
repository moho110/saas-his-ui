<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="登录名" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入登录名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="登录密码" prop="password">
        <el-input
          v-model="queryParams.password"
          placeholder="请输入登录密码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="最后一次登录时间" prop="lastLoginTime">
        <el-input
          v-model="queryParams.lastLoginTime"
          placeholder="请输入最后一次登录时间"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="lastLoginIp">
        <el-input
          v-model="queryParams.lastLoginIp"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="医院id，用于区分用户类型及其医生所属诊所" prop="pId">
        <el-input
          v-model="queryParams.pId"
          placeholder="请输入医院id，用于区分用户类型及其医生所属诊所"
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
      <el-form-item label="医生级别 0:其他  1:主治医师  2:副主任医师  3:主任医师  4:医士  5:医师  6:助理医师  7:实习医师  8:主管护师  9:护师  10:护士  11:医师助理  12:研究生  13:随访员 " prop="rank">
        <el-input
          v-model="queryParams.rank"
          placeholder="请输入医生级别 0:其他  1:主治医师  2:副主任医师  3:主任医师  4:医士  5:医师  6:助理医师  7:实习医师  8:主管护师  9:护师  10:护士  11:医师助理  12:研究生  13:随访员 "
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="二维码标识" prop="qrid">
        <el-input
          v-model="queryParams.qrid"
          placeholder="请输入二维码标识"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户授权登录openid" prop="openid">
        <el-input
          v-model="queryParams.openid"
          placeholder="请输入用户授权登录openid"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用户余额" prop="moneyBalance">
        <el-input
          v-model="queryParams.moneyBalance"
          placeholder="请输入用户余额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="冻结中余额" prop="moneyLock">
        <el-input
          v-model="queryParams.moneyLock"
          placeholder="请输入冻结中余额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="邀请码" prop="recommentCode">
        <el-input
          v-model="queryParams.recommentCode"
          placeholder="请输入邀请码"
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
          v-hasPermi="['basic:member:add']"
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
          v-hasPermi="['basic:member:edit']"
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
          v-hasPermi="['basic:member:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['basic:member:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="memberList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="用户id" align="center" prop="uid" />
      <el-table-column label="登录名" align="center" prop="userName" />
      <el-table-column label="登录密码" align="center" prop="password" />
      <el-table-column label="最后一次登录时间" align="center" prop="lastLoginTime" />
      <el-table-column label="${comment}" align="center" prop="lastLoginIp" />
      <el-table-column label="是否允许用户登录( 1 是  2否) 3 删除" align="center" prop="status" />
      <el-table-column label="医院id，用于区分用户类型及其医生所属诊所" align="center" prop="pId" />
      <el-table-column label="1,管理员，2，医生，3.护士，4，挂号员，5，收费员6，发药员，7，财务8，其他人员" align="center" prop="type" />
      <el-table-column label="科室id" align="center" prop="departmentId" />
      <el-table-column label="医生级别 0:其他  1:主治医师  2:副主任医师  3:主任医师  4:医士  5:医师  6:助理医师  7:实习医师  8:主管护师  9:护师  10:护士  11:医师助理  12:研究生  13:随访员 " align="center" prop="rank" />
      <el-table-column label="二维码标识" align="center" prop="qrid" />
      <el-table-column label="用户授权登录openid" align="center" prop="openid" />
      <el-table-column label="用户余额" align="center" prop="moneyBalance" />
      <el-table-column label="冻结中余额" align="center" prop="moneyLock" />
      <el-table-column label="邀请码" align="center" prop="recommentCode" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:member:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:member:remove']"
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

    <!-- 添加或修改HIS用户对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="登录名" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入登录名" />
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="form.password" placeholder="请输入登录密码" />
        </el-form-item>
        <el-form-item label="最后一次登录时间" prop="lastLoginTime">
          <el-input v-model="form.lastLoginTime" placeholder="请输入最后一次登录时间" />
        </el-form-item>
        <el-form-item label="${comment}" prop="lastLoginIp">
          <el-input v-model="form.lastLoginIp" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="医院id，用于区分用户类型及其医生所属诊所" prop="pId">
          <el-input v-model="form.pId" placeholder="请输入医院id，用于区分用户类型及其医生所属诊所" />
        </el-form-item>
        <el-form-item label="科室id" prop="departmentId">
          <el-input v-model="form.departmentId" placeholder="请输入科室id" />
        </el-form-item>
        <el-form-item label="医生级别 0:其他  1:主治医师  2:副主任医师  3:主任医师  4:医士  5:医师  6:助理医师  7:实习医师  8:主管护师  9:护师  10:护士  11:医师助理  12:研究生  13:随访员 " prop="rank">
          <el-input v-model="form.rank" placeholder="请输入医生级别 0:其他  1:主治医师  2:副主任医师  3:主任医师  4:医士  5:医师  6:助理医师  7:实习医师  8:主管护师  9:护师  10:护士  11:医师助理  12:研究生  13:随访员 " />
        </el-form-item>
        <el-form-item label="二维码标识" prop="qrid">
          <el-input v-model="form.qrid" placeholder="请输入二维码标识" />
        </el-form-item>
        <el-form-item label="用户授权登录openid" prop="openid">
          <el-input v-model="form.openid" placeholder="请输入用户授权登录openid" />
        </el-form-item>
        <el-form-item label="用户余额" prop="moneyBalance">
          <el-input v-model="form.moneyBalance" placeholder="请输入用户余额" />
        </el-form-item>
        <el-form-item label="冻结中余额" prop="moneyLock">
          <el-input v-model="form.moneyLock" placeholder="请输入冻结中余额" />
        </el-form-item>
        <el-form-item label="邀请码" prop="recommentCode">
          <el-input v-model="form.recommentCode" placeholder="请输入邀请码" />
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
import { listMember, getMember, delMember, addMember, updateMember } from "@/api/basic/member";

export default {
  name: "Member",
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
      // HIS用户表格数据
      memberList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: null,
        password: null,
        lastLoginTime: null,
        lastLoginIp: null,
        status: null,
        pId: null,
        type: null,
        departmentId: null,
        rank: null,
        qrid: null,
        openid: null,
        moneyBalance: null,
        moneyLock: null,
        recommentCode: null,
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
    /** 查询HIS用户列表 */
    getList() {
      this.loading = true;
      listMember(this.queryParams).then(response => {
        this.memberList = response.rows;
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
        uid: null,
        userName: null,
        password: null,
        lastLoginTime: null,
        lastLoginIp: null,
        createTime: null,
        status: 0,
        pId: null,
        type: null,
        departmentId: null,
        rank: null,
        qrid: null,
        openid: null,
        moneyBalance: null,
        moneyLock: null,
        recommentCode: null,
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
      this.ids = selection.map(item => item.uid)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加HIS用户";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const uid = row.uid || this.ids
      getMember(uid).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改HIS用户";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.uid != null) {
            updateMember(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addMember(this.form).then(response => {
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
      const uids = row.uid || this.ids;
      this.$modal.confirm('是否确认删除HIS用户编号为"' + uids + '"的数据项？').then(function() {
        return delMember(uids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('basic/member/export', {
        ...this.queryParams
      }, `member_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
