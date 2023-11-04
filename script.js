const ipDetails = document.getElementById("ip");

window.onload = ipAddress;

function ipAddress() {
    fetch(`https://api.ipify.org?format=json`)
        .then((response) => response.json())
        .then(data => {
            showIp(data.ip);
        })
        .catch((error) => console.log(error))
}
function showIp(ip) {
    ipDetails.innerHTML = ip;
}

// *** Landing page ***

function showDetails() {
    const IP = ipDetails.innerText;
    // console.log(IP);
    setTimeout(() => {
        fetch(`https://ipapi.co/${IP}/json/`)
            .then((response) => response.json())
            .then(data => {
                showPost(data);
                // console.log(data.city);
            })
            .catch((error) => console.log(error));
    }, 500);
}

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }
  function showPosition(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;
    document.getElementById("googlemap").src = "https://maps.google.com/maps?q=" + lat + "," + long + "&z=15&output=embed";
   
    document.getElementById("lat").innerHTML = lat;
    document.getElementById("long").innerHTML = long;
    // console.log(position)
    // map.setCenter(new google.maps.LatLng(lat, lng));
  }

function showPost(data) {
    getLocation();
    // const lat = data.latitude;
    // const long = data.longitude;
    const timezone = data.timezone;
    const pin = data.postal;
    const my_time_zone = new Date().toLocaleString("en-US", { timeZone: timezone });

    document.body.classList.add('main');
    document.body.classList.remove('home');

    document.getElementById("landingIP").innerHTML = data.ip;

    // document.getElementById("lat").innerHTML = lat;
    // document.getElementById("long").innerHTML = long;
    document.getElementById("city").innerHTML = data.city;
    document.getElementById("region").innerHTML = data.region;
    document.getElementById("org").innerHTML = data.org;
    document.getElementById("host").innerHTML = data.asn;

    // document.getElementById("googlemap").src = "https://maps.google.com/maps?q=" + lat + "," + long + "&z=15&output=embed";
    //maps.google.com/maps?q=53.3381768,-6.2613077&z=15&output=embed

    document.getElementById("time").innerHTML = timezone;
    document.getElementById("date").innerHTML = my_time_zone;
    document.getElementById("pin").innerHTML = pin;

    postOfficeDetails(pin);


}

function postOfficeDetails(pin) {
    setTimeout(() => {
        fetch(`https://api.postalpincode.in/pincode/${pin}`)
            .then((response) => response.json())
            .then(data => {
                const postOffice = data[0].PostOffice;

                const cardContainer = document.getElementById("card");

                postOffice.forEach(element => {
                    cardContainer.innerHTML += `
                                        <div class="grid-item">
                                        <p>Name: <span>${element.Name}</span></p>
                                        <p>Branch Type: <span>${element.BranchType}</span></p>
                                        <p>Delivery Status: <span>${element.DeliveryStatus}</span></p>
                                        <p>District: <span>${element.District}</span></p>
                                        <p>Division: <span>${element.Division}</span></p>
                                        </div>
                                        `;
                });


                document.getElementById("noOfPost").innerHTML = data[0].Message;

            })
            .catch((error) => console.log(error));
    }, 500);
}

function searchPost(){
    var input = document.getElementById("searchBox");
    var filter = input.value.toUpperCase();
    var detail = document.getElementById("card");
    var postData = detail.getElementsByClassName("grid-item");
    for (i = 0; i < postData.length; i++) {
        a = postData[i].getElementsByTagName("span")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            postData[i].style.display = "";
        } else {
            postData[i].style.display = "none";
        }
    }
}