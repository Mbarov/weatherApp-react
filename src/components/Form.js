import React from 'react';

const Form = (props) => (            
    <form onSubmit={props.weatherMethod}>
        <input type="text" name='city' placeholder='Город'/>
        <button>Узнать погоду</button>
    </form>
);
//props - свойство которое передается в компонент  
export default Form;