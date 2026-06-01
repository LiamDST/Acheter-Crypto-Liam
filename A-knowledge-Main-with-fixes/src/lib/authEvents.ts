// Custom event types for authentication
export interface AuthEventDetail {
  isSignUp?: boolean;
}

// Function to open the auth modal
export function openAuthModal(isSignUp = false) {
  const event = new CustomEvent('openAuthModal', { 
    detail: { isSignUp } 
  });
  window.dispatchEvent(event);
}

// Type definition for the event listener
export type AuthEventListener = (event: CustomEvent<AuthEventDetail>) => void;

// Add event listener for auth modal
export function addAuthModalListener(callback: AuthEventListener) {
  window.addEventListener('openAuthModal', callback as EventListener);
  return () => {
    window.removeEventListener('openAuthModal', callback as EventListener);
  };
}