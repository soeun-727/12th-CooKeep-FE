// // src/apis/auth.api.ts
// import api from "";
// import { getRefreshToken, saveTokens } from "";

// export async function refreshAccessToken() {
//   const refreshToken = getRefreshToken();

//   if (!refreshToken) {
//     throw new Error("No refresh token");
//   }

//   const res = await api.post("/auth/refresh", {
//     refreshToken,
//   });

//   const newAccessToken = res.data.data.accessToken;

//   saveTokens({
//     accessToken: newAccessToken,
//     refreshToken,
//   });

//   return newAccessToken;
// }
