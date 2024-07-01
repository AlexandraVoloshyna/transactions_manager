import { AuthorizationForm } from '@/components/autorizationForm';
import { useRegisterMutation } from '@/hooks';

export const RegistrationPage = () => {
  const { mutateAsync: register } = useRegisterMutation();
  return (
    <div>
      <AuthorizationForm mutation={data => register(data)} isLogin={false} />
    </div>
  );
};
