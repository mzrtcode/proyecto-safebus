import React, { useEffect, useState } from 'react';
import styles from './DropDownMenu.module.css';
const countries = [
    { id: 1, name: "Popayán" },
    { id: 2, name: "Santander de Quilichao" },
    { id: 3, name: "Cali" },
    { id: 4, name: "Patía" },
    { id: 5, name: "Guapi" },
    { id: 6, name: "Piendamó" },
    { id: 7, name: "Puerto Tejada" },
    { id: 8, name: "Silvia" },
    { id: 9, name: "Timbío" },
    { id: 10, name: "Cajibío" },
    { id: 11, name: "Miranda" },
    { id: 12, name: "Sotará" },
    { id: 13, name: "Páez" },
    { id: 14, name: "Santander de Quilichao" },
    { id: 15, name: "El Tambo" },
    { id: 16, name: "Almaguer" },
    { id: 17, name: "Santander de Quilichao" },
    { id: 18, name: "El Bordo" },
    { id: 19, name: "Santander de Quilichao" },
    { id: 20, name: "Corinto" }
  ];

const DropDownMenu: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>('Selecciona un pais');
  const [searchedCountry, setSearchedCountry] = useState<string>("");
  const [isDropdownActive, setDropdownActive] = useState<boolean>(false);

  function addCountry(selectedCountry: string) {
    return filteredCountries.map(country => {
      const isSelected = country.name === selectedCountry ? "selected" : "";
      // Adding country to the list
      return (
        <li
          key={country.id}
          onClick={() => updateName(country.name)}
          className={isSelected}
        >
          {country.name}
        </li>
      );
    });
  }

  function updateName(selectedLi: string) {
    setSearchedCountry("");
    setSelectedCountry(selectedLi);
    setDropdownActive(false);
  }

  function handleSearchInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setSearchedCountry(value.toLowerCase());
  }

  const filteredCountries = countries.filter(data =>
    data.name.toLowerCase().startsWith(searchedCountry)
  );


  return (
    <div className={`${styles.wrapper}${isDropdownActive ? ` ${styles.active}` : ''}`} id=''>
      <div className={styles.selectBtn} onClick={() => setDropdownActive(prev => !prev)}>
        <span>{selectedCountry}</span>
        <i className='bx bxs-chevron-down'></i>
      </div>
      <div className={styles.content}>
        <div className={styles.search}>
          <i className='bx bx-search'></i>
          <input
            type="text"
            placeholder="Buscar"
            value={searchedCountry}
            onChange={handleSearchInputChange}
          />
        </div>
        <ul className={styles.options}>
          {filteredCountries.length ? addCountry(selectedCountry) : <p>Oops! country not found</p>}
        </ul>
      </div>
    </div>
  );
};

export default DropDownMenu;
