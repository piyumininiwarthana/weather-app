document.getElementById("weatherForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    const city = document.getElementById("cityInput").value;
    
    const response = await fetch(`/weather?city=${city}`);
    const data = await response.json();
  
    if (data.error) {
      alert(data.error);
      return;
    }
  
    document.getElementById("cityName").textContent = data.city;
    document.getElementById("temperature").textContent = `Temperature: ${data.temp} °C`;
    document.getElementById("description").textContent = data.description;
    document.getElementById("weatherIcon").src = data.icon;
    document.getElementById("weatherResult").classList.remove("hidden");
  });
  