function PostTest() {
  const [value, setvalue] = useState('unchanged');

  useEffect (() => {
    let payload = {
    id: 10
  };

  let data = new FormData();
  data.append( "json", JSON.stringify( payload ) );

  fetch("http://192.168.1.100:5000/shopping_cart",
  {
      method: "POST",
      headers: new Headers({'content-type': 'application/json'}),
      body: data
  })
  .then(res => res.json())
  .then(data => {setvalue(data.test_test);
       });
    }, []);

  return (
      <p>did it change? {value} </p>
  );
}

function Test() {
  const [testTest, setTestText] = useState('unchanged');

  useEffect (() => {
    fetch('http://192.168.1.100:5000/test ')
    .then(res => res.json())
    .then(data => {setTestText(data.test_test);
    });
  }, []);

  return (
      <p>did it change? {testTest} </p>
  );
}