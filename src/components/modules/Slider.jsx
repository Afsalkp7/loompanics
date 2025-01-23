
import { useNavigate } from 'react-router-dom';
import './slider.css';

const Slider = ( {loading,error,data} ) => {
  const navigate = useNavigate()

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="slider-container">
        {data?.length > 0 &&
          data?.slice(0,10).map((item) => (
            <div key={item._id} className="slider-item" onClick={()=>navigate(`/books/${item._id}`)}>
              <img src={item.image || item.primaryImageUrl} alt={item.title} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Slider;
