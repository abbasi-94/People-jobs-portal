import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import JobsPage from './pages/JobsPage';
import JobDetailPage from './pages/JobDetailPage';
import PostJobPage from './pages/PostJobPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import AuthPage from './pages/AuthPage';
import EmployerDashboard from './pages/EmployerDashboard';
import SeekerDashboard from './pages/SeekerDashboard';
import CompanyPage from './pages/CompanyPage';
import ChatPage from './pages/ChatPage';
import { PrivacyPolicy, TermsConditions, FAQPage, NotFoundPage } from './pages/StaticPages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/jobs/:id" element={<JobDetailPage />} />
          <Route path="/post-job" element={<PostJobPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<SeekerDashboard />} />
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          <Route path="/company/:id" element={<CompanyPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
