import { IDialog, ITable } from "@/components/types";
import { h } from "vue";
import { ElDivider, ElLink, ElTag } from "element-plus";

const Status = {
  "0": "info",
  "1": "success",
  "2": "warning",
  "3": "danger"
};

export const tableConfig: ITable.IColumn[] = [
  {
    label: "编号",
    width: 80,
    type: "index"
  },
  { label: "员工姓名", prop: "staffName", align: "center" },
  {
    label: "角色",
    align: "center",
    render(props) {
      const { roleVOList } = props.row;
      return [
        roleVOList.map(item => {
          return (
            <ElTag type="success" class="mx-1">
              {item}
            </ElTag>
          );
        })
      ];
    }
  },
  { label: "手机号", prop: "phone" },
  { label: "邮箱", prop: "email" },
  { label: "创建时间", prop: "createTime" },
  {
    label: "状态",
    width: 100,
    align: "center",
    render(props) {
      const { row } = props;
      console.log(row);
      return [
        <ElTag effect="dark" type={Status[row!.state]}>
          {["启用", "停用", "启用", "停用"][row.state]}
        </ElTag>
      ];
    }
  },
  {
    label: "操作",
    align: "center",
    render(props) {
      const { row } = props;
      return [
        <ElLink type="primary" onClick={() => props["handle-edit"](row)}>
          编辑
        </ElLink>,
        <ElDivider direction="vertical" />,
        <ElLink type="danger" onClick={() => props["handel-delete"](row)}>
          删除
        </ElLink>
      ];
    }
  }
];
export const dialogConfig = [
  {
    type: "tree-select",
    prop: "parent",
    placeholder: "选择上级菜单",
    label: {
      title: "上级菜单"
    },
    options: [
      {
        value: "1",
        label: "Level one 1",
        children: [
          {
            value: "1-1",
            label: "Level two 1-1",
            children: [
              {
                value: "1-1-1",
                label: "Level three 1-1-1"
              }
            ]
          }
        ]
      },
      {
        value: "2",
        label: "Level one 2",
        children: [
          {
            value: "2-1",
            label: "Level two 2-1",
            children: [
              {
                value: "2-1-1",
                label: "Level three 2-1-1"
              }
            ]
          },
          {
            value: "2-2",
            label: "Level two 2-2",
            children: [
              {
                value: "2-2-1",
                label: "Level three 2-2-1"
              }
            ]
          }
        ]
      },
      {
        value: "3",
        label: "Level one 3",
        children: [
          {
            value: "3-1",
            label: "Level two 3-1",
            children: [
              {
                value: "3-1-1",
                label: "Level three 3-1-1"
              }
            ]
          },
          {
            value: "3-2",
            label: "Level two 3-2",
            children: [
              {
                value: "3-2-1",
                label: "Level three 3-2-1"
              }
            ]
          }
        ]
      }
    ],
    value: "",
    rule: { required: true, message: "上级菜单不能为空", trigger: "blur" },
    render(props) {
      const { row } = props;
      return [
        <ElLink type="primary" onClick={() => props["handle-edit"](row)}>
          编辑
        </ElLink>,
        <ElDivider direction="vertical" />,
        <ElLink type="danger" onClick={() => props["handel-delete"](row)}>
          删除
        </ElLink>
      ];
    }
  },
  {
    type: "input",
    prop: "menuName",
    placeholder: "请输入菜单名称",
    label: {
      title: "菜单名称"
    },
    value: "",
    rule: { required: true, message: "菜单名称不能为空", trigger: "blur" }
  },
  {
    type: "input",
    prop: "path",
    placeholder: "请输入组件路径",
    span: 12,
    label: {
      title: "组件路径",
      content: "访问的组件路径，如：`system/user/index`，默认在`views`目录下"
    },
    value: "",
    rule: { required: true, message: "组件路径不能为空", trigger: "blur" }
  },
  {
    type: "input-number",
    prop: "order",
    placeholder: "请输入排序号",
    span: 12,
    label: {
      title: "排序号"
    },
    value: 0
  },
  {
    type: "radio-group",
    prop: "hideStatus",
    options: [
      {
        label: "显示",
        value: 0
      },
      {
        label: "隐藏",
        value: 1
      }
    ],
    label: {
      title: "显示状态",
      content: "选择隐藏则路由将不会出现在侧边栏，但仍然可以访问"
    },
    span: 12,
    value: 0
  },
  {
    type: "radio-group",
    prop: "status",
    label: {
      title: "菜单状态",
      content: "选择停用则路由将不会出现在侧边栏，也不能被访问"
    },
    options: [
      {
        label: "正常",
        value: 0
      },
      {
        label: "停用",
        value: 1
      }
    ],
    span: 12,
    value: 0
  },
  {
    type: "icon",
    prop: "icon",
    label: {
      title: "菜单图标"
    },
    value: ""
  },
  {
    type: "textarea",
    prop: "desc",
    label: {
      title: "描述"
    },
    placeholder: "请输入描述",
    value: ""
  }
] as IDialog.IConfig[];
