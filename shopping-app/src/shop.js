import React from 'react';
import {useState, useEffect, useCallback} from 'react';
import coffee_bag from 'images/coffe_bag.png';






function Shop() {
	const category1 = ['Light', 'Medium','Dark','Flavored'];
	const category2 = ['Ground', 'Whole Bean','Rounds','Ready To Drink'];
	const category3 = ['Chocolate', 'Earthy','Nutty','Smokey'];
	const [filter, setFilter] = useState('coffee');
   const [shop, setShop] = useState(['unchanged']);
    let _data = filter;

    useEffect (() => {
      fetch('http://192.168.254.122:5000/shopping', {
          method: "POST",
          body: JSON.stringify(_data),
          headers: {"Content-type": "application/json; charset=UTF-8",
                    'Access-Control-Allow-Origin':'*'
                    }
      })
      .then(res => res.json())
      .then(data => {setShop(data.items);
      });
    }, [filter]);

    console.log(shop);


	return (
		<div id="store-container">
			<div id="store-header">
				<p>Home / Coffee</p>
			</div>
			<div id="store-banner">
				<p>COFFEE</p>
			</div>
			<br></br>
			<div id="store-split">
				<div id="store-filter">
					<div id="filter-header">
						<p>Filters</p>
					</div>
					<FilterCategory name="Roast Style" category={category1}/>
					<FilterCategory name="Texture" category={category2}/>
					<FilterCategory name="Taste Profile" category={category3}/>
				</div>
				<div id="products">
					<div id="products-header">
						<p>66 items</p>
						<button>sort by</button>
					</div>
					<div id="product-grid">
						{shop.map(item => 
                          <Product tag={item.tag}
                          	name={item.item_name}
                          	roast_style={item.roast_style}
                          	texture={item.texture}
                          	taste={item.taste}
                          	cost={item.cost}/>
                        )}
					</div>
				</div>
			</div>
		</div>
		);
}

function Product(props) {
	return (
		<div className="product">
							<div className="product-header">
								<p>{props.tag}</p>
							</div>
							<img className="product-image" src={coffee_bag}></img>
							<div className="product-details">
								<div className="product-text">
									<p>{props.name}</p>
									<p>{props.roast_style}</p>
									<p>{props.texture}</p>
									<p>{props.taste}</p>
								</div>
								<div className="product-price">
									<p>{props.cost}</p>
								</div>
							</div>
							<button className="product-btn">ADD TO CART</button>
						</div>
		);
}

function FilterCategory(props) {
	return (
		<div className="filter-section">
			<p>{props.name}</p>
			<Filter category={props.category} />	
		</div>
		);
}

function Filter(props) {
	return (
		props.category.map(section => {
				return (<><input className="filter" type="radio" id={section}></input>
				<label for={section}>{section}</label>
				<br></br></>);
			})
		);
}

export default Shop;