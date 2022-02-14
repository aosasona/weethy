import React, { Component } from 'react';
import logo from '../assets/logo.png'

export default class Nav extends Component {
  render() {
    return (
    <div>
        <div className='flex p-5 px-5 w-screen justify-between items-center'>
        <div className='flex items-center'>
            <img src={logo} className='w-9 h-9 bg-white p-2 rounded-[50%]'/>
            <span class="text-zinc-300 font-normal text-[17px] ml-3"><span className='text-[20px]'>W</span>eethy</span>
            </div>

            <div>
                <a href='https://twitter.com/_realao' target='_blank' rel="noreferrer">
                <i className='fab fa-twitter text-blue-600 bg-blue-200 text-[15px] font-bold p-2 px-[9px] rounded-lg mr-1 hover:bg-blue-600 hover:text-blue-200'></i></a>
            </div>
    </div>
    </div>
    );
  }
}
