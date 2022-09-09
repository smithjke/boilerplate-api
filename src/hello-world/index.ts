import * as di from './di';
import * as plugin from './plugin';
import * as service from './service';

export default {
  ...di,
  ...plugin,
  ...service,
};
