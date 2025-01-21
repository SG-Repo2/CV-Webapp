interface SuccessModalProps {
  onClose: () => void;
}

export default function SuccessModal({ onClose }: SuccessModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">🎉 You're on the list!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for joining our waitlist. We'll notify you as soon as CareVantage is ready.
        </p>
        <button
          onClick={onClose}
          className="w-full bg-sea-green text-white py-3 px-4 rounded-xl hover:bg-opacity-90 
                   transition duration-200"
        >
          Got it
        </button>
      </div>
    </div>
  );
}