import React, {useState,useRef, Fragment} from 'react'
import Loader from './components/Loader/Loader'
import Table from './components/Table/Table';
import _ from 'lodash'
import DataDetails from './components/DataDetails/DataDetails';
import ModSelector from './components/ModeSelector/ModeSelector';
import ReactPaginate from 'react-paginate';
import TableSearch from './components/TableSearch/TableSearch';



function App() {
  const [isModeSelected, setisModeSelected] = useState(false); // режим выбора загрузки данных(32 или 1000 обьектов)
  const data = useRef([]);
  const [person, setPerson] = useState(); //данные выбраннго человека для блока с детальным описанием 
  const [dataDetailsActive, setDataDetailsActive] = useState(false); //пока false блок с детальным описанием не выводится
  const [load, setLoad] = useState(true); // выводить не выводит индикатор загрузки
  const [dirSort, setdirSort ] = useState('asc'); //desc = сортировка по возрастанию или по убыванию
  const [sortField, setSortField ] = useState('id');//столбец по которому выбрана сортировка
  const [pageCount, setPageCount] = useState(0); //кол-во страниц пагинатора
  const [pageSelect, setPageSelect] = useState(0); //номер выбранной страницы в пагинаторе
  const [search, setSearch] = useState('');
  const pageSize = 50; //кол-во эл-ов в таблице на 1 странице пагинатора




  //загрузка данных по выбранной 'url'(32 или 1000 объектов)
  function modeSelectHandler(url){
    setisModeSelected(true)
    fetchData(url)    
  }
  async function fetchData(url){
    const response = await fetch(url);
    const data_ = await response.json()

    //setData(_.orderBy(data_,sortField,dirSort));
    data.current = _.orderBy(data_,sortField,dirSort)
    setdirSort('desc')
    setLoad(false)
    setPageCount(Math.floor(_.orderBy(data_,sortField,dirSort).length/50))
    //setDataCut(_.chunk(_.orderBy(data_,sortField,dirSort),pageSize)[0])
  }


  //сортировка массива по выбранному столбцу 'sortField'
  function sortColum(sortField){
    const dataSort = data.current.concat();

    data.current = _.orderBy(dataSort, sortField, dirSort)
    dirSort==='asc'? setdirSort('desc') : setdirSort('asc')
    setSortField(sortField);
  }
  
  //вывод блока с детальным описанием выбранного обьект 'item'
  function getDetails(item){
    setPerson(item)
    setDataDetailsActive(true)
  }

  function handlePageClick(page){
    setPageSelect(page.selected);
  }
  
  function searchHandler(search){
    setSearch(search);
    setPageSelect(0);
  }

  function getFilterData(){
    if(search===''){
      return data.current
    }
    const dataSearch = data.current.filter(item=>{
      return item['firstName'].toLowerCase().includes(search.toLowerCase())
      || item['lastName'].toLowerCase().includes(search.toLowerCase())
      || item['email'].toLowerCase().includes(search.toLowerCase())
      || item['phone'].toLowerCase().includes(search.toLowerCase())
      || item['id'].toString().toLowerCase().includes(search.toLowerCase())
    });
    //console.log(Math.floor(dataSearch.length/50))
    return dataSearch;
  }

  const filterData = getFilterData();
  const displayData = _.chunk(filterData,pageSize)[pageSelect]

  if(!isModeSelected){
    return (
      <div className="container">
        <ModSelector onSelect={modeSelectHandler}/>
      </div>
    );
  }else{
    return (
      <div className="container">
        {load === true  ? <Loader/>:
        <Fragment>
          <TableSearch onSearch={searchHandler}/>
          <Table 
            data={displayData} 
            sortColum={sortColum} 
            dirSort={dirSort}
            sortField={sortField}
            getDetails={getDetails}/>
        </Fragment>
        }
        {data.current.length>pageSize 
          ? <ReactPaginate
            previousLabel={<span aria-hidden="true">&laquo;</span>}
            nextLabel={<span aria-hidden="true">&raquo;</span>}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            breakLabel={'...'}
            breakClassName={'page-link'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
            forcePage={pageSelect}
          />
          :null}
        {dataDetailsActive ? <DataDetails person={person}/>:null}
      </div>
    );
  }
  
}

export default App;
