import { useEffect } from "react";
import DataTable from "react-data-table-component";

function Datatable({
    columns,
    data,
    loading,
    // contextActions,
    handleRowSelected,
    toggledClearRows,
    totalRows,
    handlePageChange,
    handlePerRowsChange,
    savedSelectedRows,
}) {
    useEffect(() => {}, [savedSelectedRows]);

    return (
        <section>
            <DataTable
                columns={columns}
                data={data}
                progressPending={loading}
                selectableRows
                // contextActions={contextActions}
                onSelectedRowsChange={handleRowSelected}
                clearSelectedRows={toggledClearRows}
                pagination
                paginationServer
                paginationTotalRows={totalRows}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
            />
        </section>
    );
}

export default Datatable;
