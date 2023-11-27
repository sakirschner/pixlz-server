import { authSchemas, authSchemasRef } from './auth.schema';
import { userSchemas, userSchemasRef } from './user.schema';

const appSchemas = [...authSchemas, ...userSchemas];

export { appSchemas, authSchemasRef, userSchemasRef };
