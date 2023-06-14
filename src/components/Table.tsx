import DataTable  from 'react-data-table-component';

const paginationOptions = {
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos'
};

interface TableProps {
    datos: any[];
    columnas: any[];
    titulo: string;
  }
  

const Table: React.FC<TableProps> = ({ datos, columnas, titulo }) => {
  return (
    <div>
      <DataTable
        columns={columnas}
        data={datos}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="600px"
        paginationComponentOptions={paginationOptions}
        title={titulo}
      />
    </div>
  );
};

export default Table;
