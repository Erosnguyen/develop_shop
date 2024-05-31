import {
  IconArrowsExchange,
  IconBook,
  IconBookmark,
  IconClipboardList,
  IconLayoutDashboard,
  IconUser,
  IconUserCircle,
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    id: uniqueId(),
    title: 'Manage food',
    icon: IconBook,
    href: '/manage-food',
  },
  {
    id: uniqueId(),
    title: 'Orders',
    icon: IconBookmark,
    href: '/manage-orders',
  },
  // {
  //   id: uniqueId(),
  //   title: 'Mượn trả sách',
  //   icon: IconArrowsExchange,
  //   href: '/manage-borrow-book',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Thẻ Food',
  //   icon: IconClipboardList,
  //   href: '/manage-card',
  // },
  // {
  //   navlabel: true,
  //   subheader: 'Hệ thống',
  // },
  {
    id: uniqueId(),
    title: 'User',
    icon: IconUser,
    href: '/manage-user',
  },
  // {
  //   id: uniqueId(),
  //   title: 'Người dùng',
  //   icon: IconUserCircle,
  //   href: '/manage-user',
  // },
];

export default Menuitems;
