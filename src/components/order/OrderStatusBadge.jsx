import { Badge } from '@/components/ui/badge';

const statusvariant = {
  PENDING: 'secondary',
  PAID: 'default',
  SHIPPING: 'outline',
  DELIVERED: 'success',
  CANCELLED: 'destructive',
};

export default function OrderStatusBadge({ status }) {
  const style = statusStyle[status] || 'secondary';

  return <Badge variant={variant}>{status}</Badge>;
}
