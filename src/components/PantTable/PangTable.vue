<script>
import PangTableForm from "@/components/PantTable/PangTableForm";
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
        return [];
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
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
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
  computed: {
    formColumns() {
      return this.tableColumns.slice(0, 2);
    },
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
    handlePageSizeChange() {
      this.$emit("sizeChange");
    },
    handlePageCurrentChange() {
      this.$emit("currentChange");
    },
    updatePageSize(val) {
      this.$emit("update:pageSize", val);
    },
    updateCurrentPage(val) {
      this.$emit("update:currentPage", val);
    },
    // render
    renderForm() {
      const formCustom = this.$slots.form ? this.$slots.form[0] : null;
      return (
        <PangTableForm
          formColumns={this.formColumns}
          formCustom={formCustom}
          onFormQuery={(val) => this.$emit("formQuery", val)}
          onFormReset={() => this.$emit("formReset")}
        />
      );
    },
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
          onRefresh={() =>
            this.$emit("refresh", {
              currentPage: this.currentPage,
              pageSize: this.pageSize,
            })
          }
          onSearch={(val) =>
            this.$emit("search", {
              searchVal: val,
              pagination: {
                currentPage: this.currentPage,
                pageSize: this.pageSize,
              },
            })
          }
        />
      );
    },
    renderPagination() {
      return (
        <div class="pang-table__pagination">
          <el-pagination
            page-sizes={[10, 20, 30, 50]}
            layout="total, sizes, prev, pager, next, jumper"
            total={this.total}
            page-size={this.pageSize}
            current-page={this.currentPage}
            on={{ ["update:currentPage"]: this.updateCurrentPage }}
            on={{ ["update:pageSize"]: this.updatePageSize }}
            on-size-change={this.handlePageSizeChange}
            on-current-change={this.handlePageCurrentChange}
          />
        </div>
      );
    },
    renderHeader(itemLabel, h, row) {
      if (typeof itemLabel === "function") {
        return itemLabel(h, row);
      } else if (typeof itemLabel === "string") {
        return itemLabel;
      }
    },
  },
  render(h) {
    return (
      <div class="pang-table" v-loading={this.loading}>
        {this.renderForm()}
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
                  width={item.width}
                  scopedSlots={{
                    default: ({ row }) => item.renderFn(h, row),
                    header: ({ row }) => this.renderHeader(item.label, h, row),
                  }}
                />
              ) : (
                <el-table-column
                  prop={item.prop}
                  width={item.width}
                  scopedSlots={{
                    header: ({ row }) => this.renderHeader(item.label, h, row),
                  }}
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

.pang-table__pagination {
  margin-top: 20px;
}

.el-radio__label {
  display: none;
}
</style>
