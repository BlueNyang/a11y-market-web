// src/routes/cart.jsx
import React, { useEffect, useState } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import axiosInstance from '@/api/axiosInstance';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';

function CartPage() {
  const [cartGroups, setCartGroups] = useState([]);

  const navigate = useNavigate();

  // --- 체크박스 & 수량 변경 로직 ---

  useEffect(() => {
    const fetchCartData = async () => {
      const resp = await axiosInstance.get('/v1/cart/me');
      console.log('Cart data fetched:', resp.data);

      // setCartGroups(resp.data);
      console.log('Cart groups set:', resp.data);
    };

    fetchCartData();
  }, []);

  if (cartGroups.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant='icon'>
            <Icon
              icon='mdi:cart'
              className='h-8 w-8'
            />
          </EmptyMedia>
          <EmptyTitle>장바구니가 비어있습니다.</EmptyTitle>
          <EmptyDescription>
            아직 장바구니에 담긴 상품이 없습니다. 마음에 드는 상품을 담아보세요!
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className='flex gap-2'>
            <Button
              variant='default'
              onClick={() => {
                navigate({ to: '/products' });
              }}
            >
              쇼핑하러 가기
            </Button>
            <Button
              variant='outline'
              onClick={() => {
                navigate({ to: '/' });
              }}
            >
              메인으로
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    );
  }
  return <div>Cart Page - 장바구니 아이템이 있습니다.</div>;
}

// TanStack Router – /cart 경로
export const Route = createFileRoute('/_needAuth/cart/')({
  component: CartPage,
});
