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
      @selectChange="handleSelectChange"
      @sizeChange="handleSizeChange"
      @currentPageChange="handleCurrentPageChange"
      @formQuery="handleFormQuery"
      @formReset="handleFormReset"
    >
      <template v-slot:form="scoped">
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
  name: "PangTableExample",
  components: { PangTable },
  data() {
    return {
      tableData: [
        {
          id: 1,
          date: "2023-01-01",
          name: "Pang1",
          address: "北京",
          auth: true,
        },
        {
          id: 2,
          date: "2023-01-02",
          name: "Pang2",
          address: "上海",
          auth: false,
        },
        {
          id: 3,
          date: "2023-01-03",
          name: "Pang3",
          address: "广州",
          auth: true,
        },
        {
          id: 4,
          date: "2023-01-04",
          name: "Pang4",
          address: "深圳",
          auth: false,
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
        prop: "auth",
        label: "授权",
        width: "180",
        renderFn: function (h, row) {
          return (
            <el-switch
              value={row.auth}
              onInput={() => _this.handleAuthChange(row)}
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="授权"
              inactive-text="未授权"
            />
          );
        },
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
    handleAuthChange(val) {
      const temp = [...this.tableData];
      const findIndex = temp.findIndex((item) => item.id === val.id);
      const obj = temp[findIndex];
      temp[findIndex] = { ...obj, auth: !val.auth };

      this.tableData = [...temp];
    },
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
    handleCurrentChange(val) {
      console.log(val);
      // console.log(this.tablePage.current);
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
    handleCurrentPageChange() {
      console.log(this.tablePage.current);
    },
    handleSelectChange(val) {
      console.log(val);
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
