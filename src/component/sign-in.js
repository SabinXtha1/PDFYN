import { signInWithGitHub } from "./sign"

export default function SignIn() {
    const handleSubmit = async (e) => {
      e.preventDefault()
      await signInWithGitHub() // Call the server function here
    }
  
    return (
      <form onSubmit={handleSubmit}>
        <button type="submit">Sign in with GitHub</button>
      </form>
    )
  }