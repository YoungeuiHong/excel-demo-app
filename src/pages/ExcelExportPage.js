import React, {useState} from 'react';
import {Button} from "@mui/material";
import {Tree} from "antd";

const treeData = [
    {
        title: 'parent 1',
        key: '0-0',
        children: [
            {
                title: 'parent 1-0',
                key: '0-0-0',
                disabled: true,
                children: [
                    {
                        title: 'leaf',
                        key: '0-0-0-0',
                        disableCheckbox: true,
                    },
                    {
                        title: 'leaf',
                        key: '0-0-0-1',
                    },
                ],
            },
            {
                title: 'parent 1-1',
                key: '0-0-1',
                children: [{title: <span style={{color: '#1890ff'}}>sss</span>, key: '0-0-1-0'}],
            },
        ],
    },
];


export default function ExcelExportPage() {
    const [ tree, setTree ] = useState(treeData);

    const onSelect= (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    const onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);

    };

    const addDataNode = (parentKey) => {
        const newData = treeData.slice();
        const newnewData = newData.map((dataNode) => {
            if (dataNode.key === parentKey) {
                const children = dataNode.children ? dataNode.children.slice() : [];
                children.push({
                    title: 'new leaf',
                    key: '0-0-2',
                })

                const newDataNode = {
                    ...dataNode,
                    children: children.slice()
                }
                console.log('newDataNode', newDataNode);
                return newDataNode;
            }

            return dataNode;

        });

        console.log(newnewData)

        setTree(
            newnewData
        );
    }

    const onClick = () => {
        addDataNode('0-0')
    }


    return (
        <div>
            <h1>Export Excel</h1>
            <Button
                onClick={onClick}
            >
                Click!
            </Button>
            <Tree
                checkable
                defaultExpandedKeys={['0-0-0', '0-0-1']}
                defaultSelectedKeys={['0-0-0', '0-0-1']}
                defaultCheckedKeys={['0-0-0', '0-0-1']}
                onSelect={onSelect}
                onCheck={onCheck}
                treeData={tree}
            />
        </div>
    );
}