import React from "react";

function SignIn() {
  return (
    <div>
      <h1>Sign In</h1>
      <form>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
export default SignIn;
