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
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    id: uniqueId(),
    title: 'Manage food',
    icon: IconBook,
    href: '/manage-book',
  },
  // {
  //   id: uniqueId(),
  //   title: 'Loại sách',
  //   icon: IconBookmark,
  //   href: '/manage-genre',
  // },
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
  // {
  //   id: uniqueId(),
  //   title: 'Nhân viên',
  //   icon: IconUser,
  //   href: '/manage-staff',
  // },
  // {
  //   id: uniqueId(),
  //   title: 'Người dùng',
  //   icon: IconUserCircle,
  //   href: '/manage-user',
  // },
];

export default Menuitems;
