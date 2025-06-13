// src/pages/ProductTable.tsx
import React, { useEffect, useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridSortModel,
  GridPaginationModel,
} from '@mui/x-data-grid';
import { useSelector, useDispatch } from 'react-redux';

import type { RootState, AppDispatch } from '../store/store'; // update paths as per your project
import { fetchProducts, deleteProduct } from '../store/productSlice';

const ProductTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, total, loading } = useSelector((state: RootState) => state.products);

  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(0);
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const sortBy = sortModel[0]?.field;
    const sortOrder = sortModel[0]?.sort;
    dispatch(fetchProducts({
      page: page + 1,
      limit: pageSize,
      search,
      sortBy,
    }));
  }, [dispatch, page, pageSize, sortModel, search]);

  const handleDelete = async (id: string) => {
    await dispatch(deleteProduct(id));
    dispatch(fetchProducts({ page: page + 1, limit: pageSize, search }));
  };

  const handlePaginationModelChange = (model: GridPaginationModel) => {
    setPage(model.page);
    setPageSize(model.pageSize);
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'price', headerName: 'Price', flex: 1, type: 'number' },
    { field: 'stock', headerName: 'Stock', flex: 1, type: 'number' },
    {
      field: 'actions',
      headerName: 'Actions',
      renderCell: (params) => (
        <button
          style={{ color: 'red', cursor: 'pointer' }}
          onClick={() => handleDelete(params.row._id)}
        >
          Delete
        </button>
      ),
      sortable: false,
      flex: 1,
    },
  ];

  return (
    <div style={{ height: 600, width: '100%', padding: '1rem' }}>
      <input
        type="text"
        placeholder="Search by name"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(0);
        }}
        style={{
          marginBottom: '10px',
          padding: '8px',
          width: '250px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />

      <DataGrid
        rows={products}
        getRowId={(row) => row._id}
        columns={columns}
        rowCount={total}
        paginationMode="server"
        sortingMode="server"
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={handlePaginationModelChange}
        sortModel={sortModel}
        onSortModelChange={(model) => setSortModel(model)}
        pageSizeOptions={[5, 10, 20, 50]}
        pagination
        loading={loading}
      />
    </div>
  );
};

export default ProductTable;
