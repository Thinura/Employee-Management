import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AppsIcon from '@mui/icons-material/Apps';

import { EmployeeGridList, EmployeeTableList } from "../components";
import { TABLE_RENDER_TYPES } from "../constants";
import { selectTable } from '../slices/tableSelectionSlice';

export function renderTableByType({ type, data }) {
    switch (type) {
        case TABLE_RENDER_TYPES.GRID:
            return <EmployeeGridList employees={data} />;
        case TABLE_RENDER_TYPES.LIST:
            return <EmployeeTableList employees={data} />;
        default:
            return <></>;
    }
}

export function renderTableIconByType({ type }) {
    switch (type) {
        case TABLE_RENDER_TYPES.LIST:
            return <AppsIcon />;
        case TABLE_RENDER_TYPES.GRID:
            return <FormatListBulletedIcon />;
        default:
            return <></>;
    }
}

export function renderTableButtonActionByType({ type, dispatch }) {

    switch (type) {
        case TABLE_RENDER_TYPES.LIST:
            return () => { dispatch(selectTable(TABLE_RENDER_TYPES.GRID)); };
        case TABLE_RENDER_TYPES.GRID:
            return () => { dispatch(selectTable(TABLE_RENDER_TYPES.LIST)); };
        default:
            return () => { };
    }
}
