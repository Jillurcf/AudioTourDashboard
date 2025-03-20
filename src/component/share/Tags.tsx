import React, { useState, useRef, useEffect } from 'react';
import { Input, Tag } from 'antd';
import type { InputRef } from 'antd';
import { useAddCategoriesMutation } from '../../redux/features/postAddCategories';

interface TagsProps {
  tags: string[];
  handleAddNewCategory: (newCategory: string) => void;
  handleClose: (removedTag: string) => void;
  inputVisible: boolean;
  setInputVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Tags: React.FC<TagsProps> = ({
  tags,
  handleAddNewCategory,
  handleClose,
  inputVisible,
  setInputVisible,
}) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const [addCategories] = useAddCategoriesMutation();

  useEffect(() => {
    if (inputVisible && inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputVisible]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = async () => {
    if (inputValue) {
      handleAddNewCategory(inputValue);
      try {
        const response = await addCategories({ category_name: inputValue });
        console.log('Category added', response);
      } catch (error) {
        console.error('Failed to add category:', error);
      }
    }
    setInputVisible(false);
    setInputValue('');
  };

  return (
    <div>
      {tags.map((tag, index) => (
        <Tag
          key={index}
          closable
          onClose={() => handleClose(tag)}
          className="mb-2 px-4 py-2 bg-gray-200 rounded-xl"
        >
          {tag}
        </Tag>
      ))}
      {inputVisible && (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={{ width: 100 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      )}
    </div>
  );
};

export default Tags;
