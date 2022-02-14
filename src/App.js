import React, { Component } from 'react'
import './assets/style.css'


export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            key : '015c1ccc84774307af5125752220902',
            q : '',
            name : null,
            region : null,
            temp_c : null,
            last_updated : null,
            is_day : null,
            condition : null,
            icon : null,
            feels_like : null,
            humidity : null 

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
                temp_c : data.current.temp_c,
                last_updated : data.current.last_updated,
                is_day : data.current.is_day,
                condition : data.current.condition.text,
                icon : data.current.condition.icon,
                feels_like : data.current.feelslike_c,
                humidity : data.current.humidity
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
          <div className='flex flex-col xl:flex-row w-screen xl:h-screen justify-evenly items-center bg-[#121212] text-zinc-200 mt-2'>
              <div className='mx-5 lg:mx-20'><form>
                  <div className='text-xs mb-2'>Enter a location, postal code, city, or IP Address to get the current weather conditions</div>
                  <input type='text' value={this.state.q} onChange={this.weather} className='w-full lg:w-2/3 text-lg text-white focus:outline-none bg-zinc-800 border-2 lg:border-r-0 border-zinc-600 p-2 px-4 focus:border-zinc-200'/>
                  <button onClick={this.clicked} className='bg-zinc-200 text-zinc-900 py-2.5 px-6 text-xs lg:text-lg hover:bg-blue-700 hover:text-zinc-200'>Fetch</button>
              </form>
              <span className='text-red-600 text-sm py-2 mx-1 block' id='span__error'></span>
              </div>
          
             {
                 this.state.q !== '' && this.state.icon !== null ?

            <div className='text-gray-400 lg:mx-20 mt-4 lg:mt-0'>
                
                <center className='mb-5'>
                    <img src={'https:' + this.state.icon} className='p-1 w-full' alt='weather icon'/>
                    <h1 className='text-5xl text-white'>{this.state.temp_c}°C</h1>
                    <h3 className='text-sm font-light'>{this.state.condition}</h3>
                </center>

              <p className='mt-2'>{this.state.name}, {this.state.region}</p>
              
              <p className='block mt-2 mb-4 font-medium'><span className='bg-zinc-700 text-zinc-300 px-3 py-1 rounded-md font-normal mr-4'>FEELS LIKE</span>{this.state.feels_like}°C</p>
              <p className='block mt-2 mb-4 font-medium'><span className='bg-zinc-700 text-zinc-300 px-3 py-1 rounded-md font-normal mr-4'>TIME OF THE DAY</span>{this.state.is_day === 1 ? 'DAY' : 'DARK'}</p>
              </div>

              :

              <div className='text-white lg:mx-20 mt-4 lg:mt-0'>
                  No data found.
            </div>
             }
    
            <div className='font-normal text-[8px]'>Developed by <a href='https://twitter.com/_realao' target='_blank' rel='noreferrer' className='text-blue-400'>Ayodeji</a></div>

          </div>
          
      </div>
    )
  }
}
