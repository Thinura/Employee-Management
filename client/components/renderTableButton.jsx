import { useDispatch, useSelector } from 'react-redux';

import { IconButton } from "@mui/material";
import { purple } from "@mui/material/colors";

import { renderTableIconByType, renderTableButtonActionByType } from "../utils/tableHelper";

export default function RenderTableButton() {
    const dispatch = useDispatch();
    const tableSelection =  useSelector((state) => state.tableSelection.selection)

    return (
        <IconButton
            sx={{ color: purple[800] }}
            aria-label={"render-table"}
            component={"label"}
            onClick={renderTableButtonActionByType({type: tableSelection, dispatch})}
        >
            {renderTableIconByType({ type: tableSelection })}
        </IconButton>
    )
}