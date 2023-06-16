import React, { useEffect, useState } from 'react';
import styles from './checkbox.module.css';

interface CheckboxProps {
  initialState: boolean;
  onToggle: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ initialState, onToggle }) => {
  const [checked, setChecked] = useState<boolean>(initialState);
  const [id, setId] = useState<string>('');

  useEffect(() => {
    const uniqueId = `checkbox-${Math.random().toString(36).substr(2, 9)}`;
    setId(uniqueId);
  }, []);

  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    onToggle();
  };

  return (
    <>
      <input
        className={styles.switch}
        type="checkbox"
        id={id}
        checked={checked}
        onChange={handleChange}
      />
      <label className={styles['switch-label']} htmlFor={id}>Toggle</label>
    </>
  );
};

export default Checkbox;
