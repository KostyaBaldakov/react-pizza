import { useEffect, useRef } from "react";
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
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import qs from "qs";

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

  const { currentPage, categoryId } = useAppSelector((state) => state.filters);
  const { items, status } = useAppSelector((state) => state.pizza);
  const sort = useAppSelector((state) => state.filters.sort.sortProperty);

  const category = categoryId > 0 ? `category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  const getPizzas = async () => {
    dispatch(
      fetchPizzas({
        currentPage,
        category,
        sort,
        search,
      })
    );

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (isMounted.current) {
      const params = {
        categoryId: categoryId > 0 ? categoryId : null,
        sortProperty: sort,
        currentPage,
      };

      const queryString = qs.stringify(params, { skipNulls: true });
      navigate(`?${queryString}`);
    }

    if (!window.location.search) {
      // fetchPizzas();
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
    getPizzas();

    // isSearch.current = false;
  }, [categoryId, sort, searchValue, currentPage, category, search]);

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
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению, нам не удалось получить пицку. Попробуйте повторить
            попытку позже
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : pizzas}
        </div>
      )}
      <Pagination
        onChangePage={(num: number) => dispatch(setPage(num))}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Home;
