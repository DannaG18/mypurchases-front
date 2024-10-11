import React from "react";
import ListComponent from "../ListComponent";
import { findAll, updateProduct, deleteProduct } from "../../api/ProductService";
import { Product } from "../../models/Product";

const ProductList: React.FC = () => {
  const productFields = [
    { name: 'name', label: 'Name', type: 'text' },
    { name: 'category.description', label: 'Category', type: 'text' },
    { name: 'barcode', label: 'Barcode', type: 'text' },
    { name: 'price', label: 'Price', type: 'number' },
    { name: 'stock', label: 'Stock', type: 'number' },
    { name: 'status', label: 'Status', type: 'checkbox' },
  ];

  return (
    <ListComponent<Product>
      entityName="Product"
      fetchAll={findAll}
      deleteEntity={deleteProduct}
      updateEntity={updateProduct}
      entityFields={productFields}
    />
  );
};

export default ProductList;