import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_BASE_URL;

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  }
);

export const fetchProduct = createAsyncThunk(
  'products/fecthProduct',
  async (productId) => {
    const response = await axios.get(`${API_URL}/products/${productId}`);
    return response.data;
  }
);

export const addProduct = createAsyncThunk(
  'products/addProduct',
  async (product) => {
    const response = await axios.post(`${API_URL}/products`, product);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (product) => {
    const response = await axios.put(
      `${API_URL}/products/${product.id}`,
      product
    );
    return response.data;
  }
);

export const deleteProduct = createAsyncThunk(
  'products/deleteProduct',
  async (productId) => {
    await axios.delete(`${API_URL}/products/${productId}`);
    return productId;
  }
);

export const updateStock = createAsyncThunk(
  'products/updateStock',
  async (productId, newStock) => {
    const response = await axios.patch(`${API_URL}/products/${productId}`, {
      stock: newStock,
    });

    return response.data;
  }
);

export const fetchLogs = createAsyncThunk('products/fetchLogs', async () => {
  const response = await axios.get(`${API_URL}/logs/`);
  return response.data;
});

export const addLog = createAsyncThunk('products/addLog', async (log) => {
  await axios.post(`${API_URL}/logs`, log);
});

const initialState = {
  products: [],
  logs: [],
  loading: false,
  error: null,
  isSuccess: false,
  isEditing: false,
  product: null,
  productId: '',
  showBarcodeScanner: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    selectProduct: (state, action) => {
      state.isEditing = true;
      state.product = action.payload;
    },
    resetProduct: (state) => {
      state.isEditing = false;
      state.product = null;
    },
    setProductId: (state, action) => {
      state.productId = action.payload;
    },
    resetProductid: (state) => {
      state.productId = '';
    },
    toggleBarcodeScanner: (state) => {
      state.showBarcodeScanner = !state.showBarcodeScanner;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to fetch products';
    });
    builder.addCase(fetchProduct.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to fetch product';
    });
    builder.addCase(addProduct.pending, (state) => {
      state.isSuccess = false;
      state.loading = true;
    });
    builder.addCase(addProduct.fulfilled, (state) => {
      state.loading = false;
      state.isSuccess = true;
    });
    builder.addCase(addProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to add product';
    });
    builder.addCase(updateProduct.pending, (state) => {
      state.isSuccess = false;
      state.loading = true;
    });
    builder.addCase(updateProduct.fulfilled, (state) => {
      state.loading = false;
      state.isSuccess = true;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to update product';
    });
    builder.addCase(updateStock.pending, (state) => {
      state.isSuccess = false;
      state.loading = true;
    });
    builder.addCase(updateStock.fulfilled, (state) => {
      state.loading = false;
      state.isSuccess = true;
    });
    builder.addCase(updateStock.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to update stock';
    });
    builder.addCase(deleteProduct.pending, (state) => {
      state.isSuccess = false;
      state.loading = true;
    });
    builder.addCase(deleteProduct.fulfilled, (state) => {
      state.loading = false;
      state.isSuccess = true;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to delete product';
    });
    builder.addCase(fetchLogs.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(fetchLogs.fulfilled, (state, action) => {
      state.loading = false;
      state.logs = action.payload;
    });
    builder.addCase(fetchLogs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to fetch products';
    });
    builder.addCase(addLog.pending, (state) => {
      state.isSuccess = false;
      state.loading = true;
    });
    builder.addCase(addLog.fulfilled, (state) => {
      state.loading = false;
      state.isSuccess = true;
    });
    builder.addCase(addLog.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to add product log';
    });
  },
});

export const {
  selectProduct,
  resetProduct,
  toggleBarcodeScanner,
  setProductId,
  resetProductid,
} = productsSlice.actions;
export default productsSlice.reducer;
