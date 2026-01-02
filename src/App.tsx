import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Homepage from './Homepage';
import Countdown from './Countdown';
import PhotoGallery from './PhotoGallery';
import ComplimentGenerator from './Compliment';
import LoveWall from './Lovewall';
import MoodBooster from './MoodBooster';
import EmailSettings from './EmailSettings';
import PushNotifications from './PushNotifications';
import OnboardingSlides from './Onboarding';
import Layout from './Layout';
import ComingSoon from './Notifications';
import spline from './assets/spline.gif';
import SitWithMe from './SitWithMe';

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
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    // Check onboarding state from localStorage
    const onboardingState = localStorage.getItem('hasCompletedOnboarding');
    setHasCompletedOnboarding(onboardingState === 'true');
  }, []);

  const handleFinished = () => {
    // Mark onboarding as completed
    localStorage.setItem('hasCompletedOnboarding', 'true');
    setHasCompletedOnboarding(true);
  };

  return (
    <Router>
      <Layout>
        <PageWithLoading>
          <Routes>
            {/* Default route: Redirect based on onboarding state */}
            <Route
              path="/"
              element={
                hasCompletedOnboarding ? (
                  <Navigate to="/homepage" replace />
                ) : (
                  <Navigate to="/onboarding" replace />
                )
              }
            />
            <Route path="/sitwithme" element={<SitWithMe />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/countdown" element={<Countdown />} />
            <Route path="/photo" element={<PhotoGallery />} />
            <Route path="/compliment" element={<ComplimentGenerator />} />
            <Route path="/wall" element={<LoveWall />} />
            <Route path="/comingsoon" element={<ComingSoon onFinished={handleFinished} />} />
            <Route path="/mood" element={<MoodBooster />} />
            <Route path="/email" element={<EmailSettings />} />
            <Route path="/notifications" element={<PushNotifications />} />
            <Route
              path="/onboarding"
              element={<OnboardingSlides onFinish={handleFinished} />}
            />
          </Routes>
        </PageWithLoading>
      </Layout>
    </Router>
  );
}

export default App;
