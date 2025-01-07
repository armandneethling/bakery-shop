import WelcomeMessage from '../components/WelcomeMessage';
import ToastNotification from '../components/ToastNotification';

const Home = () => {
    return (
        <>
            <ToastNotification />
            <div className="flex flex-col h-screen">
                <main className="flex-1 flex items-center justify-center">
                    <WelcomeMessage />
                </main>
            </div>
        </>
    );
};

export default Home;
