<template>
  <div class="app-container">
    <PangTable
      :data="tableData"
      :columns="columns"
      :showButtons="showButtons"
      :loading="loading"
      :currentPage.sync="tablePage.current"
      :pageSize.sync="tablePage.size"
      :total="tablePage.total"
      @refresh="handleRefresh"
      @search="handleSearch"
      @currentChange="handleCurrentChange"
      @sizeChange="handleSizeChange"
      @formQuery="handleFormQuery"
      @formReset="handleFormReset"
    >
      <!--      <template v-slot:form>-->
      <!--        <div class="form-container">-->
      <!--          <el-form ref="form" label-width="120px" :model="formModel">-->
      <!--            <el-form-item label="日期">-->
      <!--              <el-date-picker-->
      <!--                type="date"-->
      <!--                placeholder="选择日期"-->
      <!--                v-model="formModel.date"-->
      <!--              />-->
      <!--            </el-form-item>-->
      <!--            <el-form-item label="姓名">-->
      <!--              <el-input v-model="formModel.name"></el-input>-->
      <!--            </el-form-item>-->
      <!--          </el-form>-->
      <!--        </div>-->
      <!--      </template>-->
      <template v-slot:button="scoped">
        <el-button type="danger" @click="handleDelete(scoped)">
          自定义删除
        </el-button>
      </template>
    </PangTable>
  </div>
</template>

<script>
import PangTable from "@/components/PantTable/PangTable";

export default {
  name: "App",
  components: { PangTable },
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: "2023-01-01",
          name: "Pang1",
          address: "北京",
        },
        {
          id: 2,
          date: "2023-01-02",
          name: "Pang2",
          address: "上海",
        },
        {
          id: 3,
          date: "2023-01-03",
          name: "Pang3",
          address: "广州",
        },
        {
          id: 4,
          date: "2023-01-04",
          name: "Pang4",
          address: "深圳",
        },
      ],
      columns: [],
      formModel: {
        date: "",
        name: "",
      },
      showButtons: {
        column: true,
        print: true,
        excel: true,
        refresh: true,
        search: true,
      },
      loading: false,
      tablePage: { current: 1, size: 10, total: 20 },
    };
  },
  mounted() {
    const _this = this;
    this.columns = [
      {
        prop: "date",
        label: "日期",
        width: "180",
      },
      {
        prop: "name",
        label: "姓名",
        width: "180",
      },
      {
        prop: "address",
        label: function (h, row) {
          return <el-input placeholder="自定义表头" />;
        },
      },
      {
        label: "操作",
        prop: "handle",
        renderFn: function (h, row) {
          return (
            <div>
              <el-button
                type="primary"
                onClick={(e) => _this.handleShowDetail(e, row)}
              >
                查看详情
              </el-button>
              <el-button
                type="warning"
                onClick={(e) => _this.handleUpdate(e, row)}
              >
                编辑
              </el-button>
            </div>
          );
        },
      },
    ];
  },
  methods: {
    handleDelete(scoped) {
      console.log("scoped", scoped);
    },
    handleShowDetail(e, row) {
      console.log("detail row", row);
    },
    handleUpdate(e, row) {
      console.log("update row", row);
    },
    handleRefresh(val) {
      console.log("refresh", val);
    },
    handleSearch(val) {
      console.log("search", val);
    },
    handleCurrentChange() {
      console.log(this.tablePage.current);
    },
    handleSizeChange() {
      console.log(this.tablePage.size);
    },
    handleFormQuery(val) {
      console.log(val);
    },
    handleFormReset() {
      console.log("form reset");
    },
  },
};
</script>

<style lang="scss">
.form-container {
  width: 100%;
  border: 1px solid #c0c4cc;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
  .pang-table-form-button {
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.el-form {
  width: 100% !important;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.el-form-item {
  margin-bottom: 0;
}

.el-form-item__content {
  width: 200px;
}
</style>
