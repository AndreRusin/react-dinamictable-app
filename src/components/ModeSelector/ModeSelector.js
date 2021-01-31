import React from 'react'

export default function ModSelector(props){
    const smallUrl = 'http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';
    const bigUrl = 'http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}';


    return (
        <div className="mt-4">
            <h2 className="text-center mb-4">Выберете размер загружаемых данных!</h2>
            
                <button onClick={()=>props.onSelect(smallUrl)} className="btn btn-primary btn-lg btn-block">32 элемента</button>
                <button onClick={()=>props.onSelect(bigUrl)} className="btn btn-primary btn-lg btn-block">1000 элементов</button>
            
        </div>
    );
}