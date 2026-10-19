import * as migration_20261018_233228_initial from './20261018_233228_initial';
import * as migration_20261019_010909_blob_storage_fields from './20261019_010909_blob_storage_fields';

export const migrations = [
  {
    up: migration_20261018_233228_initial.up,
    down: migration_20261018_233228_initial.down,
    name: '20261018_233228_initial',
  },
  {
    up: migration_20261019_010909_blob_storage_fields.up,
    down: migration_20261019_010909_blob_storage_fields.down,
    name: '20261019_010909_blob_storage_fields'
  },
];
