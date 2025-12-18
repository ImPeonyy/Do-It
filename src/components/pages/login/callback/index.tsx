"use client"

import { useParams } from "next/navigation";

const CallBackPage = async () => {
    const { code, state } = useParams<{ code: string, state: string }>();

  const data = await fetch('http://localhost:3000/oauth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      code,
      state
    }),
  });

  const token = await data.json();

  localStorage.setItem("access_token", token);

  return (
    <div>
        Login
    </div>
  )
};

export default CallBackPage;
