'use client';

// No import needed

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center">
      <div className="relative w-32 h-32">
        {/* Rotating rings */}
        <div
          className="absolute inset-0 border-2 border-t-primary border-r-primary/50 border-b-primary/30 border-l-primary/10 rounded-full animate-spin"
          style={{
            animationDuration: '2s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
          }}
        />
        <div
          className="absolute inset-4 border-2 border-t-primary/80 border-r-primary/40 border-b-primary/20 border-l-primary/5 rounded-full animate-spin"
          style={{
            animationDuration: '3s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
          }}
        />
        <div
          className="absolute inset-8 border-2 border-t-primary/60 border-r-primary/30 border-b-primary/10 border-l-transparent rounded-full animate-spin"
          style={{
            animationDuration: '1.5s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
          }}
        />

        {/* Center pulse */}
        <div
          className="absolute inset-0 flex items-center justify-center animate-pulse"
          style={{
            animationDuration: '2s',
            animationIterationCount: 'infinite',
          }}
        >
          <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-primary rounded-full" />
          </div>
        </div>
      </div>

      {/* Loading text */}
      <div
        className="mt-8 text-center opacity-0"
        style={{ animation: 'fadeIn 0.5s ease-out 0.5s forwards' }}
      >
        <p
          className="text-primary text-xl font-mono animate-pulse"
          style={{
            animationDuration: '2s',
            animationIterationCount: 'infinite',
          }}
        >
          LOADING FECONF 2025
        </p>
        <div className="mt-2 flex justify-center space-x-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-primary rounded-full"
              style={{
                animation: 'loadingDot 1.5s ease-in-out infinite',
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Technical details */}
      <div
        className="absolute bottom-8 left-0 right-0 text-center text-xs font-mono text-primary/50 opacity-0"
        style={{ animation: 'fadeIn 0.5s ease-out 1.5s forwards' }}
      >
        <p>
          INITIALIZING 3D ENVIRONMENT // LOADING ASSETS // PREPARING INTERFACE
        </p>
        <p className="mt-1">© FECONF 2025 // SYSTEM VERSION 2.5.0</p>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes loadingDot {
          0%,
          100% {
            opacity: 0.2;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-4px);
          }
        }

        @keyframes spin-reverse {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
}
