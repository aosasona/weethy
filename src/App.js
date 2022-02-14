import React, { Component } from 'react'
import './assets/style.css'
import Nav from './components/nav'


export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            key : '015c1ccc84774307af5125752220902',
            q : '',
            name : null,
            region : null,
            country : null,
            temp_c : null,
            last_updated : null,
            is_day : null,
            condition : null,
            icon : null,
            feels_like : null,
            humidity : null,
            cloud : null,
            wind_mph : null,
            wind_dir : null,
            precip_mm : null

        }
        this.weather = this.weather.bind(this)
        this.clicked = this.clicked.bind(this)
    }

    weather(e) {
        this.setState({ q : e.target.value })
    }
    clicked(a) {
        a.preventDefault()
        fetch(`http://api.weatherapi.com/v1/current.json?key=${this.state.key}&q=${this.state.q}`)
        .then(res => res.json())
        .then(data => {
            this.setState({
                name : data.location.name,
                region : data.location.region,
                country : data.location.country,
                temp_c : data.current.temp_c,
                last_updated : data.current.last_updated,
                is_day : data.current.is_day,
                condition : data.current.condition.text,
                icon : data.current.condition.icon,
                feels_like : data.current.feelslike_c,
                humidity : data.current.humidity, 
                cloud : data.current.cloud,
                wind_mph : data.current.wind_mph,
                wind_dir : data.current.wind_dir,
                precip_mm : data.current.precip_mm
            })
        })
        .catch(() => {
            const error = document.getElementById('span__error');
            error.innerText = 'No data found, please check your input and try again!'

            setTimeout(() => {
                error.innerText = ''
            }

            ,2800)
        })
    }

  render() {
    return (
      <div>
          <Nav />
          <div className='flex flex-col xl:flex-row w-screen xl:h-[90vh] justify-evenly items-center bg-[#121212] text-zinc-200 mt-2'>
              <div className='mx-5 lg:mx-20'><form>
                  <div className='text-xs mb-2'>Enter a location, postal code, city, or IP Address to get the current weather conditions</div>
                  <input type='text' value={this.state.q} onChange={this.weather} className='w-full lg:w-2/3 text-lg text-white focus:outline-none bg-zinc-800 border-2 lg:border-r-0 border-zinc-600 p-2 px-4 focus:border-zinc-200'/>

                  <button onClick={this.clicked} className='mt-2 lg:mt-0 bg-zinc-200 text-zinc-900 py-2.5 px-6 text-xs lg:text-lg hover:bg-blue-600 hover:text-zinc-200'>Fetch</button>
              </form>
              <span className='text-red-600 text-sm py-2 mx-1 block' id='span__error'></span>
              </div>
          
             {
                 this.state.q !== '' && this.state.icon !== null ?

            <div className='text-gray-400 lg:mx-20 mt-4 lg:mt-0 overflow-y-scroll'>
                
                <center className='mb-5'>
                    <img src={'https:' + this.state.icon} className='p-1 w-2/3' alt='weather icon'/>
                    <h1 className='text-5xl text-orange-100'>{this.state.temp_c}°C</h1>
                    <h3 className='text-sm font-light'>{this.state.condition}</h3>
                    <p className='mt-1 mb-4'>{this.state.name}, {this.state.region}, {this.state.country}</p>
                </center>

              
              
              <p className='block mt-2 mb-4 font-medium'><span className='bg-zinc-700 text-zinc-300 px-3 py-1 rounded-md font-normal mr-4'>FEELS LIKE</span>{this.state.feels_like}°C</p>
              <p className='block mt-2 mb-4 font-medium'><span className='bg-zinc-700 text-zinc-300 px-3 py-1 rounded-md font-normal mr-4'>TIME OF THE DAY</span>{this.state.is_day === 1 ? 'DAY' : 'EVENING/NIGHT'}</p>
              <p className='block mt-2 mb-4 font-medium'><span className='bg-zinc-700 text-zinc-300 px-3 py-1 rounded-md font-normal mr-4'>HUMIDITY</span>{this.state.humidity}%</p>
              <p className='block mt-2 mb-4 font-medium'><span className='bg-zinc-700 text-zinc-300 px-3 py-1 rounded-md font-normal mr-4'>CLOUD</span>{this.state.cloud}%</p>
              <p className='block mt-2 mb-4 font-medium'><span className='bg-zinc-700 text-zinc-300 px-3 py-1 rounded-md font-normal mr-4'>WIND SPEED & DIRECTION</span>{this.state.wind_mph}mph, {this.state.wind_dir}</p>
              <p className='block mt-2 mb-4 font-medium'><span className='bg-zinc-700 text-zinc-300 px-3 py-1 rounded-md font-normal mr-4'>PRECIPITATION</span>{this.state.precip_mm}mm</p>
              <p className='block mt-2 mb-4 font-medium'><span className='bg-zinc-700 text-zinc-300 px-3 py-1 rounded-md font-normal mr-4'>LAST UPDATED</span>{this.state.last_updated}</p>
              </div>

              :

              <div className='text-red-600 lg:mx-20 mt-4 lg:mt-0'>
                  No data to display.
            </div>
             }
    
            <div>
            <div className='font-normal text-[10px] mt-8'>Developed by <a href='https://twitter.com/_realao' target='_blank' rel='noreferrer' className='text-blue-400'>Ayodeji</a></div>
            <div className='font-normal text-[10px] mt-1'>Data is sourced from <a href='https://www.weatherapi.com/' target='_blank' rel='noreferrer' className='text-blue-400'>WeatherAPI</a></div>
          </div>
          
          </div>
          
      </div>
    )
  }
}
