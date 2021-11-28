//удаляем весь js. Этот файл основной компонент
import React from 'react';
import Info from './components/info'
import Form from './components/Form'
import Weather from './components/Weather'

const API_KEY ='8fbbac47ea18c4d4dd5967f9c14bef36';

class App extends React.Component {

    state = { 
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunset: undefined,
        error: undefined
    }
//state - обьект с данными

    gettingWeather = async (e) => { //async - асинхронный запрос, чтобы сайт не перезагружался при запросе
        e.preventDefault();//для того чтобы страница не перегружалась при нажатии на "узнать погоду". Служит для отслеживания событий. Уничтожаем обычное поведение страницы с перезагрузкой
        var city = e.target.elements.city.value;//константа города.target - объект с которым мы работаем (form). elements - обращаемся ко всем элементам. далее к полю с названием name
        

        if (city){
            const api_url = await //await - из за асинхронного запроса
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`); // `` - шаблон url. fetch позволяет прочитать url запрос
            const data = await api_url.json();//перевод данных в json формат. await - из за асинхронного запроса

            //перевод секунд в нормальное время
            var sunset = data.sys.sunset;//передаем время сек восхода
            var date = new Date();//дата сегодня
            date.setTime(sunset);//что мы хотим отслеживать
            var sunset_date = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();


        this.setState({
            temp: data.main.temp,
            city: data.name,
            country: data.sys.country,
            pressure: data.main.pressure,
            sunset: sunset_date,
            error: undefined
        });
    }
    else{

        this.setState({
            temp: undefined,
            city: undefined,
            country: undefined,
            pressure: undefined,
            sunset: undefined,
            error: 'Введите город'
        });
    }
    }

    render() { /* можно выводить только 1 компонент тег (div)*/
        return(
            <div className="wrapper">
            <div className="main">
            <div className="container">
                <div className="row">
                    <div className="col-sm-5 info">
                        <Info/>                      
                    </div>
                    <div className="col-sm-7 form">
                        <Form  weatherMethod={this.gettingWeather}/> 
                        <Weather
                            temp = {this.state.temp}
                            city = {this.state.city}
                            country = {this.state.country}
                            pressure = {this.state.pressure}
                            sunset = {this.state.sunset}
                            error =  {this.state.error}
                        />   
                    </div>
                </div>
            </div>
            </div>
        </div>
        );
    }
}
//передаем переменную weatherMethod в компонент form со значением this.gettingWeather. this - Обращаемся к этому классу, к методу gettingweather
export default App;