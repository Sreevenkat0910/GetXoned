// Clerk-based admin authorization
// Strategy: Check Clerk user public metadata or org roles. Here we use publicMetadata.role === 'admin'.
const adminAuth = async (req, res, next) => {
    try {
        const { auth } = req
        if (!auth || !auth.userId) {
            return res.status(401).json({ success: false, message: 'Not authorized' })
        }
        // Clerk injects claims into req.auth.claims (if using JWTs from frontend)
        // Expect role to be set in publicMetadata.role
        const role = req?.auth?.claims?.metadata?.public?.role || req?.auth?.claims?.role
        if (role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Forbidden' })
        }
        return next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({ success: false, message: 'Not authorized' })
    }
}

export default adminAuth