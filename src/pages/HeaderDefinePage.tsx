import React, {useState} from 'react';
import {useAtom, useSetAtom} from 'jotai'
import {Button, Grid, MenuItem, Paper, Select, SelectChangeEvent, Stack, TextField, Typography} from '@mui/material';
import {Color, ColorPicker} from "material-ui-color";
import {HeaderNode, HeaderTreeNode, NodeType, RGB} from 'src/types/types';
import HeaderTree from '../components/tree/HeaderTree';
import {headerAtom, headerTreeAtom, initialTreeData} from "../store";

export default function HeaderDefinePage() {

    /** States */
    const [selectedNode, setSelectedNode] = useState<HeaderTreeNode | undefined>(undefined);

    /** Atom */
    const setHeaderAtom = useSetAtom(headerAtom);
    const [treeData, setTreeData] = useAtom(headerTreeAtom);

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

    const removeColors = (headerNode: HeaderTreeNode): HeaderNode => {
        const newHeaderNode: HeaderNode = {
            ...headerNode,
            children: headerNode.children.map(removeColors),
        };
        return newHeaderNode;
    };

    const onChangeHeaderColor = (newColor: Color) => {
        if (selectedNode === undefined || selectedNode.fieldName === 'root') {
            return;
        }

        const updatedTreeData = [...treeData];

        const selectedKey = selectedNode.key;

        dfs(updatedTreeData, selectedKey, (dataNode, index, data) => {
            const newRGB: RGB = {
                r: newColor.rgb.at(0) ?? 255,
                g: newColor.rgb.at(1) ?? 255,
                b: newColor.rgb.at(2) ?? 255
            }
            const newDataNode: HeaderTreeNode = {...dataNode, headerColor: newColor, headerRGB: newRGB}
            data.splice(index, 1, newDataNode);
            setSelectedNode(newDataNode);
        })

        setTreeData(updatedTreeData);
    };

    const onChangeBodyColor = (newColor: Color) => {
        if (selectedNode === undefined || selectedNode.fieldName === 'root') {
            return;
        }

        const updatedTreeData = [...treeData];

        const selectedKey = selectedNode.key;

        dfs(updatedTreeData, selectedKey, (dataNode, index, data) => {
            const newRGB: RGB = {
                r: newColor.rgb.at(0) ?? 255,
                g: newColor.rgb.at(1) ?? 255,
                b: newColor.rgb.at(2) ?? 255
            }
            const newDataNode: HeaderTreeNode = {...dataNode, bodyColor: newColor, bodyRGB: newRGB}
            data.splice(index, 1, newDataNode);
            setSelectedNode(newDataNode);
        })

        setTreeData(updatedTreeData);
    };

    const onChangeFieldName = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedNode === undefined || selectedNode.fieldName === 'root') {
            return;
        }

        const updatedTreeData = [...treeData];

        const selectedKey = selectedNode.key;

        dfs(updatedTreeData, selectedKey, (dataNode, index, data) => {
            const fieldName = event.target.value.trim().replace(/^\w/, (c) => c.toLowerCase());
            const newDataNode: HeaderTreeNode = {...dataNode, fieldName}
            data.splice(index, 1, newDataNode);
            setSelectedNode(newDataNode);
        })

        setTreeData(updatedTreeData);
    }

    const onChangeColumnName = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedNode === undefined || selectedNode.fieldName === 'root') {
            return;
        }

        const updatedTreeData = [...treeData];

        const selectedKey = selectedNode.key;

        dfs(updatedTreeData, selectedKey, (dataNode, index, data) => {
            const newDataNode: HeaderTreeNode = {...dataNode, title: event.target.value, columnName: event.target.value}
            data.splice(index, 1, newDataNode);
            setSelectedNode(newDataNode);
        })

        setTreeData(updatedTreeData);
    }

    const onChangeFieldType = (event: SelectChangeEvent<NodeType>) => {
        if (selectedNode === undefined || selectedNode.fieldName === 'root') {
            return;
        }

        const updatedTreeData = [...treeData];

        const selectedKey = selectedNode.key;

        dfs(updatedTreeData, selectedKey, (dataNode, index, data) => {
            const newDataNode: HeaderTreeNode = {...dataNode, type: event.target.value as NodeType}
            data.splice(index, 1, newDataNode);
            setSelectedNode(newDataNode);
        })

        setTreeData(updatedTreeData);
    }

    const onClickReset = () => {
        const headerNode = removeColors(treeData.at(0)!);
        setHeaderAtom(headerNode);
        setTreeData(initialTreeData);
    }

    const onClickSave = () => {
        if (treeData === undefined) return;
        const headerNode = removeColors(treeData.at(0)!);
        setHeaderAtom(headerNode);
        alert('Successfully saved!')
    }

    return (
        <Grid
            container
            spacing={1}
        >
            <Grid item xs={6}>
                <Paper
                    elevation={2}
                    sx={{height: '550px'}}
                >
                    <HeaderTree
                        treeData={treeData}
                        setTreeData={setTreeData}
                        selectedNode={selectedNode}
                        setSelectedNode={setSelectedNode}
                        onClickReset={onClickReset}
                    />
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper
                    elevation={2}
                    sx={{height: '550px', padding: 5}}
                >
                    <Typography variant={"h6"} sx={{paddingBottom: 2}}>Field Name</Typography>
                    <TextField
                        sx={{width: '100%'}}
                        value={selectedNode?.fieldName}
                        onChange={onChangeFieldName}
                        size={"small"}
                        helperText={"Please enter in camel case without any spaces (ex. updatedTime)."}
                    />
                    <Typography variant={"h6"} sx={{paddingTop: 4, paddingBottom: 2}}>Column Name</Typography>
                    <TextField
                        sx={{width: '100%'}}
                        value={selectedNode?.title}
                        onChange={onChangeColumnName}
                        size={"small"}
                    />
                    <Typography variant={"h6"} sx={{paddingTop: 4, paddingBottom: 2}}>Column Type</Typography>
                    <Select
                        label={"Field Type"}
                        value={selectedNode?.type ?? ""}
                        sx={{width: '100%'}}
                        size={"small"}
                        onChange={onChangeFieldType}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={'String'}>String</MenuItem>
                        <MenuItem value={'Float'}>Float</MenuItem>
                        <MenuItem value={'Integer'}>Integer</MenuItem>
                    </Select>
                    <Typography variant={"h6"} sx={{paddingTop: 4, paddingBottom: 2}}>Background Color</Typography>
                    <Stack
                        direction={"row"}
                        alignItems="center"
                        spacing={3}
                    >
                        <Typography variant={"subtitle2"}>Header</Typography>
                        <ColorPicker value={selectedNode?.headerColor} onChange={onChangeHeaderColor} hideTextfield/>
                        <Typography variant={"subtitle2"}>Body</Typography>
                        <ColorPicker value={selectedNode?.bodyColor} onChange={onChangeBodyColor} hideTextfield/>
                    </Stack>
                </Paper>
            </Grid>
            <Grid container justifyContent={"flex-end"} sx={{paddingTop: 2}}>
                <Button
                    variant={'contained'}
                    color={'primary'}
                    onClick={onClickSave}
                >
                    Save
                </Button>
            </Grid>
        </Grid>

    );
}