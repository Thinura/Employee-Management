import { useSelector } from 'react-redux'

import { TABLE_RENDER_TYPES } from '../constants';
import EmployeeGridList from './employeeGridList';
import EmployeeTableList from './employeeTableList';

export default function RenderTable({ data }) {
    const tableSelection =  useSelector((state) => state.tableSelection.selection)

    switch (tableSelection) {
        case TABLE_RENDER_TYPES.GRID:
            return <EmployeeGridList employees={data} />
        case TABLE_RENDER_TYPES.LIST:
            return <EmployeeTableList employees={data} />
        default:
            return <></>
    }
}