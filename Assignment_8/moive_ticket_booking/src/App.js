import React, { useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import './App.css';

const BookingContext = createContext();
 const moviesData = [
  { id: 1, title: "Avengers: Endgame", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnXEwQlva93WuBdWDK6LlOSf4f96CB5OxToqcdkHiWBnn2p5WOjaOGKo_t6i9F-gQ2tYUp&s=10", desc: "The Avengers take a final stand against Thanos." },
  { id: 2, title: "Inception", img: "https://play-lh.googleusercontent.com/buKf27Hxendp3tLNpNtP3E-amP0o4yYV-SGKyS2u-Y3GdGRTyfNCIT5WAVs2OudOz6so5K1jtYdAUKI9nw8", desc: "A thief steals corporate secrets through dream-sharing technology." },
  { id: 3, title: "The Dark Knight", img: "https://image.tmdb.org/t/p/w200/qJ2tW6WMUDux911r6m7haRef0WH.jpg", desc: "Batman faces the Joker in Gotham City." },
  { id: 4, title: "Interstellar", img: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg", desc: "A team of explorers travel through a wormhole in space." },
  { id: 5, title: "Parasite", img: "https://image.tmdb.org/t/p/w200/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", desc: "Greed and class discrimination threaten the relationship between two families." },
  { id: 6, title: "The Lion King", img: "https://m.media-amazon.com/images/S/pv-target-images/2c6bf6218aa296881bfba2aa6838a21a8bf768d844ad4522fe9931cdcb7a9f33.jpg", desc: "Simba idolizes his father, King Mufasa, and takes to heart his own royal destiny." },
  { id: 7, title: "Joker", img: "https://image.tmdb.org/t/p/w200/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg", desc: "Forever alone in a crowd, Arthur Fleck seeks connection." },
  { id: 8, title: "Spider-Man: No Way Home", img: "https://image.tmdb.org/t/p/w200/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg", desc: "Peter Parker balances his life as an ordinary high school student in Queens." },
  { id: 9, title: "The Matrix", img: "https://image.tmdb.org/t/p/w200/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", desc: "A computer hacker learns from mysterious rebels about the true nature of his reality." },
  { id: 10, title: "Forrest Gump", img: "https://image.tmdb.org/t/p/w200/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg", desc: "The presidencies of Kennedy and Johnson, the Vietnam War, and other events unfold." },
  { id: 11, title: "Shawshank Redemption", img: "https://image.tmdb.org/t/p/w200/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg", desc: "Framed in the 1940s for the double murder of his wife and her lover, Andy Dufresne begins a new life." },
  { id: 12, title: "Pulp Fiction", img: "https://m.media-amazon.com/images/I/9124WG1H4QL._AC_UF1000,1000_QL80_.jpg", desc: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine." },
  { id: 13, title: "Fight Club", img: "https://image.tmdb.org/t/p/w200/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg", desc: "An insomniac office worker and a devil-may-care soap maker form an underground fight club." },
  { id: 14, title: "Coco", img: "https://image.tmdb.org/t/p/w200/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg", desc: "Aspiring musician Miguel, confronted with his family's ancestral ban on music, enters the Land of the Dead." },
  { id: 15, title: "Gladiator", img: "https://image.tmdb.org/t/p/w200/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg", desc: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family." },
  { id: 16, title: "Titanic", img: "https://image.tmdb.org/t/p/w200/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg", desc: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic." }
];

const MovieList = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h2>Now Showing</h2>
      <div className="movie-grid">
        {moviesData.map((movie) => (
          <div key={movie.id} className="movie-card" onClick={() => navigate(`/details/${movie.id}`)}>
            <img src={movie.img} alt={movie.title} />
            <h4>{movie.title}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setSelectedMovie } = useContext(BookingContext);
  
  const movie = moviesData.find(m => m.id === parseInt(id));

  const handleBook = () => {
    setSelectedMovie(movie);
    navigate('/book');
  };

  if (!movie) return <div>Movie not found</div>;

  return (
    <div className="container details-page">
      <img src={movie.img} alt={movie.title} className="detail-img"/>
      <div className="detail-content">
        <h1>{movie.title}</h1>
        <p>{movie.desc}</p>
        <button className="btn-primary" onClick={handleBook}>Book Seat</button>
      </div>
    </div>
  );
};

const BookingForm = () => {
  const navigate = useNavigate();
  const { setBookingDetails } = useContext(BookingContext);
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookingId = Math.floor(100000 + Math.random() * 900000); // Random 6 digit ID
    setBookingDetails({ ...formData, bookingId });
    navigate('/confirmation');
  };

  return (
    <div className="container form-page">
      <h2>Enter Details</h2>
      <form onSubmit={handleSubmit} className="booking-form">
        <input 
          type="text" placeholder="Full Name" required 
          value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
        />
        <input 
          type="email" placeholder="Email Address" required 
          value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
        />
        <input 
          type="tel" placeholder="Mobile Number" required 
          value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})}
        />
        <button type="submit" className="btn-primary">Submit</button>
      </form>
    </div>
  );
};

// Page 4: Confirmation
const Confirmation = () => {
  const { bookingDetails, selectedMovie } = useContext(BookingContext);
  const navigate = useNavigate();

  if (!bookingDetails) return <div className="container">No booking found.</div>;

  return (
    <div className="container success-page">
      <div className="success-card">
        <h1 style={{color: 'green'}}>Booking Confirmed!</h1>
        <h3>{selectedMovie?.title}</h3>
        <div className="ticket-info">
          <p><strong>Booking ID:</strong> #{bookingDetails.bookingId}</p>
          <hr/>
          <p><strong>Name:</strong> {bookingDetails.name}</p>
          <p><strong>Email:</strong> {bookingDetails.email}</p>
          <p><strong>Mobile:</strong> {bookingDetails.mobile}</p>
        </div>
        <button className="btn-secondary" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    </div>
  );
};

// Main App Component with Routing
function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

  return (
    <BookingContext.Provider value={{ selectedMovie, setSelectedMovie, bookingDetails, setBookingDetails }}>
      <Router>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/details/:id" element={<MovieDetails />} />
          <Route path="/book" element={<BookingForm />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </Router>
    </BookingContext.Provider>
  );
}

export default App;