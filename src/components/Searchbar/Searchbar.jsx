import propTypes from 'prop-types';
import { useState } from 'react';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  const [search, setSearch] = useState('');

  const handleChange = e => {
    setSearch(e.target.value.toLowerCase().trim());
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(search);
    setSearch('');
  };

  return (
    <header className={s.searchbar}>
      <form className={s.form} onSubmit={handleSubmit}>
        <button type="submit" className={s.button}>
          <span className={s.buttonLabel}>Search</span>
        </button>

        <input
          value={search}
          onChange={handleChange}
          className={s.input}
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};
