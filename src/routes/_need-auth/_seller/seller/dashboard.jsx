import { DashboardDailyRevenue } from '@/components/seller/dashboard-daily-revenue';
import { DashboardStatSection } from '@/components/seller/dashboard-stat-section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

/** /seller/dashboard : 판매자 대시보드 */
export const Route = createFileRoute('/_need-auth/_seller/seller/dashboard')({
  component: SellerDashboardPage,
});

/** 요약 정보 목데이터 (나중에 API 연동) */
const MOCK_DASHBOARD = {
  totalSales: 3564000,
  totalOrders: 142,
  totalProductsSold: 512,
  totalCancelled: 7,
  recentOrders: [
    { id: 'O-4532', product: '저염 갓김치 500g', price: 8900, status: '결제완료' },
    { id: 'O-4533', product: '접이식 지팡이', price: 15900, status: '배송중' },
    { id: 'O-4534', product: '무설탕 건강즙', price: 12900, status: '배송완료' },
  ],
};

/** 판매 상위 상품 목데이터 */
const MOCK_TOP_PRODUCTS = [
  { name: '저염 갓김치 500g', sold: 120 },
  { name: '접이식 지팡이', sold: 95 },
  { name: '무설탕 건강즙', sold: 80 },
  { name: '확대 독서용 돋보기', sold: 54 },
];

function SellerDashboardPage() {
  const data = MOCK_DASHBOARD;

  const topProducts = MOCK_TOP_PRODUCTS;

  const format = (number) => new Intl.NumberFormat('ko-KR').format(number);

  return (
    <main className='font-kakao-big-sans mx-auto max-w-6xl px-4 py-8'>
      {/* 헤더 */}
      <section className='mb-10 flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>판매자 대시보드</h1>
          <p className='text-muted-foreground mt-1 text-sm'>
            내 판매 정보를 한눈에 확인할 수 있습니다.
          </p>
        </div>
      </section>

      {/* 요약 카드 */}
      <DashboardStatSection />

      {/* 기간 필터 + 매출 추이 차트 */}
      <DashboardDailyRevenue />

      {/* 판매 상위 상품 Bar 차트 */}
      <section className='bg-card mb-10 rounded-2xl border p-4'>
        <div className='mb-3 flex items-center justify-between'>
          <h2 className='text-sm font-semibold'>판매 상위 상품</h2>
          <Badge
            variant='outline'
            className='text-[11px]'
          >
            판매 수량 기준
          </Badge>
        </div>

        <div className='h-64'>
          <ResponsiveContainer
            width='100%'
            height='100%'
          >
            <BarChart
              data={topProducts}
              margin={{ top: 10, right: 20, left: 0, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis
                dataKey='name'
                tick={{ fontSize: 11 }}
                interval={0}
                angle={-20}
                textAnchor='end'
              />
              <YAxis />
              <Tooltip
                formatter={(value) => `${format(value)}개`}
                labelFormatter={(label) => `상품: ${label}`}
              />
              <Bar
                dataKey='sold'
                fill='#4b5563'
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* 하단: 최근 주문 / 빠른 작업 */}
      <div className='grid gap-8 lg:grid-cols-2'>
        <Card className='rounded-2xl'>
          <CardHeader>
            <CardTitle className='text-base'>최근 주문</CardTitle>
          </CardHeader>
          <CardContent>
            {data.recentOrders.map((order) => (
              <div
                key={order.id}
                className='flex items-center justify-between border-b py-3 last:border-none'
              >
                <div>
                  <p className='text-sm font-medium'>{order.product}</p>
                  <p className='text-muted-foreground text-xs'>주문번호: {order.id}</p>
                </div>

                <div className='text-right'>
                  <p className='font-medium'>{format(order.price)}원</p>
                  <Badge
                    variant='outline'
                    className='mt-1'
                  >
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}

            <div className='mt-4 text-right'>
              <Button
                asChild
                size='sm'
                variant='outline'
              >
                <Link to='/seller/orders'>전체 주문 보기</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className='rounded-2xl'>
          <CardHeader>
            <CardTitle className='text-base'>빠른 작업</CardTitle>
          </CardHeader>
          <CardContent className='grid gap-3'>
            <Button
              asChild
              className='w-full justify-start'
              variant='outline'
            >
              <Link to='/seller/products/new'>상품 등록하기</Link>
            </Button>

            <Button
              asChild
              className='w-full justify-start'
              variant='outline'
            >
              <Link to='/seller/products'>내 상품 관리</Link>
            </Button>

            <Button
              asChild
              className='w-full justify-start'
              variant='outline'
            >
              <Link to='/seller/claims'>취소/반품 관리</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
