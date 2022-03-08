import MaterialTable from 'material-table'
import {tableIcons} from './DataTableIcons'
import {PatchedPagination} from './patchTable'

const Table = ({header, body, title, setEdit, showItem, deleteItem}) => {

    let actions = []
    if(showItem){
        actions.push({ 
            icon: tableIcons.Search,
            color: 'primary',
            tooltip: 'Detalles',
            onClick: (event, rowData) => showItem(rowData.id)
        })
    }
    if (setEdit) {
        actions.push({
            icon: tableIcons.Edit,
            color: 'warning',
            tooltip: 'Modificar',
            onClick: (event, rowData) => setEdit(rowData.id) ,
        })
    }
    if (deleteItem) {
        actions.push({
            icon: tableIcons.Delete,
            color: 'error',
            tooltip: 'Borrar',
            onClick: (event, rowData) => deleteItem(rowData.id)
        })
    }

   

    return ( 
         <MaterialTable
            icons={tableIcons}
            components={{
                Pagination: PatchedPagination,
              }}
            columns={header}
            data={body}
            title={title}
            options={{
                actionsColumnIndex: -1,
                exportButton: true,
                pageSize: 10,
                pageSizeOptions:[ 10, 25, 50, 100],
                headerStyle: {
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    textAlign: 'center'
                },
            }}
            actions={actions}
         />
     );
}
 
export default Table;