import { useContext } from 'react';

import { IconButton } from "@mui/material";
import { purple } from "@mui/material/colors";

import { renderTableIconByType, renderTableButtonActionByType } from "../utils/tableHelper";
import TableSelectionContext from '../contexts/tableSelectionContext';

export default function RenderTableButton() {
    const { tableSelection, setTableSelection } = useContext(TableSelectionContext);

    return (
        <IconButton
            sx={{ color: purple[800] }}
            aria-label={"render-table"}
            component={"label"}
            onClick={renderTableButtonActionByType({ type: tableSelection, setSelection: setTableSelection })}
        >
            {renderTableIconByType({ type: tableSelection })}
        </IconButton>
    )
}