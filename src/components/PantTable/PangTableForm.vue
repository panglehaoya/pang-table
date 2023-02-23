<script>
export default {
  name: "PangTableForm",
  props: {
    formColumns: {
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
    formCustom: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      formModel: {},
    };
  },
  watch: {
    formColumns: {
      handler(val) {
        if (this.formCustom) return;
        this.$nextTick(() => {
          val.forEach((item) => {
            this.$set(this.formModel, item.prop, "");
          });
        });
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    handleQuery() {
      this.$emit("formQuery", this.formCustom ? {} : this.formModel);
    },
    resetForm() {
      if (!this.formCustom) {
        this.$refs.form.resetFields();
      }
      this.$emit("formReset");
      // console.log(this.formCustom);
    },
    renderForm() {
      return (
        <div class="pang-table__form">
          <div class="pang-table__form-container">
            {this.formCustom || (
              <el-form
                ref="form"
                label-width="100px"
                props={{ model: this.formModel }}
              >
                {this.formColumns.map((item) => (
                  <el-form-item label={item.label} prop={item.prop}>
                    <el-input
                      vModel={this.formModel[item.prop]}
                      placeholder={`请输入${item.label}`}
                    />
                  </el-form-item>
                ))}
              </el-form>
            )}
          </div>
          {this.renderFormHandle()}
        </div>
      );
    },
    renderFormHandle() {
      return (
        <div class="pang-table__form-handle">
          <el-button type="primary" onClick={this.handleQuery}>
            查询
          </el-button>
          <el-button type="plain" onClick={this.resetForm}>
            重置
          </el-button>
        </div>
      );
    },
  },
  render() {
    return this.renderForm();
  },
};
</script>

<style lang="scss">
.pang-table__form {
  width: 100%;
  border: 1px solid #c0c4cc;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
  .pang-table__form-container {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .pang-table__form-handle {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
