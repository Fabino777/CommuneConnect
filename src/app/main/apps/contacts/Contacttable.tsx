import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
  id: 'name' | 'code' | 'population' | 'size' | 'density';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'name', label: 'Users', minWidth: 170 },
  { id: 'code', label: 'Spend', minWidth: 100 },
  {
    id: 'population',
    label: 'Access',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'size',
    label: 'Last Invoked',
    minWidth: 170,
    align: 'right',
  },
];

interface Data {
  name: string;
  code: string;
  population: string;
  size: number;
}

function createData(
  name: string,
  code: string,
  population: string,
  size: number,
): Data {
  return { name, code, population, size};
}

const rows = [
  createData('rohan@gmail.com', '344', 'READ', 3287263),
  createData('rohan@gmail.com', '344', 'READ', 9596961),
  createData('rohan@gmail.com', '344', 'READ', 301340),
  createData('rohan@gmail.com', '344', 'READ', 9833520),
  createData('rohan@gmail.com', '344', 'READ', 9984670),
  createData('rohan@gmail.com', '344', 'READ', 7692024),
  createData('rohan@gmail.com', '344', 'READ', 357578),
  createData('rohan@gmail.com', '344', 'READ', 70273),
  createData('rohan@gmail.com', '344', 'READ', 1972550),
  createData('rohan@gmail.com', '344', 'READ', 377973),
  createData('rohan@gmail.com', '344', 'READ', 640679),
  createData('rohan@gmail.com', '344', 'READ', 242495),
  createData('rohan@gmail.com', '344', 'READ', 17098246),
  createData('rohan@gmail.com', '344', 'READ', 923768),
  createData('rohan@gmail.com', '344', 'READ', 8515767),
];

export default function ColumnGroupingTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 480 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 0, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}