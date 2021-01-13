import React, {Component} from 'react'
import FetchZips from './fetchZips'

class FetchZipsResult extends Component{
    constructor(){
        super();
        this.state = {
            place: [],
            zipCode: "",
            error: false,
            zips: []
        }
    }
    async componentDidMount() {
        document.getElementById("zipValidity").innerHTML = "Find Cities within an entered ZipCode: ";
        document.getElementById("cityValidity").innerHTML = "Find Zipcodes within an entered City: ";
    }

    allZipCodes = async (zipCode) => {
        try{
            const link = "https://ctp-zip-api.herokuapp.com/zip/" + zipCode;
            const result = await fetch(link);
            console.log(result);
            if(result.status !== 200){
                throw new Error("Entered ZipCode is not valid.");
            }
            const res = await result.json();
            this.setState({
                place: res,
                error: false
            })
            document.getElementById("zipValidity").innerHTML = "Entered ZipCode is valid.";
            console.log(res);
        }
        catch(error){
            console.log(error);
            this.setState({error: true})
        document.getElementById("zipValidity").innerHTML = "You entered an invalid ZipCode.";
        }
    } 

    handleZipChange = (entry) => {
        let n = entry.target.name;
        let v = entry.target.value; 
        this.setState({ [n]: v }) 
        this.allZipCodes(v);
    }

    allCities = async (city) => {
        try {
            const link = 'https://ctp-zip-api.herokuapp.com/city/' + city;
            const result = await fetch(link);
            console.log(result);
            if(result.status !== 200){
                throw new Error("Entered City is not valid.");
            }
            const res = await result.json();
            this.setState({
                zips: res,
                error: false
            })
            document.getElementById("cityValidity").innerHTML = "Entered City is valid.";
            console.log(res);
        }
        catch(error){
            console.log(error);
            this.setState({error: true})
        document.getElementById("cityValidity").innerHTML = "You entered an invalid City.";
        }
    }

    upperCaser = (sentence) => {
        let upperCased = sentence.toUpperCase();
        return upperCased;
    } 

    commaConverter(coms) {
        coms.toLocaleString();
    }

    handleCityChange = (entry) => {
        let n = entry.target.name;
        let v = entry.target.value;
        this.setState({
            [n]: v
        })
        v = this.upperCaser(v);
        this.allCities(v);
    }

    render(){
        return(
            <div>
                <FetchZips handleZipChange = {this.handleZipChange} 
                handleCityChange = {this.handleCityChange}/>
                {
                    (<div className = "fetching">
                        <br></br>
                        <b>ZipCode Search</b>
                        {this.state.place.map((item, index) =>
                            <div className = "zipCodeInfo" key = {index}>
                                <br></br>
                                City: {item.City} <br></br>
                                State: {item.State} <br></br>
                                Country: {item.Country}<br></br> 
                                Population (Estimated): {item.EstimatedPopulation}<br></br>
                                Total Wages: ${item.TotalWages + '.00'}<br></br><br></br>
                            </div>
                        )}
                        <div>
                        <br></br><br></br>
                        <b>City Search</b><br></br><br></br>
                        {this.state.zips.map((item, index) => 
                            <div class = "zipList" key = {index}>{item}</div>
                        )}
                        </div>
                    </div>
                    )
                }
            </div>
        )
    }
}

export default FetchZipsResult;