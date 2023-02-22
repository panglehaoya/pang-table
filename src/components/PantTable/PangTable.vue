<script>
import PangTableHandle from "./PangTableHandle.vue";
import printJS from "print-js";

export default {
  name: "PangTable",
  inheritAttrs: false,
  components: { PangTableHandle },
  props: {
    data: {
      type: Array,
      default: function () {
        return [];
      },
    },
    columns: {
      type: Array,
      default: function () {
        return [
          {
            prop: "",
            label: "",
            width: "",
            renderFn: null,
          },
        ];
      },
    },
    choice: {
      type: String,
      default: "multiple",
    },
    showButtons: {
      type: Object,
      default: function () {
        return {
          column: true,
          print: true,
          excel: true,
        };
      },
    },
    loading: { type: Boolean, default: false },
    tablePage: {
      type: Object,
      default() {
        return {
          current: 1,
          size: 10,
          total: 0,
        };
      },
    },
  },
  data() {
    return {
      formModel: {},
      tableData: [],
      tableColumns: [],
      tableRadio: "",
      tableSelected: [],
    };
  },
  watch: {
    data: {
      handler(val) {
        if (val) {
          this.tableData = val;
        }
      },
      immediate: true,
    },
    columns: {
      handler(val) {
        if (val) {
          this.tableColumns = val;
        }
      },
      immediate: true,
    },
  },
  mounted() {
    this.tableData = [...this.data];
  },
  methods: {
    isRenderSearch() {
      return this.$slots.form ? this.$slots.form[0] : null;
    },
    // handle
    handleColumnChange(data) {
      const selectedProps = data.map((item) => item.prop);
      this.tableColumns = this.columns.filter((item) =>
        selectedProps.includes(item.prop)
      );
    },
    handlePrint() {
      printJS({
        printable: "printTable",
        type: "html",
        header: null,
        targetStyles: ["*"],
        style: "@page {margin:0 10mm}",
      });
    },
    handleSelectionChange(val) {
      this.tableSelected = [...val];
      this.$emit("select-change", val);
    },
    handleCurrentChange(val) {
      this.tableSelected = [{ ...val }];
      this.$emit("current-change", this.tableSelected);
    },
    handlePageSizeChange(val) {
      this.$emit("sizeChange", val);
    },
    handlePageCurrentChange(val) {
      this.$emit("currentChange", val);
    },
    // render
    renderCheck() {
      if (this.choice === "single") {
        return (
          <el-table-column
            label="选择项"
            width="70"
            scopedSlots={{
              default: ({ row }) => {
                return <el-radio vModel={this.tableRadio} label={row.id} />;
              },
            }}
          />
        );
      } else if (this.choice === "multiple") {
        return <el-table-column width="70" type="selection" />;
      } else {
        return null;
      }
    },
    renderHandle() {
      const columnProps = this.columns.map((item) => ({
        prop: item.prop,
        label: item.label,
      }));
      const customButton = this.$scopedSlots.button
        ? this.$scopedSlots.button(this.tableSelected)[0]
        : null;

      return (
        <PangTableHandle
          columnProps={columnProps}
          excelData={this.tableData}
          showButtons={this.showButtons}
          customButton={customButton}
          onChange={this.handleColumnChange}
          onPrint={this.handlePrint}
          onRefresh={() => this.$emit("refresh")}
          onSearch={(val) => this.$emit("search", val)}
        />
      );
    },
    renderPagination() {
      return (
        <el-pagination
          page-sizes={[10, 20, 30, 50]}
          layout="total, sizes, prev, pager, next, jumper"
          page-size={this.tablePage.size}
          total={this.tablePage.total}
          current-page={this.tablePage.current}
          on-size-change={this.handlePageSizeChange}
          on-current-change={this.handlePageCurrentChange}
        />
      );
    },
  },
  render(h) {
    return (
      <div class="pang-table" v-loading={this.loading}>
        {this.isRenderSearch()}
        {this.renderHandle()}
        <div class="pang-table-container" id="printTable">
          <el-table
            border
            style="width: 100%"
            data={this.tableData}
            on-selection-change={this.handleSelectionChange}
            on-current-change={this.handleCurrentChange}
            {...{ attrs: this.$attrs }}
          >
            {this.renderCheck()}
            {this.tableColumns.map((item) => {
              const tableColumn = item.renderFn ? (
                <el-table-column
                  prop={item.prop}
                  label={item.label}
                  width={item.width}
                  scopedSlots={{
                    default: ({ row }) => {
                      return item.renderFn(h, row);
                    },
                  }}
                />
              ) : (
                <el-table-column
                  prop={item.prop}
                  label={item.label}
                  width={item.width}
                />
              );

              return tableColumn;
            })}
          </el-table>
        </div>
        {this.renderPagination()}
      </div>
    );
  },
};
</script>

<style lang="scss">
.pang-table-search {
  width: 100%;
}

.el-radio__label {
  display: none;
}
</style>
