/**
 * Middleware to disable caching for sensitive routes
 * Prevents 304 Not Modified responses by forcing fresh data fetch
 */
export const noCache = (req, res, next) => {
  res.set("Cache-Control", "no-cache, no-store, must-revalidate, private");
  res.set("Expires", "0");
  res.set("Pragma", "no-cache");
  res.set("Surrogate-Control", "no-store");
  
  next();
};
