import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../header/Header";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "reactstrap";
const ProductDetail = () => {
  const [product, setProducts] = useState([]);
  const navigate = useNavigate();

  const ProductData = async () => {
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    setProducts(response.data);
  };

  useEffect(() => {
    ProductData();
  }, []);

  console.log(product.title);
  const { id } = useParams();

  return (
    <div>
      <Header />
      <h1 className="mt-5 text-center">Product Details</h1>
      <div className=" d-flex align-items-center justify-content-center mt-5">
        <Card>
          <CardImg
            class="card-img-top"
            src={product.thumbnail}
            alt={product.title}
          />
          <CardBody>
            <CardTitle tag="h1">{product.title}</CardTitle>
            <CardText className=" d-flex align-content-center justify-content-between">
              <strong>Category:</strong> {product.category}
            </CardText>
            <CardText className=" d-flex align-content-center justify-content-between">
              <strong>Brand:</strong> {product.brand}
            </CardText>
            <CardText className=" d-flex align-content-center justify-content-between">
              <strong>Rating:</strong> {product.rating}
            </CardText>
            <CardText className=" d-flex align-content-center justify-content-between">
              <strong>Price:</strong> {product.price}
            </CardText>
            <CardText className=" d-flex align-content-center justify-content-between">
              <strong>Discount:</strong> {product.discountPercentage} %
            </CardText>
            <Button
              type="button"
              onClick={() => navigate("/products")}
              className="btn btn-primary "
            >
              Back
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
