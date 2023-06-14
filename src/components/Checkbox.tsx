import  { useState } from 'react';
import styles from './checkbox.module.css';

interface CheckboxProps {
  initialState: boolean;
  onToggle: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ initialState, onToggle }) => {
  const [checked, setChecked] = useState<boolean>(initialState);

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
        id="switch"
        checked={checked}
        onChange={handleChange}
      />
      <label className={styles['switch-label']} htmlFor="switch">Toggle</label>
    </>
  );
};



export default Checkbox;