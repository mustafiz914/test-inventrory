import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Container, Typography, Box, Paper } from '@mui/material';
import { Add, Refresh } from '@mui/icons-material';
import ItemForm from '../components/ItemForm';
import axios from 'axios';

const InventoryPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const fetchItems = async () => {
    try {
      const res = await axios.get('/api/items');
      setItems(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const columns = [
    { field: 'name', headerName: 'Item Name', flex: 1 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'quantity', headerName: 'Quantity', width: 120 },
    { 
      field: 'problem', 
      headerName: 'Problem', 
      width: 200,
      renderCell: (params) => (
        <span style={{ color: params.value !== 'None' ? 'red' : 'inherit' }}>
          {params.value}
        </span>
      )
    },
    { 
      field: 'lastUpdated', 
      headerName: 'Last Updated', 
      width: 180,
      valueFormatter: (params) => {
        if (!params.value) return 'N/A';
        const date = new Date(params.value);
        return isNaN(date.getTime()) ? 'N/A' : date.toLocaleString();
      }
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <div>
          <Button 
            size="small" 
            onClick={() => handleEdit(params.row)}
            variant="outlined"
            sx={{ mr: 1 }}
          >
            Edit
          </Button>
          <Button 
            size="small" 
            onClick={() => handleDelete(params.row._id)}
            color="error"
            variant="outlined"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleAddItem = async (itemData) => {
    try {
      const res = await axios.post('/api/items', itemData);
      setItems([res.data, ...items]);
      setOpenForm(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateItem = async (itemData) => {
    try {
      const res = await axios.patch(`/api/items/${editingItem._id}`, {
        ...itemData,
        lastUpdated: new Date()
      });
      setItems(items.map(item => item._id === editingItem._id ? res.data : item));
      setOpenForm(false);
      setEditingItem(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setOpenForm(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/items/${id}`);
      setItems(items.filter(item => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Equipment History
        </Typography>
        <Box>
          <Button 
            variant="contained" 
            startIcon={<Refresh />} 
            onClick={fetchItems}
            sx={{ mr: 2 }}
          >
            Refresh
          </Button>
          <Button 
            variant="contained" 
            startIcon={<Add />}
            onClick={() => {
              setEditingItem(null);
              setOpenForm(true);
            }}
          >
            Add Item
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 2, height: '70vh' }}>
        <DataGrid
          rows={items}
          columns={columns}
          loading={loading}
          getRowId={(row) => row._id}
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
        />
      </Paper>

      <ItemForm 
        open={openForm} 
        onClose={() => {
          setOpenForm(false);
          setEditingItem(null);
        }} 
        onSubmit={editingItem ? handleUpdateItem : handleAddItem}
        initialValues={editingItem || {
          name: '',
          category: '',
          quantity: 0,
          problem: 'None'
        }}
      />
    </Container>
  );
};

export default InventoryPage;