import { LoginButton } from "@telegram-auth/react";
import { useState } from "react";

// A simple loader component (you can replace with your own, e.g., from a UI library)
const Loader = () => (
  <div className="flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const TelegramLogin = ({ onAuth, botName }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="flex items-center justify-center">
        <LoginButton
          botUsername={botName}
          onAuthCallback={onAuth}
          buttonSize="large" // "large" | "medium" | "small"
          cornerRadius={30}
          showAvatar={true} // true | false
          lang="en"
        />
    </div>
  );
};

export default TelegramLogin;
