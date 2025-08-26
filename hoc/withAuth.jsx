import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

import configs from "../config/index";
import Client from "../config/axiosClient";
import Loader from "../components/Icons/Loader";
import { forceLogout } from "../actions";

const withAuth = (Component) => {
  const Auth = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const pathname = usePathname();

    const [data, setData] = useState(undefined);

    const redirectToPath = (path) => {
      if (pathname !== path) {
        router.push(path);
      }
    };

    useEffect(() => {
      const getUser = async () => {
        try {
          const response = await Client.get(`${configs?.backendBaseURL}/hoc/user`);
          const { data } = response.data;
          if (data?.user && !data?.emailVerified) {
            toast.warning(
              <>
                <h2>Email not verified!!</h2>
                <p>Verify email first</p>
              </>
            );
            redirectToPath("/auth/verify-email");
          } else if (data?.user && data?.forceLogout) {
            setData(undefined);
            dispatch(forceLogout());
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          } else {
            setData(data);
          }
        } catch (error) {
          setData(undefined);
          toast.warning(
            <>
              <h2>Not Logged In!!</h2>
              <p>Please Log in first</p>
            </>
          );
          router.push("/auth/login");
        }
      };
      getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router]);

    // If user is logged in, return original component
    return data ? (
      <Component {...props} />
    ) : (
      <div className="hoc_loading_page pb-[100px] pt-[120px] lg:pt-[150px]">
        <Loader show />
      </div>
    );
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }

  return Auth;
};

export default withAuth;