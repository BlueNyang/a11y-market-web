import { useState } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/_needAuth/_mypage/mypage/editProfile')({
  component: RouteComponent,
});

function RouteComponent() {
  
  const initialData = {
    userName: '홍길동',
    userEmail: 'hong@example.com',
    userPhone: '010-1234-5678',
    userNickname: '길동이',
  };

  const [form, setForm] = useState(initialData);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert('변경사항이 저장되었습니다');
  };

  const handleCancel = () => {
    setForm(initialData);
    alert('변경사항이 취소되었습니다');
  };

  return (
    <div className='mx-auto w-full max-w-3xl px-4 py-10 font-kakao-big'>
      <h1 className='mb-8 text-2xl font-bold'>회원정보 수정</h1>

      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className='w-40 bg-gray-50 font-medium'>이름</TableCell>
              <TableCell>
                <Input
                  name='userName'
                  value={form.userName}
                  onChange={handleChange}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className='w-40 bg-gray-50 font-medium'>
                이메일
              </TableCell>
              <TableCell>
                <Input
                  name='userEmail'
                  value={form.userEmail}
                  onChange={handleChange}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className='w-40 bg-gray-50 font-medium'>
                전화번호
              </TableCell>
              <TableCell>
                <Input
                  name='userPhone'
                  value={form.userPhone}
                  onChange={handleChange}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className='w-40 bg-gray-50 font-medium'>
                닉네임
              </TableCell>
              <TableCell>
                <Input
                  name='userNickname'
                  value={form.userNickname}
                  onChange={handleChange}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      <div className='mt-8 flex justify-end gap-3'>
        <Button variant='outline' className='px-6' onClick={handleCancel}>
          취소하기
        </Button>
        <Button
          className='bg-black px-6 text-white hover:bg-gray-700'
          onClick={handleSave}
        >
          저장하기
        </Button>
      </div>
    </div>
  );
}
