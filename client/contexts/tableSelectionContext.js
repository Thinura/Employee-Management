import React, { createContext, useState, useMemo } from 'react';

import { TABLE_RENDER_TYPES } from '.././constants'
const TableSelectionContext = createContext();

export function TableSelectionProvider({ children }) {
  
  const [tableSelection, setTableSelection] = useState(TABLE_RENDER_TYPES.GRID);
  const tableSelectionMemo = useMemo(() => ({ tableSelection, setTableSelection }), [tableSelection]);

  return (
    <TableSelectionContext.Provider value={{ tableSelection, setTableSelection }}>
      {children}
    </TableSelectionContext.Provider>
  );
}

export default TableSelectionContext;
