import { Navigate, Outlet } from "react-router-dom";
import { useJwt } from "react-jwt";
import { useSelector } from "react-redux";

/* eslint-disable */

export const LoggedInGuard = () => {
  const token = useSelector((state) => state.user.value.token);
  if (token) {
    const { decodedToken, isExpired } = useJwt(
      token,
      process.env.REACT_APP_SECRET_KEY
    );

    if (!decodedToken && isExpired) {
      return <Navigate to="/login" />;
    } else {
      return <Navigate to="/dashboard/home" />;
    }
  } else {
    return <Navigate to="/login" />;
  }
  /* eslint-enable */
};
