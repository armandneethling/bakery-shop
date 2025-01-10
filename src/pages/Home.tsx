import WelcomeMessage from '../components/WelcomeMessage';
import ToastNotification from '../components/ToastNotification';
import AboutUs from '../components/AboutUs';

const Home = () => {
    return (
        <>
            <ToastNotification />
            <div className="flex flex-col home-page-container">
                <main className="flex-1 flex items-center justify-center">
                    <WelcomeMessage />
                </main>
                <section className="about-us">
                    <AboutUs />
                </section>
            </div>
        </>
    );
};

export default Home;
