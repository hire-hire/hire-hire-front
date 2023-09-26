import SuggestFormTextArea from './SuggestFormTextArea';
import './SuggestFormTextArea.css';
import { SuggestFormTextAreaProps } from './SuggestFormTextArea';

export default {
  title: 'UI-Kit/SuggestFormTextArea',
  component: SuggestFormTextArea,
  parameters: {
    componentSubtitle: 'Components > SuggestForm',
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    id: 'text',
    title: 'Вопрос',
    value: '',
    errors: '',
    disabled: false,
    placeholder: 'Введите вопрос',
    onChange: () => {},
    name: 'text',
    minLen: 5,
    maxLen: 500,
  },
  argTypes: {
    id: {
      description: 'htmlFor for label',
    },
    errors: {
      description: 'Object with Errors from useFormWithValidation',
      control: 'radio',
      options: [true, false],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export const Default = (args: SuggestFormTextAreaProps) => (
  <>
    <SuggestFormTextArea {...args} />
    <SuggestFormTextArea {...args} errors={'Заполните это поле'} />
  </>
);
