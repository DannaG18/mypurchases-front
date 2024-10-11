import React from "react";
import ListComponent from "../ListComponent";
import { findAll, updateCategory, deleteCategory } from "../../api/CategoryService";
import { Category } from "../../models/Category";

const CategoryList: React.FC = () => {
  const categoryFields: { name: keyof Category; label: string; type: string }[] = [
    { name: 'description', label: 'Description', type: 'text' },
    { name: 'status', label: 'Status', type: 'checkbox' },
  ];

  return (
    <ListComponent<Category>
      entityName="Category"
      fetchAll={findAll}
      deleteEntity={deleteCategory}
      updateEntity={updateCategory}
      entityFields={categoryFields}
    />
  );
};

export default CategoryList;