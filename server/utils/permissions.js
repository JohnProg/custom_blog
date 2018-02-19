const roles = ['superAdmin', 'admin', 'moderator', 'regular', 'guest']

const permissions = [
  'DELETE_ADMIN_USER',
  'DELETE_MODERATOR_USER',
  'DELETE_REGULAR_USER',
  'VIEW_DRAFT_BLOG',
  'VIEW_ARCHIVED_BLOG',
  'VIEW_PUBLISHED_BLOG',
  'EDIT_OWN_DRAFTED_BLOG',
  'EDIT_OWN_ARCHIVED_BLOG',
  'EDIT_OWN_PUBLISHED_BLOG',
  'DRAFT_BLOG',
  'ARCHIVE_BLOG',
  'PUBLISH_BLOG',
  ''
];

const superAdmin = [
  'DELETE_ADMIN_USER',
  'DELETE_MODERATOR_USER',
  'DELETE_REGULAR_USER',
  'VIEW_DRAFT_BLOG',
  'VIEW_ARCHIVED_BLOG',
  'VIEW_PUBLISHED_BLOG',
  'EDIT_OWN_DRAFTED_BLOG',
  'EDIT_OWN_ARCHIVED_BLOG',
  'EDIT_OWN_PUBLISHED_BLOG',
  'DRAFT_BLOG',
  'ARCHIVE_BLOD',
  'PUBLISH_BLOG',
  ''
];

const admin = ['PUBLISH_BLOG'];
const moderator = ['PUBLISH_BLOG'];
const regular = ['PUBLISH_BLOG'];
const guest = ['VIEW_PUBLISHED_BLOG'];

export default {
  roles,
  permissions,
  superAdmin,
  admin,
  moderator,
  regular,
  guest
};
