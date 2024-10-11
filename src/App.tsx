import React from "react";

import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import CategoryForm from "./components/forms/CategoryForm";
import CategoryList from "./components/list/CategoryList";
import ClientForm from "./components/forms/ClientForm";
import ProductForm from "./components/forms/ProductForm";
import ClientList from "./components/list/ClientList";
import ProductList from "./components/list/ProductList";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-category" element={<CategoryForm />} />
        <Route path="/category-list" element={<CategoryList />} />
        <Route path="/add-client" element={<ClientForm/>}/>
        <Route path="/client-list" element={<ClientList/>}/>
        <Route path="/add-product" element={<ProductForm/>}/>
        <Route path="/product-list" element={<ProductList/>}/>
      </Routes>
    </div>
  );
};

export default App;