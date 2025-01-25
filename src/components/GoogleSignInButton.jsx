import React from 'react';
import { Button } from './ui/button';
import { signIn } from 'next-auth/react';

const GoogleSignInButton = ({ children }) => {
  const loginWithGoogle = () => signIn('google',{ callbackUrl: '/admin'});

  return (
    <Button onClick={loginWithGoogle} className="w-full">
      {children}
    </Button>
  );
};

export default GoogleSignInButton;
