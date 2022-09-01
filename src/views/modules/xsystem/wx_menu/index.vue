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
      <el-form-item label="主菜单ID" prop="pid">
        <el-input
          v-model="queryParams.pid"
          placeholder="请输入主菜单ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="菜单标题，不超过16个字节，子菜单不超过60个字节" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入菜单标题，不超过16个字节，子菜单不超过60个字节"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="菜单KEY值，用于消息接口推送，不超过128字节" prop="key">
        <el-input
          v-model="queryParams.key"
          placeholder="请输入菜单KEY值，用于消息接口推送，不超过128字节"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="网页链接，用户点击菜单可打开链接，不超过1024字节。" prop="url">
        <el-input
          v-model="queryParams.url"
          placeholder="请输入网页链接，用户点击菜单可打开链接，不超过1024字节。"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="调用新增永久素材接口返回的合法media_id" prop="mediaId">
        <el-input
          v-model="queryParams.mediaId"
          placeholder="请输入调用新增永久素材接口返回的合法media_id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="${comment}" prop="appid">
        <el-input
          v-model="queryParams.appid"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="小程序的页面路径" prop="pagepath">
        <el-input
          v-model="queryParams.pagepath"
          placeholder="请输入小程序的页面路径"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="排序 ASC" prop="listorder">
        <el-input
          v-model="queryParams.listorder"
          placeholder="请输入排序 ASC"
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
          v-hasPermi="['basic:wx_menu:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          plain
          icon="el-icon-sort"
          size="mini"
          @click="toggleExpandAll"
        >展开/折叠</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table
      v-if="refreshTable"
      v-loading="loading"
      :data="wx_menuList"
      row-key="hospitalId"
      :default-expand-all="isExpandAll"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column label="医院id" prop="hospitalId" />
      <el-table-column label="主菜单ID" align="center" prop="pid" />
      <el-table-column label="菜单的响应动作类型" align="center" prop="type" />
      <el-table-column label="菜单标题，不超过16个字节，子菜单不超过60个字节" align="center" prop="name" />
      <el-table-column label="菜单KEY值，用于消息接口推送，不超过128字节" align="center" prop="key" />
      <el-table-column label="网页链接，用户点击菜单可打开链接，不超过1024字节。" align="center" prop="url" />
      <el-table-column label="调用新增永久素材接口返回的合法media_id" align="center" prop="mediaId" />
      <el-table-column label="${comment}" align="center" prop="appid" />
      <el-table-column label="小程序的页面路径" align="center" prop="pagepath" />
      <el-table-column label="排序 ASC" align="center" prop="listorder" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:wx_menu:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-plus"
            @click="handleAdd(scope.row)"
            v-hasPermi="['basic:wx_menu:add']"
          >新增</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:wx_menu:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改保存微信公众平台菜单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="医院id" prop="hospitalId">
          <el-input v-model="form.hospitalId" placeholder="请输入医院id" />
        </el-form-item>
        <el-form-item label="主菜单ID" prop="pid">
          <treeselect v-model="form.pid" :options="wx_menuOptions" :normalizer="normalizer" placeholder="请选择主菜单ID" />
        </el-form-item>
        <el-form-item label="菜单标题，不超过16个字节，子菜单不超过60个字节" prop="name">
          <el-input v-model="form.name" placeholder="请输入菜单标题，不超过16个字节，子菜单不超过60个字节" />
        </el-form-item>
        <el-form-item label="菜单KEY值，用于消息接口推送，不超过128字节" prop="key">
          <el-input v-model="form.key" placeholder="请输入菜单KEY值，用于消息接口推送，不超过128字节" />
        </el-form-item>
        <el-form-item label="网页链接，用户点击菜单可打开链接，不超过1024字节。" prop="url">
          <el-input v-model="form.url" placeholder="请输入网页链接，用户点击菜单可打开链接，不超过1024字节。" />
        </el-form-item>
        <el-form-item label="调用新增永久素材接口返回的合法media_id" prop="mediaId">
          <el-input v-model="form.mediaId" placeholder="请输入调用新增永久素材接口返回的合法media_id" />
        </el-form-item>
        <el-form-item label="${comment}" prop="appid">
          <el-input v-model="form.appid" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="小程序的页面路径" prop="pagepath">
          <el-input v-model="form.pagepath" placeholder="请输入小程序的页面路径" />
        </el-form-item>
        <el-form-item label="排序 ASC" prop="listorder">
          <el-input v-model="form.listorder" placeholder="请输入排序 ASC" />
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
import { listWx_menu, getWx_menu, delWx_menu, addWx_menu, updateWx_menu } from "@/api/basic/wx_menu";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "Wx_menu",
  components: {
    Treeselect
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 显示搜索条件
      showSearch: true,
      // 保存微信公众平台菜单表格数据
      wx_menuList: [],
      // 保存微信公众平台菜单树选项
      wx_menuOptions: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否展开，默认全部展开
      isExpandAll: true,
      // 重新渲染表格状态
      refreshTable: true,
      // 查询参数
      queryParams: {
        hospitalId: null,
        pid: null,
        type: null,
        name: null,
        key: null,
        url: null,
        mediaId: null,
        appid: null,
        pagepath: null,
        listorder: null
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
    /** 查询保存微信公众平台菜单列表 */
    getList() {
      this.loading = true;
      listWx_menu(this.queryParams).then(response => {
        this.wx_menuList = this.handleTree(response.data, "hospitalId", "pid");
        this.loading = false;
      });
    },
    /** 转换保存微信公众平台菜单数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.hospitalId,
        label: node.name,
        children: node.children
      };
    },
	/** 查询保存微信公众平台菜单下拉树结构 */
    getTreeselect() {
      listWx_menu().then(response => {
        this.wx_menuOptions = [];
        const data = { hospitalId: 0, name: '顶级节点', children: [] };
        data.children = this.handleTree(response.data, "hospitalId", "pid");
        this.wx_menuOptions.push(data);
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
        pid: null,
        type: null,
        name: null,
        key: null,
        url: null,
        mediaId: null,
        appid: null,
        pagepath: null,
        listorder: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset();
      this.getTreeselect();
      if (row != null && row.hospitalId) {
        this.form.pid = row.hospitalId;
      } else {
        this.form.pid = 0;
      }
      this.open = true;
      this.title = "添加保存微信公众平台菜单";
    },
    /** 展开/折叠操作 */
    toggleExpandAll() {
      this.refreshTable = false;
      this.isExpandAll = !this.isExpandAll;
      this.$nextTick(() => {
        this.refreshTable = true;
      });
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      this.getTreeselect();
      if (row != null) {
        this.form.pid = row.hospitalId;
      }
      getWx_menu(row.id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改保存微信公众平台菜单";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateWx_menu(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addWx_menu(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除保存微信公众平台菜单编号为"' + row.id + '"的数据项？').then(function() {
        return delWx_menu(row.id);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    }
  }
};
</script>
