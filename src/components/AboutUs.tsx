import React from 'react';

const AboutUs: React.FC = () => {
    return (
        <div className="about-us-page">
            <section className="intro bg-bakery-yellow text-bakery-brown py-6 px-8">
                <h1 className="text-4xl font-bold mb-4">Welcome to HomeBaked Rusks</h1>
                <p className="text-xl">Delicious, homemade rusks crafted with love and care.</p>
            </section>

            <section className="products bg-white text-bakery-brown py-6 px-8">
                <h2 className="text-3xl font-semibold mb-4">Our Products</h2>
                <p className="text-lg">From classic plain buttermilk rusks to innovative flavors like cranberry, we offer a variety of rusks to satisfy every palate.</p>
            </section>

            <section className="contact bg-bakery-light-pink text-bakery-brown py-6 px-8">
                <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
                <p className="text-lg">Reach out to us for any inquiries or orders. We’d love to hear from you!</p>
            </section>
        </div>
    );
};

export default AboutUs;
