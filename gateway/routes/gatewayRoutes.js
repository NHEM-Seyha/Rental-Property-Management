const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const {
  authenticateToken,
  authorizeRoles
} = require("../middleware/authMiddleware");

const router = express.Router();

const registrationService = process.env.REGISTRATION_SERVICE;
const loginService = process.env.LOGIN_SERVICE;
const propertyRoomService = process.env.PROPERTY_ROOM_SERVICE;
const rentalPaymentService = process.env.RENTAL_PAYMENT_SERVICE;

// ==========================================
// PUBLIC ROUTES
// ==========================================

// Registration
router.use(
  "/register",
  createProxyMiddleware({
    target: registrationService,
    changeOrigin: true,
    pathRewrite: {
      "^/": "/register/register"
    }
  })
);

// Login
router.use(
  "/login",
  createProxyMiddleware({
    target: loginService,
    changeOrigin: true,
    pathRewrite: {
      "^/": "/auth/login"
    }
  })
);
// ==========================================
// PROPERTY ROUTES
// ==========================================

// GET properties
router.get(
  "/properties",
  authenticateToken,
  authorizeRoles("Manager", "Tenant"),
  createProxyMiddleware({
    target: propertyRoomService,
    changeOrigin: true
  })
);

// GET property by ID
router.get(
  "/properties/:id",
  authenticateToken,
  authorizeRoles("Manager", "Tenant"),
  createProxyMiddleware({
    target: propertyRoomService,
    changeOrigin: true
  })
);

// POST property - Manager only
router.post(
  "/properties",
  authenticateToken,
  authorizeRoles("Manager"),
  createProxyMiddleware({
    target: propertyRoomService,
    changeOrigin: true
  })
);

// PUT property - Manager only
router.put(
  "/properties/:id",
  authenticateToken,
  authorizeRoles("Manager"),
  createProxyMiddleware({
    target: propertyRoomService,
    changeOrigin: true
  })
);

// DELETE property - Manager only
router.delete(
  "/properties/:id",
  authenticateToken,
  authorizeRoles("Manager"),
  createProxyMiddleware({
    target: propertyRoomService,
    changeOrigin: true
  })
);

// ==========================================
// ROOM ROUTES
// ==========================================

// GET all rooms
router.get(
  "/rooms",
  authenticateToken,
  authorizeRoles("Manager", "Tenant"),
  createProxyMiddleware({
    target: propertyRoomService,
    changeOrigin: true
  })
);

// GET room by ID
router.get(
  "/rooms/:id",
  authenticateToken,
  authorizeRoles("Manager", "Tenant"),
  createProxyMiddleware({
    target: propertyRoomService,
    changeOrigin: true
  })
);

// POST room - Manager only
router.post(
  "/rooms",
  authenticateToken,
  authorizeRoles("Manager"),
  createProxyMiddleware({
    target: propertyRoomService,
    changeOrigin: true
  })
);

// PUT room - Manager only
router.put(
  "/rooms/:id",
  authenticateToken,
  authorizeRoles("Manager"),
  createProxyMiddleware({
    target: propertyRoomService,
    changeOrigin: true
  })
);

// DELETE room - Manager only
router.delete(
  "/rooms/:id",
  authenticateToken,
  authorizeRoles("Manager"),
  createProxyMiddleware({
    target: propertyRoomService,
    changeOrigin: true
  })
);

// ==========================================
// RENTAL ROUTES
// ==========================================

// GET all rentals
// Manager sees all.
// Tenant sees only their own.
router.get(
  "/rentals",
  authenticateToken,
  authorizeRoles("Manager", "Tenant"),
  (req, res, next) => {
    req.headers["x-user-id"] = req.user.id;
    req.headers["x-user-role"] = req.user.role;
    next();
  },
  createProxyMiddleware({
    target: rentalPaymentService,
    changeOrigin: true
  })
);

// GET rental by ID
// Manager can view any.
// Tenant can view only their own.
router.get(
  "/rentals/:id",
  authenticateToken,
  authorizeRoles("Manager", "Tenant"),
  (req, res, next) => {
    req.headers["x-user-id"] = req.user.id;
    req.headers["x-user-role"] = req.user.role;
    next();
  },
  createProxyMiddleware({
    target: rentalPaymentService,
    changeOrigin: true
  })
);

// POST rental - Tenant only
// Gateway passes verified tenant identity.
router.post(
  "/rentals",
  authenticateToken,
  authorizeRoles("Tenant"),
  (req, res, next) => {
    req.headers["x-user-id"] = req.user.id;
    req.headers["x-user-role"] = req.user.role;
    next();
  },
  createProxyMiddleware({
    target: rentalPaymentService,
    changeOrigin: true
  })
);

// PUT rental - Manager only
router.put(
  "/rentals/:id",
  authenticateToken,
  authorizeRoles("Manager"),
  createProxyMiddleware({
    target: rentalPaymentService,
    changeOrigin: true
  })
);

// DELETE rental - Manager only
router.delete(
  "/rentals/:id",
  authenticateToken,
  authorizeRoles("Manager"),
  createProxyMiddleware({
    target: rentalPaymentService,
    changeOrigin: true
  })
);

// ==========================================
// PAYMENT ROUTES
// ==========================================

// GET all payments
// Manager sees all.
// Tenant sees only their own.
router.get(
  "/payments",
  authenticateToken,
  authorizeRoles("Manager", "Tenant"),
  (req, res, next) => {
    req.headers["x-user-id"] = req.user.id;
    req.headers["x-user-role"] = req.user.role;
    next();
  },
  createProxyMiddleware({
    target: rentalPaymentService,
    changeOrigin: true
  })
);

// GET payment by ID
// Manager can view any.
// Tenant can view only their own.
router.get(
  "/payments/:id",
  authenticateToken,
  authorizeRoles("Manager", "Tenant"),
  (req, res, next) => {
    req.headers["x-user-id"] = req.user.id;
    req.headers["x-user-role"] = req.user.role;
    next();
  },
  createProxyMiddleware({
    target: rentalPaymentService,
    changeOrigin: true
  })
);

// POST payment - Tenant only
// Gateway passes verified tenant identity.
router.post(
  "/payments",
  authenticateToken,
  authorizeRoles("Tenant"),
  (req, res, next) => {
    req.headers["x-user-id"] = req.user.id;
    req.headers["x-user-role"] = req.user.role;
    next();
  },
  createProxyMiddleware({
    target: rentalPaymentService,
    changeOrigin: true
  })
);

// PUT payment - Manager only
router.put(
  "/payments/:id",
  authenticateToken,
  authorizeRoles("Manager"),
  createProxyMiddleware({
    target: rentalPaymentService,
    changeOrigin: true
  })
);

// DELETE payment - Manager only
router.delete(
  "/payments/:id",
  authenticateToken,
  authorizeRoles("Manager"),
  createProxyMiddleware({
    target: rentalPaymentService,
    changeOrigin: true
  })
);

module.exports = router;
