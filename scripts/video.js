document.querySelector(".container_upload_gif").style.display="none"
document.querySelector(".block-success").style.display="none"
document.querySelector(".block-video").style.display="none"

if (window.location.href.includes("#gif")){
document.querySelector(".search-block").style.display="none"    
}

function changeButton(){
    document.getElementById('name-button').innerHTML = "Listo"
    document.getElementById('img-logo').src= "assets2/recording.svg"
    document.getElementById('button-navtwo').style= 'background: #FF6161; border: 1px solid #110038; box-shadow: inset -1px -1px 0 0 #993A3A, inset 1px 1px 0 0 #FFFFFF';
    document.getElementById('img-logo').style= ' background: #FF6161; border: 1px solid #110038; box-shadow: inset -1px -1px 0 0 #993A3A, inset 1px 1px 0 0 #FFFFFF';
    document.getElementById('name-button').style='font-family: Chakra Petch; font-size: 16px; color: #FFFFFF; letter-spacing: 0; text-align: center; line-height: 18px';
}

document.getElementById("begin").addEventListener("click", function (){
    document.querySelector(".search-block").style.display="none"
    document.querySelector(".block-video").style.display="block"

//Establece el stream del video
let constraintObj = { 
    audio: false, 
    video: { 
        facingMode: "user", 
        width: { min: 832, ideal: 1280, max: 832 },
        height: { min: 434, ideal: 720, max: 434 } 
    } 
}; 

if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
    navigator.mediaDevices.getUserMedia = function(constraintObj) {
        let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }
        return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraintObj, resolve, reject);
        });
    }
}else{
    navigator.mediaDevices.enumerateDevices()
    .then(devices => {
        devices.forEach(device=>{
            console.log(device.kind.toUpperCase(), device.label);
            
        })
    })
    .catch(err=>{
        console.log(err.name, err.message);
    })
}

navigator.mediaDevices.getUserMedia(constraintObj)
.then(function(mediaStreamObj) {
    
    var video = document.querySelector('video');
    if ("srcObject" in video) {
        video.srcObject = mediaStreamObj;
    } else {
        
        video.src = window.URL.createObjectURL(mediaStreamObj);
    }
    
    video.onloadedmetadata = function(ev) {

        video.play();
    };
});
})


//Empieza la grabación del gif
function gifButton(){
    var e = document.getElementsByTagName('video')[0];
    var image = document.createElement('img');
    image.innerHTML = e.innerHTML;
    e.parentNode.replaceChild(image, e);
    image.className = "gif-video";
    
	
function captureCamera(callback) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(camera) {
        callback(camera);
    }).catch(function(error) {
        alert('Unable to capture your camera. Please check console logs.');
        console.error(error);
    });
}

var recorder;


function stopRecordingCallback() {
    form.append('file', recorder.getBlob(), 'myGif.gif');
    console.log(form.get('file'))
    localStorage.setItem('file', image.src)
    recorder.getBlob().size;
    image.src = URL.createObjectURL(recorder.getBlob());
    recorder.camera.stop();
    recorder.destroy();
    recorder = null;
    document.getElementById('button-upload').style='display:flex';
    document.getElementById('capture').style='display:none'; 
}

    captureCamera(function(camera) {
        
        recorder = RecordRTC(camera, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 832,
            height: 434,
            hidden: 240,
           
            onGifPreview: function(gifURL) {
                image.src = gifURL;
            }
        });

        recorder.startRecording();
        dateStarted = new Date().getTime();

        (function looper() {
            if(!recorder) {
              return;
            }
            document.querySelector('.timer').innerHTML = '00:00:' + calculateTimeDuration((new Date().getTime() - dateStarted) / 1000);
            setTimeout(looper, 1000);
        })();
        
        
        recorder.camera = camera;

        document.getElementById('btn-stop-recording').disabled = false;
       
    });
;

    document.getElementById('btn-stop-recording').onclick = function() {
        this.disabled = true;
        recorder.stopRecording(stopRecordingCallback);
    };
}

//Post del gif y fetch para generar la colección de gifs propios  

let form = new FormData();

document.getElementById("upload").addEventListener("click", function(){
    const API_KEY= 'DldA7AFF61YOOcRPwEu3baEYLRa27mD9';
    const fr = new FileReader();
    const blob = form.get("file");
    fr.readAsBinaryString(blob); 
    fr.onloadend = function() {
      const BINARY_GIF = fr.result; 
      console.log(BINARY_GIF)
      var postData = {
          username: "gregorieu96",
          api_key: API_KEY,
          file:  BINARY_GIF
      }
  
      var url = 'https://upload.giphy.com/v1/gifs?api_key=' + API_KEY;
      fetch(url, {
          method: 'POST',
          body: form
      })
      .then((response)=>{
          return response.json();
      })
      .then((_responseData)=>{
          let responseData = _responseData || {},
              data = responseData.data || {},
              gifId = data.id || "";
              

            
              // saca el elemento del local storage, si no existe, cae en un Array []
              let gifsHistory = JSON.parse(localStorage.getItem("guifos")) || [];
                

              // Push al ID
              gifsHistory.push(gifId);

              // seteo el local storage con un nuevo array
              localStorage.setItem("guifos", JSON.stringify(gifsHistory));
              
            renderResults(); //Renderizo el grid con resultados 

              let lastGuifo= gifsHistory[gifsHistory.length - 1]
              
              const pathLastGuifo = "https://api.giphy.com/v1/gifs?ids=" + lastGuifo + "&api_key=" + API_KEY
              
              fetch(pathLastGuifo).then(function (res) {
                return res.json();
              }).then(function (json) {
                console.log(json.data[0].images.fixed_height.url);
                const results = document.getElementById("results_last_guifo")|| [];
               
                let resultsHTMLsearch = " ";
                json.data.forEach(function (obj) {
                  console.log(obj.images.fixed_height.url);
                  const url = obj.images.fixed_height.url;
                  const height = obj.images.fixed_height.height;
                  resultsHTMLsearch += 
            
                  `<div class=gif-list>
                  <img src="${url}" class="item-success">
                  </div>`;
                });
              
                results.innerHTML = resultsHTMLsearch;
              }).catch(function (err) {
                console.log(err.message);
              });   
      }); 
  }  

//Timer de carga del upload del gif 
document.querySelector(".container_upload_gif").style.display="block"
document.querySelector(".block-success").style.display="none"
document.querySelector(".block-video").style.display="none"

  function longForLoop(limit) {
    var i = 4;
    var j = 5;
    var ref = setInterval(() => {
    let divUpload = document.getElementById(++i);
     
     if (divUpload.className == "block-two") {
     divUpload.className = "block-one";
     } else {
     divUpload.className = "block-two";
     }

     document.querySelector(".line2").innerHTML = "30 años";
     document.querySelector(".line3").innerHTML = --j;
     
     if (i == limit) clearInterval(ref);
     if (j == 0) {
     document.querySelector(".container_upload_gif").style.display = "none";
     document.querySelector(".block-success").style.display="block"
     document.querySelector(".search-block").style.display="none"
     document.querySelector(".first-section").style.display = "block";
          }
        }, 1000);
      }
      longForLoop(26);
 
}
);


  var dateStarted;
  function calculateTimeDuration(secs) {
    var hr = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600)) / 60);
    var sec = Math.floor(secs - (hr * 3600) - (min * 60));
  
    if (min < 10) {
        min = "0" + min;
    }
  
    if (sec < 10) {
        sec = "0" + sec;
    }
  
    if(hr <= 0) {
        return min + ':' + sec;
    }
  
    return hr + ':' + min + ':' + sec;
  } 

//genero la coleccion de gifs en la ultima ventana de la pagina 
 function renderResults(){

      let gifsHistory = JSON.parse(localStorage.getItem("guifos")) || [];
      let gifIds = gifsHistory.join(",")
      const API_KEY= 'DldA7AFF61YOOcRPwEu3baEYLRa27mD9'

      if(gifsHistory.length == 0){
          window.alert("NO HAY GIFS GUARDADOS");
      } else {
          
          const pathtwo = "https://api.giphy.com/v1/gifs?ids=" + gifIds + "&api_key=" + API_KEY
          
          fetch(pathtwo).then(function (res) {
            return res.json();
          }).then(function (json) {
            console.log(json.data[0].images.fixed_height.url);
            const resultsElement = document.getElementById("results-trends")|| [];
           
            json.data.forEach(function (obj) {
              // Creo los elementos imagen y divs asociados 
              let imgElement = document.createElement("img");
              let divElement = document.createElement("div");

              // Le añado una clase al DIV
              divElement.classList.add("item");

              // Le añado un source a la imagen
              const url = obj.images.fixed_height.url;
              imgElement.setAttribute("src", url)
              
              // Inserto la imagen dentro del div
              divElement.appendChild(imgElement);

              // Añado el div results-trends a otro div.
              resultsElement.appendChild(divElement);
            });
          
            
          }).catch(function (err) {
            console.log(err.message);
          });   
      }
            
   }

//Genero el mismo procedimiento anterior para que los gifs sean visualizables en otras partes de la pagina 
   let gifsHistory = JSON.parse(localStorage.getItem("guifos")) || [];
   let gifIds = gifsHistory.join(",")
   const API_KEY= 'DldA7AFF61YOOcRPwEu3baEYLRa27mD9'

   if(gifsHistory.length == 0){
       window.alert("NO HAY GIFS GUARDADOS");
   } else {
       
       const pathtwo = "https://api.giphy.com/v1/gifs?ids=" + gifIds + "&api_key=" + API_KEY
       
       fetch(pathtwo).then(function (res) {
         return res.json();
       }).then(function (json) {
         console.log(json.data[0].images.fixed_height.url);
         const resultsElement = document.getElementById("results-trends")|| [];
        
         json.data.forEach(function (obj) {
           
           let imgElement = document.createElement("img");
           let divElement = document.createElement("div");

           
           divElement.classList.add("item");

           
           const url = obj.images.fixed_height.url;
           imgElement.setAttribute("src", url)
           
           
           divElement.appendChild(imgElement);

           
           resultsElement.appendChild(divElement);
         });
       
         
       }).catch(function (err) {
         console.log(err.message);
       });   
   }