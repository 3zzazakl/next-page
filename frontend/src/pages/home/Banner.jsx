import React from 'react';
import bannerImg from '../../assets/banner.png';

const Banner = () => {
  return (
    <section className="flex flex-col md:flex-row-reverse py-16 gap-12 justify-between items-center">
      
      {/* Image Section */}
      <div className="md:w-1/2 w-full flex items-center md:justify-end">
        <img src={bannerImg} alt="New Releases Banner" className="w-full" />
      </div>

      {/* Content Section */}
      <div className="md:w-1/2 w-full">
        <h1 className="text-2xl md:text-5xl font-medium mb-7">New Releases This Week</h1>
        <p className="mb-10">
          It is time to update your reading list with some of the latest and greatest releases in the literary world. 
          From heart-pumping thrillers to captivating memoirs, this week is new releases offer something for everyone.
        </p>
        <button className="btn-primary">Subscribe</button>
      </div>

    </section>
  );
};

export default Banner;
