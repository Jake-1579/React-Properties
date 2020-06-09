import React from 'react';
import axios from 'axios';
import Properties from './Properties';

class Scraper extends React.Component{

    state = { data: [] };

    componentDidMount() {
        this.scrapePage();
    }

    scrapePage = () => {
        const self = this;
        axios.get('https://cors-anywhere.herokuapp.com/https://www.rightmove.co.uk/api/_search?locationIdentifier=USERDEFINEDAREA%5E%7B%22polylines%22%3A%22%7BwafI%60vzNisBlhCciAwxBx%7BAoxFaKyp%40kf%40uiDjZeeDxe%40A%7Cj%40se%40t%60%40rcAhNnTjSrV%60YzZSrVT%7Ci%40py%40t%7CCq%60AuXub%40~iArcBql%40%60jBtpI%7B%7CDtvAu%5EyfC%22%7D&minBedrooms=2&maxPrice=180000&minPrice=100000&numberOfPropertiesPerPage=72&radius=0.0&sortType=0&index=0&propertyTypes=terraced%2Csemi-detached&viewType=LIST&mustHave=garden&channel=BUY&areaSizeUnit=sqft&currencyCode=GBP&isFetching=false')
            .then(response => {
                const properties = response.data.properties;
                properties.forEach((i) => {
                    const {summary, displayAddress, price, propertyImages, propertyTypeFullDescription, formattedBranchName, id, propertyUrl} = i;
                    self.setState(prevState => ({
                        data: [{
                            summary,
                            displayAddress,
                            price: price.amount,
                            propertyTypeFullDescription,
                            formattedBranchName,
                            propertyImages: propertyImages.mainImageSrc,
                            id,
                            propertyUrl
                        }, ...prevState.data]
                    }))
                });

            })
    }

    render() {
        return(
            <div>

               <Properties feed={this.state.data} />
            </div>
        )
    }

}

export default Scraper;