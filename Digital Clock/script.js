function updateClock() {
  const now = new Date();
  
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  let ampm = "AM";

  // Convert to 12-hour format
  if (hours >= 12) {
    ampm = "PM";
    if (hours > 12) hours -= 12;
  }
  if (hours === 0) {
    hours = 12;
  }

  // Format with leading zeros
  const h = hours < 10 ? "0" + hours : hours;
  const m = minutes < 10 ? "0" + minutes : minutes;
  const s = seconds < 10 ? "0" + seconds : seconds;

  // Date
  const day = now.getDate();
  const month = now.getMonth() + 1; // months are 0-indexed
  const year = now.getFullYear();

  const dateString = `${day < 10 ? "0" + day : day}/${
    month < 10 ? "0" + month : month
  }/${year}`;

  const timeString = `${h}:${m}:${s} ${ampm}`;

  document.getElementById("clock").innerHTML = `${timeString}<br>${dateString}`;
}

setInterval(updateClock, 1000);
updateClock();
