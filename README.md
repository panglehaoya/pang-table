# pang-tablee

## 简介
el-table的二次封装

* render函数编写
* 查询
* 自定义列
* 打印功能
* 导出excel
* 单选 多选
* 其他属性与el-table一致

## 属性列表

| 属性 | 类型 | 说明             |
|------|------|----------------|
| data   | Array | table数据        |
| columns  | Array | 自定义列，支持render函数 |
| searchProps | Array | 搜索props        |
| choice | string | 单选 多选          |

## 安装

```js
import PangTable from 'pang-table'
```

## 试例代码
```vue
<template>
  <div class="app-container">
    <PangTable
      :data="tableData"
      :columns="columns"
      :search-props="searchProps"
      choice="single"
      height="200"
    />
  </div>
</template>

<script>
import PangTable from "pang-table";
import 'pang-table/dist/pang-table.css'

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
      columns: [
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
          label: "地址",
        },
        {
          label: "操作",
          prop: "handle",
          renderFn: function (h, row) {
            return <el-button type="primary">点击</el-button>;
          },
        },
      ],
      searchProps: [
        { prop: "date", label: "日期", placeholder: "请输入日期" },
        { prop: "name", label: "姓名", placeholder: "请输入姓名" },
      ],
      formModel: {
        date: "",
        name: "",
      },
    };
  },
};
</script>

```
