import OrderStatusBadge from './OrderStatusBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function OrderCard({ order }) {
  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between'>
        <CardTitle className='text-base'>주문번호: {order.orderId}</CardTitle>

        <OrderStatusBadge status={order.OrderStatus} />
      </CardHeader>

      <CardContent className='space-y-2 text-sm'>
        <p>수령인: {order.receiverName}</p>
        <p>연락처: {order.receiverPhone}</p>
        <p>주소: {order.receiverAddr1} {order.receiverAddr2} ({order.receiverZipcode})</p>
        <p>주문일: {new Date(order.createdAt).toLocaleString()}</p>
        <p className='pt-2 font-semibold'>총 금액: {order.totalPrice.toLocaleString()}원</p>
      </CardContent>

      <CardFooter className='flex justify-end'>
        <Button variant='outline'>
            상세보기
        </Button>
      </CardFooter>
    </Card>
  );
}
