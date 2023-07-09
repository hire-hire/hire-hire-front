import { ChangeEvent, FC, useState } from 'react';
import { Category, SubCategory } from 'store/reducers/categories/categoriesActionCreator';

type PropsType = {
  disabled: boolean
  value: string
  label: string
  arr?: Category[] | SubCategory[]
  title: string
  onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void
}

const Select: FC<PropsType> = ({ label, arr, title, onChange, value, disabled }) => {

  const [selectedOption, setSelectedOption] = useState('');

  const handleSelect = (e: any) => {
    setSelectedOption(e.target.value);
  };

  return (
    <label className='label page__text'>
      {label}
      <select
        required
        disabled={disabled}
        value={value}
        onChange={onChange}
        name={title}
        className='select page__text'>
        <option
          value=''
          className='select__option'
          disabled
        >
          {label}
        </option>
        {
          arr?.map((item) => {
            return (
              <option
                key={item.id}
                onClick={handleSelect}
                value={item.title}
                className='select__option'>
                {item.title}
              </option>
            )
          })
        }
      </select>
    </label>
  )
};

export default Select;