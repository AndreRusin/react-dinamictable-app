import React, {useState, Fragment} from 'react'
import Loader from './components/Loader/Loader'
import Table from './components/Table/Table';
import _ from 'lodash'
import DataDetails from './components/DataDetails/DataDetails';
import ModSelector from './components/ModeSelector/ModeSelector';
import ReactPaginate from 'react-paginate';
import TableSearch from './components/TableSearch/TableSearch';
import HomeButton from './components/HomeButton/HomeButton';



function App() {
  const [isModeSelected, setisModeSelected] = useState(false); // режим выбора загрузки данных(32 или 1000 обьектов)
  const [data, setData] = useState([]);
  const [person, setPerson] = useState(); //данные выбраннго человека для блока с детальным описанием 
  const [dataDetailsActive, setDataDetailsActive] = useState(false); //пока false блок с детальным описанием не выводится
  const [load, setLoad] = useState(true); // выводить не выводит индикатор загрузки
  const [dirSort, setdirSort ] = useState('asc'); //desc = сортировка по возрастанию или по убыванию
  const [sortField, setSortField ] = useState('id');//столбец по которому выбрана сортировка
  const [pageSelect, setPageSelect] = useState(0); //номер выбранной страницы в пагинаторе
  const [search, setSearch] = useState('');
  const pageSize = 50; //кол-во эл-ов в таблице на 1 странице пагинатора




  //загрузка данных по выбранной 'url'(32 или 1000 объектов)
  function modeSelectHandler(url){
    setisModeSelected(true)
    fetchData(url)    
  }

  async function fetchData(url){
    try {
      const response = await fetch(url);
      const data_ = await response.json();

      //console.log('load')
      setData(_.orderBy(data_,sortField,dirSort));
      setdirSort('desc')
      setLoad(false)
    } catch (error) {
      setisModeSelected(false)
      alert('Не получается получить данные с сервера!')
    }
  }


  //сортировка массива по выбранному столбцу 'sortField'
  function sortColum(sortField){
    const dataSort = data.concat();

    setData(_.orderBy(dataSort, sortField, dirSort));
    dirSort==='asc'? setdirSort('desc') : setdirSort('asc');
    setSortField(sortField);
  }
  
  //вывод блока под таблицей с детальным описанием выбранного обьект 'item'
  function getDetails(item){
    setPerson(item);
    setDataDetailsActive(true);
  }

  function handlePageClick(page){
    setPageSelect(page.selected);
  }
  
  function searchHandler(search){
    setSearch(search);
    setPageSelect(0);
  }

  function getFilterData(){
    if(!search){
      return data;
    }

    const dataSearch = data.filter(item=>{
      return item['firstName'].toLowerCase().includes(search.toLowerCase())
      || item['lastName'].toLowerCase().includes(search.toLowerCase())
      || item['email'].toLowerCase().includes(search.toLowerCase())
      || item['phone'].toLowerCase().includes(search.toLowerCase())
      || item['id'].toString().toLowerCase().includes(search.toLowerCase())
    });

    return dataSearch;
  }

  //возврат на начальный этап выбора загрузки массива (32 элемента или 1000)
  function goHome(){
    setisModeSelected(false);
    setData([]);
    setLoad(true);
    setdirSort('asc');
    setSortField('id');
    setPageSelect(0);
    setSearch('');
  }

  const filterData = getFilterData();
  const pageCount = Math.ceil(_.orderBy(filterData,sortField,dirSort).length/50);
  const displayData = _.chunk(filterData,pageSize)[pageSelect];


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
          <HomeButton goHome={goHome} />
          <TableSearch onSearch={searchHandler}/>
          <Table 
            data={displayData} 
            sortColum={sortColum} 
            dirSort={dirSort}
            sortField={sortField}
            getDetails={getDetails}/>
        </Fragment>
        }
        {data.length>pageSize 
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
