function requireAuth(session): boolean {
  return session.user !== ""
}

export default requireAuth