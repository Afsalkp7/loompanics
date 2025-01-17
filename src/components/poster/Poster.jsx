import React, { useState, useEffect } from 'react';
import './poster.css';
import API from '../../utils/api';
import Slider from '../modules/Slider';

const Poster = () => {
  const [posters, setPosters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosters = async () => {
      try {
        const response = await API.get('/user/posters');
        setPosters(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosters();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="categoryHead">
        <span className="headMain">Explore Our Offers</span> <br />
        <span className="headSub">
          Choose from a wide range of categories to find the perfect books for
          you here.
        </span>
      </div>
      {/* <div className="poster-container">
        {posters.length > 0 &&
          posters.map((poster) => (
            <div key={poster.id} className="poster-item">
              <img src={poster.image} alt={poster.title} />
            </div>
          ))}
      </div> */}
      <Slider loading={loading} error={error} data={posters}/>
    </>
  );
};

export default Poster;
