import { Column } from '@/types';
import _ from 'lodash';
import { ReactNode } from 'react';

interface AppTableProps<T> {
  columns: Column<T>[];
  data: T[];
}

const AppTable = <T,>({ data = [], columns = [] }: AppTableProps<T>) => {
  const renderCell = (row: T, col: Column<T>): ReactNode => {
    if (col.render) return col.render(row);

    return row[col.value as keyof T] as ReactNode;
  };

  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            {columns.map((c, index) => (
              <th key={index}>{c.label}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((c, colIndex) => (
                <td key={`${rowIndex}_${colIndex}`}>{renderCell(item, c)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppTable;
