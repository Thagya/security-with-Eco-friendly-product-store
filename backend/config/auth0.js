const auth0Config = {
  domain: process.env.AUTH0_DOMAIN,
  audience: process.env.AUTH0_AUDIENCE || 'watch-store-api',
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
};

// Validate Auth0 configuration
const validateAuth0Config = () => {
  const requiredFields = ['domain', 'clientId', 'clientSecret'];
  const missing = requiredFields.filter(field => !auth0Config[field]);
  
  if (missing.length > 0) {
    throw new Error(`Missing Auth0 configuration: ${missing.join(', ')}`);
  }
  
  console.log('🔐 Auth0 configuration validated');
  return true;
};

module.exports = {
  auth0Config,
  validateAuth0Config
};
