import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import ProtectedRoute from '@/components/ProtectedRoute';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import ForgotPassword from '@/pages/ForgotPassword';
import ResetPassword from '@/pages/ResetPassword';
import Home from '@/pages/Home';
import RoommateQuestionnaire from '@/pages/RoommateQuestionnaire';
import StudentDashboard from '@/pages/StudentDashboard';
import LivingMatch from '@/pages/LivingMatch';
import LivingIntelligence from '@/pages/LivingIntelligence';
import AdminCenter from '@/pages/AdminCenter';
import LandlordPortal from '@/pages/LandlordPortal';
import ReferralProgram from '@/pages/ReferralProgram';
import AmbassadorPortal from '@/pages/AmbassadorPortal';
import BookViewing from '@/pages/BookViewing';
import VirtualTours from '@/pages/VirtualTours';
import BudgetPlanner from '@/pages/BudgetPlanner';
import ReputationNetwork from '@/pages/ReputationNetwork';
import MaelonOS from '@/pages/MaelonOS';
import AIConcierge from '@/pages/AIConcierge';
import MoveInScore from '@/pages/MoveInScore';
import CommuteIntelligence from '@/pages/CommuteIntelligence';
import StudentLifeIndex from '@/pages/StudentLifeIndex';
import HousingPrediction from '@/pages/HousingPrediction';
import RoommateChemistry from '@/pages/RoommateChemistry';
import TenantPassport from '@/pages/TenantPassport';
import SmartMarketplace from '@/pages/SmartMarketplace';
import CampusIntelligence from '@/pages/CampusIntelligence';
import MaelonNetwork from '@/pages/MaelonNetwork';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-navy">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brass flex items-center justify-center">
            <span className="text-navy font-heading text-2xl font-semibold">M</span>
          </div>
          <div className="w-8 h-8 border-3 border-brass/20 border-t-brass rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route element={<ProtectedRoute unauthenticatedElement={<Navigate to="/login" replace />} />}>
        <Route path="/" element={<Home />} />
        <Route path="/roommate-questionnaire" element={<RoommateQuestionnaire />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/living-match" element={<LivingMatch />} />
        <Route path="/intelligence" element={<LivingIntelligence />} />
        <Route path="/admin" element={<AdminCenter />} />
        <Route path="/landlord" element={<LandlordPortal />} />
        <Route path="/referral" element={<ReferralProgram />} />
        <Route path="/ambassador" element={<AmbassadorPortal />} />
        <Route path="/book-viewing" element={<BookViewing />} />
        <Route path="/virtual-tours" element={<VirtualTours />} />
        <Route path="/budget-planner" element={<BudgetPlanner />} />
        <Route path="/reputation" element={<ReputationNetwork />} />
        <Route path="/maelon-os" element={<MaelonOS />} />
        <Route path="/ai-concierge" element={<AIConcierge />} />
        <Route path="/move-in-score" element={<MoveInScore />} />
        <Route path="/commute-intelligence" element={<CommuteIntelligence />} />
        <Route path="/student-life-index" element={<StudentLifeIndex />} />
        <Route path="/housing-prediction" element={<HousingPrediction />} />
        <Route path="/roommate-chemistry" element={<RoommateChemistry />} />
        <Route path="/tenant-passport" element={<TenantPassport />} />
        <Route path="/smart-marketplace" element={<SmartMarketplace />} />
        <Route path="/campus-intelligence" element={<CampusIntelligence />} />
        <Route path="/maelon-network" element={<MaelonNetwork />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App