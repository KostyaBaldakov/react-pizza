import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";

const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({
    name: "популярности",
    sort: "rating",
  });

  const allCategory = categoryId > 0 ? `category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  useEffect(() => {
    setIsLoader(true);
    fetch(
      `https://67b4aaf3a9acbdb38ecfeebc.mockapi.io/items?page=${currentPage}&limit=4&${allCategory}&sortBy=${sortType.sort}&order=desc${search}`
    )
      .then((res) => res.json())
      .then((res) => {
        setItems(res);
        setIsLoader(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onChangeCategory={(i) => setCategoryId(i)}
        />
        <Sort sortType={sortType} onChangeSort={(i) => setSortType(i)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoader ? skeletons : pizzas}</div>
      <Pagination
        onChangePage={(number: number) => setCurrentPage(number)}
      />
    </div>
  );
};

export default Home;
