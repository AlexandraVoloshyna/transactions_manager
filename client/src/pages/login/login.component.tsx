import { AuthorizationForm } from '@/components/autorizationForm';
import { useLoginMutation } from '@/hooks';

export const LoginPage = () => {
  const { mutateAsync: login } = useLoginMutation();
  return (
    <div>
      <AuthorizationForm mutation={data => login(data)} isLogin />
    </div>
  );
};
