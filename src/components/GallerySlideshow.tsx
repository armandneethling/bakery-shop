import { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = [
    '/images/cake1.jpg',
    '/images/cake2.jpg',
    '/images/cake3.jpg',
    '/images/cake4.jpg',
    '/images/cake5.jpg',
    '/images/cake6.jpg',
    '/images/cake7.jpg',
    '/images/cake8.jpg',
    '/images/cake9.jpg',
];

const GallerySlideshow = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState<string | null>(null);

    const openModal = (image: string) => {
        setCurrentImage(image);
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setCurrentImage(null);
        setIsOpen(false);
        document.body.style.overflow = 'auto';
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };

    return (
        <div className="carousel-container">
            <Slider {...settings}>
                {images.map((image, index) => (
                    <div key={index} className="carousel-slide">
                        <img
                            src={image}
                            alt={`Cake ${index + 1}`}
                            className="carousel-image"
                            onClick={() => openModal(image)}
                        />
                    </div>
                ))}
            </Slider>

            {isOpen && currentImage && (
                <div className="modal" onClick={closeModal}>
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <img src={currentImage} alt="Full view" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default GallerySlideshow;
