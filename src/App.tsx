import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Homepage from './Homepage';
import Countdown from './Countdown';
import PhotoGallery from './PhotoGallery';
import ComplimentGenerator from './Compliment';
import LoveWall from './Lovewall';
import SplashScreen from './SplashScreen';
import MoodBooster from './MoodBooster';
import EmailSettings from './EmailSettings';
import PushNotifications from './PushNotifications';
import OnboardingSlides from './Onboarding';
import Layout from './Layout';
import ComingSoon from './Notifications';
import spline from './assets/spline.gif';

// Loading screen component
const LoadingScreen = () => (
  <div className="fixed inset-0 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex flex-col items-center justify-center font-caveat">
      <div className="flex flex-col items-center justify-center ">
        <img 
          src={spline}
          alt="Loading Animation"
          className="w-96 h-96 object-contain -mb-10"
        />
        <div className="text-center ">
          <h2 className="text-4xl font-bold text-pink-800">
            Thand paaaaa
          </h2>
        </div>
      </div>
    </div>
);

// Wrapper to handle page loading
const PageWithLoading = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timer);
  }, [location]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return <>{children}</>;
};

function App() {
  const handleFinished = () => {
    return <Navigate to="/onboarding" replace />;
  };

  const handleFinishedOn = () => {
    return <Navigate to="/homepage" replace />;
  };

  return (
    <Router>
      <Layout>
        <PageWithLoading>
          <Routes>
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/countdown" element={<Countdown />} />
            <Route path="/photo" element={<PhotoGallery />} />
            <Route path="/compliment" element={<ComplimentGenerator />} />
            <Route path="/wall" element={<LoveWall />} />
            <Route path="/" element={<SplashScreen onFinished={handleFinished} />} />
            <Route path="/comingsoon" element={<ComingSoon onFinished={handleFinished} />} />
            <Route path="/mood" element={<MoodBooster />} />
            <Route path="/email" element={<EmailSettings />} />
            <Route path="/notifications" element={<PushNotifications />} />
            <Route path="/onboarding" element={<OnboardingSlides onFinish={handleFinishedOn} />} />
          </Routes>
        </PageWithLoading>
      </Layout>
    </Router>
  );
}

export default App;
