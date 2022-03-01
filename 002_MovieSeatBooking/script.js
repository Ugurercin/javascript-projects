const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelection = document.getElementById('movie');
const resetButton = document.getElementById('reset');

let ticketPrice = +movieSelection.value;

populateUI();

function resetChoice() {
  localStorage.clear();
  location.reload();
  
}

function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}


function updateSelectedSeatCount() {
  const selectedSeats = document.querySelectorAll('.row .seat.selected')
  const selectedSeatsCount = selectedSeats.length;
  count.textContent = selectedSeatsCount;
  total.textContent = selectedSeatsCount * ticketPrice;

  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  console.log(seatsIndex)


}



function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if(selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if(selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected')
      }
    })

  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if(selectedMovieIndex !==null) {
    movieSelection.selectedIndex = selectedMovieIndex;
  }
}


resetButton.addEventListener('click', resetChoice)

movieSelection.addEventListener('change', e =>  {
  ticketPrice = +e.target.value;
  updateSelectedSeatCount();
  setMovieData(e.target.selectedIndex, e.target.value)
})

container.addEventListener('click', (e) => {
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');

    updateSelectedSeatCount();
  }

})

updateSelectedSeatCount();
