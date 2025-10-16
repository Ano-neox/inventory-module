import React, { useState } from 'react';
import {
  Box, Typography, Card, CardContent, Grid, Button, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper, Chip, Dialog,
  DialogTitle, DialogContent, TextField, DialogActions, IconButton, Alert
} from '@mui/material';
import { IconPlus, IconEdit, IconTrash, IconAlertTriangle, IconTrendingUp, IconTrendingDown } from '@tabler/icons-react';
import PageContainer from '../../../../modernize-dashboard/src/components/container/PageContainer';

const InventoryMain = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop Dell XPS', sku: 'DELL001', quantity: 25, price: 1200, category: 'Electronics', minStock: 10 },
    { id: 2, name: 'Office Chair', sku: 'CHAIR001', quantity: 5, price: 250, category: 'Furniture', minStock: 15 },
    { id: 3, name: 'Wireless Mouse', sku: 'MOUSE001', quantity: 150, price: 35, category: 'Electronics', minStock: 20 },
    { id: 4, name: 'Desk Lamp', sku: 'LAMP001', quantity: 8, price: 75, category: 'Furniture', minStock: 12 }
  ]);
  
  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [formData, setFormData] = useState({ name: '', sku: '', quantity: 0, price: 0, category: '', minStock: 0 });

  const lowStockItems = products.filter(p => p.quantity <= p.minStock);
  const totalValue = products.reduce((sum, p) => sum + (p.quantity * p.price), 0);

  const handleAdd = () => {
    setEditProduct(null);
    setFormData({ name: '', sku: '', quantity: 0, price: 0, category: '', minStock: 0 });
    setOpen(true);
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setFormData(product);
    setOpen(true);
  };

  const handleSave = () => {
    if (editProduct) {
      setProducts(products.map(p => p.id === editProduct.id ? { ...formData, id: editProduct.id } : p));
    } else {
      setProducts([...products, { ...formData, id: Date.now() }]);
    }
    setOpen(false);
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const adjustStock = (id, adjustment) => {
    setProducts(products.map(p => 
      p.id === id ? { ...p, quantity: Math.max(0, p.quantity + adjustment) } : p
    ));
  };

  return (
    <PageContainer title="Inventory" description="Inventory Management System">
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Typography variant="h4">Inventory Dashboard</Typography>
          <Button variant="contained" startIcon={<IconPlus />} onClick={handleAdd}>
            Add Product
          </Button>
        </Box>

        {lowStockItems.length > 0 && (
          <Alert severity="warning" sx={{ mb: 3 }}>
            <strong>Low Stock Alert:</strong> {lowStockItems.length} items are running low on stock!
          </Alert>
        )}

        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              backgroundColor: '#f8f9ff',
              border: 'none',
              boxShadow: 'none',
              borderRadius: 2,
              p: 1
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: '16px !important' }}>
                <Box sx={{ 
                  backgroundColor: '#e8eaff',
                  borderRadius: '8px',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '40px',
                  height: '40px'
                }}>
                  <Box sx={{ fontSize: '20px', color: '#5a67d8' }}>📦</Box>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a202c', mb: 0.5 }}>
                    {products.length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#718096', fontSize: '14px' }}>
                    Total Products
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              backgroundColor: '#f0fff4',
              border: 'none',
              boxShadow: 'none',
              borderRadius: 2,
              p: 1
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: '16px !important' }}>
                <Box sx={{ 
                  backgroundColor: '#c6f6d5',
                  borderRadius: '8px',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '40px',
                  height: '40px'
                }}>
                  <Box sx={{ fontSize: '20px', color: '#38a169' }}>📊</Box>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a202c', mb: 0.5 }}>
                    {products.reduce((sum, p) => sum + p.quantity, 0)}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#718096', fontSize: '14px' }}>
                    Total Stock
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              backgroundColor: '#fff5f5',
              border: 'none',
              boxShadow: 'none',
              borderRadius: 2,
              p: 1
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: '16px !important' }}>
                <Box sx={{ 
                  backgroundColor: '#fed7d7',
                  borderRadius: '8px',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '40px',
                  height: '40px'
                }}>
                  <Box sx={{ fontSize: '20px', color: '#e53e3e' }}>⚠️</Box>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a202c', mb: 0.5 }}>
                    {lowStockItems.length}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#718096', fontSize: '14px' }}>
                    Low Stock Items
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card sx={{ 
              backgroundColor: '#fffbf0',
              border: 'none',
              boxShadow: 'none',
              borderRadius: 2,
              p: 1
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: '16px !important' }}>
                <Box sx={{ 
                  backgroundColor: '#fed7aa',
                  borderRadius: '8px',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '40px',
                  height: '40px'
                }}>
                  <Box sx={{ fontSize: '20px', color: '#d69e2e' }}>💰</Box>
                </Box>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1a202c', mb: 0.5 }}>
                    ₹{totalValue.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#718096', fontSize: '14px' }}>
                    Total Value
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Card>
          <CardContent>
            <Typography variant="h6" mb={2}>Product Inventory</Typography>
            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: 'primary.main' }}>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Product Name</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>SKU</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Category</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Quantity</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Price</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Value</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products.map((product, index) => (
                    <TableRow key={product.id} sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' }, '&:hover': { backgroundColor: 'action.selected' } }}>
                      <TableCell sx={{ fontWeight: 'medium' }}>{product.name}</TableCell>
                      <TableCell sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>{product.sku}</TableCell>
                      <TableCell sx={{ color: 'text.secondary' }}>{product.category}</TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <IconButton size="small" onClick={() => adjustStock(product.id, -1)}>
                            <IconTrendingDown />
                          </IconButton>
                          {product.quantity}
                          <IconButton size="small" onClick={() => adjustStock(product.id, 1)}>
                            <IconTrendingUp />
                          </IconButton>
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>₹{product.price}</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', color: 'success.main' }}>₹{(product.quantity * product.price).toLocaleString()}</TableCell>
                      <TableCell>
                        {product.quantity <= product.minStock ? (
                          <Chip 
                            label="Low Stock" 
                            color="error"
                            size="small"
                            icon={<IconAlertTriangle />}
                          />
                        ) : (
                          <Chip label="In Stock" color="success" size="small" />
                        )}
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => handleEdit(product)} size="small">
                          <IconEdit />
                        </IconButton>
                        <IconButton onClick={() => handleDelete(product.id)} size="small" color="error">
                          <IconTrash />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{editProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Product Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              margin="normal"
            />
            <TextField
              fullWidth
              label="SKU"
              value={formData.sku}
              onChange={(e) => setFormData({...formData, sku: e.target.value})}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              margin="normal"
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 0})}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value) || 0})}
                  margin="normal"
                />
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label="Minimum Stock Level"
              type="number"
              value={formData.minStock}
              onChange={(e) => setFormData({...formData, minStock: parseInt(e.target.value) || 0})}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </PageContainer>
  );
};

export default InventoryMain;