import {atomWithStorage} from "jotai/utils";
import {
    defaultBodyColor,
    defaultBodyRGB,
    defaultHeaderColor,
    defaultHeaderRGB,
    HeaderNode,
    HeaderTreeNode
} from "../types";

export const initialTreeData: HeaderTreeNode[] = [
    {
        title: 'Header',
        key: '0',
        type: 'String',
        columnName: 'Header',
        fieldName: 'root',
        headerColor: defaultHeaderColor,
        bodyColor: defaultBodyColor,
        headerRGB: defaultHeaderRGB,
        bodyRGB: defaultBodyRGB,
        children: [
            {
                title: 'Column',
                key: '0-0',
                type: 'String',
                columnName: 'Column',
                fieldName: 'field',
                headerColor: defaultHeaderColor,
                bodyColor: defaultBodyColor,
                headerRGB: defaultHeaderRGB,
                bodyRGB: defaultBodyRGB,
                children: [],
            }
        ],
    },
];

export const headerTreeAtom = atomWithStorage<HeaderTreeNode[]>('headerTree', initialTreeData);
export const headerAtom = atomWithStorage<HeaderNode | undefined>('header', undefined);