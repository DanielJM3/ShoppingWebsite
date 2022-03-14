import React from 'react';
import ReactDOM from 'react-dom';
import {useState, useEffect, useCallback} from 'react';
import {BrowserRouter, Route, Routes, Link, Outlet} from 'react-router-dom';
import styles from 'coffee-shop.css';
import $ from 'jquery';

import Shop from 'shop.js';

import owner_pic from 'images/coffee_shop_moc_owners.png';
import coffee_bag from 'images/coffee.png';
import shopping_cart from 'images/shopping-cart-icon.png';
import instagram from 'images/instagram-white.png';
import social1 from 'images/social1.png';
import social2 from 'images/social2.png';
import social3 from 'images/social3.jpg';
import social4 from 'images/social4.jpg';
import social5 from 'images/social5.jpg';
import social6 from 'images/social6.jpg';
import social7 from 'images/social7.jpg';
import social8 from 'images/social8.jpg';
import social9 from 'images/social9.jpg';




function Container() {
  return(
    <div>
      <div className='container'>
          <Navbar />
          <Outlet />
      </div>
    </div>
    );
}

function HomePage() {
  return (
    <div>
      <Jumbotron />
      <Body />
    </div>
    );
}

function Navbar() {
  return (
      <div id="nav-bar">
      <div id="nav-split">
        <div id="logo">Coffee Corner</div>
        <div id="nav-links">
          <Link className="nav-link" to="home">Home</Link>
          <Link className="nav-link" to="shop">Shop</Link>
          <a className="nav-link">About</a>
          <a className="nav-link">Contact</a>
        </div>
        <div id="nav-user">
          <input type="text" placeholder="Search.."></input>
          <img src={shopping_cart}></img>
        </div>
      </div>
      </div>
    );
}

function Jumbotron() {
  return(
    <div id="hero">
      <div id="hero-split">
        <div id="tagline">
          <h1>Roasted Fresh Every Day</h1>
          <p>New holiday roasts available now through January 31st</p>
          <a href='#' className="btn hero-btn">
            <div className="bottom"></div>
            <div className="top">
              <div className="label">Shop Now</div>
              <div className="button-border button-border-left"></div>
              <div className="button-border button-border-top"></div>
              <div className="button-border button-border-right"></div>
              <div className="button-border button-border-bottom"></div>
            </div>
          </a>
        </div>
      </div>
    </div>
    );
}

function Body() {
  return(
    <div>
      <Partners />
      <Seperator />
      <About />
      <Seperator />
      <CoffeeStore />
      <Seperator />
      <SocialMedia />
      <Seperator />
      <Email />
    </div>
    );
}

function Partners() {
  return(
    <div id="partners-container">
      <div className="partner">Nespresso</div>
      <div className="partner">Kurig</div>
      <div className="partner">Sponsor</div>
      <div className="partner">Sponsor</div>
    </div>
    );
}

function About() {
  return(
    <div id="about-container">
      <h2>Our Mission Statement</h2>
      <div id="about-split">
        <div id="owner-img">
          <img src={owner_pic} alt=""/>
        </div>
        <div id="about-text">
          <p>Lorem ipsum dolor sit amet, ex causae urbanitas sea, te ius nibh constituam. Vim cu amet altera, eu vix solet splendide. Diam adhuc laboramus ius cu, choro minimum ut mel. Laoreet nostrum placerat est ei. An duo natum iracundia, nec at magna perpetua partiendo. Consul nullam in mea.</p>
          <p>Lorem ipsum dolor sit amet, ex causae urbanitas sea, te ius nibh constituam. Vim cu amet altera, eu vix solet splendide. Diam adhuc laboramus ius cu, choro minimum ut mel. Laoreet nostrum placerat est ei. An duo natum iracundia, nec at magna perpetua partiendo. Consul nullam in mea.</p>
        </div>
      </div>
    </div>
    );
}



function CoffeeStore() {
  //fetch request for all coffee items in the store
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


    //js for scroll store
    $(document).ready(function(){
      var containerWidth = $("#carousel").width();
      var slideWidth = $(".slide").width();

      $("#slide1").css("margin-left", (containerWidth/2)-(slideWidth/2));
      

      $("#prev").click(function(){
        $("#slide1").promise().done(function() {
          var margin = $("#slide1").css("margin-left").replace('px','');
          $("#slide1").animate({
            marginLeft: parseInt(margin) + parseInt(slideWidth)
          }, 1000);
        });  
      });

      $("#next").click(function(){ 
        $("#slide1").promise().done(function() {
          var margin = $("#slide1").css("margin-left").replace('px','');
            $("#slide1").animate({
              marginLeft: margin - slideWidth
            }, 1000);
          });
      });
    }); 
        
    //js for scoll store end

  


  return(
    <div id="coffee-store-container">
      <div className="side-fade"></div>
      <div id="carousel">
        {shop.map(item => 
            <Slide coffee_bag={coffee_bag}
            name={item.item_name}
              roast_style={item.roast_style}/>
          )}
      </div>
      <button id="prev"> {"<"} </button>
      <button id="next"> {">"} </button>
    </div>
    );
}


function Slide(props) {
  return(
        <div className="slide" id="slide1">
          <img className="slide-top" src={props.coffee_bag}></img>
          <h4>{props.name}</h4>
          <p>{props.roast_style}</p>
          <button>Add to cart</button>
        </div>
    );
}


function SocialMedia() {
  return(
    <div id="social-container">
      <div id="social-split">
        <div id="social-text">
          <h2>Become one of our 1 million followers now!</h2>
          <p>We are the best in coffee and content. Don't just take our word for it though, our 1 million followers seem to agree with us to. So give us a follow @coffeecorner and check out what were up to.</p>
          <button>Follow us now</button>
        </div>
        <div id="social-imgs">
          <div id="social-tag"><img src={instagram}></img><h3>@COFFEECORNER</h3></div>
          <div className="img-collage">
            <SocialImg image={social1} />
            <SocialImg image={social2} />
            <SocialImg image={social3} />
            <SocialImg image={social4} />
            <SocialImg image={social5} />
            <SocialImg image={social6} />
            <SocialImg image={social7} />
            <SocialImg image={social8} />
            <SocialImg image={social9} />
          </div>
        </div>
      </div>
    </div>
    );
}

function SocialImg(props) {
  return (
    <img className="social-img" src={props.image}></img>
    );
} 

function Email() {
  return(
    <div id="email-container">
      <h3>Stay up to date on what is going on.</h3>
      <p>Join the Coffee Corner newsletter for news, extra content, and special offers today!</p>
      <form>
        <input type="text" placeholder="email"></input>
        <button>Submit</button>
      </form>
    </div>
    );
}

function Seperator() {
  return(
    <div className="content-seperator"></div>
    );
}

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Container />}>
        <Route path="home" element={<HomePage />}></Route>
        <Route path="shop" element={<Shop />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
); 