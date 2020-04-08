function sailorNight() {
  document.getElementById("body-day").id= "body-night";
  document.getElementById("logo").src="assets2/gifOF_logo_dark.png"
  document.getElementById("opening").className = "opening-night"
  document.getElementById("button-navone").className = "nav-buttonnight"
  document.getElementById("button-navtwo").className = "nav-buttonnight"
  document.getElementById("arrow-down").className = "nav-buttonnight"
  document.getElementById("navigation").id = "navigation-night"
  document.getElementById("search-title").className = "intro-searchnight"
  document.getElementById("my-gifs").id = "my-gifs-night"
  let titles=document.querySelectorAll(".gif-title");
  
  titles.forEach(function (element){
    element.style="background-image: linear-gradient(270deg, #EE3EFE 0%, #2E32FB 100%);"
  })
  
  
}  

function sailorDay() {
    document.getElementById("body-night").id= "body-day";
    document.getElementById("logo").src="assets2/gifOF_logo.png"
    document.getElementById("opening").className = "opening"
    document.getElementById("button-navone").className = "nav-button"
    document.getElementById("button-navtwo").className = "nav-button"
    document.getElementById("arrow-down").className = "nav-button"
    document.getElementById("navigation-night").id = "navigation"
    document.getElementById("search-title").className = "intro-search"
    document.getElementById("my-gifs-night").id = "my-gifs"
  
    let titles=document.querySelectorAll(".gif-title");
  
    titles.forEach(function (element){
      element.style="background-image: linear-gradient(270deg, #F7C9F3 0%, #4180F6 100%);"
    })
     

  }
  document.getElementById("submit").addEventListener("click", function (){
    document.querySelector(".search-related").style.display="none"
    })

document.getElementById("my-gifs").addEventListener("click", function (){
      document.querySelector(".search-block").style.display="none"
      window.location.href = "video.html#gif"
      })
//Ventana desplegable en la barra de busqueda de gif y configuracion del boton 
function checkFilled(){
  var interests = document.getElementById("search-input")
    {
      if (interests.value == '')  {
        document.forms[0].search.id = 'submit';
        document.getElementById("lupa").src="assets2/lupa_inactive.svg"
        document.querySelector(".search-related").style.display="none"
      } else {
        document.forms[0].search.id = 'submit-search';
        document.getElementById("lupa").src="assets2/lupa.svg"
        document.querySelector(".search-related").style.display="block"
        
      }   
  }

}


document.getElementById("submit").addEventListener("click", function (){
  document.querySelector(".suggested").style.display="none"
  document.getElementById("title-two").innerHTML= searchInput.value
  })

//fetch de busqueda del gif solicitado   
const searchForm=document.getElementById("search-form")
const searchInput=document.getElementById("search-input")
const resultsEl= document.getElementById("results")

searchForm.addEventListener('submit', function(e) {
    e.preventDefault()
    const q=searchInput.value
    search(q)
    
})
function search(q) {
  const apiKey= 'DldA7AFF61YOOcRPwEu3baEYLRa27mD9'
  const limit= 24
  const path= `https://api.giphy.com/v1/gifs/search?&q=${q}&api_key=${apikey}&limit=${limit}`

  var url = new URL('https://api.giphy.com/v1/gifs/search')
  var queryParams = {q, api_key: apiKey, limit} 
  url.search = new URLSearchParams(queryParams).toString();
  
  fetch(url, {method: 'POST'})

fetch(path).then(function(res) {
  return res.json()
}).then(function(json) {
  console.log(json.data[0].images.fixed_height.url)

  
  let resultsHTML= " "
  json.data .forEach(function(obj){
    console.log (obj.images.fixed_height.url)
    const url= obj.images.fixed_height.url
    const height=obj.images.fixed_height.height
    resultsHTML += `<img 
    src="${url}" 
    width="${height}"
    class="item"
    >`
  })

  resultsEl.innerHTML= resultsHTML
}).catch(function(err) {
  console.log(err.message)
})
}

// gifs de tendencia que aparece en "tendencia" al iniciar la pagina 
const apikey= 'DldA7AFF61YOOcRPwEu3baEYLRa27mD9'
const limit= 20
const pathtwo= `https://api.giphy.com/v1/gifs/trending?api_key=${apikey}&limit=${limit}`

fetch(pathtwo).then(function(res) {
  return res.json()
}).then(function(json) {
  console.log(json.data[0].images.fixed_height.url)
  
 
  let resultsHTMLtrend= " "
  json.data .forEach(function(obj){
    console.log (obj.images.fixed_height.url)
    const url= obj.images.fixed_height.url
    const height=obj.images.fixed_height.height
    const title= obj.title

    resultsHTMLtrend += 
    
    `<img 
    src="${url}" 
    width="${height}"
    class="item"
    >`
  })
 
resultsEl.innerHTML= resultsHTMLtrend
}).catch(function(err) {
  console.log(err.message)
})

//conjunto de gifs sugeridos que aparece en el primer apartado de la pagina principal
introSearch();

function introSearch() {
  const qsearch = "memes";
  const apikey = 'DldA7AFF61YOOcRPwEu3baEYLRa27mD9';
  const limitsearch = 4;
  const pathtwo = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&limit=${limitsearch}&q=${qsearch}`;
  
  fetch(pathtwo).then(function (res) {
    return res.json();
  }).then(function (json) {
    console.log(json.data[0].images.fixed_height.url);
    const results = document.getElementById("results-trend");
   
    let resultsHTMLsearch = " ";
    json.data.forEach(function (obj) {
      console.log(obj.images.fixed_height.url);
      const url = obj.images.fixed_height.url;
      const height = obj.images.fixed_height.height;
      const title= obj.title
      resultsHTMLsearch += 

      `<div class=gif-list>
      <div class="gif-title" id="headings">
      <p id="title-gif">#${title}</p>
      <img src="assets2/close.svg" alt="close">
      </div>
      <div>
      <img src="${url}"  width="${height}" title="${title}" class="item">
      </div>
      </div>`;
    });
    results.innerHTML = resultsHTMLsearch;
    
    
  }).catch(function (err) {
    console.log(err.message);
  });

}

document.getElementById("button-more1").addEventListener("click", function(){
 
  introSearch();

  function introSearch() {
    const qsearch = "shiba";
    const apikey = 'DldA7AFF61YOOcRPwEu3baEYLRa27mD9';
    const limitsearch = 20;
    const pathtwo = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&limit=${limitsearch}&q=${qsearch}`;
    
    fetch(pathtwo).then(function (res) {
      return res.json();
    }).then(function (json) {
      console.log(json.data[0].images.fixed_height.url);
      const results = document.getElementById("results");
     
      let resultsHTMLsearch = " ";
      json.data.forEach(function (obj) {
        console.log(obj.images.fixed_height.url);
        const url = obj.images.fixed_height.url;
        const height = obj.images.fixed_height.height;
        const title= obj.title
        resultsHTMLsearch += 
  
        `<div class=gif-list>
        <div class="gif-title" id="headings">
        <p id="title-gif">#${title}</p>
        <img src="assets2/close.svg" alt="close">
        </div>
        <div>
        <img src="${url}"  width="${height}" title="${title}" class="item">
        </div>
        </div>`;
      });
    
      results.innerHTML = resultsHTMLsearch;
    }).catch(function (err) {
      console.log(err.message);
    });
  }

})
document.getElementById("button-more2").addEventListener("click", function(){
 
  introSearch();

  function introSearch() {
    const qsearch = "simpsons";
    const apikey = 'DldA7AFF61YOOcRPwEu3baEYLRa27mD9';
    const limitsearch = 20;
    const pathtwo = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&limit=${limitsearch}&q=${qsearch}`;
    
    fetch(pathtwo).then(function (res) {
      return res.json();
    }).then(function (json) {
      console.log(json.data[0].images.fixed_height.url);
      const results = document.getElementById("results");
     
      let resultsHTMLsearch = " ";
      json.data.forEach(function (obj) {
        console.log(obj.images.fixed_height.url);
        const url = obj.images.fixed_height.url;
        const height = obj.images.fixed_height.height;
        const title= obj.title
        resultsHTMLsearch += 
  
        `<div class=gif-list>
        <div class="gif-title" id="headings">
        <p id="title-gif">#${title}</p>
        <img src="assets2/close.svg" alt="close">
        </div>
        <div>
        <img src="${url}"  width="${height}" title="${title}" class="item">
        </div>
        </div>`;
      });
    
      results.innerHTML = resultsHTMLsearch;
    }).catch(function (err) {
      console.log(err.message);
    });
  }

})

document.getElementById("button-more3").addEventListener("click", function(){
 
  introSearch();

  function introSearch() {
    const qsearch = "lion king";
    const apikey = 'DldA7AFF61YOOcRPwEu3baEYLRa27mD9';
    const limitsearch = 20;
    const pathtwo = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&limit=${limitsearch}&q=${qsearch}`;
    
    fetch(pathtwo).then(function (res) {
      return res.json();
    }).then(function (json) {
      console.log(json.data[0].images.fixed_height.url);
      const results = document.getElementById("results");
     
      let resultsHTMLsearch = " ";
      json.data.forEach(function (obj) {
        console.log(obj.images.fixed_height.url);
        const url = obj.images.fixed_height.url;
        const height = obj.images.fixed_height.height;
        const title= obj.title
        resultsHTMLsearch += 
  
        `<div class=gif-list>
        <div class="gif-title" id="headings">
        <p id="title-gif">#${title}</p>
        <img src="assets2/close.svg" alt="close">
        </div>
        <div>
        <img src="${url}"  width="${height}" title="${title}" class="item">
        </div>
        </div>`;
      });
    
      results.innerHTML = resultsHTMLsearch;
    }).catch(function (err) {
      console.log(err.message);
    });
  }

})
document.getElementById("button-more4").addEventListener("click", function(){
 
  introSearch();

  function introSearch() {
    const qsearch = "shiba reaction";
    const apikey = 'DldA7AFF61YOOcRPwEu3baEYLRa27mD9';
    const limitsearch = 20;
    const pathtwo = `https://api.giphy.com/v1/gifs/search?api_key=${apikey}&limit=${limitsearch}&q=${qsearch}`;
    
    fetch(pathtwo).then(function (res) {
      return res.json();
    }).then(function (json) {
      console.log(json.data[0].images.fixed_height.url);
      const results = document.getElementById("results");
     
      let resultsHTMLsearch = " ";
      json.data.forEach(function (obj) {
        console.log(obj.images.fixed_height.url);
        const url = obj.images.fixed_height.url;
        const height = obj.images.fixed_height.height;
        const title= obj.title
        resultsHTMLsearch += 
  
        `<div class=gif-list>
        <div class="gif-title" id="headings">
        <p id="title-gif">#${title}</p>
        <img src="assets2/close.svg" alt="close">
        </div>
        <div>
        <img src="${url}"  width="${height}" title="${title}" class="item">
        </div>
        </div>`;
      });
    
      results.innerHTML = resultsHTMLsearch;
    }).catch(function (err) {
      console.log(err.message);
    });
  }

})