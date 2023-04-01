import React, {Key, useState} from 'react';
import {Tree, TreeProps} from "antd";
import {Button, Grid, Stack} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import {defaultBodyColor, defaultBodyRGB, defaultHeaderColor, defaultHeaderRGB, HeaderTreeNode} from "../../types";


interface Props {
    treeData: HeaderTreeNode[];
    setTreeData: React.Dispatch<React.SetStateAction<HeaderTreeNode[]>>;
    selectedNode: HeaderTreeNode | undefined;
    setSelectedNode: React.Dispatch<React.SetStateAction<HeaderTreeNode | undefined>>;
    onClickReset: () => void;
}

export default function HeaderTree(props: Props) {

    const {treeData, setTreeData, setSelectedNode, onClickReset} = props;

    const [selectedKey, setSelectedKey] = useState<Key | undefined>(undefined);

    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
        setSelectedKey(selectedKeys.at(0));
        if (info.selectedNodes.at(0) !== undefined) {
            setSelectedNode(info.selectedNodes.at(0) as HeaderTreeNode);
        }
    };

    const dfs = (
        data: HeaderTreeNode[],
        key: React.Key,
        callback: (node: HeaderTreeNode, i: number, data: HeaderTreeNode[]) => void,
        // eslint-disable-next-line
    ) => {
        for (let i = 0; i < data.length; i += 1) {
            if (data[i].key === key) {
                return callback(data[i], i, data);
            }
            if (data[i].children) {
                dfs(data[i].children, key, callback);
            }
        }
    };

    const addDataNode = (parentKey: Key) => {
        if (parentKey === undefined) {
            alert("Select a parent node.");
        }

        const updatedTreeData = [...treeData];

        dfs(updatedTreeData, parentKey, (dataNode, index, data) => {
            const children = dataNode.children ? dataNode.children.slice() : [];
            children.push({
                title: 'Column',
                key: `${parentKey}-${children.length + 1}`,
                type: 'String',
                columnName: 'Column',
                fieldName: 'newColumn',
                headerColor: defaultHeaderColor,
                bodyColor: defaultBodyColor,
                headerRGB: defaultHeaderRGB,
                bodyRGB: defaultBodyRGB,
                children: [],
            });

            const newDataNode: HeaderTreeNode = {...dataNode, children}
            data.splice(index, 1, newDataNode);
        })

        setTreeData(updatedTreeData);
    }

    const deleteDataNode = (deletedKey: Key) => {
        if (deletedKey === undefined) {
            alert("Select a parent node.");
        }

        const updatedTreeData = [...treeData];

        dfs(updatedTreeData, deletedKey, (dataNode, index, data) => {
            data.splice(index, 1);
        })

        setTreeData(updatedTreeData);
    }


    const onClickAdd = () => {
        if (selectedKey === undefined) {
            alert("Select a parent node.");
            return;
        }
        addDataNode(selectedKey)
    }

    const onClickDelete = () => {
        if (selectedKey === undefined) {
            alert("Select a parent node.");
            return;
        }
        deleteDataNode(selectedKey)
    }

    return (
        <>
            <Grid
                container
                direction={"row"}
                justifyContent={"flex-end"}
                sx={{padding: 3}}
            >
                <Stack direction="row" spacing={1}>
                    <Button
                        color="warning"
                        variant="outlined"
                        size="small"
                        startIcon={<CleaningServicesIcon/>}
                        onClick={onClickReset}
                    >
                        Reset
                    </Button>
                    <Button
                        color="success"
                        variant="outlined"
                        size="small"
                        startIcon={<AddCircleIcon/>}
                        onClick={onClickAdd}
                    >
                        ADD
                    </Button>
                    <Button
                        color="error"
                        variant="outlined"
                        size="small"
                        startIcon={<DeleteIcon/>}
                        onClick={onClickDelete}
                    >
                        Delete
                    </Button>
                </Stack>
            </Grid>
            <Grid
                sx={{paddingLeft: 5, paddingRight: 5}}
            >
                <Tree
                    onSelect={onSelect}
                    treeData={treeData}
                    defaultExpandAll
                    showIcon
                    showLine
                />
            </Grid>

        </>
    );
}
