import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { current } from '@reduxjs/toolkit';
import { createFileRoute } from '@tanstack/react-router';
import { useRef, useState } from 'react';

export const Route = createFileRoute('/_auth/auth/oauth-signup')({
  component: RouteComponent,
});

const steps = [
  {
    id: 'email',
    label: '이메일',
    placeholder: 'example@email.com',
    type: 'email',
    description: '로그인에 사용할 이메일 주소를 입력해주세요.',
  },
  {
    id: 'name',
    label: '이름',
    placeholder: '홍길동',
    type: 'text',
    description: '실명을 입력해주세요.',
  },
  {
    id: 'nickname',
    label: '닉네임',
    placeholder: '길동이',
    type: 'text',
    description: '다른 사용자에게 보여질 닉네임을 입력해주세요.',
  },
  {
    id: 'phone',
    label: '휴대폰 번호',
    placeholder: '010-1234-5678',
    type: 'tel',
    description: '본인 확인을 위해 휴대폰 번호를 입력해주세요.',
  },
];

function RouteComponent() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    nickname: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && !isCompleted) {
      inputRef.current.focus();
    }
  }, [currentStep, isCompleted]);

  const currentField = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const validateField = (field, value) => {
    switch (field) {
      case 'email':
        if (!value) return '이메일을 입력해주세요';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return '올바른 이메일 형식이 아닙니다';
        }
        return null;
      case 'name':
        if (!value) return '이름을 입력해주세요';
        if (value.length < 2) return '이름은 2자 이상이어야 합니다';
        return null;
      case 'nickname':
        if (!value) return '닉네임을 입력해주세요';
        if (value.length < 2) return '닉네임은 2자 이상이어야 합니다';
        return null;
      case 'phone':
        if (!value) return '휴대폰 번호를 입력해주세요';
        if (!/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/.test(value.replace(/-/g, ''))) {
          return '올바른 휴대폰 번호 형식이 아닙니다';
        }
        return null;
      default:
        return null;
    }
  };

  const handleNext = () => {
    const error = validateField(currentField.id, formData[currentField.id]);
    if (error) {
      setErrors((prev) => ({ ...prev, [currentField.id]: error }));
      return;
    }

    setErrors((prev) => ({ ...prev, [currentField.id]: null }));

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  return (
    <main className='min-h-screen bg-neutral-200'>
      <FieldGroup>
        <FieldSet>
          <Field>
            <FieldLabel>이메일</FieldLabel>
            <Input
              type='email'
              name='email'
              className='bg-white'
              required
            />
          </Field>
        </FieldSet>
      </FieldGroup>
    </main>
  );
}
