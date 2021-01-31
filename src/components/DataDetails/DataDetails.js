import React from 'react'

export default function DataDetails(props){
    return (
        
        <div className="card mb-4">
            <div className="card-body">
                Выбран пользователь <b>{props.person.firstName+' '+props.person.lastName}</b><br/>
                Описание:<br/>
                <textarea className="form-control" value={props.person.description} readOnly></textarea>
                <br/>Адрес проживания: <b>{props.person.address.streetAddress}</b>
                <br/>Город: <b>{props.person.address.city}</b>
                <br/>Провинция/штат: <b>{props.person.address.state}</b>
                <br/>Индекс: <b>{props.person.address.zip}</b>
            </div>
        </div>
    )
}