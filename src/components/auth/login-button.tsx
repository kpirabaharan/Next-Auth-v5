'use client';

import { useRouter } from 'next/navigation';
import { PropsWithChildren } from 'react';

interface LoginButtonProps extends PropsWithChildren {
  mode?: 'modal' | 'redirect';
  asChild?: boolean;
}

export const LoginButton = ({ children, mode, asChild }: LoginButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push('/auth/login');
  };

  if (mode === 'modal') {
    return <span>TODO: Implement modal</span>;
  }

  return <span onClick={onClick}>{children}</span>;
};
