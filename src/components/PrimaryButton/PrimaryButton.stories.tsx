import PrimaryButton from './PrimaryButton';
import { PrimaryButtonProps } from './PrimaryButton';

export default {
  title: 'UI-Kit/PrimaryButton',
  component: PrimaryButton,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: 'components > PrimaryButton',
    layout: 'centered',
  },

  args: {
    onClick: () => {},
    disabled: false,
    title: 'Button',
    customClass: '',
  },
  argTypes: {
    customClass: {
        description: 'Optional string value'
    },
    onClick: {
        description: 'Click handler'
    },
  }
};

export const Variants = (props: PrimaryButtonProps) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <PrimaryButton {...props} variant='white' />
    <PrimaryButton {...props} variant='violet' />
  </div>
);
