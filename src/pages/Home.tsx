import { useEffect, useRef, useState } from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort, { sortList } from "../components/Sort";
import Pagination from "../components/Pagination";
import {
  setCategoryId,
  setFilters,
  setPage,
} from "../redux/slices/filterSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useSearchContext } from "../shared/contexts/searchContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { setItems } from "../redux/slices/pizzaSlice";

// type PizzaItem = {
//   id: number;
//   imageUrl: string;
//   title: string;
//   types: number[];
//   sizes: number[];
//   price: number;
//   category: number;
//   rating: number;
// };

const Home = () => {
  const { searchValue } = useSearchContext();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const currentPage = useAppSelector((state) => state.filters.currentPage);
  const categoryId = useAppSelector((state) => state.filters.categoryId);
  const sort = useAppSelector((state) => state.filters.sort.sortProperty);
  const items = useAppSelector((state) => state.pizza.items);

  const [isLoader, setIsLoader] = useState(true);

  const allCategory = categoryId > 0 ? `category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  const fetchPizzas = async () => {
    setIsLoader(true);

    try {
      const res = await axios.get(
        `https://67b4aaf3a9acbdb38ecfeebc.mockapi.io/items?page=${currentPage}&limit=4&${allCategory}&sortBy=${sort}&order=desc${search}`
      );
      dispatch(setItems(res.data));
    } catch (error) {
      console.log("Ошибка запроса", error);
      alert("Ошибка запроса");
    } finally {
      setIsLoader(false);
    }

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage, allCategory, search]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoader ? skeletons : pizzas}</div>
      <Pagination
        onChangePage={(num: number) => dispatch(setPage(num))}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Home;
