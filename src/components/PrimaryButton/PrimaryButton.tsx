import React from 'react';

export interface PrimaryButtonProps {
  onClick: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  variant?: 'white' | 'violet' | 'grey' | undefined;
  title: string;
  customClass?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onClick,
  disabled,
  type,
  variant,
  title,
  customClass,
}) => {
  const renderClassByVariant = () => {
    switch (variant) {
      case 'white':
        return 'primary-button_variant_white';
      case 'violet':
        return 'primary-button_variant_violet';
      case 'grey':
        return 'primary-button_variant_grey';
      default:
        break;
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type || 'button'}
      className={`primary-button ${customClass} ${renderClassByVariant()}`}
    >
      {title}
    </button>
  );
};

export default PrimaryButton;
