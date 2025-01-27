import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'Swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

import news1 from '../../assets/news/news1.jpg'
import news2 from '../../assets/news/news2.jpg'
import news3 from '../../assets/news/news3.jpg'
import news4 from '../../assets/news/news4.jpg'
import { Link } from 'react-router-dom';

const news = [
    {
        "id": 1,
        "title": "Global Climate Summit Calls for Urgent Action",
        "description": "The United Nations Climate Summit will be held in Glasgow, Scotland, from 19 to 23 September 2022. The summit is expected to bring together world leaders to discuss the urgent need to take bold action to combat climate change.",
        "image": news1,
    },
    {
        "id": 2,
        "title": "Breakthrough in AI Technology Announced",
        "description": "Researchers at the University of California, Berkeley, have announced a major breakthrough in AI technology, which could revolutionize the way we live and work.",
        "image": news2,
    },
    {
        "id": 3,
        "title": "New Space Mission Aims to Explore Distant Galaxies",
        "description": "NASA's James Webb Space Telescope is poised to revolutionize our understanding of the universe, with its ability to peer deep into space and study distant galaxies.",
        "image": news3,
    },
    {
        "id": 4,
        "title": "Stock Markets Reach Record Highs",
        "description": "The stock market has reached new highs, with the Dow Jones Industrial Average reaching a new record high of 26,000 points.",
        "image": news4,
    },
    {
        "id": 5,
        "title": "Innovative New Smartphone Released by Leading Technology Company",
        "description": "A new smartphone from a leading technology company has been released, offering cutting-edge features and improved performance.",
        "image": news2,
    }
]

const News = () => {
    return (
        <div className='py-16'>
            <h2 className='text-3xl font-semibold mb-6'>News</h2>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >

                {
                    news.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className='flex flex-col sm:flex-row sm:justify-between items-center gap-12'>
                                {/* Contents */}
                                <div className='py-4'>
                                    <Link to="/">
                                        <h3 className='text-lg font-medium hover:text-blue-500 mb-4'>{item.title}</h3>
                                    </Link>
                                    <div className='w-12 h-[4px] bg-primary mb-5'></div>
                                    <p className='text-sm text-gray-600'>{item.description}</p>
                                </div>
                                <div className='flex-shrink-0'>
                                    <img src={item.image} alt="" className='w-full object-cover' />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default News
