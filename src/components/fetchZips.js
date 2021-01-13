import React from 'react'
import './fetch.css';

function FetchZips(props){
    return(
        <div>
            <form>
                <h1 id = "fetching" className = "fetching">ZipCode Search</h1>
                <p id = "zipValidity"></p>
                <input className = "fetching" id = "zip" name = "zipCode" type = "text" placeholder = "00000" onChange = {props.handleZipChange}></input>
            </form>
            <br></br>
            <form>
                <h1 id = "fetching" className = "fetching">City Search</h1>
                <p id = "cityValidity"></p>
                <input className = "fetching" id = "city" name = "zipCode" type = "text" placeholder = "Staten Island" onChange = {props.handleCityChange}></input>
            </form>
        </div>
    )
}

export default FetchZips;