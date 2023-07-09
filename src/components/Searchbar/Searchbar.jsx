import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SearchForm } from './SearchForm.styled';
import { SearchFormButton } from './SearchFormButton.styled';
import { SearchbarHeader } from './SearchbarHeader.styled';
import { SearchFormButtonLabel } from './SearchFormButtonLabel.styled';
import { SearchFormInput } from './SearchFormInput.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const onChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <SearchbarHeader className="searchbar">
      <SearchForm className="form" onSubmit={handleSubmit}>
        <SearchFormButton type="submit" className="button">
          <SearchFormButtonLabel className="button-label">
            <i className="fa fa-search"></i>
          </SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={onChange}
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
