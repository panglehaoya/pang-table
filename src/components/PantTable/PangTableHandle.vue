<script>
import JsonExcel from "vue-json-excel";

export default {
  name: "PangTableHandle",
  components: { JsonExcel },
  props: {
    showButtons: {
      type: Object,
      default: function () {
        return {
          column: true,
          print: true,
          excel: true,
          refresh: true,
          search: true,
        };
      },
    },
    columnProps: {
      type: Array,
      default: () => [],
    },
    excelData: {
      type: Array,
      default: () => [],
    },
    customButton: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      excelJsonData: [],
      excelFields: {},
      showDrawer: false,
      checkList: [],
      searchVal: "",
    };
  },
  watch: {
    excelData(val) {
      this.excelJsonData = [...val];
    },
    columnProps(val) {
      val.forEach((item) => {
        if (item.prop === "handle") return;
        this.excelFields[item.label] = item.prop;
      });
    },
  },
  mounted() {
    this.checkList = this.columnProps.map((item) => item.label);
  },
  methods: {
    // render
    renderColumnButton() {
      return this.showButtons.column ? (
        <el-button type="primary" onClick={this.handleColumn}>
          自定义列
        </el-button>
      ) : (
        ""
      );
    },
    renderPrintButton() {
      return this.showButtons.print ? (
        <el-button type="primary" onClick={this.handlePrint}>
          打印表格
        </el-button>
      ) : (
        ""
      );
    },
    renderExcelButton() {
      return this.showButtons.excel ? (
        <JsonExcel
          worksheet="My Worksheet"
          name="filename.xls"
          data={this.excelJsonData}
          fields={this.excelFields}
        >
          <el-button type="primary" class="excel-button">
            导出excel
          </el-button>
        </JsonExcel>
      ) : (
        ""
      );
    },
    renderOriginButtons() {
      return (
        <div class="pang-table-handle__origin">
          {this.renderColumnButton()}
          {this.renderPrintButton()}
          {this.renderExcelButton()}
        </div>
      );
    },
    renderCustomButtons() {
      return (
        <div class="pang-table-handle__custom">{this.customButton || ""}</div>
      );
    },
    renderRightButtons() {
      return (
        <div class="pang-table-handle__right">
          {this.showButtons.refresh ? (
            <el-button
              circle
              icon="el-icon-refresh"
              style={{ marginRight: "10px" }}
              onClick={this.handleRefresh}
            />
          ) : (
            ""
          )}
          {this.showButtons.search ? (
            <el-input placeholder="请输入搜索内容" v-model={this.searchVal}>
              <el-button
                slot="append"
                circle
                icon="el-icon-search"
                onClick={this.handleSearch}
              />
            </el-input>
          ) : (
            ""
          )}
        </div>
      );
    },
    renderDrawer() {
      return (
        <el-drawer
          title="自定义列"
          direction="rtl"
          size={350}
          visible={this.showDrawer}
          on={{ ["update:visible"]: this.setShowDrawer }}
        >
          <el-checkbox-group v-model={this.checkList}>
            {this.columnProps.map((item) => (
              <el-checkbox key={item.prop} label={item.label} />
            ))}
          </el-checkbox-group>
          <div class="pang-table-handle__footer">
            <el-button onClick={() => (this.showDrawer = false)}>
              取消
            </el-button>
            <el-button type="primary" onClick={this.handleRecovery}>
              还原
            </el-button>
            <el-button type="primary" onClick={this.handleCertain}>
              确定
            </el-button>
          </div>
        </el-drawer>
      );
    },
    // handle
    setShowDrawer(e) {
      this.showDrawer = e;
    },
    handleColumn() {
      this.showDrawer = true;
    },
    handlePrint() {
      this.$emit("print");
    },
    handleRecovery() {
      this.checkList = this.columnProps.map((item) => item.label);
    },
    handleCertain() {
      const data = this.columnProps.filter((item) =>
        this.checkList.includes(item.label)
      );
      this.showDrawer = false;
      this.$emit("change", data);
    },
    handleRefresh() {
      this.$emit("refresh");
    },
    handleSearch() {
      this.$emit("search", this.searchVal);
    },
  },
  render() {
    return (
      <div class="pang-table-handle">
        <div class="pang-table-handle__left">
          {this.renderOriginButtons()}
          {this.renderCustomButtons()}
        </div>
        {this.renderRightButtons()}
        {this.renderDrawer()}
      </div>
    );
  },
};
</script>

<style lang="scss">
.pang-table-handle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  .pang-table-handle__left {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    .pang-table-handle__origin {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
    }
  }
  .pang-table-handle__right {
    display: flex;
    justify-content: flex-start;
  }
}

.el-drawer__body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.pang-table-handle__footer {
  margin-top: 20px;
  width: 100%;
  text-align: right;
}

.excel-button {
  margin-left: 10px;
}
</style>
