import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

const initialState = {
  users: [],
  currentUser: {},
  loading: false,
  error: "",
  auth: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const id = uuidv4();
      const hashedPassword = bcrypt.hashSync(
        action.payload.password,
        "$2a$10$CwTycUXWue0Thq9StjUM0u"
      );

      let newUser = { ...action.payload, id, password: hashedPassword };

      console.log(newUser);
      delete newUser.confirm_password;

      let newUserData = [...state.users, { ...newUser }];
      console.log(newUserData);

      state.auth = true;

      localStorage.setItem("users", JSON.stringify(newUserData));
    },
    AllUserData: (state, action) => {
      let usersDetails = JSON.parse(localStorage.getItem("users"));
      let currentUser = JSON.parse(localStorage.getItem("currentUser"));
      console.log(currentUser);
      if (!usersDetails) {
        localStorage.setItem("users", JSON.stringify([]));
        usersDetails = [];
      }
      if (!currentUser) {
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ auth: false, user: {} })
        );
        currentUser = {
          user: {},
          auth: false,
        };
      }
      // console.log("dhwdgwd" + JSON.stringify(currentUser));
      // console.log("dwduwdgywgdywddwwd" + state);
      // let dd = JSON.stringify(currentUser);
      // console.log(dd);
      state.users = usersDetails;
      state.currentUser = currentUser.user;
      state.auth = currentUser.auth;
    },

    login: (state, action) => {
      // Find the user with the provided email and set it as the currentUser.

      const user = state.users.find(
        (user) => user.email === action.payload.email
      );

      console.log("User found:", user);
      // console.log(user.password);
      // console.log(bcrypt.compareSync(action.payload.password));
      if (user && bcrypt.compareSync(action.payload.password, user.password)) {
        state.currentUser = { auth: true, user };
      }

      // if (user && user.password === action.payload.password) {
      //   state.currentUser = { auth: true, user };
      //   //console.log("User logged in:", user);
      // }

      localStorage.setItem(
        "currentUser",
        JSON.stringify({ auth: true, user: user })
      );
      state.auth = true;
    },

    updateUserPassword: (state, action) => {
      // Find the user by ID and update their password
      const { id, newPassword } = action.payload;
      const userIndex = state.users.findIndex((user) => user.id === id);

      if (userIndex !== -1) {
        state.users[userIndex].password = newPassword;
        localStorage.setItem("users", JSON.stringify(state.users));
      }
      state.auth = true;
    },

    updateUserProfile: (state, action) => {
      // Find the user by ID and update their profile data
      const { id, updatedData } = action.payload;
      // const userIndex = state.users.findIndex((user) => user.id === id);
      const data = state.users.map((user) => {
        return user.id === action.payload.id ? { ...action.payload } : user;
      });

      const updatedUserData = { auth: true, user: { ...action.payload } };
      localStorage.setItem("users", JSON.stringify(data));
      localStorage.setItem("currentUser", JSON.stringify(updatedUserData));
      state.currentUser = { ...action.payload };

      state.auth = true;
    },

    logout: (state) => {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ auth: false, user: {} })
      );
      console.log("logout");
    },
  },
});

export const {
  addUser,
  clearUser,
  login,
  logout,
  AllUserData,
  updateUserPassword,
  updateUserProfile,
} = AuthSlice.actions;
export default AuthSlice.reducer;
