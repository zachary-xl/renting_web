function myCurring(fn) {
    let _this = this;
    return function (...args) {
        if (args.length >= fn.length) {
            return fn.apply(_this, args);
        } else {
            return function (...pms) {
                return curring.apply(_this, [...args, ...pms]);
            };
        }
    };
}

let curring = myCurring(sum);
console.log(curring(1)(3)(4)(2));

function sum(a, b, c, d) {
    return a + b + c + d;
}

let arr = [
    {id: 1, name:"Main", title: "首页", icon:"", path:"/", pid: 0},
    {id: 2, name:"System", title: "系统管理", icon:"", path:"/system", pid: 0},
    {id: 3, name:"SystemUser", title: "用户管理", icon:"", path:"/system/user", pid: 2},
    {id: 4, name:"SystemRole", title: "角色管理", icon:"", path:"/system/role", pid: 2},
    {id: 5, name:"SystemMenu", title: "菜单管理", icon:"", path:"/system/menu", pid: 2},
];
// let arr = []
// for (let i = 0; i < 100; i++) {
//     arr.push({id: i, name: `部门${i}`, pid: Math.floor(Math.abs(Math.random() * 10)) * i})
// }
// console.log(arr)
function dataToTree(arr) {
    let parent = arr.filter((item) => item.pid === 0);
    let children = arr.filter((item) => item.pid !== 0);
    return (function formatTree(parent, children) {
        parent.map((p) => {
            children.map((c, i) => {
                if (p.id === c.pid) {
                    let _children = JSON.parse(JSON.stringify(children));
                    _children.splice(i, 1)
                    formatTree([c], _children);
                    if (p.children) {
                        p.children.push(c)
                    } else {
                        p.children = [c];
                    }
                }
            });
        });
        return parent;
    })(parent, children)
}

function formatTree(arr, pid) {
    return arr.filter(item => item.pid === pid).map(item => ({
        ...item,
        children: formatTree(arr.filter(item => item.pid !== 0), item.id)
    }))
}

function arrayToTree(items) {
    const result = [];
    const itemMap = {};
    for (const item of items) {
        const id = item.id;
        const pid = item.pid;
        if (!itemMap[id]) {
            itemMap[id] = {
                children: [],
            }
        }
        itemMap[id] = {
            ...item,
            children: itemMap[id]["children"] // []
        }
        const treeItem = itemMap[id];
        // {id: 1, name: "部门1", pid: 0,children: []}
        // {id: 2, name: "部门2", pid: 1,children: []}
        // {id: 3, name: "部门3", pid: 2,children: []}
        if (pid === 0) {
            result.push(treeItem);
        } else {
            if (!itemMap[pid]) {
                itemMap[pid] = {
                    children: [],
                }
            }
            itemMap[pid].children.push(treeItem)
        }
    }
    console.log(itemMap)
    return result;
}

// console.time('formatTree')
// console.log(formatTree(arr, 0));
// console.log(dataToTree(arr));
// console.log(arrayToTree(arr, 0));
// console.timeEnd('formatTree')
let tree = [
    {
        "id": 1,
        "name": "部门1",
        "pid": 0,
        "children": [
            {
                "id": 2,
                "name": "部门2",
                "pid": 1,
                "children": [
                    {
                        "id": 6,
                        "name": "部门6",
                        "pid": 2
                    }
                ]
            },
            {
                "id": 3,
                "name": "部门3",
                "pid": 1,
                "children": [
                    {
                        "id": 4,
                        "name": "部门4",
                        "pid": 3,
                        "children": [
                            {
                                "id": 5,
                                "name": "部门5",
                                "pid": 4,
                                "children": [
                                    {
                                        "id": 7,
                                        "name": "部门7",
                                        "pid": 5,
                                        "children": [
                                            {
                                                "id": 8,
                                                "name": "部门8",
                                                "pid": 7
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": 9,
        "name": "部门9",
        "pid": 0
    }]

function dataFlat(tree) {
    let arr = []
    formatTree(tree)
    return arr

    function formatTree(tree) {
        tree.map(item => {
            if (item.children) {
                formatTree(item.children)
            }
            delete item.children
            arr.push(item)
        })
    }
}

// console.log(dataFlat(tree))

let array = [
    {id: 1, name: "部门1", pid: 0},
    {id: 2, name: "部门2", pid: 1},
    {id: 3, name: "部门3", pid: 1},
    {id: 4, name: "部门4", pid: 3},
    {id: 5, name: "部门5", pid: 4},
    {id: 6, name: "部门6", pid: 2},
    {id: 7, name: "部门7", pid: 5},
    {id: 8, name: "部门8", pid: 7},
    {id: 9, name: "部门9", pid: 0},
    {id: 10, name: "部门10", pid: 9}
];
console.log(myFormatTree(array));

function myFormatTree(arr) {
    let result = [];
    let dataMap = {}
    for (const item of arr) {
        let id = item.id,
            pid = item.pid
        dataMap[id] = {
            ...item,
            children: dataMap[id]?.children || []
        }
        let tempItem = dataMap[id]
        if (pid === 0) {
            result.push(tempItem)
        } else {
            if (!dataMap[pid]) {
                dataMap[pid] = {
                    children: []
                }
            }
            dataMap[pid]["children"].push(tempItem)
        }
    }
    return result
}

console.clear()
// 包含T所有字母的最小子串
let S = "ADOBECODEBANCPOHMVBBAJIACAC";
let T = "ABC"
// output: "BANC"

let resultList = [];
let index = 0;
while (index !== S.length - 1) {
    let resultStr = '';
    let _T = T;
    for (let i = index; i < S.length; i++) {
        const item = S[i];
        const caught = _T.includes(item);
        resultStr += item;
        if (caught) {
            _T = _T.replace(item, '');
        }
        if (_T.length === 0) {
            resultList.push(resultStr)
            break;
        }
    }
    index++;
}

// console.log(resultList)
// parseInt: 数字数 * 进制数 ^ (数字位数-1)
















