import { useContext } from 'react';

import TableSelectionContext from '../contexts/tableSelectionContext';
import { TABLE_RENDER_TYPES } from '../constants';
import EmployeeGridList from './employeeGridList';
import EmployeeTableList from './employeeTableList';

export default function RenderTable({ data }) {
    const { tableSelection } = useContext(TableSelectionContext);

    switch (tableSelection) {
        case TABLE_RENDER_TYPES.GRID:
            return <EmployeeGridList employees={data} />
        case TABLE_RENDER_TYPES.LIST:
            return <EmployeeTableList employees={data} />
        default:
            return <></>
    }
}