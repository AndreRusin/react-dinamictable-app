import React from 'react'
import './Table.css'

export default function Table(props){
    return(
        <table className="table table-dark table-striped mt-4">
            <thead>
                <tr>
                    <th onClick={()=>props.sortColum('id')}>
                        ID {props.sortField ==='id'?
                            props.dirSort === 'asc' ? <span>&#9660;</span>:<span>&#9650;</span>
                            :null}
                    </th>
                    <th onClick={()=>props.sortColum('firstName')}>
                        First Name {props.sortField ==='firstName'?
                            props.dirSort === 'asc' ? <span>&#9660;</span>:<span>&#9650;</span>
                            :null}
                    </th>
                    <th onClick={()=>props.sortColum('lastName')}>
                        Last Name {props.sortField ==='lastName'?
                            props.dirSort === 'asc' ? <span>&#9660;</span>:<span>&#9650;</span>
                            :null}
                    </th>
                    <th onClick={()=>props.sortColum('email')}>
                        Email {props.sortField ==='email'?
                            props.dirSort === 'asc' ? <span>&#9660;</span>:<span>&#9650;</span>
                            :null}
                    </th>
                    <th onClick={()=>props.sortColum('phone')}>
                        Phone {props.sortField ==='phone'?
                            props.dirSort === 'asc' ? <span>&#9660;</span>:<span>&#9650;</span>
                            :null}
                    </th>
                </tr>
            </thead>
            <tbody>
                {!(typeof props.data==='undefined')?
                    (props.data.map(item =>(
                        <tr key={item.id+item.phone} onClick={()=>props.getDetails(item)}>
                            <th>{item.id}</th>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.email}</td>
                            <td>{item.phone}</td>
                        </tr>
                    )))
                : <tr>
                    <th colSpan="5" style={{ textAlign: 'center'}}>Ничего не найдено</th>
                </tr>   
                }
            </tbody>
        </table>
    )
} 

