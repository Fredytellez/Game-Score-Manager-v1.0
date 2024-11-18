/* // hooks/withAuth-hook.js
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
      if (!token) {
        router.push("/login");
      }
    }, [token]);

    return token ? <WrappedComponent {...props} /> : null;
  };
};

export default withAuth;
 */