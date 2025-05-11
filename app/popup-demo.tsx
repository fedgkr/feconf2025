'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import FuturisticPopup from '@/components/futuristic-popup';

export default function PopupDemo() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6 p-4">
      <h1 className="text-3xl font-bold text-white mb-8">
        Futuristic Popup Demo
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          onClick={() => setIsInfoOpen(true)}
          className="bg-[#0FFFFF]/20 hover:bg-[#0FFFFF]/30 text-[#0FFFFF] border border-[#0FFFFF]/50"
        >
          Open Info Popup
        </Button>

        <Button
          onClick={() => setIsSuccessOpen(true)}
          className="bg-[#0FFFFF]/20 hover:bg-[#0FFFFF]/30 text-[#0FFFFF] border border-[#0FFFFF]/50"
        >
          Open Success Popup
        </Button>

        <Button
          onClick={() => setIsWarningOpen(true)}
          className="bg-[#FFD700]/20 hover:bg-[#FFD700]/30 text-[#FFD700] border border-[#FFD700]/50"
        >
          Open Warning Popup
        </Button>

        <Button
          onClick={() => setIsErrorOpen(true)}
          className="bg-[#FF4D4D]/20 hover:bg-[#FF4D4D]/30 text-[#FF4D4D] border border-[#FF4D4D]/50"
        >
          Open Error Popup
        </Button>
      </div>

      {/* Info Popup */}
      <FuturisticPopup
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        title="System Information"
        type="info"
        actionLabel="Acknowledge"
        onAction={() => setIsInfoOpen(false)}
      >
        <div className="space-y-4">
          <p>
            Welcome to the FEConf 2025 system interface. This popup demonstrates
            the futuristic UI design with sleek, dark backgrounds and glowing
            neon elements.
          </p>
          <p>
            The design includes rounded corners, subtle gradients, and glossy
            reflections to create an immersive sci-fi experience.
          </p>
        </div>
      </FuturisticPopup>

      {/* Success Popup */}
      <FuturisticPopup
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        title="Operation Successful"
        type="success"
        actionLabel="Continue"
        onAction={() => setIsSuccessOpen(false)}
      >
        <div className="space-y-4">
          <p>
            Your registration for FEConf 2025 has been successfully processed.
            You will receive a confirmation email shortly.
          </p>
          <div className="bg-[#0FFFFF]/10 p-3 rounded-md border border-[#0FFFFF]/30">
            <p className="text-[#0FFFFF]">Ticket ID: FEC-2025-0042</p>
          </div>
        </div>
      </FuturisticPopup>

      {/* Warning Popup */}
      <FuturisticPopup
        isOpen={isWarningOpen}
        onClose={() => setIsWarningOpen(false)}
        title="System Warning"
        type="warning"
        actionLabel="Proceed with Caution"
        onAction={() => setIsWarningOpen(false)}
      >
        <div className="space-y-4">
          <p>
            You are about to access a restricted area of the system. This action
            will be logged and monitored.
          </p>
          <div className="bg-[#FFD700]/10 p-3 rounded-md border border-[#FFD700]/30">
            <p className="text-[#FFD700]">
              Security clearance level 3 required.
            </p>
          </div>
        </div>
      </FuturisticPopup>

      {/* Error Popup */}
      <FuturisticPopup
        isOpen={isErrorOpen}
        onClose={() => setIsErrorOpen(false)}
        title="System Error"
        type="error"
        actionLabel="Retry Connection"
        onAction={() => setIsErrorOpen(false)}
      >
        <div className="space-y-4">
          <p>
            Unable to establish connection with the main database. This could be
            due to network issues or server maintenance.
          </p>
          <div className="bg-[#FF4D4D]/10 p-3 rounded-md border border-[#FF4D4D]/30">
            <p className="text-[#FF4D4D]">Error Code: DB-CONNECTION-503</p>
          </div>
        </div>
      </FuturisticPopup>
    </div>
  );
}
