import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import { useNavigate } from "react-router-dom";
import Header from "../header/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../redux/ProductSlice";
import { statuses } from "../../redux/ProductSlice";
import { AllUserData } from "../../redux/AuthSlice";
import "./Product.css";
const ProductList = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { data, status } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
    console.log("product detail" + " " + data);
  }, []);

  const columns = [
    {
      name: "Thumbnail",
      selector: (row) => row.thumbnail,
      cell: ({ thumbnail }) => (
        <img
          src={thumbnail}
          alt="thumbnail"
          style={{ maxHeight: "10vh", width: "100%" }}
        />
      ),
      width: 150,
    },
    {
      name: "Title",
      selector: (row) => row.title,
      width: 150,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      width: 150,
    },
    {
      name: "Brand Name",
      selector: (row) => row.brand,
      width: 150,
    },
    {
      name: "Rating",
      selector: (row) => row.rating,
      width: 150,
    },
    {
      name: "Price",
      selector: (row) => `${row.price} $`,
      width: 150,
    },
    {
      name: "Discount",
      selector: (row) => `${row.discountPercentage} %`,
      width: 150,
    },
  ];

  if (status === statuses.LOADING) {
    return <h2>Loading ...</h2>;
  }

  return (
    <>
      <Header />
      <div className="container">
        <h1 className="my-5 text-center">Products List</h1>

        <DataTable
          //  title="Product List"
          columns={columns}
          scrollX
          scrollY
          data={data}
          pagination
          highlightOnHover
          paginationRowsPerPageOptions={[8]}
          paginationPerPage={8}
          onRowClicked={(state) => {
            navigate(`/products/${state.id}`);
          }}
        />
      </div>
    </>
  );
};

export default ProductList;
