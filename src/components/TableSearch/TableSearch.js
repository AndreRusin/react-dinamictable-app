import React, { useState } from 'react'

export default function TableSearch(props){

    const [value, setValue] = useState('');


    function valueChangeHandler(e){
        setValue(e.target.value)
    }

    return (
        <div className="input-group mb-3 mt-4">
            <input 
                type="text" 
                className="form-control"
                onChange={valueChangeHandler}
                value={value}
            />
            <div className="input-group-append">
                <button 
                    className="btn btn-outline-secondary"
                    onClick={()=>props.onSearch(value)}
                >Найти</button>
            </div>
        </div>
    );
}