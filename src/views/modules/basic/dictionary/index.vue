<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="字典名称" prop="dictionaryName">
        <el-input
          v-model="queryParams.dictionaryName"
          placeholder="请输入字典名称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="父级id" prop="parentId">
        <el-input
          v-model="queryParams.parentId"
          placeholder="请输入父级id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="医院id" prop="hid">
        <el-input
          v-model="queryParams.hid"
          placeholder="请输入医院id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="诊断编号" prop="number">
        <el-input
          v-model="queryParams.number"
          placeholder="请输入诊断编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="是否删除" prop="isDel">
        <el-input
          v-model="queryParams.isDel"
          placeholder="请输入是否删除"
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
          v-hasPermi="['basic:dictionary:add']"
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
          v-hasPermi="['basic:dictionary:edit']"
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
          v-hasPermi="['basic:dictionary:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['basic:dictionary:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="dictionaryList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="字典字段id" align="center" prop="did" />
      <el-table-column label="字典名称" align="center" prop="dictionaryName" />
      <el-table-column label="父级id" align="center" prop="parentId" />
      <el-table-column label="医院id" align="center" prop="hid" />
      <el-table-column label="类型  0：系统  1：自建" align="center" prop="type" />
      <el-table-column label="诊断编号" align="center" prop="number" />
      <el-table-column label="是否删除" align="center" prop="isDel" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:dictionary:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:dictionary:remove']"
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

    <!-- 添加或修改字典对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="字典名称" prop="dictionaryName">
          <el-input v-model="form.dictionaryName" placeholder="请输入字典名称" />
        </el-form-item>
        <el-form-item label="父级id" prop="parentId">
          <el-input v-model="form.parentId" placeholder="请输入父级id" />
        </el-form-item>
        <el-form-item label="医院id" prop="hid">
          <el-input v-model="form.hid" placeholder="请输入医院id" />
        </el-form-item>
        <el-form-item label="诊断编号" prop="number">
          <el-input v-model="form.number" placeholder="请输入诊断编号" />
        </el-form-item>
        <el-form-item label="是否删除" prop="isDel">
          <el-input v-model="form.isDel" placeholder="请输入是否删除" />
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
import { listDictionary, getDictionary, delDictionary, addDictionary, updateDictionary } from "@/api/basic/dictionary";

export default {
  name: "Dictionary",
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
      // 字典表格数据
      dictionaryList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        dictionaryName: null,
        parentId: null,
        hid: null,
        type: null,
        number: null,
        isDel: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        dictionaryName: [
          { required: true, message: "字典名称不能为空", trigger: "blur" }
        ],
        parentId: [
          { required: true, message: "父级id不能为空", trigger: "blur" }
        ],
        hid: [
          { required: true, message: "医院id不能为空", trigger: "blur" }
        ],
        type: [
          { required: true, message: "类型  0：系统  1：自建不能为空", trigger: "change" }
        ],
        createTime: [
          { required: true, message: "添加时间不能为空", trigger: "blur" }
        ],
        updateTime: [
          { required: true, message: "编辑时间不能为空", trigger: "blur" }
        ],
        number: [
          { required: true, message: "诊断编号不能为空", trigger: "blur" }
        ],
        isDel: [
          { required: true, message: "是否删除不能为空", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询字典列表 */
    getList() {
      this.loading = true;
      listDictionary(this.queryParams).then(response => {
        this.dictionaryList = response.rows;
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
        did: null,
        dictionaryName: null,
        parentId: null,
        hid: null,
        type: null,
        createTime: null,
        updateTime: null,
        number: null,
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
      this.ids = selection.map(item => item.did)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加字典";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const did = row.did || this.ids
      getDictionary(did).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改字典";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.did != null) {
            updateDictionary(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addDictionary(this.form).then(response => {
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
      const dids = row.did || this.ids;
      this.$modal.confirm('是否确认删除字典编号为"' + dids + '"的数据项？').then(function() {
        return delDictionary(dids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('basic/dictionary/export', {
        ...this.queryParams
      }, `dictionary_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
