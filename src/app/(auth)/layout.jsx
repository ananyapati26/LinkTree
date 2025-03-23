//to privide same styling for all auth pages

const AuthLayout = ({ children }) => {
  return (
    <div className="bg-slate-200 p-10 rounded-md  items-center justify-center mt-40">{children}</div>
  )
}

export default AuthLayout