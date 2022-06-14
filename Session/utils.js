const users = [
    {
      email: "test@test.com",
      password: "password",
      name: "Jane Doe",
    },
  ];

const sessions =[]


 function getSession(sessionId) {
     console.log(sessions);
     const session = sessions[sessionId];
  
    return session && session.valid ? session : null;
  }

