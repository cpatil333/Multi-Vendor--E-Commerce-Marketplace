export default function isAuth(user) {
  if (!user) {
    throw new Error("Unathorized!");
  }
}
