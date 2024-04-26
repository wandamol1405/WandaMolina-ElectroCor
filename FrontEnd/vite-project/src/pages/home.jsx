import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ProductsContainer from "../components/productsContainer";
import Filter from "../components/filter";
import Services from "../components/services";
import FormButton from "../components/formButton";

const HomeSection = styled.section`
  box-sizing: border-box;
  font-family: "Roboto Flex Normal";
  color: #4b484d;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem;
  gap: 1rem;

  .banner img {
    width: 90vw;
    height: 30%;
    border-radius: 10px;
  }
  .product-title {
    width: 75vw;
    background-color: #ffffff;
    border-radius: 10px;
    padding: 1.5rem;
    font-size: 1.5rem;
    text-align: center;
  }
  button:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 1080px) {
    .banner img {
      width: 77vw;
      height: 25rem;
    }
  }
`;

const PageExplorer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 77vw;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 0.5rem;
  font-family: "Roboto Flex Normal";
  color: #4b484d;
  font-size: 1.2rem;
`;

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPage, setProductsPage] = useState(4);

  function filterProducts(name, price, category, order) {
    let newProducts = products.filter((prod) => {
      return prod.name.toLowerCase().includes(name.toLowerCase());
    });

    if (price > 0) {
      newProducts = newProducts.filter((prod) => {
        return prod.price >= price;
      });
    }

    if (category > 0) {
      newProducts = newProducts.filter((prod) => {
        console.log(prod.id_category);
        console.log(category);
        return prod.id_category == category;
      });
    }
  
    if (order) {
      newProducts = newProducts.sort((a, b) => {
        if (order) {
          return a.name.localeCompare(b.name);
        }
      });
    }

    setFilteredProducts(newProducts);
  }

  useEffect(() => {
    async function getProducts() {
      const response = await fetch("http://localhost:3000/products");
      const prod = await response.json();
      console.log(prod.data);
      setProducts(prod.data);
      setFilteredProducts(prod.data);
    }
    getProducts();
  }, []);

  const indexLast = currentPage * productsPage;
  const indexFirst = indexLast - productsPage;
  const currentProducts = filteredProducts.slice(indexFirst, indexLast);

  return (
    <HomeSection>
      <div className="banner">
        <img src="../resources/banner.png" />
      </div>
      <Services />
      <div className="product-title">
        <h2>Productos destacados</h2>
      </div>
      <Filter handleSearch={filterProducts} />
      <ProductsContainer data={currentProducts} />
      <PageExplorer>
        <FormButton
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
        >
          Retroceder
        </FormButton>
        Pagina: {currentPage}
        <FormButton onClick={() => setCurrentPage((prev) => prev + 1)}>
          Siguiente
        </FormButton>
      </PageExplorer>
    </HomeSection>
  );
}

export default Home;
