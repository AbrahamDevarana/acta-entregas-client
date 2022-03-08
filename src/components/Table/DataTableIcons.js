import { forwardRef } from "react";
import {Edit, Delete, RecentActors, AccountTree, Search} from '@material-ui/icons'


export const localization = {
    pagination: {
        labelDisplayedRows: '{from}-{to} de {count}'
    },
    toolbar: {
        nRowsSelected: '{0} row(s) selected'
    },
    header: {
        actions: 'Acciones'
    },
    body: {
        emptyDataSourceMessage: 'No records to display',
        filterRow: {
            filterTooltip: 'Filter'
        }
    }
}

export const tableIcons = {
    Edit: forwardRef((props, ref) => <Edit className="text-warning" {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <Delete className="text-danger" {...props} ref={ref} />),
    RecentActors: forwardRef((props, ref) => <RecentActors className="text-info" {...props} ref={ref} />),
    AccountTree: forwardRef((props, ref) => <AccountTree className="text-info" {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search className="text-info" {...props} ref={ref} />),
  };

