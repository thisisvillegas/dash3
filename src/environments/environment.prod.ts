import config from '../../auth_config.json';

const { domain, clientId, audience, apiUri, appUri, errorPath } = config as {
  domain: string;
  clientId: string;
  audience?: string;
  apiUri: string;
  appUri: string;
  errorPath: string;
};

export const environment = {
  production: true,
  appUri: appUri,
  auth: {
    domain,
    clientId,
    ...(audience && audience !== "YOUR_API_IDENTIFIER" ? { audience } : null),
    redirectUri: window.location.origin,
    errorPath,
  },
  httpInterceptor: {
    allowedList: [`${apiUri}/*`],
  },
};
