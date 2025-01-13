import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdDriveFileRenameOutline, MdMailOutline } from "react-icons/md";
import { FaKey } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../store/useAuth";
import toast from "react-hot-toast";

interface FormDataI {
  fullname: string;
  email: string;
  password: string;
  gender: string;
}

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    gender: "male", // default value
  });
  const { signup , isSigningUp , checkAuth } = useAuth();
  const [logoSrc, setLogoSrc] = useState(
    window.innerWidth > 768
      ? "/logo/virvo-responsive/icons8-chat-256.svg"
      : "/logo/virvo-responsive/icons8-chat-128.svg"
  );

  useEffect(() => {
    const handleResize = () => {
      setLogoSrc(
        window.innerWidth > 768
          ? "/logo/virvo-responsive/icons8-chat-256.svg"
          : "/logo/virvo-responsive/icons8-chat-128.svg"
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleFormDataChange = (changes: Partial<FormDataI>) => {
    setFormData({ ...formData, ...changes });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
    if (!formData.email || !formData.fullname || !formData.gender || !formData.password) {
      setError("Please fill all the fields");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setError("Invalid email format");
      return;
    }
    if (formData.password.length < 6) {
      setError("Password should be at least 6 characters long");
      return;
    }
    if (formData.fullname.length < 6) {
      setError("Full name should be at least 6 characters long");
      return;
    }
    setError('');
    const res = await signup(formData);

    if (res.success) {
      toast.success('Signed up succesfully' , {
        position : 'bottom-center'
      })
      setTimeout(() => {
        checkAuth()
        navigate('/')
      }, 3000);
    }else{
      setError(res.response.data.message)
      toast.error(res.response.data.message)
    }
  };
  

  return (
    <div className="h-screen fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center gap-4 bg-base-100 dark:bg-base-300 transition-all duration-300">
      <div className="flex flex-col gap-4 md:flex-row items-center justify-center md:gap-16">
        <div className="">
          <img src={logoSrc} alt="Chat Icon" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-base-content text-4xl md:text-5xl font-bold mb-4">
            Join Us Today
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="relative">
              <MdMailOutline className="absolute top-4 left-4 text-base-content" />
              <input
                value={formData.email}
                type="email"
                placeholder="Email"
                className="input input-bordered w-full max-w-xs pl-10"
                onChange={(e) => handleFormDataChange({ email: e.target.value })}
              />
            </div>
            <div className="relative">
              <MdDriveFileRenameOutline className="absolute top-4 left-4 text-base-content" />
              <input
                value={formData.fullname}
                type="text"
                placeholder="Full Name"
                className="input input-bordered w-full max-w-xs pl-10"
                onChange={(e) => handleFormDataChange({ fullname: e.target.value })}
              />
            </div>
            <div className="relative">
              <FaKey className="absolute top-4 left-4 text-base-content" />
              <input
                value={formData.password}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full max-w-xs pl-10"
                onChange={(e) => handleFormDataChange({ password: e.target.value })}
              />
              {showPassword ? (
                <FaEyeSlash
                  className="absolute top-4 right-4 cursor-pointer text-base-content"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <FaEye
                  className="absolute top-4 right-4 cursor-pointer text-base-content"
                  onClick={() => setShowPassword(true)}
                />
              )}
            </div>
            <div className="relative">
              <select
                value={formData.gender}
                onChange={(e) => handleFormDataChange({ gender: e.target.value })}
                className="input input-bordered w-full max-w-xs pl-10"
              >
                <option value="male">🚹 Male</option>
                <option value="female">🚺 Female</option>
              </select>
            </div>
            <button type="submit" disabled={isSigningUp} className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
              {isSigningUp ? 'Signing Up ...' : 'Sign Up'}
            </button>
            {error && <div className="my-2 text-error">{error}</div>}
          </form>
          <p className="my-2.5 text-base-content">Already have an account?</p>
          <Link to="/login" className="btn btn-outline btn-primary w-full">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;