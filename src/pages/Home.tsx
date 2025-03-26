import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";
import { setCategoryId, setPage } from "../redux/slices/filterSlice";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { useSearchContext } from "../shared/contexts/searchContext";
import axios from "axios";

type PizzaItem = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

const Home = () => {
  const { searchValue } = useSearchContext();
  const currentPage = useAppSelector((state) => state.filters.currentPage);

  const categoryId = useAppSelector((state) => state.filters.categoryId);
  const sortType = useAppSelector((state) => state.filters.sort.sortProperty);
  const dispatch = useAppDispatch();

  const [items, setItems] = useState<PizzaItem[]>([]);
  const [isLoader, setIsLoader] = useState(true);

  const allCategory = categoryId > 0 ? `category=${categoryId}` : "";
  const search = searchValue ? `&search=${searchValue}` : "";

  useEffect(() => {
    setIsLoader(true);
    axios
      .get(
        `https://67b4aaf3a9acbdb38ecfeebc.mockapi.io/items?page=${currentPage}&limit=4&${allCategory}&sortBy=${sortType}&order=desc${search}`
      )
      .then((res) => {
        setItems(res.data);
        setIsLoader(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage, allCategory, search]);

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
