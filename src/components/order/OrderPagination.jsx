import { Button } from '../ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

export default function OrderPagination({ currentPage, totalPages, onPageChange }) {
  // 이전 페이지로
  const handlePrev = () => {
    const prevPage = Math.max(currentPage - 1, 1);
    onPageChange(prevPage);
  };

  // 다음 페이지로
  const handleNext = () => {
    const nextPage = Math.min(currentPage + 1, totalPages);
    onPageChange(nextPage);
  };

  return (
    <Card>
        <CardContent className='flex items-center justify-center gap-4 pt-4'>
      <Button
        variant='outline'
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        이전
      </Button>

      <Badge
        variant='secondary'
        className='px-4 py-1'
      >
        {currentPage} / {totalPages}
      </Badge>

      <Button
        variant='outline'
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        다음
      </Button>
      </CardContent>
    </Card>
  );
}
