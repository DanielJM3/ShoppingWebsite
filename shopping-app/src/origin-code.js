import React from 'react';
import ReactDOM from 'react-dom';
import {useState, useEffect, useCallback} from 'react';
import styles from './shopping_cart.css';
import owner_pic from './images/coffee_shop_moc_owners.png';
import coffee_temp from './images/coffee.png';
import $ from 'jquery';


$(document).ready(function(){
    document.getElementById('center').scrollIntoView({ inline: 'center' });
});

function Container(props) {
   const [display, setDisplay] = useState(0);
   const [isLogin, setLogin] = useState(false);
   const [displayLogin, setDisplayLogin] = useState(true);
   
   useEffect (() => {
    fetch('http://192.168.1.100:5000/isLogin ')
    .then(res => res.json())
    .then(data => {setLogin(data.payload);
    });
    }, []);




    if (display === 0) {
      return (
      <div className='container'>
          <Navbar />,
          <Jumbotron setDisplay={setDisplay}/>,
          <HomePageBody />
      </div>
      );
    }
    if (display === 1) {
      return (
          <div className='container'>
            <Page2 
              isLogin={isLogin}
              setLogin={setLogin}
              setDisplayLogin={setDisplayLogin}
            />
            <Login 
              setLogin={setLogin}
              isLogin={isLogin}
              setDisplayLogin={setDisplayLogin}
              displayLogin={displayLogin}
              />
          </div>
        );
    }
}

function Login(props) {

  const closeDisplay = () => props.setDisplayLogin(false)

  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  })

  const handleChange = (e) => {
    const value = e.target.value;
    setCredentials({
      ...credentials,
      [e.target.name]: value
    })
  }

   const fetchLogin = () => {
    fetch('http://192.168.1.100:5000/login', {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {"Content-type": "application/json; charset=UTF-8",
                      'Access-Control-Allow-Origin':'*'
                      }
        }).then(res => res.json())
          .then(data => {props.setLogin(data.login);
    });}
  
  if (props.displayLogin === true && props.isLogin === false) {
    return (
    <div className="login-container">
      <h2>Login Here</h2>
      <button onClick={() => closeDisplay()}>close</button>
      <form onSubmit={() => fetchLogin()}>
        <label>
        UserName:
          <input type="text" name="username" value={credentials.username} onChange={handleChange}/>
        </label>
        <label>
          Password:
            <input type="text" name="password" value={credentials.password} onChange={handleChange}/>
        </label>
        <input type="submit" value="Submit"/>
      </form>
    </div>
    );
  }
  else {
    return (
        <div></div>
      );
  }
  
}

function Navbar() {
  return (
    <div className="row navbar">
    <div className="column logo">Coffee Corner</div>
    <div className="column header-nav">
      <ul className="header-list">
        <li className="header-item">Shop</li>
        <li className="header-item">News</li>
        <li className="header-item">About Us</li>
        <li className="header-item">Contact</li>
      </ul>
    </div>
  </div>
    );
}

function Jumbotron(props) {
  const onClick = () => props.setDisplay(1)
  return (
      <div className="jumbotron">
    <div className="tagline">
      <h2>Roasted Fresh Every Day</h2>
      <p>New holiday roasts available now through January 31st</p>
      <a href="#" className="button nav-link" onClick={onClick}>
      <div className="bottom"></div>
      <div className="top">
        <div className="label">Shop Now</div>
        <div className="button-border button-border-left"></div>
        <div className="button-border button-border-top"></div>
        <div className="button-border button-border-right"></div>
        <div className="button-border button-border-bottom"></div>
      </div>
      </a> </div>
  </div>
    );
}



function OurPartners () {
  return (
      <div className="our-partners">
      <h2>Proud Partners of Coffee Corner</h2>
      <div className="partners">
        <div className="partner"> <img src="./images/nespresso.png" width="75" height="auto" alt=""/><p>Nespresso</p> </div>
        <div className="partner"> <img src="./images/nespresso.png" width="75" height="auto" alt=""/><p>Nespresso</p> </div>
        <div className="partner"> <img src="./images/nespresso.png" width="75" height="auto" alt=""/><p>Nespresso</p> </div>
        <div className="partner"> <img src="./images/nespresso.png" width="75" height="auto" alt=""/><p>Nespresso</p> </div>
      </div>
    </div>
    );
}

function HomePageAbout () {
  return (
      <div className="home-page-about">
    <h2>Our Mission Statement</h2>
    <div className="row">
      <div className="column home-about-image"> <img src={owner_pic} width="45%" height="auto" alt=""/> </div>
      <div className="column home-about-text">
        <p>&emsp;&emsp;Lorem ipsum dolor sit amet, ex causae urbanitas sea, te ius nibh constituam. Vim cu amet altera, eu vix solet splendide. Diam adhuc laboramus ius cu, choro minimum ut mel. Laoreet nostrum placerat est ei. An duo natum iracundia, nec at magna perpetua partiendo. Consul nullam in mea.</p>
        <p>&emsp;&emsp;Debet similique mea cu, ad putant theophrastus signiferumque quo. Mei at utamur facilisi suavitate, cetero concludaturque ut mel. Exerci populo eam cu. Vel no falli rationibus, probatus deterruisset vis ne. Et mel purto elit iudico. Esse alienum ex nec, vitae facete ut sea, intellegebat consequuntur te sea. Est ex vocent adipiscing, eam an ludus elaboraret.</p>
      </div>
    </div>
  </div>
    );
}



function CoffeeScrollbar () {
  const [coffee, setCoffee] = useState([]);

  useEffect (() => {
    fetch('http://192.168.1.100:5000/coffee ')
    .then(res => res.json())
    .then(data => {setCoffee(data.coffee_list);
    });
  }, []);
  console.log(coffee);


  return(
      <div className="coffee-scrollbar">
    <h2>Our coffees</h2>
        <div className="fade-container">
      <div className="scrollbar-overlay-left"></div>
      <div className="scrollbar-overlay-right"></div>
          <div className="scrollbar">
            <div className="coffee-display row">
              <div className="coffee left-end"></div>
                  {coffee.map(item => (
                    <div className="coffee" id={item.id}><img src={item.image} width="auto" height="250"></img><h4>{item.name}{item.flavor}</h4></div>
                    ))}
                  <div className="coffee" id="center"><img src={coffee_temp} width="auto" height="250"></img><h4>Coffee flavor</h4></div>
              <div className="coffee right-end"></div>
            </div>
            </div>
        </div>
        </div>
    );
}

function SocialMedia () {
  return (
      <div className="social-media">
      <div className="row">
    <div className="column social-media-text">
        <h3>Become one of our 1 million followers now</h3>
      <p>We are the best in coffee and content. Don't just take our word for it though, our 1 million followers seem to agree with us to. So give us a follow @coffeecorner and check out what were up to.</p>
      <button>Follow us now</button>
      </div>
      <div className="column social-media-images">
        <div className="social-tag">@COFFEECORNER</div>
        <div className="image-collage">
          <div className="row image-row"></div>
          <div className="row image-row"></div>
          <div className="row image-row"></div>
        </div>
      </div>
  </div>
    </div>
    );
}

function EmailContainer () {
  return (
      <div className="email-container">
      <h3>Stay up to date on whats going on</h3>
      <p>Join the Coffee Corner newsletter for news, extra content, and special offers</p>
      <form>
        <input></input>
        <button>Submit</button>
      </form>
    </div>
    );
}

function HomePageBody () {
  return (
      <div className="home-page-body">
        <OurPartners />
        <hr></hr>
        <HomePageAbout />
        <hr></hr>
        <CoffeeScrollbar />
        <hr></hr>
        <SocialMedia />
        <hr></hr>
        <EmailContainer />
      </div>
    );
}

//page 2 functions 

function Navbar2(props) {

  const [items, setItems] = useState('0')

  useEffect (() => {
      fetch('http://192.168.1.100:5000/shopping_cart_icon', {})
      .then(res => res.json())
      .then(data => {setItems(data.cart_amount);
      });
    }, [props.isLogin]);


  return (
      <div className="row navbar">
  <div className="column logo">Coffee Corner</div>
    <div className="column header-nav">
      <ul className="header-list">
        <li className="header-item">Shop</li>
        <li className="header-item">News</li>
        <li className="header-item">About Us</li>
        <li className="header-item">Contact</li>
      </ul>
    </div>
  <div className="column shopping-cart">
    <ul>
      <li><img src="images/AdobeStock_313779888.jpeg" width="50" height="auto" alt=""/></li>
    <li><p>{items}</p></li></ul>
    </div>
  </div>
    );
}

function Sidebar2 (props) {

  
  const changeFilter = (filter) => {props.setFilter(filter)}
  

  return(
      <div className="column sidebar">
      <ul className="sidebar-nav">
      <li className="sidebar-nav-item"><button onClick={() => changeFilter('specials')}>Specials</button></li>
      <li className="sidebar-nav-item"><button onClick={() => changeFilter('coffee')}>Coffee</button></li>
      <li className="sidebar-nav-item"><button onClick={() => changeFilter('apparel')}>Apparel</button></li>
      <li className="sidebar-nav-item">Mugs & Tumblers</li>
      <li className="sidebar-nav-item">Clearance</li>
      <li className="sidebar-nav-item">Gifts</li>
    </ul>
    </div>
    );
}

function Display2 (props) {
    
  const addItemToCart = (item_id) => {
            if (props.isLogin === true) {
              fetch('http://192.168.1.100:5000/add_item_to_cart', {
              method: "POST",
              body: JSON.stringify(item_id),
              headers: {"Content-type": "application/json; charset=UTF-8",
                        'Access-Control-Allow-Origin':'*'
                        }
              })
            }
            else {
              props.setDisplayLogin(true)
            }
          }

  return(

      <div className="column display">
      <div className="row vertical-scroll">
                        <div className="row">
                        {props.shop.map(item => 
                          <div className="item column">
                            <h2 className="item-title">{item.item_name}</h2>
                            <h3>{item.bean_style}{item.clothing_style}</h3>
                            <h3>{item.roast_color}{item.color}</h3>
                            <h4 className="item-color">${item.cost}</h4>
                            <button onClick={() => addItemToCart(item.id)}>Add To Cart</button>
                          </div>
                        )}
                        
          </div>
        </div>
    </div>
    );

}

function MainContent2 (props) {
  const [filter, setFilter] = useState('coffee');
   const [shop, setShop] = useState(['unchanged']);
    let _data = filter;

    useEffect (() => {
      fetch('http://192.168.1.100:5000/shopping', {
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

  
  return (
      <div className="row main-content">
        <Sidebar2 setFilter={setFilter}/>
        <Display2 
          shop={shop}
          isLogin={props.isLogin}
          setLogin={props.setLogin}
          setDisplayLogin={props.setDisplayLogin}
        />
        
  </div>
    );
}

function Page2(props) {
  return (
    <div> 
      <Navbar2 
        isLogin={props.isLogin}
        setLogin={props.setLogin}
      />
      <MainContent2 
        isLogin={props.isLogin}
        setLogin={props.setLogin}
        setDisplayLogin={props.setDisplayLogin}
      />

    </div>
     
    );
}