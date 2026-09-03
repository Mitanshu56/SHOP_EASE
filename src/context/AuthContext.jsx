import { createContext, useEffect, useReducer } from "react";

const AuthContext = createContext(null);

const initialState = {
  user: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };

    case "LOGOUT":
      return {
        ...state,
        user: null,
      };

    case "RESTORE_SESSION":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      dispatch({
        type: "RESTORE_SESSION",
        payload: JSON.parse(savedUser),
      });
    }
  }, []);

  const login = (user) => {
    dispatch({
      type: "LOGIN",
      payload: user,
    });

    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    localStorage.removeItem("user");

    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
