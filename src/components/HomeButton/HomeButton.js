import React from 'react'

export default function HomeButton(props){
    return (<button 
                className="btn btn-secondary mt-4"
                onClick={props.goHome}
            >На главную</button>
        );
}