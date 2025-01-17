
import './slider.css';

const Slider = ( {loading,error,data} ) => {

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
            <div key={item.id} className="slider-item">
              <img src={item.image || item.primaryImageUrl} alt={item.title} />
            </div>
          ))}
      </div>
    </>
  );
};

export default Slider;
