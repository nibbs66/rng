import styles from '../../styles/admin/Datatable.module.css'
import { DataGrid } from '@mui/x-data-grid';
import Link from 'next/link'
const Datatable = ({columns, rows, pageSize, pageOption}) => {




    return (
        <div className={styles.datatable}>

            <DataGrid
                sx={{
                    color: '#15688a',
                    fontWeight: 'bold',
                    fontFamily: 'Nunito',


                }}
                className="datagrid"
                rows={rows}
                columns={columns}
                autoHeight
                pageSize={pageSize}
                rowsPerPageOptions={pageOption}
                checkboxSelection
            />
        </div>
    );
};

export default Datatable;
