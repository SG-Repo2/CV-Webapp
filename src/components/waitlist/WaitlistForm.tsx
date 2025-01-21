import { useState } from 'react';
import { useSupabase } from '../../contexts/SupabaseContext';
import { addWaitlistEmail } from '../../services/waitlistService';
import { ArrowLeft, Send } from 'lucide-react';
import SuccessModal from './SuccessModal';
import { useNavigate } from 'react-router-dom';

interface WaitlistFormProps {
  onSuccess?: () => void;
}

export function WaitlistForm({ onSuccess }: WaitlistFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const supabase = useSupabase();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    
    try {
      await addWaitlistEmail(supabase, email);
      setStatus('success');
      setShowModal(true);
      onSuccess?.();
    } catch (error) {
      setStatus('error');
      if (error instanceof Error) {
        setErrorMessage(error.message === 'Email already registered' 
          ? 'This email is already on our waitlist!'
          : 'Something went wrong. Please try again.');
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white shadow mb-6">
        <button 
          onClick={() => navigate('/')}
          className="p-2 rounded hover:bg-gray-100"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">Join Waitlist</h1>
        <div className="w-8" /> {/* Spacer for alignment */}
      </header>

      <div className="px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Be the First to Experience</h2>
            <p className="text-gray-600">
              Join our exclusive waitlist and be among the first to try CareVantage when we launch.
              Get early access to revolutionary health tracking features.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 
                         focus:ring-sea-green focus:border-sea-green"
              />
            </div>
            
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-sea-green text-white py-3 px-4 rounded-xl hover:bg-opacity-90 
                       transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center justify-center space-x-2"
            >
              <span>{status === 'loading' ? 'Joining...' : 'Join Waitlist'}</span>
              <Send size={18} className="inline-block" />
            </button>
            
            {status === 'error' && (
              <p className="text-light-red text-sm mt-2">
                {errorMessage}
              </p>
            )}
          </form>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-sea-green/10 rounded-xl">
            <h3 className="font-semibold text-sea-green mb-2">Early Access</h3>
            <p className="text-sm text-gray-600">Be the first to try new features</p>
          </div>
          <div className="p-4 bg-light-red/10 rounded-xl">
            <h3 className="font-semibold text-light-red mb-2">Premium Benefits</h3>
            <p className="text-sm text-gray-600">Exclusive rewards for early users</p>
          </div>
          <div className="p-4 bg-purple/10 rounded-xl">
            <h3 className="font-semibold text-purple mb-2">Priority Support</h3>
            <p className="text-sm text-gray-600">Direct access to our team</p>
          </div>
          <div className="p-4 bg-sea-green/10 rounded-xl">
            <h3 className="font-semibold text-sea-green mb-2">Custom Features</h3>
            <p className="text-sm text-gray-600">Shape the future of the app</p>
          </div>
        </div>
      </div>
      
      {showModal && <SuccessModal onClose={() => {
        setShowModal(false);
        navigate('/');
      }} />}
    </div>
  );
}