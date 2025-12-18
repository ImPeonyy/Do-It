

import * as React from 'react'
import { Button } from '../../ui';

const LoginPage = () => {
    const baseUrl = 'https://oauth2.mezon.ai/oauth2/auth?client_id=2001488478830858240&redirect_uri=http://localhost:3001/login/callback&response_type=code&scope=openid offline&state=7d2bf60ffcb';
    return (
    <a href={baseUrl}>
      <Button className=''>Login</Button>
    </a>
  );
};

export default LoginPage;