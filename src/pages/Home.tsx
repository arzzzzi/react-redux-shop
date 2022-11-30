import React, { useCallback, useEffect, useRef } from 'react';
import { Categories, Skeleton, PizzaBlock, SortPopup, Pagination } from '../components/';
// import qs from 'qs';
// import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  setCategoryId,
  setCurrentPage,
  // setFilters,
} from '../redux/slices/filter/slice';
import { selectFilter } from '../redux/slices/filter/selectors';
import { fetchPizzas } from '../redux/slices/pizza/asyncActions';
import { selectPizzaData } from '../redux/slices/pizza/selectors';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  // const isMounted = useRef(false);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const onChangeCategory = useCallback((idx: number) => dispatch(setCategoryId(idx)), []);

  const getPizzas = async () => {
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );
    window.scrollTo(0, 0);
  };

  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sort.sortProperty,
  //       categoryId,
  //       currentPage,
  //     });
  //     navigate(`?${queryString}`);
  //   }
  //   isMounted.current = true;
  // }, [categoryId, sort.sortProperty, currentPage]);

  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
  //     const sort = list.find((obj) => obj.sortProperty === params.sortBy);
  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || list[0],
  //       }),
  //     );
  //   }
  //   isSearch.current = false;
  // }, []);

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories onChangeCategory={onChangeCategory} value={categoryId} />
        <SortPopup value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <>
          <h2> Пиццы не загрузились 😕</h2>
          <p>Вероятней всего, произошла ошибка при запросе на сервер.</p>
        </>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currnetPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
