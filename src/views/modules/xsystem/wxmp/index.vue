<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="所属用户" prop="userid">
        <el-input
          v-model="queryParams.userid"
          placeholder="请输入所属用户"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公众平台appid" prop="appid">
        <el-input
          v-model="queryParams.appid"
          placeholder="请输入公众平台appid"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="公众平台appsecret" prop="appsecret">
        <el-input
          v-model="queryParams.appsecret"
          placeholder="请输入公众平台appsecret"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="微信后台填写的TOKEN,自动回复" prop="token">
        <el-input
          v-model="queryParams.token"
          placeholder="请输入微信后台填写的TOKEN,自动回复"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="微信后台填写的EncodingAESKey，自动回复" prop="encodingaeskey">
        <el-input
          v-model="queryParams.encodingaeskey"
          placeholder="请输入微信后台填写的EncodingAESKey，自动回复"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="过期时间，php时间戳" prop="accessTokenExpires">
        <el-input
          v-model="queryParams.accessTokenExpires"
          placeholder="请输入过期时间，php时间戳"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="jsapi_ticket过期时间" prop="jsapiTicketExpires">
        <el-input
          v-model="queryParams.jsapiTicketExpires"
          placeholder="请输入jsapi_ticket过期时间"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="微信支付企业帐号" prop="mchid">
        <el-input
          v-model="queryParams.mchid"
          placeholder="请输入微信支付企业帐号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="微信支付key" prop="mchkey">
        <el-input
          v-model="queryParams.mchkey"
          placeholder="请输入微信支付key"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="微信企业付款证书部分路径" prop="sslCertPath">
        <el-input
          v-model="queryParams.sslCertPath"
          placeholder="请输入微信企业付款证书部分路径"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="支付宝app_id" prop="appId">
        <el-input
          v-model="queryParams.appId"
          placeholder="请输入支付宝app_id"
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
          v-hasPermi="['basic:wxmp:add']"
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
          v-hasPermi="['basic:wxmp:edit']"
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
          v-hasPermi="['basic:wxmp:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['basic:wxmp:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="wxmpList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="${comment}" align="center" prop="id" />
      <el-table-column label="所属用户" align="center" prop="userid" />
      <el-table-column label="公众平台appid" align="center" prop="appid" />
      <el-table-column label="公众平台appsecret" align="center" prop="appsecret" />
      <el-table-column label="微信后台填写的TOKEN,自动回复" align="center" prop="token" />
      <el-table-column label="微信后台填写的EncodingAESKey，自动回复" align="center" prop="encodingaeskey" />
      <el-table-column label="${comment}" align="center" prop="accessToken" />
      <el-table-column label="过期时间，php时间戳" align="center" prop="accessTokenExpires" />
      <el-table-column label="jsapi_ticket" align="center" prop="jsapiTicket" />
      <el-table-column label="jsapi_ticket过期时间" align="center" prop="jsapiTicketExpires" />
      <el-table-column label="微信支付企业帐号" align="center" prop="mchid" />
      <el-table-column label="微信支付key" align="center" prop="mchkey" />
      <el-table-column label="微信企业付款证书部分路径" align="center" prop="sslCertPath" />
      <el-table-column label="支付宝app_id" align="center" prop="appId" />
      <el-table-column label="支付宝商户私钥，您的原始格式RSA私钥" align="center" prop="merchantPrivateKey" />
      <el-table-column label="支付宝公钥" align="center" prop="alipayPublicKey" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:wxmp:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:wxmp:remove']"
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

    <!-- 添加或修改微信公众平台信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="所属用户" prop="userid">
          <el-input v-model="form.userid" placeholder="请输入所属用户" />
        </el-form-item>
        <el-form-item label="公众平台appid" prop="appid">
          <el-input v-model="form.appid" placeholder="请输入公众平台appid" />
        </el-form-item>
        <el-form-item label="公众平台appsecret" prop="appsecret">
          <el-input v-model="form.appsecret" placeholder="请输入公众平台appsecret" />
        </el-form-item>
        <el-form-item label="微信后台填写的TOKEN,自动回复" prop="token">
          <el-input v-model="form.token" placeholder="请输入微信后台填写的TOKEN,自动回复" />
        </el-form-item>
        <el-form-item label="微信后台填写的EncodingAESKey，自动回复" prop="encodingaeskey">
          <el-input v-model="form.encodingaeskey" placeholder="请输入微信后台填写的EncodingAESKey，自动回复" />
        </el-form-item>
        <el-form-item label="${comment}" prop="accessToken">
          <el-input v-model="form.accessToken" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="过期时间，php时间戳" prop="accessTokenExpires">
          <el-input v-model="form.accessTokenExpires" placeholder="请输入过期时间，php时间戳" />
        </el-form-item>
        <el-form-item label="jsapi_ticket" prop="jsapiTicket">
          <el-input v-model="form.jsapiTicket" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="jsapi_ticket过期时间" prop="jsapiTicketExpires">
          <el-input v-model="form.jsapiTicketExpires" placeholder="请输入jsapi_ticket过期时间" />
        </el-form-item>
        <el-form-item label="微信支付企业帐号" prop="mchid">
          <el-input v-model="form.mchid" placeholder="请输入微信支付企业帐号" />
        </el-form-item>
        <el-form-item label="微信支付key" prop="mchkey">
          <el-input v-model="form.mchkey" placeholder="请输入微信支付key" />
        </el-form-item>
        <el-form-item label="微信企业付款证书部分路径" prop="sslCertPath">
          <el-input v-model="form.sslCertPath" placeholder="请输入微信企业付款证书部分路径" />
        </el-form-item>
        <el-form-item label="支付宝app_id" prop="appId">
          <el-input v-model="form.appId" placeholder="请输入支付宝app_id" />
        </el-form-item>
        <el-form-item label="支付宝商户私钥，您的原始格式RSA私钥" prop="merchantPrivateKey">
          <el-input v-model="form.merchantPrivateKey" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="支付宝公钥" prop="alipayPublicKey">
          <el-input v-model="form.alipayPublicKey" type="textarea" placeholder="请输入内容" />
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
import { listWxmp, getWxmp, delWxmp, addWxmp, updateWxmp } from "@/api/basic/wxmp";

export default {
  name: "Wxmp",
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
      // 微信公众平台信息表格数据
      wxmpList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userid: null,
        appid: null,
        appsecret: null,
        token: null,
        encodingaeskey: null,
        accessToken: null,
        accessTokenExpires: null,
        jsapiTicket: null,
        jsapiTicketExpires: null,
        mchid: null,
        mchkey: null,
        sslCertPath: null,
        appId: null,
        merchantPrivateKey: null,
        alipayPublicKey: null
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
    /** 查询微信公众平台信息列表 */
    getList() {
      this.loading = true;
      listWxmp(this.queryParams).then(response => {
        this.wxmpList = response.rows;
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
        userid: null,
        appid: null,
        appsecret: null,
        token: null,
        encodingaeskey: null,
        accessToken: null,
        accessTokenExpires: null,
        jsapiTicket: null,
        jsapiTicketExpires: null,
        mchid: null,
        mchkey: null,
        sslCertPath: null,
        appId: null,
        merchantPrivateKey: null,
        alipayPublicKey: null
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
      this.title = "添加微信公众平台信息";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getWxmp(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改微信公众平台信息";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateWxmp(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addWxmp(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除微信公众平台信息编号为"' + ids + '"的数据项？').then(function() {
        return delWxmp(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('basic/wxmp/export', {
        ...this.queryParams
      }, `wxmp_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
