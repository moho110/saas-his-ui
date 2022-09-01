<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="${comment}" prop="pkgId">
        <el-input
          v-model="queryParams.pkgId"
          placeholder="请输入${comment}"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="所属开诊id" prop="fid">
        <el-input
          v-model="queryParams.fid"
          placeholder="请输入所属开诊id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="分类：0药，1附加费，2检查项目" prop="typeId">
        <el-input
          v-model="queryParams.typeId"
          placeholder="请输入分类：0药，1附加费，2检查项目"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商品id，药品id" prop="goodsId">
        <el-input
          v-model="queryParams.goodsId"
          placeholder="请输入商品id，药品id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="药品名" prop="goodsName">
        <el-input
          v-model="queryParams.goodsName"
          placeholder="请输入药品名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单剂量" prop="single">
        <el-input
          v-model="queryParams.single"
          placeholder="请输入单剂量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单位" prop="unit">
        <el-input
          v-model="queryParams.unit"
          placeholder="请输入单位"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="单价" prop="price">
        <el-input
          v-model="queryParams.price"
          placeholder="请输入单价"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="用量" prop="num">
        <el-input
          v-model="queryParams.num"
          placeholder="请输入用量"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="金额" prop="amount">
        <el-input
          v-model="queryParams.amount"
          placeholder="请输入金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="特殊要求，备注" prop="tips">
        <el-input
          v-model="queryParams.tips"
          placeholder="请输入特殊要求，备注"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="排序" prop="listorder">
        <el-input
          v-model="queryParams.listorder"
          placeholder="请输入排序"
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
          v-hasPermi="['basic:care_order_sub:add']"
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
          v-hasPermi="['basic:care_order_sub:edit']"
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
          v-hasPermi="['basic:care_order_sub:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['basic:care_order_sub:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="care_order_subList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="${comment}" align="center" prop="id" />
      <el-table-column label="${comment}" align="center" prop="pkgId" />
      <el-table-column label="所属开诊id" align="center" prop="fid" />
      <el-table-column label="分类：0药，1附加费，2检查项目" align="center" prop="typeId" />
      <el-table-column label="商品id，药品id" align="center" prop="goodsId" />
      <el-table-column label="药品名" align="center" prop="goodsName" />
      <el-table-column label="单剂量" align="center" prop="single" />
      <el-table-column label="单位" align="center" prop="unit" />
      <el-table-column label="单价" align="center" prop="price" />
      <el-table-column label="用量" align="center" prop="num" />
      <el-table-column label="金额" align="center" prop="amount" />
      <el-table-column label="特殊要求，备注" align="center" prop="tips" />
      <el-table-column label="排序" align="center" prop="listorder" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['basic:care_order_sub:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['basic:care_order_sub:remove']"
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

    <!-- 添加或修改开诊用药明细对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="${comment}" prop="pkgId">
          <el-input v-model="form.pkgId" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="所属开诊id" prop="fid">
          <el-input v-model="form.fid" placeholder="请输入所属开诊id" />
        </el-form-item>
        <el-form-item label="分类：0药，1附加费，2检查项目" prop="typeId">
          <el-input v-model="form.typeId" placeholder="请输入分类：0药，1附加费，2检查项目" />
        </el-form-item>
        <el-form-item label="商品id，药品id" prop="goodsId">
          <el-input v-model="form.goodsId" placeholder="请输入商品id，药品id" />
        </el-form-item>
        <el-form-item label="药品名" prop="goodsName">
          <el-input v-model="form.goodsName" placeholder="请输入药品名" />
        </el-form-item>
        <el-form-item label="单剂量" prop="single">
          <el-input v-model="form.single" placeholder="请输入单剂量" />
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="form.unit" placeholder="请输入单位" />
        </el-form-item>
        <el-form-item label="单价" prop="price">
          <el-input v-model="form.price" placeholder="请输入单价" />
        </el-form-item>
        <el-form-item label="用量" prop="num">
          <el-input v-model="form.num" placeholder="请输入用量" />
        </el-form-item>
        <el-form-item label="金额" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入金额" />
        </el-form-item>
        <el-form-item label="特殊要求，备注" prop="tips">
          <el-input v-model="form.tips" placeholder="请输入特殊要求，备注" />
        </el-form-item>
        <el-form-item label="排序" prop="listorder">
          <el-input v-model="form.listorder" placeholder="请输入排序" />
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
import { listCare_order_sub, getCare_order_sub, delCare_order_sub, addCare_order_sub, updateCare_order_sub } from "@/api/basic/care_order_sub";

export default {
  name: "Care_order_sub",
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
      // 开诊用药明细表格数据
      care_order_subList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        pkgId: null,
        fid: null,
        typeId: null,
        goodsId: null,
        goodsName: null,
        single: null,
        unit: null,
        price: null,
        num: null,
        amount: null,
        tips: null,
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
    /** 查询开诊用药明细列表 */
    getList() {
      this.loading = true;
      listCare_order_sub(this.queryParams).then(response => {
        this.care_order_subList = response.rows;
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
        pkgId: null,
        fid: null,
        typeId: null,
        goodsId: null,
        goodsName: null,
        single: null,
        unit: null,
        price: null,
        num: null,
        amount: null,
        tips: null,
        listorder: null
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
      this.title = "添加开诊用药明细";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getCare_order_sub(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改开诊用药明细";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateCare_order_sub(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCare_order_sub(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除开诊用药明细编号为"' + ids + '"的数据项？').then(function() {
        return delCare_order_sub(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('basic/care_order_sub/export', {
        ...this.queryParams
      }, `care_order_sub_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
