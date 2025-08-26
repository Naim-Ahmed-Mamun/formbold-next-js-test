import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import Loader from "../components/Icons/Loader";
import Client from "../config/axiosClient";
import configs from "../config";

const withAuthProtect = (Component) => {
  return function AuthProtected(props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await Client.get(
            `${configs.backendBaseURL}/hoc/user`
          );
          
          if (response.data?.data?.user) {
            router.replace("/account/account-settings");
          }
        } catch (error) {
          setLoading(false);
        }
      };

      checkAuth();
    }, [router]);

    if (loading) {
      return (
        <div className="hoc_loading_page pb-[100px] pt-[120px] lg:pt-[150px]">
          <Loader show />
        </div>
      );
    }

    return <Component {...props} />;
  };
};

export default withAuthProtect;
