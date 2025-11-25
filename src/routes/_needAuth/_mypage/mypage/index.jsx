import axiosInstance from '@/api/axiosInstance';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

export const Route = createFileRoute('/_needAuth/_mypage/mypage/')({
  component: RouteComponent,
});

function RouteComponent() {
  const orderMenuItems = [
    { label: '전체', path: '/mypage/orders' },
    { label: '배송중', path: '/mypage/orders/shipping' },
    { label: '배송완료', path: '/mypage/orders/completed' },
    { label: '취소/환불', path: '/mypage/orders/canceled' },
  ];

  const [userInfo, setUserInfo] = useState({});
  const [orderList, setOrderList] = useState([]);
  const [activeOrderMenu, setActiveOrderMenu] = useState(orderMenuItems[0].path);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const resp = await axiosInstance.get('/v1/users/me');
      setUserInfo(resp.data);
    })();

    (async () => {
      const resp = await axiosInstance.get('/v1/users/me/orders');
      setOrderList(resp.data);
      // setOrderList([]);
    })();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center'>
      <section className='w-full py-16'>
        <div className='flex items-center justify-evenly'>
          <div className='flex items-center gap-8'>
            <Avatar
              alt='프로필 이미지'
              className='size-24 bg-neutral-200'
            />
            <div className='flex flex-col gap-2'>
              <h1 className='text-4xl font-bold'>{userInfo.userNickname}</h1>
              <p className='text-lg'>환영합니다, {userInfo.userNickname}!</p>
            </div>
          </div>
          <Button
            className='ml-8 px-12 py-6 text-lg font-bold'
            onClick={() => navigate({ to: '/mypage/profile/edit' })}
          >
            프로필 수정
          </Button>
        </div>
      </section>
      <section className='flex w-full flex-col gap-4 bg-neutral-300 px-8 pt-8'>
        <h2 className='text-3xl font-bold text-neutral-800'>주문 내역</h2>
        <div className='hidden w-full flex-row items-center justify-center rounded-md border border-neutral-300 bg-white px-4 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 xl:flex 2xl:w-xl dark:border-neutral-600 dark:bg-neutral-700 dark:focus-within:border-blue-400 dark:focus-within:ring-blue-400'>
          <input
            type='text'
            placeholder='검색어를 입력하세요'
            className='h-full flex-1 bg-transparent text-xl outline-none'
            aria-label='검색어 입력'
          />
          <Link
            to='/search'
            className='ml-2 text-neutral-600 hover:text-blue-500 dark:text-neutral-300 dark:hover:text-blue-400'
            aria-label='검색하기 버튼'
          >
            <Icon
              icon='mdi:magnify'
              width={20}
              height={20}
            />
          </Link>
        </div>
        <nav className='flex w-full'>
          {orderMenuItems.map((item) => {
            const isActive = activeOrderMenu === item.path;
            return (
              <Button
                key={item.path}
                variant='ghost'
                className={`relative rounded-md px-8 py-5 text-lg font-medium transition-colors hover:bg-transparent ${isActive ? 'text-neutral-900' : 'text-neutral-600 hover:text-neutral-900'} `}
                onClick={() => setActiveOrderMenu(item.path)}
              >
                {isActive && (
                  <motion.span
                    layoutId='order-menu-active-bg'
                    className='absolute inset-0 border-b-4 border-neutral-900'
                    style={{ zIndex: 0 }}
                    transition={{ type: 'spring', stiffness: 530, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${isActive ? 'font-bold' : ''}`}>{item.label}</span>
              </Button>
            );
          })}
        </nav>
      </section>
      <section className='flex w-full flex-1 flex-col p-8'>
        {orderList.length === 0 ? (
          <div className='flex flex-1 flex-col items-center justify-center gap-4'>
            <Empty>
              <EmptyHeader>
                <EmptyMedia variant='icon'>
                  <Icon
                    icon='mdi:clipboard-text-history'
                    className='size-16'
                  />
                </EmptyMedia>
                <EmptyTitle className='text-3xl font-bold'>주문내역이 없습니다.</EmptyTitle>
                <EmptyDescription className='text-lg'>
                  아직 주문 내역이 없습니다. 마음에 드는 상품을 골라 주문해보세요!
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <div className='flex gap-4'>
                  <Button
                    variant='default'
                    className='h-10 w-40 text-lg font-bold'
                    onClick={() => {
                      navigate({ to: '/products' });
                    }}
                  >
                    쇼핑하러 가기
                  </Button>
                  <Button
                    variant='outline'
                    className='h-10 w-40 text-lg font-bold'
                    onClick={() => {
                      navigate({ to: '/' });
                    }}
                  >
                    메인으로
                  </Button>
                </div>
              </EmptyContent>
            </Empty>
          </div>
        ) : (
          <div className='flex flex-col gap-4'>
            {orderList?.map((order) => (
              <div
                key={order.orderId}
                className='flex flex-col rounded-md border border-neutral-300 bg-white p-4 shadow-sm'
              >
                <span>주문내역1</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
